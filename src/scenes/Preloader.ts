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
		this.load.image(TextureKeys.BgBack, 'background/bg_back.png');
		this.load.image(TextureKeys.BgMid, 'background/bg_mid.png');
		this.load.image(TextureKeys.BgGround, 'background/bg_ground.png');
		this.load.image(TextureKeys.BgGroundTop, 'background/bg_groundtop.png');

		this.load.spritesheet(TextureKeys.DataDude, 'character/datadude.png', {frameWidth: 24, frameHeight: 24});
	}

	create()
	{
		this.scene.start(SceneKeys.Game)
	}
}
