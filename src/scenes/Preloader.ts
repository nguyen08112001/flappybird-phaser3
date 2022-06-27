import Phaser from "phaser"
import SceneKeys from "../consts/SceneKeys"
import TextureKeys from "../consts/TextureKeys"
import AnimationKeys from "../consts/AnimationKeys"
import SoundKeys from '../consts/SoundKeys'
export default class Preloader extends Phaser.Scene {
    constructor() {
        super(SceneKeys.Preloader)
    }

    preload() {
        this.load.image(TextureKeys.Background, './assets/image/img_background2.png')
        this.load.image(TextureKeys.PipeUp, './assets/image/img_pipe_upper.png')
        this.load.image(TextureKeys.PipeDown, './assets/image/img_pipe_lower.png')
        this.load.image(TextureKeys.GameOver, './assets/image/img_game_over.png')
        this.load.image(TextureKeys.ScoreBoard, './assets/image/img_score_board.png')
        this.load.image(TextureKeys.StartButton, './assets/image/img_start.png')
        this.load.image(TextureKeys.StartButton, './assets/image/img_start.png')
        this.load.image(TextureKeys.Name, './assets/image/img_name.png')
        this.load.image(TextureKeys.Instruction, './assets/image/img_instruction.png')
        this.load.image(TextureKeys.RestartButton, './assets/image/img_restart.png')

        this.load.atlas(
            TextureKeys.Bird,
            './assets/image/bird.png',
            './assets/image/bird.json'
        )

        //load audio
        this.load.audio(SoundKeys.Fly, './assets/sounds/fly.mp3')
        this.load.audio(SoundKeys.Score, './assets/sounds/score.mp3')
        this.load.audio(SoundKeys.Hit, './assets/sounds/hit.mp3')

        this.load.pack('preload', './assets/pack.json', 'preload');
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

        this.scene.start(SceneKeys.GameStart)
    }


}