// 🎮 Particle System
// ES6 Entity for visual effects

export default class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = 3 + Math.random() * 4;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.life = 1; // 1.0 to 0.0
    this.decay = 0.02 + Math.random() * 0.02;
  }
  
  update(deltaTime) {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    this.size *= 0.95; // Shrink over time
  }
  
  render(ctx) {
    if (this.life <= 0) return;
    
    ctx.globalAlpha = this.life;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  
  isDead() {
    return this.life <= 0;
  }
}
