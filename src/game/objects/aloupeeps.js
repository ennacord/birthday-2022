import Phaser from 'phaser';

export default class Aloupeeps extends Phaser.GameObjects.Container {
  constructor({ scene, x, y }) {
    super(scene, x, y);

    this.dancing = this.scene.add.sprite(0, 50, 'dancing');
    this.geddan = this.scene.add.sprite(-100, 100, 'geddan');
    this.specialist = this.scene.add.sprite(60, 40, 'specialist');

    this.add([this.dancing, this.geddan, this.specialist]);

    this.dancing.anims.create({
      key: 'default',
      frames: this.dancing.anims.generateFrameNumbers('dancing', { start: 0, end: 11 }),
      frameRate: 12,
      repeat: -1,
    });

    this.geddan.anims.create({
      key: 'default',
      frames: this.geddan.anims.generateFrameNumbers('geddan', { start: 0, end: 23 }),
      frameRate: 15,
      repeat: -1,
    });

    this.specialist.anims.create({
      key: 'default',
      frames: this.specialist.anims.generateFrameNumbers('specialist', { start: 0, end: 33 }),
      frameRate: 14,
      repeat: -1,
    });

    this.dancing.play('default');
    this.geddan.play('default');
    this.specialist.play('default');

    this.scene.add.existing(this);
  }
}
