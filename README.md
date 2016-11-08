# videojs-resize

Detects videojs player resize and adds/removes classes.

Resize detection inspired by [Daniel Buchner's post](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/).

## Installation

```sh
npm install --save videojs-resize
```

The npm installation is preferred, but Bower works, too.

```sh
bower install  --save videojs-resize
```

## Options
You can pass breakpoints as options to the plugin. These are the defaults. The class is added if `player width < breakpoint key`.

```
player.resize({
  breakpoints: {
    300: 'vjs-size-tiny',
    400: 'vjs-size-small'
  }
});
```

## Usage

To include videojs-resize on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-resize.min.js"></script>
<script>
  var player = videojs('my-video');

  player.resize();
</script>
```

### Browserify

When using with Browserify, install videojs-resize via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-resize');

var player = videojs('my-video');

player.resize();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-resize'], function(videojs) {
  var player = videojs('my-video');

  player.resize();
});
```

## License

MIT. Copyright (c) Yanko Shterev &lt;yanko@streamingvideoprovider.com&gt;


[videojs]: http://videojs.com/
