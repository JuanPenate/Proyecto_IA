import Phaser from "phaser";
import Menu from "./Menu";
import Juego from "./Juego";
import Win from "./Win";
import Lose from "./Lose";

var engineConfig = {
  type: Phaser.AUTO,
  width: 592,
  height: 592,
  physics: {
    default: "arcade",
    arcade: {
      //gravity: { y: 200 }
    }
  },
  scene: [Menu, Juego, Win, Lose]
};

const game = new Phaser.Game(engineConfig);
