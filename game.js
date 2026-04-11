// 🎮 NEON PROTOCOL v5.2 - INTÉGRATION COMPLÈTE
// Menu + Progression + Transitions + Particules + Combo + Leaderboard + Achievements

// GLOBAL EXPOSE (CRITICAL BEFORE ANYTHING ELSE)
if (typeof window !== 'undefined') {
  window.__NEON_PROTOCOL_GLOBALS__ = {};
}

import TransitionSystem from './src/systems/TransitionSystem.js';
import { LeaderboardSystem } from './src/systems/LeaderboardSystem.js';
import { AchievementSystem } from './src/systems/AchievementSystem.js';
import ParticleSystem2 from './src/systems/ParticleSystem2.js';
import ComboSystem from './src/systems/ComboSystem.js';
import { PowerUpSystem } from './src/systems/PowerUpSystem.js';
import MenuSystem from './src/systems/ui/MenuSystem.js';
import LevelManager from './src/levels/LevelManager.js';
import { PauseMenu } from './src/systems/ui/PauseMenu.js';
import { AudioSystem } from './src/systems/AudioSystem.js';
import Boss from './src/entities/Boss.js';
// Mobile touch controls will be loaded dynamically
let MobileTouchControls = null;

// Load mobile controls if on mobile device
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  import('./src/mobile/mobile-controls-complete.js').then(mod => {
    MobileTouchControls = mod.MobileTouchControls;
    if (MobileTouchControls) {
      const mobile = new MobileTouchControls();
    }
  }).catch(() => console.log('Mobile controls not available'));
}

// EXPOSE TO GLOBAL BEFORE BUNDLE (This must happen at module level)
Object.assign(typeof window !== 'undefined' ? window.__NEON_PROTOCOL_GLOBALS__ : {}, {
  TransitionSystem,
  LeaderboardSystem,
  AchievementSystem,
  ParticleSystem2,
  ComboSystem,
  PowerUpSystem,
  MenuSystem,
  LevelManager,
  Boss
});

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// INITIALISER TOUS LES SYSTÈMES
const transitions = new TransitionSystem();
const leaderboard = new LeaderboardSystem();
const achievements = new AchievementSystem(leaderboard);
const combo = new ComboSystem();
const audio = new AudioSystem();
const pauseMenu = new PauseMenu();
const particles = new ParticleSystem2();
const powerUps = new PowerUpSystem();
const menu = new MenuSystem();
const levelManager = new LevelManager();

// STATE DU JEU
const gameState = {
  running: false,
  score: 0,
  level: 1,
  timeLeft: 60,
  lastTime: 0,
  enemies: [],
  platforms: [],
  coins: [],
  powerUpsList: [],
  bosses: [],
  particles: []
};

// PLAYER
const player = {
  x: 100,
  y: 300,
  width: 40,
  height: 40,
  vx: 0,
  vy: 0,
  speed: 5,
  jumpForce: -15,
  gravity: 0.6,
  grounded: false,
  health: 100,
  doubleJumpEnabled: false,
  jumpCount: 0,
  shielded: false,
  shieldDuration: 0,
  speedBoost: false,
  speedBoostDuration: 0,
  invisible: false,
  invisibleDuration: 0
};

// INPUT
const keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (keys['ArrowUp'] || keys['ArrowDown'] || keys['ArrowLeft'] || keys['ArrowRight'] || keys['Space']) {
    e.preventDefault();
  }
  if (e.code === 'Escape') {
    pauseMenu.toggle();
  }
  if (e.code === 'KeyM') {
    audio.toggleAll();
  }
  if (e.code === 'KeyR') {
    if (window.restartGame) window.restartGame();
  }
});
document.addEventListener('keyup', (e) => keys[e.code] = false);

