import Phaser from 'phaser';

const SPRITE_INFO = {
  dancing: { frames: 11, fps: 12 },
  geddan: { frames: 23, fps: 15 },
  specialist: { frames: 33, fps: 14 },
};

export default class Aloupeeps extends Phaser.GameObjects.Container {
  constructor({ scene, x, y, sprite, start = 0, scale = 1, flip = false }) {
    super(scene, -200, -200);
    const { frames: end, fps: frameRate } = SPRITE_INFO[sprite];

    this.sprite = this.scene.add.sprite(x, y, sprite);
    if (scale !== 1) this.sprite.setScale(scale);
    if (flip) this.sprite.setFlipX(true);
    this.add(this.sprite);

    this.sprite.anims.create({
      key: 'default',
      frames: this.sprite.anims.generateFrameNumbers(sprite, { start: 0, end }),
      frameRate,
      repeat: -1,
    });

    this.sprite.playAfterDelay('default', start);

    this.scene.add.existing(this);
  }
}
