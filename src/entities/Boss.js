// 🎮 Boss Entity
// ES6 Entity for boss fight

export default class Boss {
  constructor(x, y, level) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 80;
    this.maxHealth = 10 * level;
    this.health = 10 * level;
    this.level = level;
    this.phase = 1;
    this.direction = 1;
    this.speed = 2;
    this.attackCooldown = 0;
    this.attackInterval = 120; // frames
    this.projectiles = [];
    this.floatOffset = 0;
  }
  
  update(deltaTime) {
    this.floatOffset += deltaTime * 0.002;
    
    // Movement
    this.x += this.direction * this.speed;
    
    // Boundary check
    if (this.x <= 50 || this.x >= window.innerWidth - 150) {
      this.direction *= -1;
    }
    
    // Phase changes
    if (this.health <= this.maxHealth * 0.5 && this.phase === 1) {
      this.phase = 2;
      this.speed += 2;
    }
    
    // Attack cooldown
    if (this.attackCooldown > 0) {
      this.attackCooldown--;
    }
    
    // Fire projectiles
    if (this.attackCooldown <= 0) {
      this.fireProjectiles();
      this.attackCooldown = this.attackInterval / this.phase;
    }
    
    // Update projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.y += p.vy;
      if (p.y > window.innerHeight) {
        this.projectiles.splice(i, 1);
      }
    }
  }
  
  fireProjectiles() {
    const projectileTypes = ['normal', 'spread'];
    const type = this.phase === 2 ? projectileTypes[Math.floor(Math.random() * projectileTypes.length)] : 'normal';
    
    if (type === 'normal') {
      this.projectiles.push({
        x: this.x + this.width / 2,
        y: this.y + this.height,
        vx: 0,
        vy: 5,
        size: 8,
        damage: 10,
        color: '#FF6B6B'
      });
    } else {
      // Spread shot
      for (let i = -1; i <= 1; i++) {
        this.projectiles.push({
          x: this.x + this.width / 2,
          y: this.y + this.height,
          vx: i * 3,
          vy: 4,
          size: 6,
          damage: 8,
          color: '#FF1493'
        });
      }
    }
  }
  
  render(ctx) {
    const colors = {
      1: '#FF6B6B',
      2: '#E91E63'
    };
    const color = colors[this.phase] || '#FF6B6B';
    
    // Glow effect
    const glow = ctx.createRadialGradient(this.x + this.width/2, this.y + this.height/2, 20, this.x + this.width/2, this.y + this.height/2, 60);
    glow.addColorStop(0, color);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(this.x + this.width/2, this.y + this.height/2, 60, 0, Math.PI * 2);
    ctx.fill();
    
    // Boss body
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Boss face
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x + 25, this.y + 30, 10, 0, Math.PI * 2);
    ctx.arc(this.x + 75, this.y + 30, 10, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x + 25, this.y + 30, 4, 0, Math.PI * 2);
    ctx.arc(this.x + 75, this.y + 30, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Boss health bar
    const healthPercent = this.health / this.maxHealth;
    ctx.fillStyle = '#333';
    ctx.fillRect(this.x, this.y - 15, this.width, 8);
    ctx.fillStyle = healthPercent > 0.5 ? '#4CAF50' : healthPercent > 0.25 ? '#FFC107' : '#F44336';
    ctx.fillRect(this.x, this.y - 15, this.width * healthPercent, 8);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x, this.y - 15, this.width, 8);
    
    // Boss name
    ctx.font = 'bold 14px Jetbrains Mono';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText('BOSS Lvl ' + this.level, this.x + this.width/2, this.y - 20);
  }
  
  takesDamage(amount) {
    this.health -= amount;
    return this.health <= 0;
  }
  
  getHealth() {
    return this.health;
  }
  
  getMaxHealth() {
    return this.maxHealth;
  }
  
  getProjectiles() {
    return this.projectiles;
  }
}
