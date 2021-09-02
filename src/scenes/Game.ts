import Phaser from 'phaser'

import TextureKeys from '../consts/TextureKeys'
import SceneKeys from '../consts/SceneKeys'

export default class Game extends Phaser.Scene
{
	private background!: Phaser.GameObjects.TileSprite

	constructor()
	{
		super(SceneKeys.Game)
	}

	create()
	{
		const width = this.scale.width;
		const height = this.scale.height;

		const bgBack = this.add.tileSprite(0, 0, width, height, TextureKeys.BgBack).setOrigin(0).setScrollFactor(0);
		const bgMid = this.add.tileSprite(0, 0, width, height, TextureKeys.BgMid).setOrigin(0).setScrollFactor(0);
		const bgGround = this.add.tileSprite(0, 0, width, height, TextureKeys.BgGround).setOrigin(0).setScrollFactor(0);
		const bgGroundTop = this.add.tileSprite(0, 0, width, height, TextureKeys.BgGroundTop).setOrigin(0).setScrollFactor(0);
					
		const bgLayer = this.add.layer();
		
		//this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55);
	}

	update(t: number, dt: number)
	{
		this.background.setTilePosition(this.cameras.main.scrollX)
	}
}