// CANVAS SIZE
function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// LEVEL INITIALIZATION - FIX FOR MISSING FUNCTION
function initLevel() {
  // Initialize first level
  loadLevel(1);
  render();
  updateUI();
  
  // Show intro message
  const message = document.createElement('div');
  message.innerHTML = '<strong>🎮 NEON PROTOCOL</strong><br>Aide JP!<br>Succès : Survivre 60s';
  message.style.cssText = 'position:absolute; top:40%; left:50%; transform:translate(-50%,-50%); color:#00bcd4; font-size:24px; font-family:JetBrains Mono; text-align:center; animation:fadeIn 1s;';
  document.getElementById('game-canvas').parentElement.appendChild(message);
  
  setTimeout(() => message.remove(), 3000);
}

// LEVEL INITIALIZATION
function loadLevel(levelNum) {
  gameState.level = levelNum;
  gameState.timeLeft = 60 + (levelNum - 1) * 10;
  gameState.running = true;
  gameState.lastTime = performance.now();
  gameState.score = 0;
  
  // Reset player
  player.x = 100;
  player.y = 300;
  player.health = 100;
  player.vx = 0;
  player.vy = 0;
  player.grounded = false;
  player.speedBoost = false;
  player.invisible = false;
  
  // Use LevelManager
  levelManager.loadLevel(levelNum);
  gameState.platforms = levelManager.platforms;
  gameState.enemies = levelManager.enemies;
  gameState.coins = levelManager.coins;
  gameState.powerUpsList = levelManager.powerups;
  gameState.bosses = levelManager.getBosses();
  
  // Update UI
  updateScore();
  document.getElementById('level').textContent = gameState.level;
  document.getElementById('score-board').classList.remove('hidden');
  document.getElementById('level-info').classList.remove('hidden');
  document.getElementById('timer').classList.remove('hidden');
  document.getElementById('controls-hint').classList.remove('hidden');
  document.getElementById('health-bar').classList.remove('hidden');
  
  // Start transition
  if (gameState.level > 1) {
    transitions.startTransition('levelUp', `NIVEAU ${gameState.level} COMMENCÉ!`);
  }
}

// GAME LOOP
function gameLoop(timestamp) {
  if (!gameState.running) return;
  
  const deltaTime = timestamp - gameState.lastTime;
  gameState.lastTime = timestamp;
  
  update(deltaTime);
  render();
  
  requestAnimationFrame(gameLoop);
}

