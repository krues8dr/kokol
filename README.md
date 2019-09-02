# Kokol

```
█  ██  █  ,----------,
 ██████   | Lali-ho! |
█ ■  ■ █  '----------'
 ▒▒▒▒▒▒
  ▒▒▒▒       KOKOL
```

Kokol is a helper application for RPG Maker MV.  It allows you to compile assets
and perform transformations on them.

## Installation

**Requires Node >= 7.6.0.**

1. Install dependencies with `npm install` or `yarn install`
2. Add to your executable path with `npm link`

## Local Webserver

Kokol comes packaged with a light wrapper around
[`http-server`](https://www.npmjs.com/package/http-server) which can be run with
`kokol serve`.  Your game will then be available to a local webbrowser at
<http://localhost:8080/>.

Please refer to the `http-server` documentation for available
options and parameters.

## Working with images

**These functions require ImageMagick to be installed.**

### Palette swapping

Frequently, game designers will want to create palette-swapped version of
existing assets.  Kokol makes this process quick and easy, with only a little
knowledge of JSON required.  Note that this works best on gif/png files.

First, you'll need to generate a dictionary of your colors for the image in
question, using the `image-colors` command.

`kokol image-colors <image> [outfile]`

Running the above command without the `outfile` will show a list of the colors
in the image. Adding a path to an `outfile` will create a json file that lists
a map of all the colors in the image.

For each color you want to replace, place a replacement hex color code on the
right side. Remove any lines of colors you do not want to replace. You may also
specify multiple colors per file, by adding additional JSON objects inside of
the top-level array.

**Example**

```
palette.json

[
  {
    "4A250CFF": "FF0000FF",
    "5A2D0EFF": "00FF00FF",
    "2E6F3CFF": "0000FFFF",
    "311345FF": "FF00FFFF",
    "3F1859FF": "FFFF00FF",
    "696969FF": "00FFFFFF"
  },
  {
    "4A250CFF": "00FF00FF",
    "5A2D0EFF": "0000FFFF",
    "2E6F3CFF": "FF00FFFF",
    "311345FF": "FFFF00FF",
    "3F1859FF": "00FFFFFF",
    "696969FF": "FF0000FF"
  },
  {
    "4A250CFF": "0000FFFF",
    "5A2D0EFF": "FF00FFFF",
    "2E6F3CFF": "FFFF00FF",
    "311345FF": "00FFFFFF",
    "3F1859FF": "FF0000FF",
    "696969FF": "00FF00FF"
  }
]
```

Once you have this file, you may use the `palette-swap` command to generate new
images based on the original.

`kokol palette-swap <image> <palette> <outdir>`

* The `image` is the source image.
* The `palette` is the palette json file.
* The `outdir` is the directory to store the resulting images in.

Using the example above on a template image will result in three images being
placed in `outdir`.

### Resize

Sometimes it can be useful to create small images and resize them up. The
`kokol resize` function will resize an image for you while retaining the
original pixelly look rather than a blurry mess.

## Asset Bundling

If you're going to be distributing your game, you probably will want to bundle
your RPG Maker MV assets. The `kokol bundle` command will combine the core files
and compress them using `uglify.js`.  It does *not*, however, combine your
plugins yet ([#2](https://github.com/krues8dr/kokol/issues/2)).

By default, the generated `bundle.js` file will be put into `dist`, but
optionally you can provide a directory as the last argument to the command
(`kokol bundle dirname`).

You'll need to replace the various JavaScript library files from your
`index.html` with a single line:

```
<script type="text/javascript" src="/dist/bundle.js"></script>
```

When the command is run, it will automatically add a timestamp to the bundle in
the index file.
