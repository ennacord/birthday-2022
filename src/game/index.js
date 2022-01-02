import Phaser from 'phaser';
import plugins from './plugins';

class EnnaBirthday {
  constructor(elementId) {
    // Create Phaser game instance
    this.game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: elementId,
      banner: false,
      disableContextMenu: false,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 887,
      },
      backgroundColor: Phaser.Display.Color.HexStringToColor('#6c73a7').color,
      plugins,
      scene: {
        preload() {
          // Google Fonts
          this.googleFonts.preload(this.load);
        },
        async create() {
          // Wait for asyncs to finish
          await Promise.all([
            // Configure Google Fonts and let it load specific fonts
            this.googleFonts.configure(),
          ]);

          // Write text with Google font
          this.add.text(100, 100, 'Hello World!', {
            fontFamily: 'Londrina Solid',
            fontSize: 100,
            color: '#ffffff',
            stroke: '#003366',
            strokeThickness: 5,
          });
        },
      },
    });
  }
}

export default EnnaBirthday;
