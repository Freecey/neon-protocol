// 🎮 Level Manager
// Handles level generation and enemy placement (v4.0 avec Lvl 6-7)

import Boss from '../entities/Boss.js';
import Level6 from './Level6.js';
import Level7 from './Level7.js';

export default class LevelManager {
  constructor() {
    this.level = 1;
    this.currentLevel = null;
    this.enemies = [];
    this.coins = [];
    this.platforms = [];
    this.powerups = [];
    this.boss = null;
    this.bosses = [];
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  
  loadLevel(levelNum) {
    this.level = levelNum;
    // RESET BOSS STATE (critical)
    this.boss = null;
    this.bosses = [];
    this.screenHeight = document.getElementById('game-canvas')?.height || window.innerHeight;
    this.screenWidth = document.getElementById('game-canvas')?.width || window.innerWidth;
    
    // Niveau 6 et 7 - Classes spécialisées
    if (levelNum === 6) {
      this.currentLevel = new Level6(this.screenWidth, this.screenHeight);
      this.currentLevel.generate();
      this.platforms = this.currentLevel.platforms;
      this.enemies = this.currentLevel.enemies;
      this.coins = this.currentLevel.coins;
      this.powerups = this.currentLevel.powerups;
      return;
    }
    
    if (levelNum === 7) {
      this.currentLevel = new Level7(this.screenWidth, this.screenHeight);
      this.currentLevel.generate();
      this.platforms = this.currentLevel.platforms;
      this.enemies = this.currentLevel.enemies;
      this.coins = this.currentLevel.coins;
      this.powerups = this.currentLevel.powerups;
      this.bosses = this.currentLevel.getBosses();
      return;
    }
    
    // Niveaux 1-5 - Générateur ancien
    this.platforms = this.generatePlatforms(this.screenWidth, this.screenHeight, levelNum);
    this.enemies = this.generateEnemies(levelNum, this.platforms);
    this.coins = this.generateCoins(this.platforms, levelNum);
    this.powerups = this.generatePowerups(levelNum, this.platforms);
    
    // Boss niveau
    if (levelNum >= 3 && levelNum <= 5) {
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
  
  generatePowerups(platforms, level) {
    const powerups = [];
    
    // Niveaux 6-7: New power-ups
    if (level === 6) {
      powerups.push({
        x: this.screenWidth / 2,
        y: 150,
        type: 'timeStop',
        collected: false
      });
      return powerups;
    }
    
    if (level === 7) {
      // 7 power-ups niveau 7
      return [
        { x: 100, y: 100, type: 'doubleJump', collected: false },
        { x: this.screenWidth - 100, y: 150, type: 'shield', collected: false },
        { x: this.screenWidth / 2 - 50, y: 300, type: 'speed', collected: false },
        { x: this.screenWidth / 2 + 50, y: 200, type: 'timeStop', collected: false },
        { x: 150, y: 250, type: 'magnet', collected: false },
        { x: this.screenWidth - 150, y: 350, type: 'invisibility', collected: false }
      ];
    }
    
    // Niveaux 1-5: Anciens power-ups
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
  
  update(delta) {
    if (this.currentLevel) {
      this.currentLevel.update?.(delta);
    }
    
    // Update boss projectiles
    if (this.bosses) {
      this.bosses.forEach(boss => {
        if (boss.getProjectiles) {
          const projectiles = boss.getProjectiles();
          // Update projectiles logic here
        }
      });
    }
  }
  
  render(ctx) {
    if (this.currentLevel) {
      this.currentLevel.render(ctx);
    } else {
      // Render platforms
      this.platforms.forEach(plat => {
        ctx.fillStyle = '#333';
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
      });
    }
  }
  
  getBosses() {
    if (this.bosses && this.bosses.length > 0) {
      return this.bosses;
    }
    return this.boss ? [this.boss] : [];
  }
  
  resize(width, height) {
    this.screenWidth = width;
    this.screenHeight = height;
  }
}
