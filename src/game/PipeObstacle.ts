import Phaser from "phaser"
import TextureKeys from "~/consts/TextureKeys"
import Game from "~/scenes/Game"
export default class PipeObstacle extends Phaser.GameObjects.Container {
    private isrepeat: boolean
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene,x,y)
        scene.add.existing(this)
        // this.setRepeat()
        this.isrepeat = false
    }
    public setRepeat(){
        if (this.isrepeat) return
        this.scene.tweens.add({
            targets: this,
            y: '-=80',
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 3
        });
        this.isrepeat = true
    }
}