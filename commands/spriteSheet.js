'use strict';

const exec = require('child_process').exec;

module.exports = function spriteSheet(program) {
  program
    .command('sprite-sheet <outfile> <images...>')
    .description('Creates a series of 4x2 sprite sheets named <outFile>-## from a glob of <images>.')
    .action((outfile, images) => {
      let w=4;
      let h=2;
      let a=w*h;
      let loop = Math.ceil(images.length / a);

      let promises = [];

      for(let i = 0; i < loop; i++) {
        let start = i * a;
        let end = (i + 1) * a;
        let imgstring = images.slice(start, end).join(' ');

        let file = outfile.replace(/(\.[a-z]{1,4})$/, '-'+i+'$1');

        let operation = 'montage ' + imgstring + ' -tile ' + w + 'x' + h +
          ' -geometry +0+0 -background transparent ' + file;

        promises.push(new Promise((resolve, reject) => {
          exec(operation, function (err, stdout, stderr) {
            console.log('Wrote by '+file+'');
            resolve();
          });
        }));
      }

      Promise.all(promises).then(() => {
        console.log('Done.');
      });
    });
}