// UPDATE
function update(deltaTime) {
  // Player movement
  let currentSpeed = player.speed;
  if (player.speedBoost) currentSpeed *= 2;
  
  if (keys['ArrowLeft'] || keys['KeyA']) player.vx = -currentSpeed;
  else if (keys['ArrowRight'] || keys['KeyD']) player.vx = currentSpeed;
  else player.vx = 0;
  
  // Jump
  if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && player.grounded) {
    player.vy = player.jumpForce;
    player.grounded = false;
    player.jumpCount = 1;
    particles.jumpTrail(player.x + player.width/2, player.y + player.height);
    achievements.updateStats('jumps');
  }
  
  // Double jump
  if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && player.jumpCount === 1 && player.doubleJumpEnabled) {
    player.vy = player.jumpForce;
    player.jumpCount = 2;
    particles.burst(player.x + player.width/2, player.y + player.height, 8, '#4CAF50');
  }
  
  // Fast fall
  if (keys['KeyS'] || keys['ArrowDown']) {
    player.vy += player.gravity * 2;
  }
  
  // Gravity
  player.vy += player.gravity;
  
  // Update player position
  player.x += player.vx;
  player.y += player.vy;
  
  // Screen boundaries
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  
  // Ground collision
  player.grounded = false;
  for (const plat of gameState.platforms) {
    if (player.y + player.height >= plat.y &&
        player.y + player.height <= plat.y + player.vy + player.gravity + 5 &&
        player.x + player.width > plat.x &&
        player.x < plat.x + plat.width &&
        plat.type === 'ground') {
      player.y = plat.y - player.height;
      player.vy = 0;
      player.grounded = true;
      player.jumpCount = 0;
    }
  }
  
  // Platform collision
  if (!player.grounded) {
    for (const plat of gameState.platforms) {
      if (plat.type === 'platform') {
        if (player.vy > 0 &&
            player.y + player.height >= plat.y &&
            player.y + player.height <= plat.y + player.vy + 10 &&
            player.x + player.width > plat.x &&
            player.x < plat.x + plat.width) {
          player.y = plat.y - player.height;
          player.vy = 0;
          player.grounded = true;
          player.jumpCount = 0;
        }
      }
    }
  }
  
  // Fall off screen
  if (player.y > canvas.height) {
    player.health -= 25;
    player.y = 100;
    player.vy = 0;
    particles.hurtEffect(player.x + player.width/2, player.y);
  }
  
  // Update enemies
  updateEnemies();
  
  // Update coins
  updateCoins();
  
  // Update power-ups
  updatePowerUps();
  
  // Update timer
  gameState.timeLeft -= deltaTime / 1000;
  if (gameState.timeLeft < 0) gameState.timeLeft = 0;
  
  // Update timer UI
  const minutes = Math.floor(gameState.timeLeft / 60);
  const seconds = Math.floor(gameState.timeLeft % 60);
  document.getElementById('timer').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Update health bar
  const healthFill = document.getElementById('health-fill');
  if (healthFill) healthFill.style.width = Math.max(0, player.health) + '%';
  
  // Update particles
  particles.update(deltaTime);
  
  // Update transitions
  transitions.update(deltaTime);
  
  // Update combos
  combo.update(deltaTime);
  
  // Check game over
  if (player.health <= 0) {
    gameOver(false);
  } else if (gameState.timeLeft <= 0 && gameState.bosses.length === 0) {
    // Time up
    gameOver(true);
  }
  
  // Update power-up durations
  if (player.shielded && player.shieldDuration > 0) {
    player.shieldDuration--;
    if (player.shieldDuration <= 0) {
      player.shielded = false;
    }
  }
  
  if (player.speedBoost && player.speedBoostDuration > 0) {
    player.speedBoostDuration--;
    if (player.speedBoostDuration <= 0) {
      player.speedBoost = false;
    }
  }
  
  if (player.invisible && player.invisibleDuration > 0) {
    player.invisibleDuration--;
    if (player.invisibleDuration <= 0) {
      player.invisible = false;
    }
  }
}

// UPDATE ENEMIES
function updateEnemies() {
  // Check if all enemies defeated
  if (gameState.enemies.length === 0 && gameState.bosses.length === 0 && gameState.timeLeft <= 0) {
    gameOver(true);
    return;
  }
  
  for (let i = gameState.enemies.length - 1; i >= 0; i--) {
    const enemy = gameState.enemies[i];
    
    switch (enemy.type) {
      case 'walker':
        enemy.x += enemy.vx;
        if (Math.abs(enemy.x - enemy.startX) > enemy.patrolRange) {
          enemy.vx *= -1;
        }
        break;
        
      case 'flyer':
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;
        if (enemy.x < 50 || enemy.x > canvas.width - 50) {
          enemy.vx *= -1;
        }
        if (enemy.y < 100 || enemy.y > canvas.height - 100) {
          enemy.vy *= -1;
        }
        break;
        
      case 'bobber':
        const time = Date.now();
        enemy.y = enemy.baseY + Math.sin(time * enemy.bobSpeed) * 30;
        enemy.x += Math.sin(time * 0.002) * 1;
        break;
    }
    
    // Collision with player
    if (!player.invisible && checkCollision(player, enemy)) {
      if (player.shielded) {
        player.shielded = false;
        player.shieldDuration = 0;
        player.health = 100;
        particles.burst(player.x + player.width/2, player.y + player.height/2, 10, '#2196F3');
      } else if (checkCollision(player, {x: enemy.x, y: enemy.y, width: enemy.width - 20, height: enemy.height - 20})) {
        player.health -= 10;
        player.vy = -8;
        player.vx = (player.x < enemy.x) ? -5 : 5;
        particles.hurtEffect(player.x + player.width/2, player.y + player.height/2);
      }
    }
  }
}

