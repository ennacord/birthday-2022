import Phaser from 'phaser';
import ElementsData from '@/data/elements';
import AloupeepsData from '@/data/aloupeeps';
import Aloupeeps from '../objects/aloupeeps';

const INTENSITY_X = 0.008;
const INTENSITY_Y = 0.004;

class PartyScene extends Phaser.Scene {
  overlay = null;

  movables = {};

  transition = null;

  confettiState = true;

  lightState = true;

  ambientLight = null;

  candleLight = null;

  radioAudio = null;

  projectAudio = null;

  bgm = null;

  soundsEnabled = true;

  create() {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // BGM
    this.bgm = this.sound.add('bgm01').setVolume(0.1).setLoop(true);
    this.bgm.play();

    // Candle Lights
    this.lights.setAmbientColor(0x0e0e0e);
    this.lights.addLight(width * 0.477, height * 0.73, 900, 0xffdd88, 2);
    this.lights.addLight(width * 0.477, height * 0.73, 50, 0xffffff, 3);

    // Animation transition
    this.transition = this.tweens.createTimeline();

    // Create game objects and placements
    Object.entries(ElementsData)
      .forEach(([key, {
        texture, x, y, z, scale, str, ox, oy,
        text, project, font, dir, audio, volume,
      }]) => {
        const container = this.add.container(centerX, centerY).setDepth(z * 10);
        // Image
        const image = this.add.image((width * x) - centerX, (height * y) - centerY, texture || key)
          .setOrigin(ox, oy);
        if (scale) image.setScale(scale);
        container.add(image);
        // Interactive object
        if (text) {
          this.interactiveElement(key, container, image, text, project, font, audio, volume);
        }
        // Transition
        if (key !== 'room') this.transitionIn(container, dir);
        // Add to movable list
        this.movables[key] = {
          container,
          strX: str * INTENSITY_X,
          strY: str * INTENSITY_Y,
          image,
        };
      });

    // Animated Aloupeeps
    AloupeepsData.forEach(({
      sprite, x, y, z, scale, str, flip, ox = 0.5, oy = 0.5,
      start, text, project, font, audio, volume,
    }, index) => {
      const ax = (width * x) - centerX;
      const ay = (height * y) - centerY;
      const container = new Aloupeeps({
        scene: this, x: ax, y: ay, ox, oy, sprite, scale, flip, start,
      })
        .setDepth(z * 10)
        .setPosition(centerX, centerY);
      this.movables[`aloupeeps${index}`] = {
        container,
        strX: str * INTENSITY_X,
        strY: str * INTENSITY_Y,
        sprite: container.sprite,
      };
      // Interactive object
      if (text) this.interactiveAloupeep(container, text, project, font, audio, volume);
      // Transition
      this.transitionIn(container, 'top');
    });

    // Transition Animation
    this.transition
      .on('complete', () => {
        // Parallax
        this.input.on('pointermove', (pointer) => {
          if (!this.lightState) return;
          const dx = pointer.x - centerX;
          const dy = pointer.y - centerY;
          Object.values(this.movables).forEach(({ container, strX, strY }) => {
            const newX = centerX - (dx * strX);
            const newY = centerY - (dy * strY);
            container.setPosition(newX, newY);
          });
        });
      })
      .play();

    // Overlay
    this.input.topOnly = true;
    this.overlay = this.add.rectangle(centerX, centerY, 1920, 937, 0x1a1a1a)
      .setInteractive()
      .setAlpha(0.75)
      .setDepth(4000)
      .on('pointerdown', () => {})
      .setVisible(false);
    this.game.vue.$root.$on('projectClosed', () => {
      this.overlay.setVisible(false);
      if (this.soundsEnabled) this.bgm.resume();
    });

    // Confetti
    this.confetti = this.add.particles('confetti');
    this.confettiEmitter = this.confetti.setDepth(3500).createEmitter({
      frame: ['1', '2', '3', '4', '5', '6', '7', '8'],
      x: { min: 0, max: 1920 },
      y: { min: -300, max: -30 },
      scale: 0.4,
      gravityX: -3,
      gravityY: 50,
      frequency: 100,
      lifespan: 7000,
      speed: { min: 3, max: 15 },
    });
  }

