import Phaser from 'phaser';

import PartyScene from './party';

class IndexScene extends Phaser.Scene {
  loadingText = null;

  preload() {
    // Google Fonts
    this.googleFonts.preload(this.load);

    // Loading text
    const { width, height } = this.sys.game.canvas;
    this.loadingText = this.add.text(width / 2, height / 2, 'Loading....', {
      fontSize: 30,
      color: '#ffffff',
      stroke: '#003366',
      strokeThickness: 5,
    }).setOrigin(0.5, 0.5);

    // Add scenes
    this.scene.add('party', PartyScene);
  }

  async create() {
    // Wait for asyncs to finish
    await Promise.all([
      // Configure Google Fonts and let it load specific fonts
      this.googleFonts.configure(),
    ]);

    // Done all preloading
    this.loadingText.destroy();

    // On desktop, start party!
    // On mobile, need touch to start and go fullscreen before party
    if (this.sys.game.device.os.desktop) {
      // Start PARTY!
      this.scene.start('party');
    } else {
      // When fullscreen and always lock to landscape
      this.game.scale.once('enterfullscreen', () => {
        // eslint-disable-next-line no-empty
        try { this.game.scale.lockOrientation(Phaser.Scale.LANDSCAPE); } catch (error) {}
        // eslint-disable-next-line no-empty
        try { ScreenOrientation.lock('landscape'); } catch (error) {}
        // eslint-disable-next-line no-empty
        try { window.screen.orientation.lock('landscape'); } catch (error) {}
      });

      // On click
      this.input.on('pointerdown', () => {
        // Attempt fullscreen
        this.game.scale.startFullscreen();
        // Delay start next scene
        setTimeout(() => {
          this.scene.start('party');
        }, 300);
      });

      // Click to Start
      const { width, height } = this.sys.game.canvas;
      this.loadingText = this.add.text(width / 2, height * 0.7, 'Touch to Start', {
        fontFamily: 'Londrina Solid',
        fontSize: 50,
        color: '#ffffff',
        stroke: '#003366',
        strokeThickness: 5,
      }).setOrigin(0.5, 0.5);
    }
  }
}

export default IndexScene;
