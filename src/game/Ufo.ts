import Phaser from "phaser"
import TextureKeys from "../consts/TextureKeys"
import Game from "../scenes/Game"
import UfoBullet from "./UfoBullet"
export default class Ufo extends Phaser.GameObjects.Container {

    // private ufo! : Phaser.GameObjects.Image
    private ufo! : Phaser.GameObjects.Image

    body! : Phaser.Physics.Arcade.Body
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene,x,y)
        
        // this.setFlipX()

        this.ufo = scene.add.image(0, 0, TextureKeys.Ufo)
            .setOrigin(0.5, 0)
            .setScale(0.2)
            // .setScrollFactor(0)
        this.add(this.ufo)
        scene.add.existing(this)
        
        scene.physics.add.existing(this)
        // this.body.setSize(this.ufo.displayWidth, this.ufo.displayHeight)
        // this.body.setOffset(this.ufo.displayWidth*-0.5, -this.ufo.displayHeight+100)

        // this.body.setCollideWorldBounds(true)

        this.body.setVelocityX(300)
        this.body.setGravityY(0)
        this.body.setAllowGravity(false)
        this.body.setAccelerationY(0)

        this.setRepeat()
    }

    create() {

    }


    public setRepeat(){
        this.scene.tweens.add({
            targets: this,
            y: '-=200',
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }

}