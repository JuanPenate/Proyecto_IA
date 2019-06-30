import Phaser from "phaser";

class Menu extends Phaser.Scene {
  constructor() {
    super("Menu");
  }

  preload() {
    this.load.image("background", "assets/backgroundbricks.jpg");

    this.load.json("fontJSON", "./assets/font.json");
    this.load.image("font", "./assets/font.png");
    this.load.on("complete", () => {
      const fontJSON = this.cache.json.get("fontJSON");
      this.cache.bitmapFont.add(
        "pixel",
        Phaser.GameObjects.RetroFont.Parse(this, fontJSON)
      );
    });
  }
  create() {
    this.add.image(0, 0, "background").setOrigin(0, 0);
    this.add.dynamicBitmapText(230, 250, "pixel", "LABERYNTH", 18);

    const pressButton = this.add.dynamicBitmapText(
      250,
      320,
      "pixel",
      "PRESS ANY BUTTON",
      8
    );

    this.tweens.add({
      targets: pressButton,
      alpha: 0,
      ease: x => (x < 0.5 ? 0 : 1),
      duration: 500,
      yoyo: true,
      repeat: -1
    });
    this.input.keyboard.on("keydown", () => {
      this.scene.start("Juego");
    });
  }
}

export default Menu;
