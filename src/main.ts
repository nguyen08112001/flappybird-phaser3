import Phaser from 'phaser'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'
import Preloader from './scenes/Preloader'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: window.innerWidth-10,
	height: window.innerHeight-20,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 300 },
			debug: true
		}
	},
	scene: [Preloader, Game, GameOver]
}

export default new Phaser.Game(config)
