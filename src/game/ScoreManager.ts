import Phaser from "phaser"

export default class ScoreManager extends Phaser.GameObjects.Container {
    body! : Phaser.Physics.Arcade.Body
    private best: number = Number.parseInt(localStorage.getItem('best') as string, 10) || 0;
    private value: number;
    private scoreLabel!: Phaser.GameObjects.Text

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene,x,y)
        scene.add.existing(this)
        this.value = 0;
        this.scoreLabel = scene.add.text(10, 10, 'Score: ' + this.value, {
            fontSize: '50px',
            color: '#080808',
            backgroundColor: '#F8E71C',
            shadow: { fill: true, blur: 0, offsetY: 0 },
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
            .setScrollFactor(0)
    }

    preload() {

    }

    create() {
        
    }

    public updateScore(scene: Phaser.Scene) {
        this.value += 0.5
        this.scoreLabel.text = 'Score: ' + this.value
        this.best = Math.max(this.value, this.best)
        localStorage.setItem('best', this.best + '')
    }
    
    public viewScore(scene: Phaser.Scene) {
        this.scoreLabel.destroy()

        scene.add.text(600,500, 'Score: ' + this.value +'\nBest: ' + this.best, {
            fontSize: '50px',
            color: '#080808',
            backgroundColor: '#F8E71C',
            shadow: { fill: true, blur: 0, offsetY: 0 },
            align: 'center',
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        })
            .setScrollFactor(0)
    } 

    public reset() {
        this.value = 0
    }

    public getScore() {
        return this.value
    }
}