import Phaser from 'phaser';
import Elements from '../data/elements';

const INTENSITY_X = 0.007;
const INTENSITY_Y = 0.004;

class PartyScene extends Phaser.Scene {
  movables = {};

  create() {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    // Create game objects and placements
    Object.entries(Elements)
      .forEach(([key, { texture, x, y, z, scale, str, ox, oy, text, project, font }]) => {
        const container = this.add.container(centerX, centerY).setDepth(z * 10);
        // Image
        const image = this.add.image((width * x) - centerX, (height * y) - centerY, texture || key)
          .setOrigin(ox, oy);
        if (scale) image.setScale(scale);
        container.add(image);
        // Interactive object
        if (text && project) this.interactiveElement(container, image, text, project, font);
        // Add to movable list
        this.movables[key] = { container, str };
      });

    // Parallax
    this.input.on('pointermove', (pointer) => {
      Object.values(this.movables).forEach(({ container, str }) => {
        const newX = centerX - ((pointer.x - centerX) * (INTENSITY_X * str));
        const newY = centerY - ((pointer.y - centerY) * (INTENSITY_Y * str));
        container.setPosition(newX, newY);
      });
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
