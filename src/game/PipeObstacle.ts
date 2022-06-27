import Phaser from "phaser"
import TextureKeys from "../consts/TextureKeys"
import Game from "../scenes/Game"
export default class PipeObstacle extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene,x,y)
        scene.add.existing(this)
        // this.setFlipX()
    }
    public setRepeat(){
        this.scene.tweens.add({
            targets: this,
            y: '-=150',
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 3
        });
    }

    public setFlipX() {
        this.scene.tweens.add({
            targets: this,
            angle: -30 ,
            duration: 200,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: 3
        });
    }
}