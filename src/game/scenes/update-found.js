import Phaser from 'phaser';

class UpdateFoundScene extends Phaser.Scene {
  preload() {
    const { width, height } = this.sys.game.canvas;
    const background = this.add.graphics();
    background.fillGradientStyle(0xffffff, 0xe0e0e0, 0xe0e0e0, 0xffffff);
    background.fillRect(0, 0, width, height);
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    this.loadingText = this.add.text(width / 2, height / 2, 'The app is being updated....', {
      fontSize: 30,
      color: '#ffffff',
      stroke: '#003366',
      strokeThickness: 5,
    }).setOrigin(0.5, 0.5);
  }
}

export default UpdateFoundScene;
