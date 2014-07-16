#!/usr/bin/env node

var user = require('../lib/user');

user.createUserAuth(function() {
  console.log('done');
});
