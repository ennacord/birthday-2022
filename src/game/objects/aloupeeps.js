import Phaser from 'phaser';

export default class Aloupeeps extends Phaser.GameObjects.Container {
  constructor({ scene, x, y, sprite, frames: end, fps: frameRate, scale = 1, flip = false }) {
    super(scene, -200, -200);

    this.sprite = this.scene.add.sprite(x, y, sprite);
    if (scale !== 1) this.sprite.setScale(scale);
    if (flip) this.sprite.setScale(-scale, scale);
    this.add(this.sprite);

    this.sprite.anims.create({
      key: 'default',
      frames: this.sprite.anims.generateFrameNumbers(sprite, { start: 0, end }),
      frameRate,
      repeat: -1,
    });

    this.sprite.play('default');

    this.scene.add.existing(this);
  }
}
