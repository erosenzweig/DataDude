import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
import StarField from './scenes/StarField'
import HighScore from './scenes/HighScore'
import GameOver from './scenes/GameOver'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.CANVAS,
	width: 160,
	height: 113,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 400 }
		}
	},
	pixelArt: true,
	scene: [Preloader, Game, StarField, HighScore, GameOver]
}

export default new Phaser.Game(config)
