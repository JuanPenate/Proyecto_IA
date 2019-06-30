import Phaser from "phaser";
//import { shootGun } from "./gun";
import { setWin } from "./walls";
import { setPlayer } from "./enemy";
let player = null;
let physicsGroup = null;
let globalScene = null;
let StrgPath = null;
let cont = 0;
const velocity = {
  x: 0,
  y: 0
};
let Px = null;
let Py = null;
let contP = 0;

export const createPlayer = (scene, pointx, pointy) => {
  globalScene = scene;
  physicsGroup = globalScene.physics.add.group({
    bounceX: 0,
    bounceY: 0,
    collideWorldBounds: true,
    dragX: 100,
    dragY: 100,
    alpha: 1
  });
  Px = pointx;
  Py = pointy;
  player = physicsGroup.create(
    pointx * 16 + 16,
    pointy * 16 + 16,
    "testTiles",
    195
  );
  physicsGroup.add(player);
  return player;
};

export const GrafoAd = Path => {
  new Pathing("", Px, Py, Path, 0).FINDPATH();
};

class Pathing {
  constructor(PathStr, x, y, Path, flag) {
    this.PathStr = PathStr;
    this.x = x;
    this.y = y;
    this.Path = Path;
    this.flag = flag;
  }
  FINDPATH() {
    this.Path[this.x][this.y] = 0;
    if (this.Path[this.x][this.y + 1] === 2) {
      if (StrgPath === null) {
        StrgPath = this.PathStr + "1";
        cont++;
        this.flag = 1;
      }
      if (StrgPath.length > this.PathStr.length) {
        StrgPath = this.PathStr + "1";
        cont++;
        this.flag = 1;
      }
    }
    if (this.Path[this.x][this.y - 1] === 2) {
      if (StrgPath === null) {
        StrgPath = this.PathStr + "0";
        cont++;
        this.flag = 1;
      }
      if (StrgPath.length > this.PathStr.length) {
        StrgPath = this.PathStr + "0";
        cont++;
        this.flag = 1;
      }
    }
    if (this.Path[this.x + 1][this.y] === 2) {
      if (StrgPath === null) {
        StrgPath = this.PathStr + "3";
        cont++;
        this.flag = 1;
      }
      if (StrgPath.length > this.PathStr.length) {
        StrgPath = this.PathStr + "3";
        cont++;
        this.flag = 1;
      }
    }
    if (this.Path[this.x - 1][this.y] === 2) {
      if (StrgPath === null) {
        StrgPath = this.PathStr + "2";
        cont++;
        this.flag = 1;
      }
      if (StrgPath.length > this.PathStr.length) {
        StrgPath = this.PathStr + "2";
        cont++;
        this.flag = 1;
      }
    }
    if (this.flag === 0) {
      if (this.Path[this.x][this.y + 1] === 1) {
        new Pathing(
          this.PathStr + "1",
          this.x,
          this.y + 1,
          this.Path,
          0
        ).FINDPATH();
      }
      if (this.Path[this.x][this.y - 1] === 1) {
        new Pathing(
          this.PathStr + "0",
          this.x,
          this.y - 1,
          this.Path,
          0
        ).FINDPATH();
      }
      if (this.Path[this.x + 1][this.y] === 1) {
        new Pathing(
          this.PathStr + "3",
          this.x + 1,
          this.y,
          this.Path,
          0
        ).FINDPATH();
      }
      if (this.Path[this.x - 1][this.y] === 1) {
        new Pathing(
          this.PathStr + "2",
          this.x - 1,
          this.y,
          this.Path,
          0
        ).FINDPATH();
      }
    }
  }
}
export const getMov = () => {
  console.log(cont);
  return StrgPath;
};
export const AI = (MOVES, POS) => {
  if (contP === 35) {
    switch (MOVES[POS]) {
      case "0":
        contP = 0;
        player.destroy();
        Py = Py - 1;
        player = physicsGroup.create(
          Px * 16 + 16,
          Py * 16 + 16,
          "testTiles",
          195
        );
        setWin(player);
        setPlayer(player);
        return POS + 1;
      case "1":
        contP = 0;
        player.destroy();
        Py = Py + 1;
        player = physicsGroup.create(
          Px * 16 + 16,
          Py * 16 + 16,
          "testTiles",
          195
        );
        setWin(player);
        setPlayer(player);
        return POS + 1;
      case "2":
        contP = 0;
        player.destroy();
        Px = Px - 1;
        player = physicsGroup.create(
          Px * 16 + 16,
          Py * 16 + 16,
          "testTiles",
          195
        );
        setWin(player);
        setPlayer(player);
        return POS + 1;
      case "3":
        contP = 0;
        player.destroy();
        Px = Px + 1;
        player = physicsGroup.create(
          Px * 16 + 16,
          Py * 16 + 16,
          "testTiles",
          195
        );
        setWin(player);
        setPlayer(player);
        return POS + 1;

      default:
        break;
    }
  }
  contP++;
  return POS;
};

//When playing as the Escapee
/*export const updatePlayerPosition = (velocityX, velocityY) => {
  physicsGroup.setVelocity(velocityX, velocityY);
};

export const shoot = ({ x, y }) => {
  const { x: playerX, y: playerY } = player;
  shootGun({ fromX: playerX, toX: x, fromY: playerY, toY: y });
};*/
