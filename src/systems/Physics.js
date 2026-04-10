// 🎮 Physics System
// Handles collisions and physics calculations

export default class Physics {
  constructor() {
    this.gravity = 0.6;
    this.friction = 0.8;
  }
  
  checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }
  
  resolveCollision(entity, platform) {
    // Calculate overlap
    const overlapX = (entity.width + platform.width) / 2 - 
                     Math.abs((entity.x + entity.width/2) - (platform.x + platform.width/2));
    const overlapY = (entity.height + platform.height) / 2 - 
                     Math.abs((entity.y + entity.height/2) - (platform.y + platform.height/2));
    
    // Determine collision side
    if (overlapX < overlapY) {
      // Horizontal collision
      if (entity.x < platform.x) {
        entity.x = platform.x - entity.width;
      } else {
        entity.x = platform.x + platform.width;
      }
      entity.vx = 0;
    } else {
      // Vertical collision
      if (entity.y < platform.y) {
        entity.y = platform.y - entity.height;
        entity.vy = 0;
        entity.grounded = true;
      } else {
        entity.y = platform.y + platform.height;
        entity.vy = 0;
      }
    }
  }
  
  applyGravity(entity, deltaTime) {
    entity.vy += this.gravity;
    entity.y += entity.vy;
  }
  
  applyMovement(entity, deltaTime) {
    entity.x += entity.vx;
    entity.y += entity.vy;
  }
  
  distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  distanceSquared(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return dx * dx + dy * dy;
  }
}
