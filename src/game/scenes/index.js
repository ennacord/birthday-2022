import Phaser from 'phaser';

import PartyScene from './party';

import ImgArtworks from '../assets/images/artworks.png';
import ImgBanner from '../assets/images/banner.png';
import ImgCake from '../assets/images/cake.png';
import ImgCrowd1 from '../assets/images/crowd1.png';
import ImgCrowd2 from '../assets/images/crowd2.png';
import ImgCrowd3 from '../assets/images/crowd3.png';
import ImgCrowd4 from '../assets/images/crowd4.png';
import ImgCrowd5 from '../assets/images/crowd5.png';
import ImgEnna from '../assets/images/enna.png';
import ImgGifts from '../assets/images/gifts.png';
import ImgNina from '../assets/images/nina.png';
import ImgRadio from '../assets/images/radio.png';
import ImgReimu from '../assets/images/reimu.png';
import ImgRoom from '../assets/images/room.png';
import ImgSwitch from '../assets/images/switch.png';
import ImgTable from '../assets/images/table.png';
import ImgTv from '../assets/images/tv.png';

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
    this.load.image('artworks', ImgArtworks);
    this.load.image('banner', ImgBanner);
    this.load.image('cake', ImgCake);
    this.load.image('crowd1', ImgCrowd1);
    this.load.image('crowd2', ImgCrowd2);
    this.load.image('crowd3', ImgCrowd3);
    this.load.image('crowd4', ImgCrowd4);
    this.load.image('crowd5', ImgCrowd5);
    this.load.image('enna', ImgEnna);
    this.load.image('gifts', ImgGifts);
    this.load.image('nina', ImgNina);
    this.load.image('radio', ImgRadio);
    this.load.image('reimu', ImgReimu);
    this.load.image('room', ImgRoom);
    this.load.image('switch', ImgSwitch);
    this.load.image('table', ImgTable);
    this.load.image('tv', ImgTv);
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
