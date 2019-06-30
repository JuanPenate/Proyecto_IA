let globalScene = null;
let physicsGroup =null;
let bullet = null;

export const setScene = scene =>{
  globalScene = scene;
  physicsGroup  = scene.physics.add.group({
    bounceX: 1,
    bounceY: 1,
    collideWorldBounds: false,
    dragX: 60,
    dragY: 60
  });; 
}

export const setEntCollitions = (
  scene,
  player,
  entity1,
  entity2,
  entity3,
  entity4
) => {
  
  globalScene.physics.add.collider(player, physicsGroup, () => {});
  globalScene.physics.add.collider(entity1, physicsGroup, () => {
    entity1.health -= 50;
    if (entity1.health <= 0) {
      entity1.destroy();
    }
  });
  globalScene.physics.add.collider(entity2, physicsGroup, () => {
    entity2.health -= 50;
    if (entity2.health <= 0) {
      entity2.destroy();
    }
  });
  globalScene.physics.add.collider(entity3, physicsGroup, () => {
    entity3.health -= 50;
    if (entity3.health <= 0) {
      entity3.destroy();
    }
  });
  globalScene.physics.add.collider(entity4, physicsGroup, () => {
    entity4.health -= 50;
    if (entity4.health <= 0) {
      entity4.destroy();
    }
  });
};

export const setBulletCollitions = (pea, velocityX, velocityY) => {
  physicsGroup.add(pea);
  physicsGroup.setVelocity(velocityX, velocityY);
};

export const setWallCollitions=(wall)=>{
  globalScene.physics.add.collider(wall,physicsGroup);

}