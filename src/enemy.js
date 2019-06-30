import Phaser from "phaser";
import { sendEnemyToWalls } from "./walls";
import { shootGun } from "./gun";

let enemy = null;
let EPlayer = null;
let physicsGroupM = null;
let physicsGroupSk = null;
let physicsGroupW = null;
let physicsGroupSp = null;
let globalScene = null;
let contM = 0;
let contSk = 0;
let contW = 0;
let contSp = 0;
const velocity = {
  x: 0,
  y: 0
};

export const createEnemy = (scene, name, player, x, y) => {
  globalScene = scene;
  switch (name) {
    case "mink":
      enemy = scene.physics.add.sprite(x + 16, y + 16, "testTiles", 217);
      physicsGroupM = globalScene.physics.add.group({
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: true,
        dragX: 100,
        dragY: 100,
        alpha: 1
      });
      physicsGroupM.add(enemy);
      enemy.health = 100;

      sendEnemyToWalls(enemy);
      EPlayer = enemy;
      return enemy;
    case "sponk":
      enemy = scene.physics.add.sprite(x + 16, y + 16, "testTiles", 216);
      physicsGroupSk = globalScene.physics.add.group({
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: true,
        dragX: 100,
        dragY: 100,
        alpha: 1
      });
      physicsGroupSk.add(enemy);
      enemy.health = 200;

      sendEnemyToWalls(enemy);
      return enemy;
    case "whik":
      enemy = scene.physics.add.sprite(x + 16, y + 16, "testTiles", 215);
      physicsGroupW = globalScene.physics.add.group({
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: true,
        dragX: 100,
        dragY: 100,
        alpha: 1
      });
      physicsGroupW.add(enemy);
      enemy.health = 150;

      sendEnemyToWalls(enemy);
      return enemy;
    case "snup":
      enemy = scene.physics.add.sprite(x + 16, y + 16, "testTiles", 214);
      physicsGroupSp = globalScene.physics.add.group({
        bounceX: 0,
        bounceY: 0,
        collideWorldBounds: true,
        dragX: 100,
        dragY: 100,
        alpha: 1
      });
      physicsGroupSp.add(enemy);
      enemy.health = 50;

      sendEnemyToWalls(enemy);
      return enemy;
    default:
      break;
  }
};

export const dumbenemyAI = enemy => {
  var rndDirection = Phaser.Math.RND.integerInRange(0, 3);
  switch (rndDirection) {
    case 0:
      switch (enemy) {
        case "mink":
          if (contM === 100) {
            physicsGroupM.setVelocity(0, 100);
            contM = 0;
          } else {
            contM++;
          }
          break;
        case "sponk":
          if (contSk === 100) {
            physicsGroupSk.setVelocity(0, 100);
            contSk = 0;
          } else {
            contSk++;
          }
          break;
        case "whik":
          if (contW === 100) {
            physicsGroupW.setVelocity(0, 100);
            contW = 0;
          } else {
            contW++;
          }
          break;
        case "snup":
          if (contSp === 100) {
            physicsGroupSp.setVelocity(0, 100);
            contSp = 0;
          } else {
            contSp++;
          }
          break;
        default:
          break;
      }
      break;
    case 1:
      switch (enemy) {
        case "mink":
          if (contM === 100) {
            physicsGroupM.setVelocity(0, -100);
            contM = 0;
          } else {
            contM++;
          }
          break;
        case "sponk":
          if (contSk === 100) {
            physicsGroupSk.setVelocity(0, -100);
            contSk = 0;
          } else {
            contSk++;
          }
          break;
        case "whik":
          if (contW === 100) {
            physicsGroupW.setVelocity(0, -100);
            contW = 0;
          } else {
            contW++;
          }
          break;
        case "snup":
          if (contSp === 100) {
            physicsGroupSp.setVelocity(0, -100);
            contSp = 0;
          } else {
            contSp++;
          }
          break;
        default:
          break;
      }
      break;
    case 2:
      switch (enemy) {
        case "mink":
          if (contM === 100) {
            physicsGroupM.setVelocity(100, 0);
            contM = 0;
          } else {
            contM++;
          }
          break;
        case "sponk":
          if (contSk === 100) {
            physicsGroupSk.setVelocity(100, 0);
            contSk = 0;
          } else {
            contSk++;
          }
          break;
        case "whik":
          if (contW === 100) {
            physicsGroupW.setVelocity(100, 0);
            contW = 0;
          } else {
            contW++;
          }
          break;
        case "snup":
          if (contSp === 100) {
            physicsGroupSp.setVelocity(100, 0);
            contSp = 0;
          } else {
            contSp++;
          }
          break;
        default:
          break;
      }

      break;
    case 3:
      switch (enemy) {
        case "mink":
          if (contM === 100) {
            physicsGroupM.setVelocity(-100, 0);
            contM = 0;
          } else {
            contM++;
          }
          break;
        case "sponk":
          if (contSk === 100) {
            physicsGroupSk.setVelocity(-100, 0);
            contSk = 0;
          } else {
            contSk++;
          }
          break;
        case "whik":
          if (contW === 100) {
            physicsGroupW.setVelocity(-100, 0);
            contW = 0;
          } else {
            contW++;
          }
          break;
        case "snup":
          if (contSp === 100) {
            physicsGroupSp.setVelocity(-100, 0);
            contSp = 0;
          } else {
            contSp++;
          }
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
};
export const updatePlayerPosition = (velocityX, velocityY) => {
  physicsGroupM.setVelocity(velocityX, velocityY);
};

export const shoot = ({ x, y }) => {
  const { x: playerX, y: playerY } = EPlayer;
  shootGun({ fromX: playerX, toX: x, fromY: playerY, toY: y });
};

export const setPlayer = player => {
  globalScene.physics.add.collider(player, physicsGroupM, () => {
    globalScene.scene.start("Lose");
  });
  globalScene.physics.add.collider(player, physicsGroupSk, () => {
    globalScene.scene.start("Lose");
  });
  globalScene.physics.add.collider(player, physicsGroupW, () => {
    globalScene.scene.start("Lose");
  });
  globalScene.physics.add.collider(player, physicsGroupSp, () => {
    globalScene.scene.start("Lose");
  });
};
