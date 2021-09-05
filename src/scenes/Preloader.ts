import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'
import AudioKeys from '~/consts/AudioKeys';

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super(SceneKeys.Preloader)
	}

	preload()
	{
		this.load.image(TextureKeys.BgMid, 'background/bg_mid.png');
		this.load.image(TextureKeys.BgBack, 'background/bg_back.png');
		this.load.image(TextureKeys.BgGround, 'background/bg_ground.png');
		this.load.image(TextureKeys.BgGroundTop, 'background/bg_groundtop.png');

		this.load.image(TextureKeys.DataGood, 'data/data_good.png');
		this.load.image(TextureKeys.DataCorrupt, 'data/data_corrupt.png');

		this.load.spritesheet(TextureKeys.DataDudeRun, 'character/datadude_run.png', {frameWidth: 24, frameHeight: 24});
		this.load.spritesheet(TextureKeys.DataDudeJump, 'character/datadude_jump.png', {frameWidth: 24, frameHeight: 24});

		this.load.audio(AudioKeys.Stage1, 'music/stage1.wav');
	}

	create()
	{

		this.scene.start(SceneKeys.Game);
	}
}
