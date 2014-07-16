#!/usr/bin/env node

var user = require('../lib/user'),
  api = require('../lib/api'),
  config = require('../lib/config'),
  moment = require('moment');

function init(callback) {
  var userConfig = config.getUserConfig();

  if (!userConfig.github_token) {
    return askLogin(function() {
      callback();
    });
  }

  callback();
}

function askLogin(callback) {
  user.createUserAuth(function(answers) {

    api.authenticate({
      type: 'basic',
      username: answers.username,
      password: answers.password
    });

    api.authorization.create({
      scopes: ['user', 'public_repo', 'repo', 'repo:status', 'delete_repo', 'gist'],
      note: 'gi (' + moment().format('MMMM YYYY, hh:mm:ss a') + ')', // this should be different for each request
      note_url: 'https://github.com/mocheng/gi'
    }, function(err, res) {
      if (err) {
        console.log('Fail to get Github auth: ' + err);
        return;
      }

      config.writeUserConfig({
        github_token: res.token
      });

      callback();
    });
  });
}

init(function() {
  console.log('done');
});
