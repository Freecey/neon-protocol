// 🎮 PowerUp Entity
// ES6 Entity for power-ups

export default class PowerUp {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
    this.type = type; // 'doubleJump', 'shield', 'speed', 'freeze'
    this.collected = false;
    this.floatOffset = Math.random() * Math.PI * 2;
  }
  
  update(deltaTime) {
    // Floating animation
    this.floatOffset += deltaTime * 0.003;
  }
  
  render(ctx) {
    if (this.collected) return;
    
    const floatY = this.y + Math.sin(this.floatOffset) * 5;
    const colors = {
      doubleJump: '#FF6B6B',
      shield: '#4ECDC4',
      speed: '#FFD700',
      freeze: '#00BFFF'
    };
    const icons = {
      doubleJump: '⬆️⬆️',
      shield: '🛡️',
      speed: '⚡',
      freeze: '❄️'
    };
    
    // Glow effect
    const glow = ctx.createRadialGradient(this.x, floatY, 5, this.x, floatY, 25);
    glow.addColorStop(0, colors[this.type]);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(this.x, floatY, 25, 0, Math.PI * 2);
    ctx.fill();
    
    // Power-up icon
    ctx.font = '24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(icons[this.type], this.x, floatY + 8);
    
    // Border
    ctx.strokeStyle = colors[this.type];
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, floatY, 15, 0, Math.PI * 2);
    ctx.stroke();
  }
  
  getType() {
    return this.type;
  }
  
  collect() {
    this.collected = true;
  }
  
  isDead() {
    return this.collected;
  }
}
