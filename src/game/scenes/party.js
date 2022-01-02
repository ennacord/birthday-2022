import Phaser from 'phaser';

class PartyScene extends Phaser.Scene {
  images = [];

  create() {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;

    this.images = [
      { level: 5, obj: this.add.image(centerX, centerY, 'room') },
      { level: 5, obj: this.add.image(centerX, centerY, 'artworks') },
      { level: 4, obj: this.add.image(centerX, centerY, 'banner') },
      { level: 2, obj: this.add.image(centerX, centerY, 'cake') },
      { level: 1, obj: this.add.image(centerX, centerY, 'crowd1') },
      { level: 1, obj: this.add.image(centerX, centerY, 'crowd2') },
      { level: 2, obj: this.add.image(centerX, centerY, 'crowd3') },
      { level: 2, obj: this.add.image(centerX, centerY, 'crowd4') },
      { level: 3, obj: this.add.image(centerX, centerY, 'crowd5') },
      { level: 2, obj: this.add.image(centerX, centerY, 'enna') },
      { level: 5, obj: this.add.image(centerX, centerY, 'gifts') },
      { level: 3, obj: this.add.image(centerX, centerY, 'nina') },
      { level: 3, obj: this.add.image(centerX, centerY, 'radio') },
      { level: 4, obj: this.add.image(centerX, centerY, 'reimu') },
      { level: 3, obj: this.add.image(centerX, centerY, 'switch') },
      { level: 2, obj: this.add.image(centerX, centerY, 'table') },
      { level: 2, obj: this.add.image(centerX, centerY, 'tv') },
    ];

    this.input.on('pointermove', (pointer) => {
      this.images.forEach((image) => {
        const newX = centerX + ((pointer.x - centerX) * (0.01 * (6 - image.level)));
        const newY = centerY + ((pointer.y - centerY) * (0.005 * (6 - image.level))) - 20;
        image.obj.setPosition(newX, newY);
      });
    });
  }

  // update() {
  //   this.images.forEach((image) => {
  //     // image.setPosition(image.x + 1, image.y + 1);
  //   });
  // }
}

export default PartyScene;
