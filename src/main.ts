import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import StarField from './scenes/StarField'
import GameOver from './scenes/GameOver'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.CANVAS,
	width: 160,
	height: 113,
	scale: {
		mode: Phaser.Scale.NONE
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 400 }
		}
	},
	pixelArt: true,
	scene: [Preloader, Game, StarField, GameOver]
}

export default new Phaser.Game(config)
