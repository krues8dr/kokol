'use strict';

const exec = require('child_process').exec;

module.exports = function imageResize(program) {
  program
    .command('image-resize <image> <amount> <outfile>')
    .description('Resizes an <image> by <amount> times and outputs to <outfile>.')
    .action((image, amount, outfile) => {
      let value = amount * 100;

      let operation = 'convert ' + image + ' --interpolate Nearest -filter point -resize ' +
        value + '% ' + outfile;
      exec(operation, function (err, stdout, stderr) {
        console.log('Upsized by '+value+'%  Done.');
      });
    });
}