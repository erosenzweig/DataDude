import Phaser from 'phaser'
import SceneKeys from '../consts/SceneKeys'

export default class GameOver extends Phaser.Scene
{
	score!: number;
	gameOverLabel!: Phaser.GameObjects.Text;
	cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

	init(data)
	{
		this.score = data.score;
	}

	constructor ()
	{
		super(SceneKeys.GameOver);
	}

	create () 
	{
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
		this.gameOverLabel = this.add.text(screenCenterX, screenCenterY, `You scored ${this.score} points!\n\n\nPress SPACE to restart`, {
			fontSize: "40px",
			color: "#ffffff",
			stroke: "bold",
			align: "center"
		}).setScrollFactor(0).setOrigin(0.5, 0.5);

		this.cursors = this.input.keyboard.createCursorKeys();
    }

	update()
	{
		if (this.cursors.space.isDown) {
			this.scene.stop(SceneKeys.StarField);
			this.scene.start(SceneKeys.Game);
		}
	}
}