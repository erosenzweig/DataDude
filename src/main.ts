import Phaser from 'phaser'

import Preloader from './scenes/Preloader'
import Game from './scenes/Game'
//import GameOver from './scenes/GameOver'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 160,
	height: 113,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: true
		}
	},
	zoom: 5,
	pixelArt: true,
	scene: [Preloader, Game]
}

export default new Phaser.Game(config)
