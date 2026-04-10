// 🎮 Rush Platformer - Core Game Class
// Architecture: ES6 Module

import Player from './entities/Player';
import Enemy from './entities/Enemy';
import Coin from './entities/Coin';
import Particle from './entities/Particle';
import UIManager from './ui/UIManager';
import Physics from './systems/Physics';
import LevelManager from './levels/LevelManager';

export default class Game {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.uiManager = new UIManager();
    
    this.state = {
      running: false,
      score: 0,
      level: 1,
      timeLeft: 60,
      lastTime: 0,
      enemies: [],
      players: [],
      coins: [],
      particles: []
    };
    
    this.physics = new Physics();
    this.levelManager = new LevelManager();
  }
  
  start() {
    this.state.running = true;
    this.state.score = 0;
    this.state.timeLeft = 60;
    this.levelManager.loadLevel(1);
    this.reset();
    this.state.lastTime = performance.now();
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  reset() {
    this.player = new Player(100, 300);
    this.state.enemies = this.levelManager.enemies;
    this.state.coins = this.levelManager.coins;
    this.state.particles = [];
    this.player.health = 100;
  }
  
  resize() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
    this.levelManager.resize(this.canvas.width, this.canvas.height);
  }
  
  gameLoop(timestamp) {
    if (!this.state.running) return;
    
    const deltaTime = timestamp - this.state.lastTime;
    this.state.lastTime = timestamp;
    
    this.update(deltaTime);
    this.render();
    
    requestAnimationFrame(this.gameLoop.bind(this));
  }
  
  update(deltaTime) {
    this.player.update(deltaTime);
    
    // Update enemies
    this.state.enemies.forEach(enemy => enemy.update(deltaTime));
    
    // Update coins
    this.state.coins.forEach(coin => {
      if (!coin.collected && this.checkCollection(coin)) {
        coin.collected = true;
        this.state.score += 10 * this.state.level;
        this.uiManager.updateScore(this.state.score);
      }
    });
    
    // Update timer
    this.state.timeLeft -= deltaTime / 1000;
    if (this.state.timeLeft <= 0) {
      this.gameOver(true);
      return;
    }
    
    // Check collisions with enemies
    this.state.enemies.forEach(enemy => {
      if (this.checkCollision(this.player, enemy)) {
        this.player.health -= 10;
        this.uiManager.updateHealth(this.player.health);
        this.createParticles(this.player.x + 20, this.player.y + 20, 'orange', 8);
        
        if (this.player.health <= 0) {
          this.gameOver(false);
        }
      }
    });
    
    // Update particles
    this.state.particles.forEach((p, i) => {
      p.update(deltaTime);
      if (p.life <= 0) this.state.particles.splice(i, 1);
    });
    
    // Update UI
    this.uiManager.updateTimer(this.state.timeLeft);
    this.uiManager.updateLevel(this.state.level);
  }
  
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw platforms (simplified - use actual platforms from level)
    this.renderPlatforms();
    
    // Draw entities
    this.state.coins.forEach(coin => coin.render(this.ctx));
    this.state.enemies.forEach(enemy => enemy.render(this.ctx));
    this.player.render(this.ctx);
    
    // Draw particles
    this.state.particles.forEach(p => p.render(this.ctx));
  }
  
  renderPlatforms() {
    // Simplified - would use levelManager.platforms in full version
    this.ctx.fillStyle = '#4CAF50';
    this.ctx.fillRect(0, this.canvas.height - 60, this.canvas.width, 60);
  }
  
  checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width &&
           obj1.x + obj1.width > obj2.x &&
           obj1.y < obj2.y + obj2.height &&
           obj1.y + obj1.height > obj2.y;
  }
  
  checkCollection(coin) {
    const dx = (this.player.x + 20) - coin.x;
    const dy = (this.player.y + 20) - coin.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    return dist < 30;
  }
  
  createParticles(x, y, color, count) {
    for (let i = 0; i < count; i++) {
      this.state.particles.push(new Particle(x, y, color));
    }
  }
  
  gameOver(won) {
    this.state.running = false;
    if (won) {
      this.uiManager.showVictory(this.state.score, this.state.timeLeft);
    } else {
      this.uiManager.showGameOver(this.state.score);
    }
  }
}
