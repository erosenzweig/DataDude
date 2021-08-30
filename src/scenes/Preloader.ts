import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'
// import AnimationKeys from '../consts/AnimationKeys'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Preloader)
	}

	preload()
	{
		this.load.image(TextureKeys.Background, 'background/background.png');
	}

	create()
	{
		this.scene.start(SceneKeys.Game)
	}
}
