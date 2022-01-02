/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

class GoogleFontsPlugin extends Phaser.Plugins.BasePlugin {
  preload(loader) {
    loader.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  }

  configure() {
    return new Promise((done) => {
      // eslint-disable-next-line no-undef
      WebFont.load({
        google: {
          families: ['Roboto', 'Roboto:bold', 'Kosugi', 'Londrina Solid'],
        },
        active: done,
      });
    });
  }
}

export default GoogleFontsPlugin;
