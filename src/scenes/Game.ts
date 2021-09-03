import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'

export default class Game extends Phaser.Scene
{
	// create the background class property
	bgBack!: Phaser.GameObjects.TileSprite
	bgMid!: Phaser.GameObjects.TileSprite
	bgGround!: Phaser.GameObjects.TileSprite
	bgGroundTop!: Phaser.GameObjects.TileSprite

	player!: Phaser.Physics.Arcade.Sprite;
	ground!: Phaser.Physics.Arcade.StaticGroup;
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
	cam!: Phaser.Cameras.Scene2D.Camera;

	grounded: boolean;
	
	speed: number;
	jumpForce: number;
	
	constructor()
	{
		super(SceneKeys.Game);
		this.speed = 50;
		this.jumpForce = -100;
		this.grounded = false;
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

		this.cursors = this.input.keyboard.createCursorKeys();
	}

	create()
	{
		const width = this.scale.width;
		const height = this.scale.height;
		
		// Add Background to Scene
		this.bgBack = this.add.tileSprite(0, 0, width, height, TextureKeys.BgBack).setScrollFactor(0).setOrigin(0, 0);
		this.bgMid = this.add.tileSprite(0, 0, width, height, TextureKeys.BgMid).setScrollFactor(0).setOrigin(0, 0);

		// Create player instance and add physics collision with ground
		this.player = this.createPlayer();
		
		// Create Platforms
		this.bgGround = this.add.tileSprite(0, height - 25, width, 25, TextureKeys.BgGround).setScrollFactor(0).setOrigin(0, 0);
		this.bgGroundTop = this.add.tileSprite(0, height - 25, width, 7, TextureKeys.BgGroundTop).setScrollFactor(0).setOrigin(0, 0);

		// Follow player on start
		this.cam = this.cameras.main;
		this.cam.startFollow(this.player);

		// Set world and camera bounds
		this.cam.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
		this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height);
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

	scrollBackground(scrollX: number)
	{
		this.bgBack.setTilePosition(scrollX * 0.02);
		this.bgMid.setTilePosition(scrollX * 0.2);
		this.bgGround.setTilePosition(scrollX * 0.5);
		this.bgGroundTop.setTilePosition(scrollX * 0.5);
	}

	update(t: number, dt: number)
	{
		this.scrollBackground(this.cam.scrollX);

		this.grounded = this.player.body.touching.down;

		if (this.cursors.space.isDown && this.grounded)
		{
			this.player.setVelocityY(this.jumpForce);
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
			this.player.setVelocityX(-this.speed);
			this.player.flipX = true;
			if(this.grounded)
				this.player.anims.play('run', true);
		}
		else if (this.cursors.right?.isDown)
		{
			this.player.flipX = false;
			this.player.setVelocityX(this.speed);
			if(this.grounded)
				this.player.anims.play('run', true);
		}
	}
}
