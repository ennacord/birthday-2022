import Phaser from 'phaser';

class PartyScene extends Phaser.Scene {
  images = [];

  create() {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    this.images = {
      room: { level: 5, obj: this.add.image(centerX, centerY, 'room') },
      artworks: { level: 5, obj: this.add.image(centerX, centerY, 'artworks') },
      banner: { level: 4, obj: this.add.image(centerX, centerY, 'banner') },
      cake: { level: 2, obj: this.add.image(centerX, centerY, 'cake') },
      crowd1: { level: 1, obj: this.add.image(centerX, centerY, 'crowd1') },
      crowd2: { level: 1, obj: this.add.image(centerX, centerY, 'crowd2') },
      crowd3: { level: 2, obj: this.add.image(centerX, centerY, 'crowd3') },
      crowd4: { level: 2, obj: this.add.image(centerX, centerY, 'crowd4') },
      crowd5: { level: 3, obj: this.add.image(centerX, centerY, 'crowd5') },
      enna: { level: 2, obj: this.add.image(centerX, centerY, 'enna') },
      gifts: { level: 5, obj: this.add.image(centerX, centerY, 'gifts') },
      nina: { level: 4, obj: this.add.image(centerX, centerY, 'nina') },
      radio: { level: 3, obj: this.add.image(centerX, centerY, 'radio') },
      reimu: { level: 4, obj: this.add.image(centerX, centerY, 'reimu') },
      switch: { level: 3, obj: this.add.image(centerX, centerY, 'switch') },
      table: { level: 2, obj: this.add.image(centerX, centerY, 'table') },
      tv: { level: 3, obj: this.add.image(centerX, centerY, 'tv') },
    };

    // Cake = Birthday Relay
    this.images.cake.obj
      .setInteractive({ useHandCursor: true, pixelPerfect: true })
      .on('pointerdown', () => {
        this.game.vue.dialog = true;
        this.game.vue.openProject = 'cake';
      });

    // Artwork = Drawing Board
    this.images.artworks.obj
      .setInteractive({ useHandCursor: true, pixelPerfect: true })
      .on('pointerdown', () => {
        this.game.vue.dialog = true;
        this.game.vue.openProject = 'artworks';
      });

    // Banner = Message Board
    this.images.banner.obj
      .setInteractive({ useHandCursor: true, pixelPerfect: true })
      .on('pointerdown', () => {
        this.game.vue.dialog = true;
        this.game.vue.openProject = 'banner';
      });

    this.input.on('pointermove', (pointer) => {
      Object.values(this.images).forEach((image) => {
        const newX = centerX + ((pointer.x - centerX) * (0.02 * (6 - image.level)));
        const newY = centerY + ((pointer.y - centerY) * (0.01 * (6 - image.level))) - 20;
        image.obj.setPosition(newX, newY);
      });
    });
  }
}

export default PartyScene;
