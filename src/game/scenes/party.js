import Phaser from 'phaser';
import Elements from '../data/elements';
import Aloupeeps from '../objects/aloupeeps';

const INTENSITY_X = 0.008;
const INTENSITY_Y = 0.005;

class PartyScene extends Phaser.Scene {
  overlay = null;

  movables = {};

  transition = null;

  create() {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // Animation transition
    this.transition = this.tweens.createTimeline();

    // Create game objects and placements
    Object.entries(Elements)
      .forEach(([key, { texture, x, y, z, scale, str, ox, oy, text, project, font, dir }]) => {
        const container = this.add.container(centerX, centerY).setDepth(z * 10);
        // Image
        const image = this.add.image((width * x) - centerX, (height * y) - centerY, texture || key)
          .setOrigin(ox, oy);
        if (scale) image.setScale(scale);
        container.add(image);
        // Interactive object
        if (text && project) this.interactiveElement(container, image, text, project, font);
        // Transition
        if (key !== 'room') this.transitionIn(container, dir);
        // Add to movable list
        this.movables[key] = { container, str };
      });

    this.aloupeeps = new Aloupeeps({ scene: this, x: 0, y: 0 });
    this.aloupeeps.setDepth(40);
    this.movables.aloupeeps = {
      container: this.aloupeeps,
      str: 2,
    };

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
          Object.values(this.movables).forEach(({ container, str }) => {
            const newX = centerX - ((pointer.x - centerX) * (INTENSITY_X * str));
            const newY = centerY - ((pointer.y - centerY) * (INTENSITY_Y * str));
            container.setPosition(newX, newY);
          });
        });
      })
      .play();

    // Quests
    const questIcon = this.add.image(94, height - 94, 'quest')
      .setScale(1.2)
      .setDepth(3000)
      .setInteractive({ pixelPerfect: true })
      .on('pointerover', () => {
        questIcon.setAngle((Math.random() * 11) - 5);
      })
      .on('pointerout', () => {
        questIcon.setAngle(0);
      })
      .on('pointerdown', () => {
        this.overlay.setVisible(true);
        this.game.vue.dialog = true;
        this.game.vue.openProject = 'quests';
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
      ease: 'Cubic',
      duration: 500,
      repeat: 0,
      offset: '-=400',
    });
  }

  interactiveElement(container, image, text, project, fontSize) {
    // Label
    const label = this.createLabel(image.x, image.y, text, fontSize)
      .setDepth(2000 + image.depth);
    container.add(label);
    // Interaction
    image
      .setInteractive({ pixelPerfect: true })
      .on('pointerover', () => {
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
