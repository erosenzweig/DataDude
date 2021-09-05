import Phaser from "phaser";
import SceneKeys from "~/consts/SceneKeys";

export default class Highscore extends Phaser.Scene {

    playerText!: Phaser.GameObjects.BitmapText;
    

    constructor ()
    {
        super(SceneKeys.HighScore);
    }

    preload ()
    {
        this.load.image('block', 'assets/input/block.png');
        this.load.image('rub', 'assets/input/rub.png');
        this.load.image('end', 'assets/input/end.png');

        this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');
    }

    create ()
    {
        this.add.bitmapText(100, 260, 'arcade', 'RANK  SCORE   NAME').setTint(0xff00ff);
        this.add.bitmapText(100, 310, 'arcade', '1ST   50000').setTint(0xff0000);

        this.playerText = this.add.bitmapText(580, 310, 'arcade', '').setTint(0xff0000);

        //  Do this, otherwise this Scene will steal all keyboard input
        this.input.keyboard.enabled = false;

        this.scene.launch('InputPanel');

        let panel = this.scene.get('InputPanel');

        //  Listen to events from the Input Panel scene
        panel.events.on('updateName', this.updateName, this);
        panel.events.on('submitName', this.submitName, this);
    }

    submitName ()
    {
        this.scene.stop('InputPanel');

        this.add.bitmapText(100, 360, 'arcade', '2ND   40000    ANT').setTint(0xff8200);
        this.add.bitmapText(100, 410, 'arcade', '3RD   30000    .-.').setTint(0xffff00);
        this.add.bitmapText(100, 460, 'arcade', '4TH   20000    BOB').setTint(0x00ff00);
        this.add.bitmapText(100, 510, 'arcade', '5TH   10000    ZIK').setTint(0x00bfff);
    }

    updateName (name)
    {
        this.playerText.setText(name);
    }

}
