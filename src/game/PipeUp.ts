import TextureKeys from '~/consts/TextureKeys';
import Phaser from "phaser"
import PipeObstacle from './PipeObstacle';

export default class PipeUp extends PipeObstacle {
    private gap = 200
    body! : Phaser.Physics.Arcade.StaticBody
    constructor(scene, x: number, y: number) {
        super(scene,x,y)

        const top = scene.add.image(0, 0, TextureKeys.PipeUp)
            .setOrigin(0.5, 0)
            .setScale(3)

        this.add(top)

        scene.physics.add.existing(this, true)

        const body = this.body as Phaser.Physics.Arcade.StaticBody
        const width = top.displayWidth
        const height = top.displayHeight

        body.setSize(width, height)
        body.setOffset(-width*0.5, 0)

        body.position.x = this.x + body.offset.x
        body.position.y = this.y
    }

    
}