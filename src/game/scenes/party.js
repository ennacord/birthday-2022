import Phaser from 'phaser';
import ElementsData from '@/data/elements';
import AloupeepsData from '@/data/aloupeeps';
import Aloupeeps from '../objects/aloupeeps';

const INTENSITY_X = 0.009;
const INTENSITY_Y = 0.006;

class PartyScene extends Phaser.Scene {
  overlay = null;

  movables = {};

  transition = null;

  confettiState = true;

  lightState = true;

  create() {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // Candle Lights
    this.lights.setAmbientColor(0x151515);
    const light = this.lights.addLight(centerX, height * 0.78, 800, 0xffdd88, 4);
    this.tweens.add({
      targets: [light],
      x: '+=25',
      y: '+=5',
      duration: 3000,
      ease: 'Back.easeInOut',
      repeat: -1,
      yoyo: true,
    });
    this.lights.disable();

    // Animation transition
    this.transition = this.tweens.createTimeline();

    // Create game objects and placements
    Object.entries(ElementsData)
      .forEach(([key, { texture, x, y, z, scale, str, ox, oy, text, project, font, dir }]) => {
        const container = this.add.container(centerX, centerY).setDepth(z * 10);
        // Image
        const image = this.add.image((width * x) - centerX, (height * y) - centerY, texture || key)
          .setOrigin(ox, oy);
        if (scale) image.setScale(scale);
        container.add(image);
        // Interactive object
        if (text) this.interactiveElement(container, image, text, project, font);
        // Transition
        if (key !== 'room') this.transitionIn(container, dir);
        // Add to movable list
        this.movables[key] = { container, str, image };
      });

    // Animated Aloupeeps
    AloupeepsData.forEach(({
      sprite, x, y, z, scale, str, flip, ox = 0.5, oy = 0.5, start, text, project, font,
    }, index) => {
      const ax = (width * x) - centerX;
      const ay = (height * y) - centerY;
      const container = new Aloupeeps({
        scene: this, x: ax, y: ay, ox, oy, sprite, scale, flip, start,
      })
        .setDepth(z * 10)
        .setPosition(centerX, centerY);
      this.movables[`aloupeeps${index}`] = { container, str, sprite: container.sprite };
      // Interactive object
      if (text) this.interactiveAloupeep(container, text, project, font);
      // Transition
      this.transitionIn(container, 'top');
    });

    // Overlay
    this.input.topOnly = true;
    this.overlay = this.add.rectangle(centerX, centerY, 1920, 937, 0x1a1a1a)
      .setInteractive()
      .setAlpha(0.75)
      .setDepth(4000)
      .on('pointerdown', () => {})
      .setVisible(false);

    // Recover from Overlay
    this.game.vue.$root.$on('projectClosed', () => {
      this.overlay.setVisible(false);
    });

    // Transition Animation
    this.transition
      .on('complete', () => {
        // Parallax
        this.input.on('pointermove', (pointer) => {
          if (!this.lightState) return;
          Object.values(this.movables).forEach(({ container, str }) => {
            const newX = centerX - ((pointer.x - centerX) * (INTENSITY_X * str));
            const newY = centerY - ((pointer.y - centerY) * (INTENSITY_Y * str));
            container.setPosition(newX, newY);
          });
        });
      })
      .play();

    // Confetti
    const confettiParticles = this.add.particles('confetti')
      .setDepth(3500);
    this.confettiEmitter = confettiParticles.createEmitter({
      frame: ['1', '2', '3', '4', '5', '6', '7', '8'],
      x: { min: 0, max: 1920 },
      y: { min: -300, max: -30 },
      scale: { min: 0.2, max: 0.5 },
      gravityX: -3,
      gravityY: 50,
      frequency: 100,
      lifespan: 7000,
      speed: { min: 2, max: 15 },
    });

    // Special - Millie Toggles Confetti
    this.movables.millie.image
      .setInteractive({ pixelPerfect: true })
      .off('pointerdown')
      .on('pointerdown', () => {
        this.confettiState = !this.confettiState;
        this.confettiEmitter.setVisible(this.confettiState);
        // if (this.confettiState) this.confettiEmitter.start();
        // else this.confettiEmitter.stop();
      });

    // Special - Reimu Toggles Lights
    let tempConfettiState = true;
    this.movables.cake.image
      .setInteractive({ pixelPerfect: true })
      .off('pointerdown')
      .on('pointerdown', () => {
        this.lightState = !this.lightState;
        if (this.lightState) {
          Object.values(this.movables).forEach(({ image, sprite }) => {
            if (image) image.setPipeline('MultiPipeline');
            if (sprite) {
              sprite.setPipeline('MultiPipeline');
              sprite.anims.restart();
            }
          });
          this.lights.disable();
          this.confettiState = tempConfettiState;
          this.confettiEmitter.setVisible(this.confettiState);
        } else {
          Object.values(this.movables).forEach(({ image, sprite }) => {
            if (image) image.setPipeline('Light2D');
            if (sprite) {
              sprite.setPipeline('Light2D');
              sprite.stop();
            }
          });
          this.lights.enable();
          tempConfettiState = this.confettiState;
          this.confettiState = false;
          this.confettiEmitter.setVisible(this.confettiState);
        }
      });

    // Special - Painting Color on Hover
    this.movables.painting.image
      .setInteractive({ pixelPerfect: true })
      .on('pointerover', () => {
        if (!this.lightState) return;
        this.movables.painting.image.setTexture('painting-color');
      })
      .on('pointerout', () => {
        this.movables.painting.image.setTexture('painting');
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

  interactiveElement(container, image, text, project, fontSize = 30) {
    // Label
    const label = this.createLabel(image.x, image.y, text, fontSize)
      .setDepth(2000 + image.depth);
    container.add(label);
    // Interaction
    image
      .setInteractive({ pixelPerfect: true })
      .on('pointerover', () => {
        if (!this.lightState) return;
        image.setAngle((Math.random() * 3) - 1);
        label
          .setAngle((Math.random() * 11) - 5)
          .setVisible(true);
      })
      .on('pointerout', () => {
        image.setAngle(0);
        label.setVisible(false);
      })
      .on('pointerdown', () => {
        if (!this.lightState) return;
        this.overlay.setVisible(true);
        this.game.vue.dialog = true;
        this.game.vue.openProject = project;
      });
  }

  interactiveAloupeep(container, text, project, fontSize) {
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
      })
      .on('pointerout', () => {
        container.sprite.setAngle(0);
        label.setVisible(false);
      })
      .on('pointerdown', () => {
        if (!this.lightState) return;
        this.overlay.setVisible(true);
        this.game.vue.dialog = true;
        this.game.vue.openProject = project;
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
}

export default PartyScene;
