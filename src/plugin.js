import videojs from 'video.js';
import throttle from 'lodash-compat/function/throttle';

// Default options for the plugin.
const defaults = {
  breakpoints: {
    300: 'vjs-size-tiny',
    400: 'vjs-size-small'
  }
};

class Resize {
  constructor(player, options) {
    this.player = player;
    this.options = options;
    this.classes = [];
    this.widths = [];

    const iframe = document.createElement('iframe');
    const html = `
    <script>
      window.addEventListener("resize", function() {
        parent.postMessage("resize:' + this.player.id() + '", "*");
      });
    </script>
    `;

    iframe.id = 'sizeframe';
    this.player.el().appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();

    Object.keys(this.options.breakpoints).map((key, index) => {
      this.classes.push(this.options.breakpoints[key]);
      this.widths.push(key);
    });

    this.player.addClass('vjs-resize');

    this.handleResize = this.onResize.bind(this);
    window.addEventListener('message', throttle(this.handleResize, 150));
  }

  removeClasses() {
    this.classes.forEach((item) => {
      this.player.removeClass(item);
    });
  }

  onResize(event) {
    let playerWidth = this.player.el().offsetWidth;
    let id = event.data.replace('resize:', '');

    // confirm message is from the current player
    if (event.data.indexOf('resize:') === 0 && id === this.player.id()) {
      this.removeClasses();

      for (let i = 0; i < this.widths.length; i++) {
        let width = this.widths[i];

        if (playerWidth < width) {
          this.player.addClass();
        }
      }
    }
  }
}

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function resize
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const resize = function(options) {
  this.ready(() => {
    let resize = new Resize(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
videojs.plugin('resize', resize);

// Include the version number.
resize.VERSION = '__VERSION__';

export default resize;
