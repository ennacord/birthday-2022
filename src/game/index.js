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
      fullscreenTarget: 'app',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 937,
      },
      backgroundColor: Phaser.Display.Color.HexStringToColor('#858ED1').color,
      plugins,
      scene,
      callbacks: {
        postBoot: () => {
          // Reference to vue within the Phaser game context
          this.game.vue = vue;
          // Auto scaling
          // if (!this.game.device.os.desktop) {}
          // const {clientWidth, clientHeight } = document.documentElement;
          // const w = Math.max(clientWidth || 0, window.innerWidth || 0);
          // const h = Math.max(clientHeight || 0, window.innerHeight || 0);
          // this.game.scale.setGameSize(1920 * ((w / h) / (1920 / 937)), 937);
        },
      },
    });
  }
}

export default EnnaBirthday;
