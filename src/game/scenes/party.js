import Phaser from 'phaser';
import Cursor2 from '../assets/cursor/cursor2.png';

class PartyScene extends Phaser.Scene {
  containers = {};

  create() {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    this.createContainers(6, 3);
    this.createImage(-2, 0.8, 0.85, 'crowd2');
    this.createImage(-2, 0.22, 0.87, 'crowd1');
    this.createImage(-1, 0.5, 0.85, 'table');
    this.createImage(-1, 0.5, 0.8, 'cake', 'Baking Relay', (image, label) => {
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
    this.createImage(-1, 0.3, 0.85, 'crowd3');
    this.createImage(0, 0.15, 0.85, 'crowd4');
    this.createImage(0, 0.05, 0.7, 'radio');
    this.createImage(0, 0.5, 0.55, 'enna');
    this.createImage(1, 0.9, 0.85, 'crowd5');
    this.createImage(1, 0, 0.4, 'switch');
    this.createImage(1, 0.2, 0.6, 'reimu');
    this.createImage(1, 1, 0.7, 'tv');
    this.createImage(2, 0.8, 0.55, 'nina');
    this.createImage(2, 0.5, 0.1, 'banner', 'View Messages', (image, label) => {
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
    this.createImage(3, 1, 0.5, 'gifts');
    this.createImage(3, 0.2, 0.45, 'artworks', 'Drawings', (image, label) => {
      // Artwork = Drawing Board
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
          this.game.vue.openProject = 'artworks';
        });
    });

    this.input.on('pointermove', (pointer) => {
      Object.entries(this.containers).forEach(([level, container]) => {
        const newX = centerX - ((pointer.x - centerX) * (0.017 * level));
        const newY = centerY - ((pointer.y - centerY) * (0.008 * level));
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

    // make an imaginary container size and make it 0.1 smaller as the level increases
    const containerSize = {
      width: width * (1 - (level * 0.1)),
      height: height * (1 - (level * 0.1)),
    };

    const imageX = (containerSize.width * x) - (containerSize.width / 2);
    const imageY = (containerSize.height * y) - (containerSize.height / 2);

    const image = this.add.image(imageX, imageY, texture);
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
