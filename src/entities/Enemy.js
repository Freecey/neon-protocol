// 🎮 Enemy Entity with AI Behaviors
// Types: Walker, Flyer, Bobber

export default class Enemy {
  constructor(x, y, type = 'walker') {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.type = type;
    this.startX = x;
    this.lastMove = Date.now();
    
    this.setupAI(type);
  }
  
  setupAI(type) {
    switch (type) {
      case 'walker':
        this.vx = Math.random() > 0.5 ? 2 : -2;
        this.patrolRange = 100;
        break;
        
      case 'flyer':
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 2;
        break;
        
      case 'bobber':
        this.vy = -2;
        this.bobSpeed = 0.03 + Math.random() * 0.02;
        this.baseY = y;
        break;
    }
  }
  
  update(deltaTime) {
    const now = Date.now();
    
    switch (this.type) {
      case 'walker':
        this.x += this.vx;
        
        // Patrol logic
        if (this.x < this.startX - this.patrolRange ||
            this.x > this.startX + this.patrolRange ||
            now - this.lastMove > 2000) {
          this.vx *= -1;
          this.lastMove = now;
        }
        break;
        
      case 'flyer':
        this.x += this.vx;
        this.y += this.vy;
        
        // Bounce off walls
        const canvas = document.getElementById('game-canvas');
        if (this.x < 50 || this.x > canvas.width - 50) {
          this.vx *= -1;
        }
        if (this.y < 100 || this.y > canvas.height - 100) {
          this.vy *= -1;
        }
        break;
        
      case 'bobber':
        this.y = this.baseY + Math.sin(now * this.bobSpeed) * 30;
        this.x += Math.sin(now * 0.002) * 1;
        break;
    }
  }
  
  render(ctx) {
    // Enemy body
    const colors = {
      walker: '#FF6B6B',
      flyer: '#4ECDC4',
      bobber: '#FFE66D'
    };
    ctx.fillStyle = colors[this.type];
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Face
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x + 10, this.y + 15, 5, 0, Math.PI * 2);
    ctx.arc(this.x + 30, this.y + 15, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x + 10, this.y + 15, 2, 0, Math.PI * 2);
    ctx.arc(this.x + 30, this.y + 15, 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Type indicator
    ctx.font = '10px Arial';
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillText(this.type.toLowerCase(), this.x + 10, this.y + 35);
  }
  
  getHealth() {
    return 1; // One hit kill
  }
}
