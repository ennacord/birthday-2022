import Phaser from 'phaser';

import PartyScene from './party';

import ImgEnna from '../assets/images/enna.png';
import ImgCake from '../assets/images/cake.png';
import ImgBanner from '../assets/images/banner.png';
import ImgGifts from '../assets/images/gifts.png';
import ImgRoomie from '../assets/images/roomie.png';
import ImgReimu from '../assets/images/reimu.png';
import ImgNina from '../assets/images/nina.png';
import ImgRoom from '../assets/images/room.png';
import ImgTable from '../assets/images/table.png';
import ImgAptable from '../assets/images/aptable.png';
import ImgMillie from '../assets/images/millie.png';
import ImgPainting from '../assets/images/painting.png';
import ImgPaintingColor from '../assets/images/painting-color.png';
import ImgBalloons from '../assets/images/balloons.png';
import ImgCouch from '../assets/images/couch.png';
import ImgChef from '../assets/images/chef.png';
import ImgPlaybtn from '../assets/images/playbtn.png';
import ImgRack from '../assets/images/rack.png';
import ImgRadio from '../assets/images/radio.png';
import ImgTv from '../assets/images/tv.png';
import ImgCarpet from '../assets/images/carpet.png';

import Cursor3 from '../assets/cursor/cursor3.png';

import Dancing from '../assets/spritesheets/dancing.png';
import Geddan from '../assets/spritesheets/geddan.png';
import Specialist from '../assets/spritesheets/specialist.png';
import Pwoot from '../assets/spritesheets/pwoot.png';
import Alousus from '../assets/spritesheets/alousus.png';
import Dazed from '../assets/spritesheets/dazed.png';
import Doublepeeps from '../assets/spritesheets/doublepeeps.png';
import NormalDance from '../assets/spritesheets/normaldance.png';

import confettiPng from '../assets/atlas/confetti.png';
import confettiJson from '../assets/atlas/confetti.json';

import audioAloucast from '../assets/audio/aloucast.mp3';
import audioRadioIn1 from '../assets/audio/radio_in_01.mp3';
import audioRadioIn2 from '../assets/audio/radio_in_02.mp3';
import audioRadioIn3 from '../assets/audio/radio_in_03.mp3';
import audioRadioIn4 from '../assets/audio/radio_in_04.mp3';
import audioRadioOut1 from '../assets/audio/radio_out_01.mp3';
import audioRadioOut2 from '../assets/audio/radio_out_02.mp3';
import audioRadioOut3 from '../assets/audio/radio_out_03.mp3';

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
    this.load.image('enna', ImgEnna);
    this.load.image('millie', ImgMillie);
    this.load.image('balloons', ImgBalloons);
    this.load.image('cake', ImgCake);
    this.load.image('banner', ImgBanner);
    this.load.image('painting', ImgPainting);
    this.load.image('painting-color', ImgPaintingColor);
    this.load.image('gifts', ImgGifts);
    this.load.image('roomie', ImgRoomie);
    this.load.image('reimu', ImgReimu);
    this.load.image('nina', ImgNina);
    this.load.image('room', ImgRoom);
    this.load.image('table', ImgTable);
    this.load.image('aptable', ImgAptable);
    this.load.image('couch', ImgCouch);
    this.load.image('chef', ImgChef);
    this.load.image('playbtn', ImgPlaybtn);
    this.load.image('rack', ImgRack);
    this.load.image('radio', ImgRadio);
    this.load.image('tv', ImgTv);
    this.load.image('carpet', ImgCarpet);

    this.load.spritesheet('dancing', Dancing, { frameWidth: 7680 / 12, frameHeight: 201 });
    this.load.spritesheet('geddan', Geddan, { frameWidth: 4320 / 24, frameHeight: 180 });
    this.load.spritesheet('specialist', Specialist, { frameWidth: 6120 / 34, frameHeight: 180 });
    this.load.spritesheet('pwoot', Pwoot, { frameWidth: 2424 / 12, frameHeight: 202 });
    this.load.spritesheet('alousus', Alousus, { frameWidth: 2600 / 13, frameHeight: 200 });
    this.load.spritesheet('dazed', Dazed, { frameWidth: 1600 / 8, frameHeight: 200 });
    this.load.spritesheet('doublepeeps', Doublepeeps, { frameWidth: 2000 / 10, frameHeight: 200 });
    this.load.spritesheet('normaldance', NormalDance, { frameWidth: 1600 / 8, frameHeight: 200 });

    this.load.atlas('confetti', confettiPng, confettiJson);

    this.load.audio('aloucast', audioAloucast);
    this.load.audio('radio_in_01', audioRadioIn1);
    this.load.audio('radio_in_02', audioRadioIn2);
    this.load.audio('radio_in_03', audioRadioIn3);
    this.load.audio('radio_in_04', audioRadioIn4);
    this.load.audio('radio_out_01', audioRadioOut1);
    this.load.audio('radio_out_02', audioRadioOut2);
    this.load.audio('radio_out_03', audioRadioOut3);
  }

  async create() {
    // Cursor
    this.input.setDefaultCursor(`url(${Cursor3}), auto`);

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
