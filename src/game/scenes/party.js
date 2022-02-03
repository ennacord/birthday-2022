import Phaser from 'phaser';
import Cursor2 from '../assets/cursor/cursor2.png';

class PartyScene extends Phaser.Scene {
  containers = {};

  create() {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    this.createContainers(6, 3);
    this.createImage(-1, 0.5, 0.85, 'table');
    this.createImage(-1, 0.5, 0.7, 'cake', 'Baking Relay', (image, label) => {
      // Cake = Birthday Relay
      image
        .setInteractive({ cursor: `url(${Cursor2}), auto`, pixelPerfect: true })
        .on('pointerover', () => {
          image.setAngle((Math.random() * 17) - 8);
          label.setVisible(true);
        })
        .on('pointerout', () => {
          image.setAngle(0);
          label.setVisible(false);
        })
        .on('pointerdown', () => {
          this.game.vue.dialog = true;
          this.game.vue.openProject = 'cake';
        });
    });
    this.createImage(2, 0.1, 0.24, 'reimu', 'God Sees All', (image, label) => {
      // Banner = Message Board
      image
        .setInteractive({ cursor: `url(${Cursor2}), auto`, pixelPerfect: true })
        .on('pointerover', () => {
          image.setAngle((Math.random() * 11) - 5);
          label.setVisible(true);
        })
        .on('pointerout', () => {
          image.setAngle(0);
          label.setVisible(false);
        })
        .on('pointerdown', () => {
          this.game.vue.dialog = true;
          this.game.vue.openProject = 'banner';
        });
    });
    this.createImage(3, 0.5, 0.5, 'room');
    this.createImage(3, 0.5, 0.1, 'balloons');
    this.createImage(2, 0.67, 0.49, 'gifts', 'Gallery', (image, label) => {
      // Banner = Message Board
      image
        .setInteractive({ cursor: `url(${Cursor2}), auto`, pixelPerfect: true })
        .on('pointerover', () => {
          image.setAngle((Math.random() * 11) - 5);
          label.setVisible(true);
        })
        .on('pointerout', () => {
          image.setAngle(0);
          label.setVisible(false);
        })
        .on('pointerdown', () => {
          this.game.vue.dialog = true;
          this.game.vue.openProject = 'banner';
        });
    });
    this.createImage(-2, 0.73, 0.75, 'millie', 'God Sees All', (image, label) => {
      // Banner = Message Board
      image
        .setInteractive({ cursor: `url(${Cursor2}), auto`, pixelPerfect: true })
        .on('pointerover', () => {
          image.setAngle((Math.random() * 11) - 5);
          label.setVisible(true);
        })
        .on('pointerout', () => {
          image.setAngle(0);
          label.setVisible(false);
        })
        .on('pointerdown', () => {
          this.game.vue.dialog = true;
          this.game.vue.openProject = 'banner';
        });
    });

    this.input.on('pointermove', (pointer) => {
      Object.entries(this.containers).forEach(([level, container]) => {
        const newX = centerX - ((pointer.x - centerX) * (0.006 * level));
        const newY = centerY - ((pointer.y - centerY) * (0.003 * level));
        container.setPosition(newX, newY);
      });
    });
  }

  createContainers(quantity, maxLevel) {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    let level = maxLevel;

    for (let index = quantity - 1; index >= 0; index -= 1) {
      const container = this.add.container(centerX, centerY);
      this.containers[`${level}`] = container;
      level -= 1;
    }
  }

  // x and y are values from 0 to 1
  createImage(level, x, y, texture, labelText, cb) {
    const container = this.containers[`${level}`];
    if (!container) {
      console.error(`invalid level: ${level}`);
      return;
    }

    const { width, height } = this.sys.game.canvas;

    const imageX = (width * x) - (width / 2);
    const imageY = (height * y) - (height / 2);

    const image = this.add.image(imageX, imageY, texture);
    if (texture === 'room') image.setScale(1.05);
    container.add(image);

    let label = null;
    if (labelText) {
      label = this.createLabel(imageX, imageY, labelText, -10);
      container.add(label);
    }

    if (cb) cb(image, label);
  }

  createLabel(x, y, text, angle = 0) {
    return this.add.text(x, y, text, {
      fontFamily: 'Londrina Solid',
      fontSize: 70,
      color: '#ffffff',
      stroke: '#003366',
      strokeThickness: 5,
    })
      .setOrigin(0.5, 0.5)
      .setAngle(angle)
      .setVisible(false);
  }
}

export default PartyScene;
