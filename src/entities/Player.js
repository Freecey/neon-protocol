// 🎮 Player Entity
// ES6 Class - Component-based

export default class Player {
  constructor(x = 100, y = 300) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.vx = 0;
    this.vy = 0;
    this.speed = 5;
    this.jumpForce = -15;
    this.gravity = 0.6;
    this.grounded = false;
    this.health = 100;
  }
  
  update(deltaTime) {
    // Movement
    const keys = window.keys || {};
    
    if (keys['ArrowLeft'] || keys['KeyA']) this.vx = -this.speed;
    else if (keys['ArrowRight'] || keys['KeyD']) this.vx = this.speed;
    else this.vx = 0;
    
    // Jump
    if (keys['Space'] || keys['ArrowUp'] || keys['KeyW']) {
      this.vx = 0;
      if (this.grounded) {
        this.vy = this.jumpForce;
        this.grounded = false;
      }
    }
    
    // Fast fall
    if (keys['ArrowDown'] || keys['KeyS']) {
      this.vy += this.gravity * 2;
    }
    
    // Gravity
    this.vy += this.gravity;
    
    // Apply velocity
    this.x += this.vx;
    this.y += this.vy;
    
    // Boundaries
    const canvas = document.getElementById('game-canvas');
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
    
    // Ground collision
    this.grounded = false;
    if (this.y + this.height >= canvas.height - 60 &&
        this.y + this.height <= canvas.height - 60 + this.vy + 5) {
      this.y = canvas.height - 60 - this.height;
      this.vy = 0;
      this.grounded = true;
    }
    
    // Fall off screen
    if (this.y > canvas.height) {
      this.health -= 25;
      this.y = 100;
      this.vy = 0;
    }
  }
  
  render(ctx) {
    ctx.fillStyle = '#4CAF50';
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
  }
  
  takeDamage(amount) {
    this.health -= amount;
  }
}
