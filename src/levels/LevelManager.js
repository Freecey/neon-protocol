// 🎮 Level Manager
// Handles level generation and enemy placement

export default class LevelManager {
  constructor() {
    this.enemies = [];
    this.coins = [];
    this.platforms = [];
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  
  loadLevel(level) {
    this.screenHeight = document.getElementById('canvas')?.height || 800;
    this.screenWidth = document.getElementById('canvas')?.width || 1200;
    
    this.platforms = this.generatePlatforms(this.screenWidth, this.screenHeight);
    this.enemies = this.generateEnemies(level, this.platforms);
    this.coins = this.generateCoins(this.platforms);
  }
  
  generatePlatforms(screenWidth, groundY) {
    const platforms = [];
    
    // Ground
    platforms.push({
      x: 0,
      y: groundY - 60,
      width: screenWidth,
      height: 60,
      type: 'ground'
    });
    
    // Random platforms
    for (let i = 0; i < 15; i++) {
      const x = 150 + Math.random() * (screenWidth - 400);
      const y = 150 + Math.random() * (groundY - 250);
      const width = 80 + Math.random() * 120;
      
      // Avoid overlapping
      let tooClose = false;
      for (const plat of platforms) {
        const distX = Math.abs(x - plat.x);
        const distY = Math.abs(y - plat.y);
        if (distX < 100 && distY < 50) {
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
          type: 'platform'
        });
      }
    }
    
    return platforms;
  }
  
  generateEnemies(level, platforms) {
    const enemies = [];
    const enemyTypes = ['walker', 'flyer', 'bobber'];
    const count = 5 + Math.floor(level * 0.5);
    
    for (let i = 0; i < count; i++) {
      const plat = platforms[Math.floor(Math.random() * platforms.length)];
      const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      
      enemies.push({
        x: plat.x + plat.width / 2 - 20,
        y: plat.y - 40,
        width: 40,
        height: 40,
        type: type,
        startX: plat.x + plat.width / 2 - 20,
        patrolRange: 100
      });
    }
    
    return enemies;
  }
  
  generateCoins(platforms) {
    const coins = [];
    
    for (let i = 0; i < 20; i++) {
      const plat = platforms[Math.floor(Math.random() * platforms.length)];
      coins.push({
        x: plat.x + plat.width / 2,
        y: plat.y - 60 - Math.random() * 80,
        size: 15,
        collected: false
      });
    }
    
    return coins;
  }
  
  resize(width, height) {
    this.screenWidth = width;
    this.screenHeight = height;
    // Re-generate platforms would be needed here
  }
}
