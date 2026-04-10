// 🎮 Level Manager
// Handles level generation and enemy placement

export default class LevelManager {
  constructor() {
    this.enemies = [];
    this.coins = [];
    this.platforms = [];
    this.powerups = [];
    this.boss = null;
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  
  loadLevel(level) {
    this.screenHeight = document.getElementById('canvas')?.height || window.innerHeight;
    this.screenWidth = document.getElementById('canvas')?.width || window.innerWidth;
    
    this.platforms = this.generatePlatforms(this.screenWidth, this.screenHeight, level);
    this.enemies = this.generateEnemies(level, this.platforms);
    this.coins = this.generateCoins(this.platforms, level);
    this.powerups = this.generatePowerups(level);
    
    // Boss level
    if (level >= 3) {
      this.generateBoss();
    }
  }
  
  generateBoss() {
    this.boss = new Boss(this.screenWidth / 2 - 50, 50, this.level || 1);
    this.boss.maxLevel = 5;
    return this.boss;
  }
  
  generatePlatforms(screenWidth, groundY, level) {
    const platforms = [];
    
    // Ground
    platforms.push({
      x: 0,
      y: groundY - 60,
      width: screenWidth,
      height: 60,
      type: 'ground'
    });
    
    // Generate more platforms at higher levels
    const platformCount = 10 + level * 5;
    
    for (let i = 0; i < platformCount; i++) {
      const x = 150 + Math.random() * (screenWidth - 600);
      const y = 150 + Math.random() * (groundY - 300);
      const width = 60 + Math.random() * 100;
      
      // Avoid overlapping
      let tooClose = false;
      for (const plat of platforms) {
        const distX = Math.abs(x - plat.x);
        const distY = Math.abs(y - plat.y);
        if (distX < 80 && distY < 40) {
          tooClose = true;
          break;
        }
      }
      
      if (!tooClose) {
        platforms.push({
          x: x,
          y: y,
          width: width,
          height: 20,
          type: 'platform',
          difficulty: level // Higher platforms at higher levels
        });
      }
    }
    
    return platforms;
  }
  
  generateEnemies(level, platforms) {
    const enemies = [];
    const enemyTypes = ['walker', 'flyer', 'bobber', 'shooter'];
    const count = 4 + level * 2 + Math.floor(Math.random() * 3);
    
    for (let i = 0; i < count; i++) {
      const plat = platforms[Math.floor(Math.random() * platforms.length)];
      const type = enemyTypes[Math.floor(Math.random() * Math.min(level + 1, enemyTypes.length))];
      
      enemies.push({
        x: plat.x + plat.width / 2 - 20,
        y: plat.y - 40,
        width: 40,
        height: 40,
        type: type,
        startX: plat.x + plat.width / 2 - 20,
        patrolRange: 80 + level * 20,
        speed: 2 + level * 0.5
      });
    }
    
    return enemies;
  }
  
  generateCoins(platforms, level) {
    const coins = [];
    const coinCount = 15 + level * 5;
    
    for (let i = 0; i < coinCount; i++) {
      const plat = platforms[Math.floor(Math.random() * platforms.length)];
      coins.push({
        x: plat.x + plat.width / 2 + (Math.random() - 0.5) * 40,
        y: plat.y - 60 - Math.random() * 60,
        size: 15,
        collected: false,
        value: level // Higher value at higher levels
      });
    }
    
    return coins;
  }
  
  generatePowerups(level) {
    const powerups = [];
    const powerupTypes = ['doubleJump', 'shield', 'speed', 'freeze'];
    const powerupCount = 1 + Math.floor(level / 2);
    
    for (let i = 0; i < powerupCount; i++) {
      const plat = platforms[Math.floor(Math.random() * platforms.length)];
      const type = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
      
      powerups.push({
        x: plat.x + plat.width / 2,
        y: plat.y - 80 - Math.random() * 40,
        type: type,
        collected: false
      });
    }
    
    return powerups;
  }
  
  resize(width, height) {
    this.screenWidth = width;
    this.screenHeight = height;
  }
}
