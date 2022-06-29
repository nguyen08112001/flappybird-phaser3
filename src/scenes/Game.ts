import Phaser from "phaser"
import TextureKeys from "../consts/TextureKeys"
import SceneKeys from '../consts/SceneKeys'
import AnimationKeys from "../consts/AnimationKeys"
import Bird from "../game/Bird"
import PipeObstacle from "../game/PipeObstacle"
import PipeUp from "../game/PipeUp"
import PipeDown from "../game/PipeDown"
import ScoreManager from "../game/ScoreManager"
import SoundKeys from "../consts/SoundKeys"
import Ufo from "../game/Ufo"
import UfoBullet from "../game/UfoBullet"
import Shield from "../game/Shield"
// import InputManager from "../inputManager/InputManager"

export default class Game extends Phaser.Scene {
    private background! : Phaser.GameObjects.TileSprite
    private pipes!: Phaser.Physics.Arcade.StaticGroup
    private timer!: Phaser.Time.TimerEvent;
    private bird! : Bird;
    private ufo! : Ufo;
    private ufoBullet!: UfoBullet
    private scoreManager!: ScoreManager
    private shield!: Shield
    // private inputManager!: InputManager
    constructor() {
        super(SceneKeys.Game)
    }

    init() {

    }

    preload() {
        
    }

    create() {
    
        const width = this.scale.width
        const height = this.scale.height

        //create input
        // this.inputManager = new InputManager(this)

        //create background
        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
            .setOrigin(0)
            .setScrollFactor(0, 0)
            .setScale(1)

        
        this.physics.world.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER,
            height
        )

        //create pipe
        this.pipes = this.physics.add.staticGroup()
        this.createPipes(4)
        // this.spawnPipes()

        //create bird
        this.bird = new Bird(this, width*0.5, height*0.5)

        //create ufo
        this.ufo = new Ufo(this, width*1.2, height*0.5)
        this.ufoBullet = new UfoBullet(this, this.ufo.x, this.ufo.y)
        
        //create score
        this.scoreManager = new ScoreManager(this,0,0)

        //create shield
        this.shield = new Shield(this, width, height*0.5)

        //camera
        this.cameras.main.startFollow(this.bird, undefined, undefined, undefined, -500)
        this.cameras.main.setBounds(0 ,0, Number.MAX_SAFE_INTEGER, height)
        
        //start music
        let music = this.sound.add(SoundKeys.Music)
        music.play({
            volume: 0.2,
            loop: true
        })
        
        //loop event
        this.time.addEvent({
            delay: 10000,                // ms
            callback: this.spawnShield,
            //args: [],
            callbackScope: this,
            loop: true
        });

    }

    update(t: number, dt: number) {
        if (this.bird.isDead == true) return
        this.testWrapPipe()
        this.wrapUfoBullet()
        this.increaseScore()
        this.setGameLevel()
        this.setCollide()
        this.background.tilePositionX += 1
    }

    private setCollide() {
        this.physics.add.overlap(
            this.pipes,
            this.bird,
            () => {
                this.setGameOver()
            },
            undefined,
            this
        )
        
        this.physics.add.overlap(
            this.ufoBullet,
            this.bird,
            () => {
                this.setGameOver()
            },
            undefined,
            this
        )
        
        this.physics.add.overlap(
            this.shield,
            this.bird,
            () => {
                // this.bird.body.checkCollision.none = true;
                // this.time.delayedCall(6000, () => {
                //     this.bird.body.checkCollision.none = false;
                //     this.bird.setShield(false)
                //     // this.shield.setDisable
                // }, [], this);  // delay in ms

                
                this.bird.setShield(true)
                this.shield.setDisable()
            },
            undefined,
            this

        )
        
        
            
    }

    private spawnShield() {
        console.log(234)
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width
        this.shield.x = rightEdge
        this.shield.setEnable()
    }

    private wrapUfoBullet() {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        if (this.ufoBullet.x + this.ufoBullet.width < scrollX) {
                this.ufoBullet.x = this.ufo.x
                this.ufoBullet.y = this.ufo.y
                this.ufoBullet.reset()
        }
    }

    private setGameLevel () {
        if (this.scoreManager.getScore() === 5) {
            this.pipes.children.each( child => {
                let pipe = child as PipeObstacle
                    pipe.setRepeat()
            })
        }        
    }

    private increaseScore() {
        this.pipes.children.each( child => {
            let pipe = child as Phaser.Physics.Arcade.Sprite

            if (!pipe.active) return
            if (pipe.x < this.bird.x) {
                pipe.setActive(false)
                this.scoreManager.updateScore(this)
            }
        })
    }
    
    private testWrapPipe() {
        let pair: Phaser.Physics.Arcade.Sprite[] = []

        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        this.pipes.children.each( child => {

            let pipe = child as Phaser.Physics.Arcade.Sprite
            let body = pipe.body as Phaser.Physics.Arcade.StaticBody

            body.position.x = pipe.x + body.offset.x
            body.position.y = pipe.y

            let width = body.width
            if (pipe.x + width < scrollX) {
                
                pair.push(pipe)
                if (pair.length === 2) {
                    
                    let tmp = Phaser.Math.Between(-400, 0)
                    pair[0].x = rightEdge
                    pair[0].y = tmp

                    pair[1].x = rightEdge
                    pair[1].y = tmp + 800

                    pair[0].active = true
                    pair[1].active = true
                    this.physics.add.overlap(
                        pair,
                        this.bird,
                        () => {
                            this.setGameOver()
                        },
                        undefined,
                        this
                    )
                    pair = []
                }    
            }
        })
        
    }

    private createPipes(numpipe: number) {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        let x = rightEdge

        for (let i = 0; i < numpipe; i++) {
            let tmp = Phaser.Math.Between(-400, 0)
            this.addPipe(x,tmp)
            x += this.scale.width / (numpipe-0.2)
        }
        
        
    }

    private addPipe(x: number, y: number) {
        this.pipes.add(
            new PipeUp(this, x, y)
        )
        this.pipes.add(
            new PipeDown(this, x, y + 800)
        )
    }

    private setGameOver() {
        if (this.bird.isDead) return

        if (!this.bird.hasShield) {
            this.bird.kill()
            this.scoreManager.viewScore(this)
            this.sound.pauseAll()
            this.sound.play(SoundKeys.Hit)
            this.sound.play(SoundKeys.Die)
            this.scene.run(SceneKeys.GameOver)
        } else {
            this.bird.body.checkCollision.none = true;
                this.time.delayedCall(500, () => {
                    this.bird.body.checkCollision.none = false;
                    this.bird.setShield(false)
                    // this.shield.setDisable
                }, [], this);  // delay in ms
            this.bird.setShield(false)
            this.shield.setDisable()
        }
    }

}