import Phaser from 'phaser';
import Cursor2 from '../assets/cursor/cursor2.png';

class PartyScene extends Phaser.Scene {
  images = [];

  create() {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    this.images = {
      room: { level: -3, obj: this.add.image(centerX, centerY, 'room') },
      artworks: { level: -3, obj: this.add.image(centerX, centerY, 'artworks') },
      gifts: { level: -3, obj: this.add.image(centerX, centerY, 'gifts') },
      banner: { level: -2.5, obj: this.add.image(centerX, centerY, 'banner') },
      nina: { level: -2, obj: this.add.image(centerX, centerY, 'nina') },
      tv: { level: -2, obj: this.add.image(centerX, centerY, 'tv') },
      reimu: { level: -1, obj: this.add.image(centerX, centerY, 'reimu') },
      switch: { level: -1, obj: this.add.image(centerX, centerY, 'switch') },
      crowd5: { level: -1, obj: this.add.image(centerX, centerY, 'crowd5') },
      enna: { level: 0, obj: this.add.image(centerX, centerY, 'enna') },
      radio: { level: 0, obj: this.add.image(centerX, centerY, 'radio') },
      crowd4: { level: 0, obj: this.add.image(centerX, centerY, 'crowd4') },
      crowd3: { level: 1, obj: this.add.image(centerX, centerY, 'crowd3') },
      cake: { level: 1, obj: this.add.image(centerX, centerY, 'cake') },
      table: { level: 1, obj: this.add.image(centerX, centerY, 'table') },
      crowd1: { level: 1.5, obj: this.add.image(centerX, centerY, 'crowd1') },
      crowd2: { level: 1.5, obj: this.add.image(centerX, centerY, 'crowd2') },
    };

    // Cake = Birthday Relay
    this.images.cake.obj
      .setInteractive({ cursor: `url(${Cursor2}), auto`, pixelPerfect: true })
      .on('pointerdown', () => {
        this.game.vue.dialog = true;
        this.game.vue.openProject = 'cake';
      });

    // Artwork = Drawing Board
    this.images.artworks.obj
      .setInteractive({ cursor: `url(${Cursor2}), auto`, pixelPerfect: true })
      .on('pointerdown', () => {
        this.game.vue.dialog = true;
        this.game.vue.openProject = 'artworks';
      });

    // Banner = Message Board
    this.images.banner.obj
      .setInteractive({ cursor: `url(${Cursor2}), auto`, pixelPerfect: true })
      .on('pointerdown', () => {
        this.game.vue.dialog = true;
        this.game.vue.openProject = 'banner';
      });

    this.input.on('pointermove', (pointer) => {
      Object.values(this.images).forEach((image) => {
        const newX = centerX + ((pointer.x - centerX) * (0.017 * image.level));
        const newY = centerY + ((pointer.y - centerY) * (0.008 * image.level)) - 20;
        image.obj.setPosition(newX, newY);
      });
    });
  }
}

export default PartyScene;
