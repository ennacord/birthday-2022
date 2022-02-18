import Phaser from 'phaser';

class StartScene extends Phaser.Scene {
  async create() {
    const { width, height } = this.sys.game.canvas;

    this.add.image(width / 2, height / 2, 'gamestart')
      .setDisplaySize(width, height);

    // When fullscreen, try lock to landscape
    this.game.scale.once('enterfullscreen', () => {
      // eslint-disable-next-line no-empty
      try { this.game.scale.lockOrientation(Phaser.Scale.LANDSCAPE); } catch (error) {}
      // eslint-disable-next-line no-empty
      try { ScreenOrientation.lock('landscape'); } catch (error) {}
      // eslint-disable-next-line no-empty
      try { window.screen.orientation.lock('landscape'); } catch (error) {}
    });

    // Onclick
    this.input.once('pointerdown', () => {
      // On desktop, start party!
      // On mobile, go fullscreen first before party
      if (this.sys.game.device.os.desktop) {
        this.scene.start('party');
      } else {
        // Attempt fullscreen
        setTimeout(() => {
          this.game.scale.startFullscreen();
        }, 250);
        // Delay start next scene
        setTimeout(() => {
          this.scene.start('party');
        }, 1000);
      }
    });
  }
}

export default StartScene;
