import Phaser from "phaser"
import SoundKeys from "../consts/SoundKeys";

export default class ScoreManager extends Phaser.GameObjects.Container {
    body! : Phaser.Physics.Arcade.Body
    private best: number = Number.parseInt(localStorage.getItem('best') as string, 10) || 0;
    private value: number;
    private scoreLabel!: Phaser.GameObjects.Text
    private scoreSound!: Phaser.Sound.BaseSound
    private titleBitmapText!: Phaser.GameObjects.BitmapText;
    private playBitmapText!: Phaser.GameObjects.BitmapText;
    private displayWidthh: number
    private displayHeightt: number
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene,x,y)
        scene.add.existing(this)
        this.displayWidthh = scene.scale.width
        this.displayHeightt = scene.scale.height
        this.value = 0;
        // this.scoreLabel = scene.add.text(10, 10, '' + this.value, {
        //     fontSize: '50px',
        //     color: '#080808',
        //     backgroundColor: '#F8E71C',
        //     shadow: { fill: true, blur: 0, offsetY: 0 },
        //     padding: { left: 15, right: 15, top: 10, bottom: 10 }
        // })
            // .setScrollFactor(0)

        this.scoreSound = scene.sound.add(SoundKeys.Score)
    
        this.titleBitmapText = scene.add.bitmapText(
            0,
            200,
            'font',
            'SCORE: 0',
            30
        ).setScrollFactor(0)
        this.titleBitmapText.x = this.getCenterXPositionOfBitmapText(
            this.titleBitmapText.width
        );

    }

    preload() {

    }

    create() {
        
    }

    public updateScore(scene: Phaser.Scene) {
        this.scoreSound.play()
        this.value += 0.5
        // this.scoreLabel.text = 'Score: ' + this.value
        this.titleBitmapText.text = 'SCORE: ' + this.value
        this.best = Math.max(this.value, this.best)
        localStorage.setItem('best', this.best + '')
    }
    
    public viewScore(scene: Phaser.Scene) {
        // this.titleBitmapText.destroy()

        // scene.add.text(scene.scale.width/2, scene.scale.height / 5 + 200, 'Score: ' + this.value +'\nBest: ' + this.best, {
        //     fontSize: '50px',
        //     color: '#080808',
        //     backgroundColor: '#F8E71C',
        //     shadow: { fill: true, blur: 0, offsetY: 0 },
        //     align: 'center',
        //     padding: { left: 15, right: 15, top: 10, bottom: 10 }
        // })
        //     .setOrigin(0.5, 0)
        //     .setScrollFactor(0)

        scene.add.bitmapText(
            scene.scale.width/3, scene.scale.height / 5 + 200,
                'font',
                'SCORE: ' + this.value +'\nBEST: ' + this.best,
                30
            ).setScrollFactor(0)
            .setOrigin(0.5, 0)
            
        scene.add.bitmapText(
            scene.scale.width/1.5, scene.scale.height / 1.5,
                'font',
                'STUPID BOY',
                70
            ).setScrollFactor(0)
            .setOrigin(0.5, 0)
    } 

    public reset() {
        this.value = 0
    }

    public getScore() {
        return this.value
    }

    private getCenterXPositionOfBitmapText(width: number): number {
        return this.displayWidthh / 2 - width / 2;
    }
}