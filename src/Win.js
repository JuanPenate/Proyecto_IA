import Phaser from "phaser";

class Win extends Phaser.Scene {
  constructor() {
    super("Win");
  }
  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
    this.add.dynamicBitmapText(250, 250, "pixel", "YOU WIN", 18);
  }
}

export default Win;
