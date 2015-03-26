'use strict';

var chalk = require('chalk');
var format = require('util').format;

module.exports = function() {
  var msg = format.apply(null, arguments);

  if (!process.stdout.isTTY) {
    msg = chalk.stripColor(msg);
  }

  process.stdout.write(msg + '\n');
};