  transitionIn(container, dir) {
    container.setAlpha(0);
    let directionTween = {};
    if (dir === 'top') {
      // eslint-disable-next-line no-param-reassign
      container.y -= 200;
      directionTween = { y: '+=200' };
    } else if (dir === 'left') {
      // eslint-disable-next-line no-param-reassign
      container.x -= 200;
      directionTween = { x: '+=200' };
    } else if (dir === 'right') {
      // eslint-disable-next-line no-param-reassign
      container.x += 200;
      directionTween = { x: '-=200' };
    } else if (dir === 'bottom') {
      // eslint-disable-next-line no-param-reassign
      container.y += 200;
      directionTween = { y: '-=200' };
    }
    this.transition.add({
      targets: container,
      ...directionTween,
      alpha: { from: 0, to: 1 },
      ease: 'Circ.easeOut',
      duration: 300,
      repeat: 0,
      offset: '-=230',
    });
  }

  interactiveElement(
    key, container, image, text, project, fontSize = 30,
    audio = null, volume = 0.4,
  ) {
    // Label
    const label = this.createLabel(image.x, image.y, text, fontSize)
      .setDepth(2000 + image.depth);
    container.add(label);
    // Interaction
    image
      .setInteractive({ pixelPerfect: true })
      .on('pointerover', () => {
        // Cake available if lights are off, but not when on
        // Everything else available only if lights are on
        if ((key !== 'cake' && this.lightState) || (key === 'cake' && !this.lightState)) {
          image.setAngle((Math.random() * 3) - 1);
          label
            .setAngle((Math.random() * 11) - 5)
            .setVisible(true);
        }
        // Painting special hover
        if (key === 'painting' && this.lightState) image.setTexture('painting-color');
        // Hover Audio
        if (audio && this.soundsEnabled) {
          if (this.projectAudio) this.projectAudio.stop();
          this.projectAudio = this.sound.add(audio).setVolume(volume);
          this.projectAudio.on('complete', () => { this.projectAudio = null; });
          this.projectAudio.play();
        }
      })
      .on('pointerout', () => {
        image.setAngle(0);
        label.setVisible(false);
        if (key === 'painting') image.setTexture('painting');
        // Stop hover audio
        if (this.projectAudio) this.projectAudio.stop();
        this.projectAudio = null;
      })
      .on('pointerdown', () => {
        if (key === 'cake') {
          // Cake available if lights off
          if (!this.lightState) this.blowCakeCandles();
        } else if (this.lightState && key === 'millie') {
          // Millie special interaction when lights on, toggles confetti
          this.toggleConfetti();
        } else if (this.lightState && key === 'radio') {
          // Radio special interaction when lights on, plays Aloucast
          this.toggleRadio();
          this.game.vue.openProject = project;
        } else if (key === 'playbtn') {
          // Toggle BGM and Hover SFX
          this.toggleSounds();
        } else if (this.lightState) {
          // Everything else available only if lights are on
          this.overlay.setVisible(true);
          this.game.vue.dialog = true;
          this.game.vue.openProject = project;
          // Stop radio audio
          if (this.radioAudio) this.radioAudio.stop();
          this.radioAudio = null;
          // Stop hover audio
          if (this.projectAudio) this.projectAudio.stop();
          this.projectAudio = null;
          // Stop BGM
          this.bgm.pause();
          // Special baking relay interaction, lights off into blowing candles
          if (project === 'bakingrelay') this.lightsOff();
        }
      });
  }

