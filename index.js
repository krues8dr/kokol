'use strict';

const program = require('commander');

const commands = require('./commands')(program);
const packageJson = require('./package.json');

const colors = require('colors');


console.log("█  ██  █  ,----------,");
console.log(" ██████   | Lali Ho! |");
console.log("█ ■  ■ █  '----------'");
console.log(" ▒▒▒▒▒▒               ");
console.log("  ▒▒▒▒       KOKOL    ");
console.log("");

program
  .version(packageJson.version)
  // .option('-o, --option','option description')
  // .option('-m, --more','we can have as many options as we want')
  // .option('-i, --input [optional]','optional user input')
  // .option('-I, --another-input <required>','required user input')
  .usage('<command> [options]')
  .parse(process.argv)
