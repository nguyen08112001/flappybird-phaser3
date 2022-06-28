import SceneKeys  from '../consts/SceneKeys';
import Phaser from "phaser"
import TextureKeys from '../consts/TextureKeys';
import ScoreManager from '../game/ScoreManager';

export default class GameOver extends Phaser.Scene {
    constructor() {
        super(SceneKeys.GameOver)
    }

    create() {
        this.add.image(this.scale.width/3, this.scale.height / 5,TextureKeys.GameOver)
            .setOrigin(0.5, 0)
            .setScale(5)
        this.add.image(this.scale.width/3, this.scale.height / 1.5 ,TextureKeys.RestartButton)
            .setOrigin(0.5, 0)
            .setScale(3)
        this.add.image(this.scale.width/1.5, this.scale.height / 5 ,TextureKeys.TrollFace)
            .setOrigin(0.5, 0)
            .setScale(0.3)
        
            this.input.keyboard.once('keydown-SPACE', () => {
                this.scene.stop(SceneKeys.GameOver)
                this.scene.stop(SceneKeys.Game)
                this.scene.stop(SceneKeys.GameStart)
                this.scene.start(SceneKeys.GameStart)
            })
            
    }
    update() {
        
    }
}