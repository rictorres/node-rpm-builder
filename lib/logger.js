'use strict';

var chalk = require('chalk');
var util = require('util');

module.exports = function() {
  var msg = util.format.apply(null, arguments);

  if (!process.stdout.isTTY) {
    msg = chalk.stripColor(msg);
  }

  process.stdout.write(msg + '\n');
};
