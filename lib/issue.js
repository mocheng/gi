var api = require('../lib/api'),
  logger = require('../lib/logger');

function getIssues(callback) {
  var payload = {
    repo: 'gi',
    user: 'mocheng'
  };
  api.issues.repoIssues(payload, function(err, issues) {
    return callback(err, issues);
  });
}

module.exports = {
  getIssues : getIssues
};
