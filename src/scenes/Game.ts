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

		this.background = this.add.tileSprite(0, 0, width, height, TextureKeys.Background)
			.setOrigin(0)
			.setScrollFactor(0);

		//this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height - 55);
	}

	update(t: number, dt: number)
	{
		this.background.setTilePosition(this.cameras.main.scrollX)
	}
}
