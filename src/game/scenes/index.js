import Phaser from 'phaser';

import PartyScene from './party';

import ImgCake from '../assets/images/cake.png';
import ImgGifts from '../assets/images/gifts.png';
import ImgReimu from '../assets/images/reimu.png';
import ImgNina from '../assets/images/nina.png';
import ImgRoom from '../assets/images/room.png';
import ImgTable from '../assets/images/table.png';
import ImgMillie from '../assets/images/millie.png';
import ImgBalloons from '../assets/images/balloons.png';
import ImgCouch from '../assets/images/couch.png';
import ImgChef from '../assets/images/chef.png';
import ImgRack from '../assets/images/rack.png';
import ImgRadio from '../assets/images/radio.png';
import ImgCarpet from '../assets/images/carpet.png';
import Cursor1 from '../assets/cursor/cursor1.png';

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

    // Preload assets
    this.load.image('millie', ImgMillie);
    this.load.image('balloons', ImgBalloons);
    this.load.image('cake', ImgCake);
    this.load.image('gifts', ImgGifts);
    this.load.image('reimu', ImgReimu);
    this.load.image('nina', ImgNina);
    this.load.image('room', ImgRoom);
    this.load.image('table', ImgTable);
    this.load.image('couch', ImgCouch);
    this.load.image('chef', ImgChef);
    this.load.image('rack', ImgRack);
    this.load.image('radio', ImgRadio);
    this.load.image('carpet', ImgCarpet);
  }

  async create() {
    // Cursor
    this.input.setDefaultCursor(`url(${Cursor1}), auto`);

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
        setTimeout(() => {
          this.game.scale.startFullscreen();
        }, 250);
        // Delay start next scene
        setTimeout(() => {
          this.scene.start('party');
        }, 500);
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
