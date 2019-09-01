'use strict';

const os = require('os');
const fs = require('fs');
const exec = require('child_process').exec;
const showColor = require('../lib/showColor');

module.exports = function installCommand(program) {
  program
    .command('image-colors <image> [outfile]')
    .description('Generates a list of colors in an image. Can output a palette file.')
    .action((image, outfile) => {
      let operation = 'convert '+image+' -unique-colors txt:';
      exec(operation, function (err, stdout, stderr) {
          let colors = [];

          let lines = stdout.split(os.EOL);
          for(let i = 0; i < lines.length; i++) {
            let match = lines[i].match(/#([A-F0-9]+)/);
            if(match) {
              colors.push(match[1]);
            }
          }

          if(outfile) {
            let contents = [{}];
            for(let i = 0; i < colors.length; i++) {
              contents[0][colors[i]] = colors[i];
            }
            fs.writeFileSync(outfile, JSON.stringify(contents, null, 2));
          }
          else {
            for(let i = 0; i < colors.length; i++) {
              console.log(showColor(colors[i]));
            }
          }
        });
    });
}