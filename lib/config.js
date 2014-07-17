var fs = require('fs'),
  _ = require('underscore'),
  userhome = require('userhome'),
  logger = require('./logger');

var configFilePath = userhome('.gi.json');

function getUserConfig() {

  if (!fs.existsSync(configFilePath)) {
    fs.writeFileSync(configFilePath, '{}');
  }

  try {
    config = require(configFilePath);
    return config;
  } catch(err) {
    logger.error('Reading config error: ' + err);
    return {};
  }
}

function writeUserConfig(value) {
  var config = _.extend(getUserConfig(), value);

  try {
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  } catch(err) {
    logger.error("Writing to config file failed: " + err);
  }
}

module.exports = {
  getUserConfig: getUserConfig,
  writeUserConfig: writeUserConfig
};

