'use strict';

const chalk = require('chalk');

module.exports = function showColor(color) {
  return color.substring(0,6) + ' ' + color.substring(6,8) + ' ' +
    chalk.hex('#'+ color.substring(0,6))('██████');
}