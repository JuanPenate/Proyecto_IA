import Phaser from "phaser";
import { createPlayer, GrafoAd, getMov, AI } from "./player";
import { createEnemy, dumbenemyAI } from "./enemy";
import { setupListeners } from "./inputManager";
import {
  GenerateTileGrid,
  GeneratePath,
  getScene,
  GenerateWalls,
  getPath
} from "./walls";
import { createGun } from "./gun";
import { setEntCollitions, setScene } from "./collitions";
import { handleUpdate } from "./inputManager";

let pointx = null;
let pointy = null;
let cont = 0;
let Path = null;
let Mov = null;
let Pos = 0;
let entity0 = null;
let entity1 = null;
let entity2 = null;
let entity3 = null;
let entity4 = null;

export const getPointP = (x, y) => {
  pointx = x;
  pointy = y;
};
export const getPointE = (x, y, player, scene, physic) => {
  switch (cont) {
    case 0:
      entity1 = createEnemy(scene, "mink", player, x, y, physic);
      break;

    case 1:
      entity2 = createEnemy(scene, "sponk", player, x, y, physic);
      break;

    case 2:
      entity3 = createEnemy(scene, "whik", player, x, y, physic);
      break;

    case 3:
      entity4 = createEnemy(scene, "snup", player, x, y, physic);
      break;

    default:
      break;
  }
  cont++;
};

class Juego extends Phaser.Scene {
  constructor() {
    super("Juego");
  }
  preload() {
    this.load.image("hull1", "assets/tankBase.png");
    this.load.image("hull2", "assets/tankTurret.png");
    this.load.image("pea", "assets/bullet.png");
    this.load.spritesheet("spuder", "assets/spider01.png", {
      frameWidth: 60,
      frameHeight: 50
    });
    this.load.spritesheet("spoder", "assets/spider02.png", {
      frameWidth: 60,
      frameHeight: 50
    });
    this.load.spritesheet("spidir", "assets/spider03.png", {
      frameWidth: 60,
      frameHeight: 50
    });
    this.load.spritesheet("speder", "assets/spider06.png", {
      frameWidth: 60,
      frameHeight: 50
    });
    this.load.image("background", "assets/backgroundbricks.jpg");
    this.load.image("wall", "assets/00.png");

    this.load.spritesheet(
      "testTiles",
      "assets/color_tileset_16x16_Eiyeron_CC-BY-SA-3.0_8.png",
      {
        frameWidth: 16,
        frameHeight: 16
      }
    );
  }

  create() {
    getScene(this);
    setScene(this);
    GenerateTileGrid();
    entity0 = createPlayer(this, pointx, pointy);
    GeneratePath(entity0);
    GenerateWalls();
    setEntCollitions(this, entity0, entity1, entity2, entity3, entity4);
    createGun(this);
    Path = getPath();
    GrafoAd(Path);
    console.log(getMov());
    Mov = getMov().split("");
    setupListeners(this);
  }
  update() {
    handleUpdate();
    Pos = AI(Mov, Pos);
    //dumbenemyAI("mink");
    dumbenemyAI("sponk");
    dumbenemyAI("whik");
    dumbenemyAI("snup");
  }
}

export default Juego;
