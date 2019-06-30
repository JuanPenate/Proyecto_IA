import Phaser from "phaser";
import { getPointP, getPointE } from "./Juego";
import { setWallCollitions } from "./collitions";

let physicsGroupT = null;
let physicsGroupEnt = null;
let physicsGroupWin = null;
let globalScene = null;
let OUT = null;

var proceduralMap;
var tileSize = 16;
var startPosition;
var minPathTilesCount = 1000;
var maxPathTilesCount = 1225;

//Enum with the different directions the player can face
var direction = {
  up: 0,
  down: 1,
  left: 2,
  right: 3
};

var Path;

function Point(x, y) {
  var tmp = {};

  tmp.x = x || 0;
  tmp.y = y || 0;

  return tmp;
}

var tileTypes = {
  invalid: -1,
  none: 0,
  floor: 1,
  wall: 2
};
export const setWin = player => {
  globalScene.physics.add.collider(player, physicsGroupWin, () => {
    globalScene.scene.start("Win");
  });
};

export const getScene = scene => {
  globalScene = scene;
  physicsGroupT = globalScene.physics.add.group({
    bounceX: 0,
    bounceY: 0,
    collideWorldBounds: true,
    dragX: 6000,
    dragY: 6000
  });
  physicsGroupEnt = globalScene.physics.add.group({
    bounceX: 0,
    bounceY: 0,
    collideWorldBounds: true,
    dragX: 1000000000,
    dragY: 1000000000
  });
  physicsGroupWin = globalScene.physics.add.group({
    bounceX: 0,
    bounceY: 0,
    collideWorldBounds: true,
    dragX: 1000000000,
    dragY: 1000000000
  });
};
class Tile {
  constructor(type, x, y) {
    this.currentType = type || tileTypes.none;

    switch (type) {
      case tileTypes.floor:
        this.tile = physicsGroupT.create(
          x * tileSize + 16,
          y * tileSize + 16,
          "testTiles",
          25
        );
        this.tile.setDepth(-1);
        break;
      case tileTypes.wall:
        this.tile = physicsGroupEnt.create(
          x * tileSize + 16,
          y * tileSize + 16,
          "testTiles",
          15
        );
        this.tile.body.immovable = true;
        setWallCollitions(this.tile);
        break;
      default:
        break;
    }
  }
}

export const GenerateTileGrid = () => {
  proceduralMap = new Array(36);
  Path = new Array(36);

  for (var i = 0; i < 35 + 1; i++) {
    proceduralMap[i] = new Array(36);
    Path[i] = new Array(36);

    for (var j = 0; j < 35 + 1; j++) {
      proceduralMap[i][j] = new Tile(tileTypes.none, i, j);
      Path[i][j] = 0;
    }
  }

  startPosition = new Point(0, 0);
  startPosition.x = Phaser.Math.RND.integerInRange(1, 35 - 1);
  startPosition.y = Phaser.Math.RND.integerInRange(1, 35 - 1);

  proceduralMap[startPosition.x][startPosition.y] = new Tile(
    tileTypes.floor,
    startPosition.x,
    startPosition.y
  );
  Path[startPosition.x][startPosition.y] = 1;
  getPointP(startPosition.x, startPosition.y);
};

export const GeneratePath = player => {
  globalScene.physics.add.collider(player, physicsGroupEnt, () => {});
  var currentPathTilesCount = Phaser.Math.RND.integerInRange(
    minPathTilesCount,
    maxPathTilesCount
  );

  var i = currentPathTilesCount;
  var currentPosition = new Point(startPosition.x, startPosition.y);

  while (i > 0) {
    var rndDirection = Phaser.Math.RND.integerInRange(0, 3);
    var newPosX = currentPosition.x;
    var newPosY = currentPosition.y;

    switch (rndDirection) {
      case direction.up:
        newPosX = currentPosition.x - 1;
        newPosY = currentPosition.y;
        break;
      case direction.down:
        newPosX = currentPosition.x + 1;
        newPosY = currentPosition.y;
        break;
      case direction.left:
        newPosX = currentPosition.x;
        newPosY = currentPosition.y - 1;
        break;
      case direction.right:
        newPosX = currentPosition.x;
        newPosY = currentPosition.y + 1;
        break;
      default:
        break;
    }

    if (newPosX < 1) newPosX = 1;
    if (newPosX > 35 - 1) newPosX = 35 - 1;

    if (newPosY < 1) newPosY = 1;
    if (newPosY > 35 - 1) newPosY = 35 - 1;

    currentPosition.x = newPosX;
    currentPosition.y = newPosY;
    currentPosition = new Point(newPosX, newPosY);

    proceduralMap[currentPosition.x][currentPosition.y] = new Tile(
      tileTypes.floor,
      currentPosition.x,
      currentPosition.y
    );
    Path[currentPosition.x][currentPosition.y] = 1;
    switch (i) {
      case Math.trunc((currentPathTilesCount * 4) / 5):
        getPointE(
          currentPosition.x * 16,
          currentPosition.y * 16,
          player,
          globalScene,
          physicsGroupEnt
        );
        break;

      case Math.trunc((currentPathTilesCount * 3) / 5):
        getPointE(
          currentPosition.x * 16,
          currentPosition.y * 16,
          player,
          globalScene,
          physicsGroupEnt
        );
        break;
      case Math.trunc((currentPathTilesCount * 2) / 5):
        getPointE(
          currentPosition.x * 16,
          currentPosition.y * 16,
          player,
          globalScene,
          physicsGroupEnt
        );
        break;
      case Math.trunc(currentPathTilesCount / 5):
        getPointE(
          currentPosition.x * 16,
          currentPosition.y * 16,
          player,
          globalScene,
          physicsGroupEnt
        );
        break;
      default:
        break;
    }

    i--;
  }
  OUT = physicsGroupWin.create(
    currentPosition.x * 16 + 16,
    currentPosition.y * 16 + 16,
    "testTiles",
    65
  );
  Path[currentPosition.x][currentPosition.y] = 2;
};

export const GenerateWalls = () => {
  for (var i = 0; i < 35 + 1; i++) {
    for (var j = 0; j < 35 + 1; j++) {
      var tilePosition = new Point(i, j);

      if (proceduralMap[i][j].currentType === tileTypes.floor) {
        for (var neighbourX = -1; neighbourX < 2; neighbourX++) {
          for (var neighbourY = -1; neighbourY < 2; neighbourY++) {
            var neighbourPosition = new Point(
              tilePosition.x + neighbourX,
              tilePosition.y + neighbourY
            );

            if (
              neighbourPosition.x > -1 &&
              neighbourPosition.x < 35 + 1 &&
              neighbourPosition.y > -1 &&
              neighbourPosition.y < 35 + 1
            ) {
              if (
                proceduralMap[neighbourPosition.x][neighbourPosition.y]
                  .currentType === tileTypes.none
              ) {
                proceduralMap[neighbourPosition.x][
                  neighbourPosition.y
                ] = new Tile(
                  tileTypes.wall,
                  neighbourPosition.x,
                  neighbourPosition.y
                );
              }
            }
          }
        }
      }
    }
  }
};

export const sendEnemyToWalls = enemy => {
  globalScene.physics.add.collider(enemy, physicsGroupEnt);
};

export const getPath = () => {
  return Path;
};