// UPDATE COINS
function updateCoins() {
  for (let i = gameState.coins.length - 1; i >= 0; i--) {
    const coin = gameState.coins[i];
    if (coin.collected) continue;
    
    const dx = (player.x + player.width/2) - coin.x;
    const dy = (player.y + player.height/2) - coin.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    if (dist < player.width/2 + coin.size) {
      coin.collected = true;
      const value = coin.value || 10;
      const scored = combo.coinCollected(value);
      gameState.score += scored;
      achievements.updateStats('coinsCollected');
      leaderboard.data.levels[gameState.level].coinsCollected = 
        (leaderboard.data.levels[gameState.level].coinsCollected || 0) + 1;
      
      // Effect
      particles.collectCoin(coin.x, coin.y);
      updateScore();
    }
  }
}

// UPDATE POWER-UPS
function updatePowerUps() {
  for (let i = gameState.powerUpsList.length - 1; i >= 0; i--) {
    const pu = gameState.powerUpsList[i];
    if (pu.collected) continue;
    
    const dx = (player.x + player.width/2) - pu.x;
    const dy = (player.y + player.height/2) - pu.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    if (dist < player.width/2 + 20) {
      pu.collected = true;
      powerUps.activate(pu.type, player);
      achievements.updateStats('powerUpsUsed');
      particles.collectPowerUp(pu.x, pu.y, pu.type);
      
      // Apply effects
      switch (pu.type) {
        case 'doubleJump':
          player.doubleJumpEnabled = true;
          break;
        case 'shield':
          player.shielded = true;
          player.shieldDuration = 30 * 60; // 30s
          break;
        case 'speed':
          player.speedBoost = true;
          player.speedBoostDuration = 20 * 60; // 20s
          break;
        case 'freeze':
          // Freeze enemies logic (simplified)
          gameState.enemies.forEach(e => e.speed *= 0.5);
          break;
        case 'timeStop':
          achievements.updateStats('timeStopsUsed');
          break;
        case 'magnet':
          achievements.updateStats('magnetsUsed');
          break;
        case 'invisibility':
          player.invisible = true;
          player.invisibleDuration = 15 * 60; // 15s
          break;
      }
    }
  }
}

