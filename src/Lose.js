import Phaser from "phaser";

class Lose extends Phaser.Scene {
  constructor() {
    super("Lose");
  }
  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
    this.add.dynamicBitmapText(250, 250, "pixel", "YOU LOSE", 18);
  }
}

export default Lose;
