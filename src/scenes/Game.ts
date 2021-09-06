import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'
import AudioKeys from '../consts/AudioKeys';

export default class Game extends Phaser.Scene
{
	// Scenery (backgrounds and ground planes)
	bgBack!: Phaser.GameObjects.TileSprite;
	bgMid!: Phaser.GameObjects.TileSprite;
	bgGround!: Phaser.GameObjects.TileSprite;
	bgGroundTop!: Phaser.GameObjects.TileSprite;
	player!: Phaser.Physics.Arcade.Sprite;
	ground!: Phaser.Physics.Arcade.StaticGroup;
	groundZone!: Phaser.GameObjects.Zone;

	spawnables!: Phaser.Physics.Arcade.StaticGroup;

	// Score
	scoreLabel!: Phaser.GameObjects.Text;
	score!: number;

	// Timers
	spawnTimer!: Phaser.Time.TimerEvent;
	scoreTimer!: Phaser.Time.TimerEvent;
	
	// Music
	music!: Phaser.Sound.BaseSound;

	// Basic Keyboard Input 
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

	// Camera
	cam!: Phaser.Cameras.Scene2D.Camera;
	camOffsetX!: number;
	
	// Player States
	grounded!: boolean;
	
	// Player Movement Parameters
	speed!: number;
	jumpForce!: number;

	// Scale Factor
	scaleFactor!: number;
	
	// Progression
	speedMultiplier!: number;

	constructor()
	{
		super(SceneKeys.Game);
	}

