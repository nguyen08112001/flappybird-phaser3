import Phaser from "phaser"
import SceneKeys from "~/consts/SceneKeys"
import TextureKeys from "~/consts/TextureKeys"
import AnimationKeys from "../consts/AnimationKeys"

export default class Preloader extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preloader)
    }

    preload() {
        this.load.image(TextureKeys.Background, 'img_background2.png')
        this.load.image(TextureKeys.PipeUp, 'img_pipe_upper.png')
        this.load.image(TextureKeys.PipeDown, 'img_pipe_lower.png')
        this.load.image(TextureKeys.GameOver, 'img_game_over.png')
        this.load.image(TextureKeys.ScoreBoard, 'img_score_board.png')

        this.load.atlas(
            TextureKeys.Bird,
            'bird.png',
            'bird.json'
        )
    }

    create() {

        this.anims.create({
            key: AnimationKeys.BirdFly,
            frames: this.anims.generateFrameNames(TextureKeys.Bird, {
                start: 0,
                end: 7,
                prefix:'bird_',
                suffix: '.png'
            }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: AnimationKeys.BirdFall,
            frames: [{key: TextureKeys.Bird, frame: 'bird_0.png'}],
        })


        this.scene.start(SceneKeys.Game)
    }


}