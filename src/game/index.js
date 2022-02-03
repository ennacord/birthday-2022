import Phaser from 'phaser';
import plugins from './plugins';
import scene from './scenes';

class EnnaBirthday {
  constructor(elementId, vue) {
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
        height: 937,
      },
      backgroundColor: Phaser.Display.Color.HexStringToColor('#ffffff').color,
      plugins,
      scene,
      callbacks: {
        postBoot: () => {
          this.game.vue = vue;
        },
      },
    });
  }
}

export default EnnaBirthday;
