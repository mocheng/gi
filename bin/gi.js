#!/usr/bin/env node

var cli = require('cli'),
  moment = require('moment'),
  inquirer = require('inquirer'),
  user = require('../lib/user'),
  api = require('../lib/api'),
  issue = require('../lib/issue'),
  logger = require('../lib/logger'),
  config = require('../lib/config');

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

    cli.spinner('asking github ... ');

    api.authorization.create({
      scopes: ['user', 'public_repo', 'repo', 'repo:status', 'delete_repo', 'gist'],
      note: 'gi (' + moment().format('MMMM YYYY, hh:mm:ss a') + ')', // this should be different for each request
      note_url: 'https://github.com/mocheng/gi'
    }, function(err, res) {
      cli.spinner('asking github ... responded\r\n', true);

      if (err) {
        logger.error('Fail to get Github auth: ' + err);
        return;
      }

      config.writeUserConfig({
        github_token: res.token
      });

      callback();
    });
  });
}


function showMainMenu() {

  cli.spinner('asking github ... ');
  issue.getIssues(function(err, issues) {
    cli.spinner('asking github ... responded\r\n', true);

    if (err) {
      logger.oops('Fail to read from Github');
      return;
    }

    var issueQuestion = {
      type: 'list',
      name: 'issue',
      message: 'Which issue to view?',
      choices: issues.map(function(issue) {
        return issue.title;
      })
    };

    inquirer.prompt(
      issueQuestion,
      function(answers) {
        logger.log(answers);
      }
    );
  });

}


init(function() {

  showMainMenu();

  logger.info('done');
});
