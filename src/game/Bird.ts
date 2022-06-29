import TextureKeys from '../consts/TextureKeys';
import AnimationKeys from '../consts/AnimationKeys';
import Phaser from "phaser"
import SceneKeys from '../consts/SceneKeys';
import SoundKeys from '../consts/SoundKeys';
enum BirdState {
    Running,
    Killed,
    Dead
}
export default class Bird extends Phaser.GameObjects.Container {
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private bird!: Phaser.GameObjects.Sprite
    body!: Phaser.Physics.Arcade.Body
    private flySound: Phaser.Sound.BaseSound
    private hitSound: Phaser.Sound.BaseSound
    private shield!: any
    //variable
    public isDead: boolean;
    public hasShield: boolean;
    private isFlapping: boolean;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y)

        this.bird = scene.add.sprite(0, 0, TextureKeys.Bird)
            .setOrigin(0.5, 0.5)
            .play(AnimationKeys.BirdFly)
            .setScale(0.6)
        this.add(this.bird)

        this.isDead = false;
        this.isFlapping = false;
        this.hasShield = false

        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.bird.width * 0.5, this.bird.height * 0.5)
        this.body.setOffset(this.bird.width * -0.5 + 50, -this.bird.height + 100)
        this.body.setGravityY(1500)

        this.cursors = scene.input.keyboard.createCursorKeys()
        this.body.setCollideWorldBounds(true)

        this.body.setVelocityX(300)

        //set up shield
        this.shield = this.scene.add.sprite(0, 0, TextureKeys.Shield)
            .setOrigin(0.5, 0.5)
            .setScale(0.2)
        this.add(this.shield)

        this.setShield(false)

        this.flySound = scene.sound.add(SoundKeys.Fly)
        this.hitSound = scene.sound.add(SoundKeys.Hit)

    }

    preUpdate() {
        if (this.isDead) return

        if (this.angle < 90) {
            this.angle += 2;
        }

        if (this.cursors.space?.isDown && !this.isDead) {
            this.flap()
        }
        else {
            // this.bird.play(AnimationKeys.BirdFall, true)
        }

        if (this.body.blocked.down) {
            // this.kill()
        }
        else if (this.body.velocity.y > 400) {
            this.bird.play(AnimationKeys.BirdFall, true)
        }
    }

    kill() {
        // if (this.hasShield) {
        //     this.setShield(false)
        // }
        this.hitSound.play()
        this.isDead = true
        this.body.setVelocityX(0)
        this.scene.tweens.add({
            targets: this.bird,
            // scaleX: 1,
            // scaleY: 1,
            angle: -180,
            _ease: 'Sine.easeInOut',
            ease: 'Power2',
            duration: 1000,
            delay: 5 * 50,
            repeat: 0,
            // yoyo: true,
            hold: 1000,
            repeatDelay: 1000
        });
        this.bird.play(AnimationKeys.BirdFall, true)
    }

    flap() {
        this.flySound.play()
        this.body.setVelocityY(-600)
        this.body.setAccelerationY(-100)
        this.scene.tweens.add({
            targets: this,
            props: { angle: -30 },
            duration: 100,
            ease: 'Power0'
        });
        this.bird.play(AnimationKeys.BirdFly, true)
    }

    setShield(hasShield: boolean) {
        if (hasShield === true) {
            this.hasShield = true;
            this.shield.setVisible(true)
        } else {
            this.hasShield = false;
            this.shield.setVisible(false)
        }
    }
}