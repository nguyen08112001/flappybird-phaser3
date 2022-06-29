import Phaser from "phaser"
import TextureKeys from "../consts/TextureKeys"
import Game from "../scenes/Game"
export default class Shield extends Phaser.GameObjects.Container {

    // private ufo! : Phaser.GameObjects.Image
    private shield! : Phaser.GameObjects.Image

    body! : Phaser.Physics.Arcade.Body
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene,x,y)

        this.shield = scene.add.image(0, 0, TextureKeys.Shield)
            .setOrigin(0.5, 0)
            .setScale(0.2)
        this.add(this.shield)
        scene.add.existing(this)
        
        scene.physics.add.existing(this)

        this.body.setCircle(this.body.width*0.8)
        this.body.setOffset(this.body.width*-0.5, 0)

        this.body.setGravityY(0)
        this.body.setAllowGravity(false)
        this.body.setAccelerationY(0)

        // this.setTween2()

    }

    create() {

    }

    setDisable() {
        this.shield.setVisible(false)
        this.body.enable = false
    }
    
    setEnable() {
        this.shield.setVisible(true)
        this.body.enable = true
    }

    setTween() {

        var tween = this.scene.tweens.timeline({

        targets: this,
        loop: 4,

        tweens: [
        {
            x: '-=700',
            ease: 'Sine.easeInOut',
            duration: 2000,
            yoyo: true
        },
        {
            y: '-=100',
            ease: 'Sine.easeOut',
            duration: 1000,
            offset: 0
        },
        {
            y: '-=300',
            ease: 'Sine.easeIn',
            duration: 1000
        },
        {
            y: '-=500',
            ease: 'Sine.easeOut',
            duration: 1000
        },
        {
            y: '-=300',
            ease: 'Sine.easeIn',
            duration: 1000
        }
        ]
        });
    }

    setTween2() {
        this.scene.tweens.add({
            targets: this,
            y: '-=500',
            // x: '-=0',
            ease: 'Sine.easeInOut',
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    }
}