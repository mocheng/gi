var github = require('github');

var api = new github({
  //debug: true,
  version: '3.0.0',
  protocol: 'https',
  host: 'api.github.com'
});

module.exports = api;
