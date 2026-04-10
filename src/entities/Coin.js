// 🎮 Coin Entity
// Collectible object in game

export default class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 15;
    this.collected = false;
    this.bobOffset = Math.random() * Math.PI * 2;
  }
  
  update(deltaTime, time) {
    // Gentle animation
    this.bobOffset += 0.05 * deltaTime;
  }
  
  render(ctx) {
    if (this.collected) return;
    
    const bobY = this.y + Math.sin(this.bobOffset) * 5;
    
    ctx.beginPath();
    ctx.arc(this.x, bobY, this.size, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    
    // Shine effect
    ctx.beginPath();
    ctx.arc(this.x - 3, bobY - 3, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();
    ctx.closePath();
  }
  
  collect() {
    this.collected = true;
  }
}
