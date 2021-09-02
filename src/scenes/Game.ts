import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'

export default class Game extends Phaser.Scene
{
	player: Phaser.Physics.Arcade.Sprite;
	ground: Phaser.Physics.Arcade.StaticGroup;
	cursors: Phaser.Types.Input.Keyboard.CursorKeys;
	cam: Phaser.Cameras.Scene2D.Camera;

	grounded: boolean;
	
	speed: number;
	jumpForce: number;
	
	constructor()
	{
		super(SceneKeys.Game);
		this.speed = 3;
		this.jumpForce = 4;
		this.grounded = false;
	}

	preload()
	{
		this.cam = this.cameras.main;

		this.load.image(TextureKeys.BgMid, 'background/bg_mid.png');
		this.load.image(TextureKeys.BgBack, 'background/bg_back.png');
		this.load.image(TextureKeys.BgGround, 'background/bg_ground.png');
		this.load.image(TextureKeys.BgGroundTop, 'background/bg_groundtop.png');

		this.load.image(TextureKeys.DataGood, 'data/data_good.png');
		this.load.image(TextureKeys.DataCorrupt, 'data/data_corrupt.png');

		this.load.spritesheet(TextureKeys.DataDudeRun, 'character/datadude_run.png', {frameWidth: 24, frameHeight: 24});
		this.load.spritesheet(TextureKeys.DataDudeJump, 'character/datadude_jump.png', {frameWidth: 24, frameHeight: 24});

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	create()
	{
		const width = this.scale.width;
		const height = this.scale.height;

		this.createBackground(this, width, height);
		const ground = this.createPlatforms(this, width, height);

		this.player = this.createPlayer();

		this.physics.world.setBounds(0, 0, width, height);

		this.physics.add.collider(this.player, ground);

		// account for 3x screens at zoom factor
		this.cameras.main.setBounds(0, 0, width * 4 * 3, height);
	}

	createBackground(scene, width, height)
	{
		const bgBack = this.add.image(0, height, TextureKeys.BgBack).setOrigin(0, 1).setScrollFactor(0.02);
		this.add.image(bgBack.width, height, TextureKeys.BgBack).setOrigin(0, 1).setScrollFactor(0.02);
		this.add.image(bgBack.width * 2, height, TextureKeys.BgBack).setOrigin(0, 1).setScrollFactor(0.02);

		const bgMid = this.add.image(0, height, TextureKeys.BgMid).setOrigin(0, 1).setScrollFactor(0.15);
		this.add.image(bgMid.width, height, TextureKeys.BgMid).setOrigin(0, 1).setScrollFactor(0.15);
		this.add.image(bgMid.width * 2, height, TextureKeys.BgMid).setOrigin(0, 1).setScrollFactor(0.15);
	}

	createPlatforms(scene, width, height)
	{
		const bgGround = this.add.image(0, height, TextureKeys.BgGround).setOrigin(0, 1).setScrollFactor(0.5);
		this.add.image(bgGround.width, height, TextureKeys.BgGround).setOrigin(0, 1).setScrollFactor(0.5);
		this.add.image(bgGround.width * 2, height, TextureKeys.BgGround).setOrigin(0, 1).setScrollFactor(0.5);

		const bgGroundTop = this.add.image(0, height - 18, TextureKeys.BgGroundTop).setOrigin(0, 1).setScrollFactor(0.5);
		this.add.image(bgGroundTop.width, height - 18, TextureKeys.BgGroundTop).setOrigin(0, 1).setScrollFactor(0.5);
		this.add.image(bgGroundTop.width * 2, height - 18, TextureKeys.BgGroundTop).setOrigin(0, 1).setScrollFactor(0.5);

		const ground = this.physics.add.staticGroup();

		ground.add(bgGround, false);
		ground.add(bgGroundTop, false);

		return ground;
	}

	createPlayer()
	{
		const player = this.physics.add.sprite(50, 0, TextureKeys.DataDudeRun);
		player.setCollideWorldBounds(true);

		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNames(TextureKeys.DataDudeRun, {start: 0, end: 6}),
			frameRate: 12,
			repeat: -1
		});

		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNames(TextureKeys.DataDudeJump, {start: 0, end: 0}),
			frameRate: 12,
			repeat: -1
		})

		return player;
	}

	update(t: number, dt: number)
	{
		this.grounded = this.player.body.touching.down;

		if (this.cursors.space.isDown && this.grounded)
		{
			this.player.setVelocityY(-100);
			this.player.anims.play('jump', true);
		}
		else if(!this.cursors.left?.isDown && !this.cursors.right?.isDown)
		{
			this.player.setVelocityX(0);
			if(!this.grounded)
				this.player.anims.play('jump', true);
			else{
				this.player.anims.play('run', true);
				this.player.anims.stop();
			}
		}
		else if(this.cursors.left?.isDown)
		{
			this.player.setVelocityX(-50);
			this.player.flipX = true;
			if(this.grounded)
				this.player.anims.play('run', true);
		}
		else if (this.cursors.right?.isDown)
		{
			this.player.flipX = false;
			this.player.setVelocityX(50);
			if(this.grounded)
				this.player.anims.play('run', true);
		}
	}
}
