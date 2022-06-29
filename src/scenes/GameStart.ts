import SceneKeys  from '../consts/SceneKeys';
import Phaser from "phaser"
import TextureKeys from '../consts/TextureKeys';
import ScoreManager from '../game/ScoreManager';

export default class GameStart extends Phaser.Scene {
    private background! : Phaser.GameObjects.TileSprite
    constructor() {
        super(SceneKeys.GameStart)
    }

    create() {
        const width = this.scale.width
        const height = this.scale.height

        

        
        this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
            .setOrigin(0)
            .setScrollFactor(0, 0)
            .setScale(1)

        // this.add.image(this.scale.width/2, this.scale.height / 5,TextureKeys.Name)
        //     .setOrigin(0.5)
        //     .setScale(5)

            this.tweens.add({
                targets: [
                this.add.image(this.scale.width/2, this.scale.height / 5,TextureKeys.Name)
                .setOrigin(0.5)
                .setScale(5), 

                this.add.image(this.scale.width/2, this.scale.height / 2,TextureKeys.Instruction)
                .setOrigin(0.5)
                .setScale(5),

                
                
            ],
                scaleX: 1,
                scaleY: 1,
                angle: 180,
                _ease: 'Sine.easeInOut',
                ease: 'Power2',
                duration: 1000,
                // delay: 5 * 50,
                repeat: -1,
                yoyo: true,
                hold: 1000,
                repeatDelay: 1000
            });
            
            this.add.image(this.scale.width/2, this.scale.height / 1.2,TextureKeys.StartButton)
                .setOrigin(0.5)
                .setScale(1)

        // this.add.image(this.scale.width/2, this.scale.height / 2,TextureKeys.Instruction)
        //     .setOrigin(0.5)
        //     .setScale(5)
            
        

            this.input.keyboard.once('keydown-SPACE', () => {
                console.log(123)
                this.scene.start(SceneKeys.Game)
            })
    }

    preUpdate() {
        
    }
}