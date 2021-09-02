import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'

export default class Game extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Game)
	}

	preload()
	{
		this.load.image(TextureKeys.BgMid, 'background/bg_mid.png');
		this.load.image(TextureKeys.BgBack, 'background/bg_back.png');
		this.load.image(TextureKeys.BgGround, 'background/bg_ground.png');
		this.load.image(TextureKeys.BgGroundTop, 'background/bg_groundtop.png');

		this.load.spritesheet(TextureKeys.DataDude, 'character/datadude.png', {frameWidth: 24, frameHeight: 24});

		// this.anims.create({
		// 	key: 'run',
		// 	frames: this.anims.generateFrameNames(TextureKeys.DataDude, {start: 0, end: 6}),
		// 	frameRate: 12,
		// 	repeat: -1
		// });

		// this.player = this.physics.add.sprite(200, 200, TextureKeys.DataDude);
	}

	create()
	{
		const width = this.scale.width;
		const height = this.scale.height;

		var bgBack = this.add.image(width / 2, height / 2, TextureKeys.BgBack);
		var bgMid = this.add.image(width / 2, height / 2, TextureKeys.BgMid);
		var bgGround = this.add.image(width / 2, height / 2, TextureKeys.BgGround);
		var bgGroundTop = this.add.image(width / 2, height / 2, TextureKeys.BgGroundTop);
		
		//this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55);
	}

	update(t: number, dt: number)
	{
		
	}
}
