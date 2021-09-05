import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import GameOver from './scenes/GameOver'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.CANVAS,
	width: 160,
	height: 113,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 400 },
			debug: true
		}
	},
	pixelArt: true,
	scene: [Preloader, Game, GameOver]
}

export default new Phaser.Game(config)