// RENDER
function render() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw platforms
  levelManager.render(ctx);
  
  // Draw coins
  for (const coin of gameState.coins) {
    if (coin.collected) continue;
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
    ctx.fillStyle = '#FFD700';
    ctx.fill();
    ctx.strokeStyle = '#FFA500';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
  }
  
  // Draw enemies
  for (const enemy of gameState.enemies) {
    ctx.fillStyle = getEnemyColor(enemy.type);
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    
    // Enemy face
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(enemy.x + 10, enemy.y + 15, 5, 0, Math.PI * 2);
    ctx.arc(enemy.x + 30, enemy.y + 15, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(enemy.x + 10, enemy.y + 15, 2, 0, Math.PI * 2);
    ctx.arc(enemy.x + 30, enemy.y + 15, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw bosses
  for (const boss of gameState.bosses) {
    // Boss body
    ctx.fillStyle = '#E91E63';
    ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
    
    // Boss health bar
    const healthPercent = boss.health / boss.maxHealth;
    ctx.fillStyle = '#333';
    ctx.fillRect(boss.x, boss.y - 12, boss.width, 8);
    ctx.fillStyle = healthPercent > 0.5 ? '#4CAF50' : healthPercent > 0.25 ? '#FFC107' : '#F44336';
    ctx.fillRect(boss.x, boss.y - 12, boss.width * healthPercent, 8);
  }
  
  // Draw player
  ctx.globalAlpha = player.invisible ? 0.3 : 1;
  ctx.fillStyle = player.shielded ? '#2196F3' : '#4CAF50';
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  // Player face
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(player.x + 10, player.y + 15, 5, 0, Math.PI * 2);
  ctx.arc(player.x + 30, player.y + 15, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(player.x + 10, player.y + 15, 2, 0, Math.PI * 2);
  ctx.arc(player.x + 30, player.y + 15, 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
  
  // Draw particles
  particles.render(ctx);
  
  // Draw transitions
  transitions.render(ctx);
  
  // Draw combo display
  if (combo.isComboActive()) {
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(combo.getComboText(), canvas.width - 100, 50);
  }
}

// HELPER FUNCTIONS
function getEnemyColor(type) {
  switch (type) {
    case 'walker': return '#FF6B6B';
    case 'flyer': return '#4ECDC4';
    case 'bobber': return '#FFE66D';
    default: return '#FF6B6B';
  }
}

function checkCollision(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

function updateScore() {
  document.getElementById('score').textContent = gameState.score;
  leaderboard.data.global.highest = Math.max(leaderboard.data.global.highest, gameState.score);
  leaderboard.save();
}

// GAME CONTROL
function startGame() {
  if (document.getElementById('level-transition')) document.getElementById('level-transition').remove();
  
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('menu-overlay')?.classList.add('hidden');
  
  // Initialize audio on first interaction
  audio.init();
  audio.playMusic();
  
  loadLevel(1);
  requestAnimationFrame(gameLoop);
}

function gameOver(won) {
  gameState.running = false;
  
  // Save score
  leaderboard.submitScore(gameState.level, gameState.score);
  
  // Check achievements
  achievements.updateStats('timeSurvived', Math.floor(gameState.timeLeft));
  
  // If won and level < 5
  if (won && gameState.level < 5) {
    transitions.startTransition('levelUp', `NIVEAU ${gameState.level} TERMINÉ!`);
    
    setTimeout(() => {
      startNextLevel();
    }, 2000);
    return;
  } else if (won && gameState.level === 5) {
    leaderboard.submitScore(0, gameState.score); // Global
    transitions.startTransition('victory', '🎉 VICTOIRE TOTALE! 🎉');
    particles.levelUp(canvas.width/2, canvas.height/2);
    
    setTimeout(() => {
      document.getElementById('game-over-screen').classList.remove('hidden');
      document.getElementById('game-over-title').textContent = '🎉 Victoire Totale !';
      document.getElementById('game-over-title').style.color = '#FFD700';
      document.getElementById('game-over-message').textContent = 
        `Score final: ${gameState.score} - FÉLICITIONS! Vous avez terminé tous les niveaux!`;
    }, 2000);
    return;
  } else {
    transitions.startTransition('gameOver', '💀 Game Over');
    setTimeout(() => {
      document.getElementById('game-over-screen').classList.remove('hidden');
      document.getElementById('game-over-title').textContent = '💀 Game Over';
      document.getElementById('game-over-title').style.color = '#FF6B6B';
      document.getElementById('game-over-message').textContent = 
        `Score final: ${gameState.score} - Vous avez été éliminé !`;
    }, 1000);
    return;
  }
}

function startNextLevel() {
  loadLevel(gameState.level + 1);
}

function restartGame() {
  if (document.getElementById('level-transition')) document.getElementById('level-transition').remove();
  
  document.getElementById('start-screen').classList.remove('hidden');
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('menu-overlay')?.classList.add('hidden');
  
  gameState.score = 0;
  gameState.timeLeft = 60;
  
  loadLevel(1);
  requestAnimationFrame(gameLoop);
}

// Initialize
resizeCanvas();
initLevel();
render();

// CRITICAL: Must be at the very end so functions are defined before exposing
(function() {
  if (typeof window !== 'undefined') {
    window.startGame = window.startGame || startGame;
    window.restartGame = window.restartGame || restartGame;
    window.startNextLevel = window.startNextLevel || startNextLevel;
    window.initLevel = window.initLevel || initLevel;
  }
  console.log('NEON PROTOCOL v5.3 ready!');
})();
