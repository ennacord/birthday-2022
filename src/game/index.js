import Phaser from 'phaser';

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
      scene: {
        preload() {
          console.log('PRELOAD');
        },
        create() {
          console.log('CREATE');
        },
      },
    });
  }
}

export default EnnaBirthday;
