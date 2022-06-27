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
// import InputManager from "../inputManager/InputManager"

export default class Game extends Phaser.Scene {
    private background! : Phaser.GameObjects.TileSprite
    private pipes!: Phaser.Physics.Arcade.StaticGroup
    private timer!: Phaser.Time.TimerEvent;
    public bird! : Bird;
    private scoreManager!: ScoreManager
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
            .setScale(2)

        
        this.physics.world.setBounds(
            0, 0,
            Number.MAX_SAFE_INTEGER,
            height
        )

        //create pipe
        this.pipes = this.physics.add.staticGroup()
        this.createPipes()
        // this.spawnPipes()

        //create bird
        this.bird = new Bird(this, width*0.5, height*0.5)


        //create score
        this.scoreManager = new ScoreManager(this,0,0)


        //camera
        this.cameras.main.startFollow(this.bird, undefined, undefined, undefined, -500)
        this.cameras.main.setBounds(0 ,0, Number.MAX_SAFE_INTEGER, height)

        this.physics.add.overlap(
            this.pipes,
            this.bird,
            () => {
                this.setGameOver()
            },
            undefined,
            this
        )

            
    }

    update(t: number, dt: number) {
        // this.wrapPipe()
        this.testWrapPipe()
        this.increaseScore()
        this.setPipeLevel()
        // this.background.setTilePosition(this.cameras.main.scrollX)
        this.background.tilePositionX += 1
    }

    private setPipeLevel() {
        this.pipes.children.each( child => {
            let pipe = child as PipeObstacle
            if (this.scoreManager.getScore() === 0) {
                pipe.setRepeat()
            }
            // if (this.scoreManager.getScore() === 3)
                // pipe.setFlipX()
            
        })
    }

    private increaseScore() {
        this.pipes.children.each( child => {
            let pipe = child as Phaser.Physics.Arcade.Sprite
            if (pipe.x < this.bird.x && this.bird.x < pipe.x + 5) {
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

    // private wrapPipe() {
    //     let pair: any[] = []
    //     const scrollX =  this.cameras.main.scrollX
    //     const rightEdge = scrollX + this.scale.width
        
    //     this.pipes.children.each( child => {
    //         const pipe = child as Phaser.Physics.Arcade.Sprite

    //         if (pipe.x + pipe.width < scrollX) {
    //             pair.push(pipe)
    //             if (pair.length === 2) {
    //                 let tmp = Phaser.Math.Between(-200, this.scale.height - 600)
    //                 pair[0].x = rightEdge
    //                 pair[0].y = tmp

    //                 pair[1].x = rightEdge
    //                 pair[1].y = tmp + 800
    //                 pair = []
    //             }
    //         }
    //         const body = pipe.body as Phaser.Physics.Arcade.StaticBody
    //         body.enable = true
    //         body.updateFromGameObject()


    //     })
    // }

    private createPipes() {
        const scrollX = this.cameras.main.scrollX
        const rightEdge = scrollX + this.scale.width

        let x = rightEdge

        for (let i = 0; i < 3; i++) {
            let tmp = Phaser.Math.Between(-400, 0)
            this.addPipe(x,tmp)
            x += this.scale.width / 2.8
        }
        
        
    }

    // private spawnPipes() {
    //     const scrollX = this.cameras.main.scrollX
    //     const rightEdge = scrollX + this.scale.width

    //     let x = rightEdge

    //     for (let i = 0; i < 4; i++) {
    //         const pipeUp =  this.pipes.get(
    //             x,
    //             Phaser.Math.Between(-200, this.scale.height -600),
    //             TextureKeys.PipeUp
    //         ) as Phaser.Physics.Arcade.Sprite
    //         pipeUp.setScale(3)
    //         // this.pipes.create
    //         const pipeDown =  this.pipes.get(
    //             x,
    //             pipeUp.y + pipeUp.displayHeight + 300,
    //             TextureKeys.PipeDown
    //         ) as Phaser.Physics.Arcade.Sprite
    //         pipeDown.setScale(3)

    //         pipeUp.setVisible(true)
    //         pipeUp.setActive(true)
            
    //         pipeDown.setVisible(true)
    //         pipeDown.setActive(true)

    //         const body1 = pipeUp.body as Phaser.Physics.Arcade.StaticBody
    //         body1.enable = true
    //         body1.updateFromGameObject()
            
    //         const body2 = pipeDown.body as Phaser.Physics.Arcade.StaticBody
    //         body2.enable = true
    //         body2.updateFromGameObject()

    //         x += pipeUp.width + this.scale.width / 4.2
    //     }
    // }

    private addPipe(x: number, y: number) {
        this.pipes.add(
            new PipeUp(this, x, y)
        )
        this.pipes.add(
            new PipeDown(this, x, y + 800)
        )
    }

    private setGameOver() {
        this.bird.kill()
        this.scoreManager.viewScore(this)
        this.scene.run(SceneKeys.GameOver)
    }
}