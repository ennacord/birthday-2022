import Phaser from 'phaser';
import plugins from './plugins';
import scene from './scenes';

class EnnaBirthday {
  constructor(elementId, width, height) {
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
        height: (1920 / width) * height,
      },
      backgroundColor: Phaser.Display.Color.HexStringToColor('#ffffff').color,
      plugins,
      scene,
    });
  }
}

export default EnnaBirthday;
