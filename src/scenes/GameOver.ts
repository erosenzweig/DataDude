import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'

export default class GameOver extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.GameOver)
	}

	preload()
	{
		
	}

	create()
	{
        // this.input.keyboard.once('keydown-SPACE', () => {
        //     // stop the GameOver scene
        //     this.scene.stop(SceneKeys.GameOver)
        
        //     // stop and restart the Game scene
        //     this.scene.stop(SceneKeys.Game)
        //     this.scene.start(SceneKeys.Game)
        // });
	}
}
