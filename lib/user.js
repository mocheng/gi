var inquirer = require('inquirer');

var createUserAuth = function(callback) {
  inquirer.prompt(
    [
      {
        type: 'input',
        message: 'Enter your Github username:',
        name: 'username'
      },
      {
        type: 'password',
        message: 'Enter your Github password:',
        name: 'password'
      }
    ], function(answers) {
      console.log(answers);
    }
  );
};

module.exports = {
  createUserAuth: createUserAuth
};

