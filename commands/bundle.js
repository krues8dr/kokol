'use strict';

const fs = require('fs');
const path = require('path');
const concat = require('concat');
const uglify = require('uglify-js');
const del = require('del');

module.exports = function bundle(program) {
  program
    .command('bundle [distFolder]')
    .description('Bundles the RMMV files into a package for distribution.')
    .action((distFolder) => {
      console.log('Bundling...');

      let dist = distFolder || 'dist';
      if (!fs.existsSync(dist)){
        fs.mkdirSync(dist);
      }

      let files = [
        'js/libs/pixi.js',
        'js/libs/pixi-tilemap.js',
        'js/libs/pixi-picture.js',
        'js/libs/fpsmeter.js',
        'js/libs/lz-string.js',
        'js/libs/iphone-inline-video.browser.js',
        'js/rpg_core.js',
        'js/rpg_managers.js',
        'js/rpg_objects.js',
        'js/rpg_scenes.js',
        'js/rpg_sprites.js',
        'js/rpg_windows.js',
        'js/plugins.js',
        'js/main.js'
      ];
      concat(files).then(code => {
        let uglied = uglify.minify(code);

        let name = 'bundle.js';
        let time = Buffer.from([Date.now()]).toString('base64').replace(/==$/, '');
        let filePath = path.resolve(dist, name);

        console.log('Removing previous bundles.');
        del.sync([filePath]);

        fs.writeFileSync(filePath, uglied.code);
        console.log('Wrote ' + filePath + '  Done.');

        let indexPath = path.resolve('./index.html');
        let content = fs.readFileSync(indexPath, 'utf8');
        content = content.replace(/bundle\.js(\?[a-zA-Z0-9]+)?/g, 'bundle.js?'+time)
        fs.writeFileSync(indexPath, content);
        console.log('Updated timestamp in '+indexPath);

        console.log('Done.');
      });

    });
}