	create()
	{
		this.speed = 150;   
		this.jumpForce = -350;   
		this.grounded = false;
		this.camOffsetX = -175;
		this.score = 0;
		this.scaleFactor = 5;
		this.speedMultiplier = 1;

		const width = 160;
		const height = 113;
		
		// Add Background to Scene
		this.bgBack = this.add.tileSprite(0, 0, width, height, TextureKeys.BgBack).setScrollFactor(0).setOrigin(0, 0).setScale(this.scaleFactor, this.scaleFactor);
		this.bgMid = this.add.tileSprite(0, 0, width, height, TextureKeys.BgMid).setScrollFactor(0).setOrigin(0, 0).setScale(this.scaleFactor, this.scaleFactor);
		
		// Create player instance and add physics collision with ground
		this.player = this.createPlayer();
		this.player.setPosition(30, 250);

		// Player Input
		this.cursors = this.input.keyboard.createCursorKeys();
		
		// Create Platforms
		this.bgGround = this.add.tileSprite(0, height*this.scaleFactor - 125, width, 25, TextureKeys.BgGround).setScrollFactor(0).setOrigin(0, 0).setScale(this.scaleFactor, this.scaleFactor);
		this.bgGroundTop = this.add.tileSprite(0, height*this.scaleFactor - 125, width, 7, TextureKeys.BgGroundTop).setScrollFactor(0).setOrigin(0, 0).setScale(this.scaleFactor, this.scaleFactor);

		// Added a stationary Zone for ground collision with infinitely scrolling tileSprite
		this.groundZone = this.add.zone(0, 600, width*5, height*5 ).setOrigin(0, 0);
		this.physics.add.existing(this.groundZone);
		this.groundZone.body.allowGravity = false;
		this.groundZone.body.immovable = true;

		// Start music
		this.music = this.sound.add(AudioKeys.Stage1, {
			mute: false,
			volume: 0.5,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: true,
			delay: 0
		});
		this.music.play();

		// Follow player on start
		this.cam = this.cameras.main;
		this.cam.startFollow(this.player, undefined, undefined, undefined, this.camOffsetX);

		// Set world and camera bounds
		this.cam.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height*this.scaleFactor);
		this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height*this.scaleFactor);
		this.scale.setGameSize(width * this.scaleFactor, height * this.scaleFactor);

		// Spawnables (needs cam above)
		this.spawnables = this.physics.add.staticGroup();
		this.spawnables.scaleXY(this.scaleFactor, this.scaleFactor);
		this.initSpawnables();

		// UI
		this.scoreLabel = this.add.text(10, 10, `Score: ${this.score}`, {
			fontSize: "40px",
			color: "#081820"
		}).setScrollFactor(0);

		// Timers
		this.spawnTimer = this.time.addEvent({
			delay: 3000,
			callback: this.objectSpawner,
			callbackScope: this,
			loop: true
		});

		this.scoreTimer = this.time.addEvent({
			delay: 1000,
			callback: () => { 
				this.score += 1; 
				this.scoreLabel.setText(`Score: ${this.score}`); 
			},
			callbackScope: this,
			loop: true
		});

		// Add collisions
		this.physics.add.overlap(
			this.spawnables,
			this.player,
			this.onSpawnableOverlap,
			undefined,
			this
		);

		this.physics.add.collider(this.player, this.groundZone, () => { this.grounded = true });
	}

	initSpawnables()
	{
		this.spawnables.clear(true, true);
	}

	onSpawnableOverlap(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject)
	{
		const sp = obj2 as Phaser.Types.Physics.Arcade.ImageWithStaticBody;
		
		// if hit good data, increase score, else if hit bad data, die.
		if(obj2.texture.key === TextureKeys.DataGood) {
			this.speedMultiplier += 0.005;
			this.score = Phaser.Math.CeilTo(100 + this.score * this.speedMultiplier, 0);
			this.speed = this.speed * this.speedMultiplier;
			this.scoreLabel.setText(`Score: ${this.score}`);
		}
		else if(obj2.texture.key === TextureKeys.DataCorrupt) {
			this.music.destroy();
			this.scene.launch(SceneKeys.StarField);
			this.scene.start(SceneKeys.GameOver, {score: this.score});
		}

		this.spawnables.killAndHide(sp);
		sp.body.enable = false;
		obj2.destroy();
	}
	
	objectSpawner()
	{ 
		var randomType = (Phaser.Math.Between(0, 1) == 1) ? TextureKeys.DataGood: TextureKeys.DataCorrupt;
		var sp = this.physics.add.staticImage(this.cam.scrollX + Phaser.Math.Between(650, 850), this.scale.height - 180, randomType).setScale(this.scaleFactor, this.scaleFactor);
		sp.body.updateFromGameObject();

		// adjust size of good data collider. gross. TODO: fix sprite instead.
		if(randomType === TextureKeys.DataGood)
			sp.body.setSize(60, 70);

		this.spawnables.add(sp);
	}

	createPlayer()
	{
		const player = this.physics.add.sprite(15, this.scale.height - 150, TextureKeys.DataDudeRun).setScale(this.scaleFactor, this.scaleFactor);
		player.setCollideWorldBounds(true);
		player.body.setSize(10, 20, true);
		player.body.setOffset(7, 4);
		player.body.updateFromGameObject();

		this.anims.create({
			key: 'run',
			frames: this.anims.generateFrameNames(TextureKeys.DataDudeRun, {start: 0, end: 6}),
			frameRate: 14,
			repeat: -1
		});

		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNames(TextureKeys.DataDudeJump, {start: 0, end: 0}),
			frameRate: 12,
			repeat: -1
		});

		return player;
	}

	scrollBackground(scrollX: number)
	{
		this.groundZone.body.position.x = scrollX;
		this.groundZone.body.position.y = this.scale.height - 125;
		this.bgBack.tilePositionX = scrollX * 0.01;
		this.bgMid.tilePositionX = scrollX * 0.1;
		this.bgGround.tilePositionX = scrollX * 0.4;
		this.bgGroundTop.tilePositionX = scrollX * 0.4;
	}

	update(t: number, dt: number)
	{
		this.scrollBackground(this.cam.scrollX);

		if (this.cursors.space.isDown && this.grounded) {
			this.grounded = false;
			this.player.setVelocityY(this.jumpForce);
		}

		this.player.setVelocityX(this.speed);

		if(!this.grounded)
			this.player.anims.play('jump', true);
		else
			this.player.anims.play('run', true);
	}
}
