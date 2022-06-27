import TextureKeys from '../consts/TextureKeys';
import Phaser from "phaser"
import PipeObstacle from './PipeObstacle';

export default class PipeDown extends PipeObstacle {
    private gap = 200
    body! : Phaser.Physics.Arcade.StaticBody
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene,x,y)

        const bottom = scene.add.image(0, 0, TextureKeys.PipeDown)
            .setOrigin(0.5, 0)
            .setScale(2)
            .setDisplaySize(50, 500)

        this.add(bottom)

        scene.physics.add.existing(this, true)

        const body = this.body as Phaser.Physics.Arcade.StaticBody
        const width = bottom.displayWidth
        const height = bottom.displayHeight

        body.setSize(width, height)
        body.setOffset(-width*0.5, 0)

        body.position.x = this.x + body.offset.x
        body.position.y = this.y
    }

    
}