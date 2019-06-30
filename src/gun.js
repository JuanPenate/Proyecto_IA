import { setBulletCollitions } from "./collitions";

let globalScene = null;
let physicsGroup = null;
let bullet = null;
const SPEED = 300;

export const createGun = scene => {
  globalScene = scene;
  physicsGroup = scene.physics.add.group({
    bounceX: 1,
    bounceY: 1,
    collideWorldBounds: false,
    dragX: 60,
    dragY: 60
  });
};

export const shootGun = ({ fromX, fromY, toX, toY }) => {
  const physic = globalScene.physics.add.group({
    bounceX: 1,
    bounceY: 1,
    collideWorldBounds: false,
    dragX: 60,
    dragY: 60
  });
  const bullet = physic.create(fromX, fromY, "pea");
  const d = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
  const velocityX = (SPEED / d) * (toX - fromX);
  const velocityY = (SPEED / d) * (toY - fromY);
  //physic.add(bullet);

  //physic.setVelocity(velocityX, velocityY);
  setBulletCollitions(bullet, velocityX, velocityY);

  setTimeout(() => bullet.destroy(), 1000);
};
