import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';
import Phaser from "phaser"

export default class UfoBullet extends Phaser.GameObjects.Container {
    private bullet!: Phaser.GameObjects.Sprite
    body! : Phaser.Physics.Arcade.Body

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)
        
        this.bullet = scene.add.sprite(0, 0, TextureKeys.EnemyBullet)
            .setOrigin(0.5, 0)
            .setScale(0.1)
            .setFlipX(true)
            .play(AnimationKeys.UfoBullet)
        this.add(this.bullet)

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.bullet.displayWidth*0.5, this.bullet.displayHeight*0.7)
        this.body.setOffset(this.bullet.displayWidth*-0.5, -this.bullet.displayHeight+50)
        this.body.setAllowGravity(false)
        this.body.setCollideWorldBounds(true)

        this.body.setVelocityX(-100)
        this.body.setAccelerationX(-1000)
    }

    preUpdate() {
    }

    reset() {
        this.body.setVelocityX(-100)
    }
} 