  interactiveAloupeep(container, text, project, fontSize = 30, audio = null, volume = 0.4) {
    // Label
    const label = this.createLabel(container.sprite.x, container.sprite.y, text, fontSize)
      .setDepth(2000 + container.sprite.depth);
    container.add(label);
    // Interaction
    container.sprite
      .setInteractive()
      .on('pointerover', () => {
        if (!this.lightState) return;
        container.sprite.setAngle((Math.random() * 3) - 1);
        label
          .setAngle((Math.random() * 11) - 5)
          .setVisible(true);
        // Hover Audio
        if (audio && this.soundsEnabled) {
          if (this.projectAudio) this.projectAudio.stop();
          this.projectAudio = this.sound.add(audio).setVolume(volume);
          this.projectAudio.on('complete', () => { this.projectAudio = null; });
          this.projectAudio.play();
        }
      })
      .on('pointerout', () => {
        container.sprite.setAngle(0);
        label.setVisible(false);
        // Stop hover audio
        if (this.projectAudio) this.projectAudio.stop();
        this.projectAudio = null;
      })
      .on('pointerdown', () => {
        if (!this.lightState) return;
        this.overlay.setVisible(true);
        this.game.vue.dialog = true;
        this.game.vue.openProject = project;
        // Stop radio audio
        if (this.radioAudio) this.radioAudio.stop();
        this.radioAudio = null;
        // Stop hover audio
        if (this.projectAudio) this.projectAudio.stop();
        this.projectAudio = null;
        // Stop BGM
        this.bgm.pause();
      });
  }

  createLabel(x, y, text, fontSize) {
    return this.add.text(x, y, text, {
      fontFamily: 'Londrina Solid',
      fontSize: fontSize || 50,
      color: '#ffffff',
      stroke: '#003366',
      strokeThickness: 5,
    })
      .setOrigin(0.5, 0.5)
      .setVisible(false);
  }

  toggleConfetti() {
    this.confettiState = !this.confettiState;
    this.confettiEmitter.setVisible(this.confettiState);
  }

  lightsOff() {
    this.lightState = false;
    Object.values(this.movables).forEach(({ image, sprite }) => {
      if (image) image.setPipeline('Light2D');
      if (sprite) {
        sprite.setPipeline('Light2D');
        sprite.stop();
      }
    });
    this.lights.enable();
    this.confettiState = false;
    this.confettiEmitter.setVisible(this.confettiState);
  }

  blowCakeCandles() {
    const blowSound = this.sound.add('cake').setVolume(0.7);
    blowSound.on('complete', () => { this.fanfare(); });
    blowSound.play();
  }

  fanfare() {
    this.lightState = true;
    Object.values(this.movables).forEach(({ image, sprite }) => {
      if (image) image.setPipeline('MultiPipeline');
      if (sprite) {
        sprite.setPipeline('MultiPipeline');
        sprite.anims.restart();
      }
    });
    this.lights.disable();
    this.confettiState = true;
    this.confettiEmitter.setVisible(this.confettiState);
    // More confetti
    const { width, height } = this.sys.game.canvas;
    this.confetti
      .createEmitter({
        frame: ['1', '2', '3', '4', '5', '6', '7', '8'],
        x: width * 0.648,
        y: height * 0.775,
        scale: 0.4,
        gravityY: 150,
        angle: { min: -170, max: -80 },
        frequency: 1,
        quantity: 20,
        lifespan: 9000,
        speed: { min: 200, max: 400 },
        maxParticles: 40,
      });
    // Confetti sound after some delay
    setTimeout(() => {
      this.sound.add('confetti').setVolume(0.7).play();
    }, 300);
  }

  toggleRadio() {
    if (!this.radioAudio) {
      // Audio. Randomize tune in/out sounds
      const tuneIn = this.sound.add(`radio_in_0${Math.floor(Math.random() * 4) + 1}`).setVolume(0.4);
      this.radioAudio = this.sound.add('aloucast').setVolume(0.8);
      const tuneOut = this.sound.add(`radio_out_0${Math.floor(Math.random() * 3) + 1}`).setVolume(0.4);
      // Events
      tuneIn.on('complete', () => {
        if (this.radioAudio) this.radioAudio.play();
      });
      this.radioAudio.on('complete', () => {
        this.radioAudio = null;
        tuneOut.play();
      });
      // Start
      tuneIn.play();
    } else {
      const tuneOut = this.sound.add(`radio_out_0${Math.floor(Math.random() * 3) + 1}`).setVolume(0.4);
      tuneOut.play();
      this.radioAudio.stop();
      this.radioAudio = null;
    }
  }

  toggleSounds() {
    this.soundsEnabled = !this.soundsEnabled;
    if (this.soundsEnabled) {
      this.movables.playbtn.image.setTexture('playbtn');
      this.bgm.play();
    } else {
      this.movables.playbtn.image.setTexture('pausebtn');
      this.bgm.stop();
    }
  }
}

export default PartyScene;
