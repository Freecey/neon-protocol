// RUSH PLATFORMER - Game Logic
// Created for JP's Challenge

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Game state
let gameState = {
  running: false,
  score: 0,
  level: 1,
  timeLeft: 60,
  lastTime: 0,
  enemies: [],
  platforms: [],
  coins: [],
  particles: []
};

// Player
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
  health: 100
};

// Input handling
const keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
    e.preventDefault();
  }
});
document.addEventListener('keyup', (e) => keys[e.code] = false);

// Canvas sizing
function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  initLevel();
}
window.addEventListener('resize', resizeCanvas);

// Level initialization
function initLevel() {
  gameState.platforms = [];
  gameState.enemies = [];
  gameState.coins = [];
  gameState.particles = [];
  player.health = 100;
  player.x = 100;
  player.y = 300;
  player.vx = 0;
  player.vy = 0;

  // Ground platform
  gameState.platforms.push({
    x: 0,
    y: canvas.height - 60,
    width: canvas.width,
    height: 60,
    type: 'ground'
  });

  // Generate platforms
  platformGenerator(canvas.width, canvas.height - 60);
  
  // Generate enemies
  enemyGenerator();
  
  // Generate coins
  coinGenerator();
}

function platformGenerator(screenWidth, groundY) {
  // Create random platforms
  for (let i = 0; i < 15; i++) {
    const x = 150 + Math.random() * (screenWidth - 400);
    const y = 150 + Math.random() * (groundY - 250);
    const width = 80 + Math.random() * 120;
    
    // Don't place too close to other platforms
    let tooClose = false;
    for (const plat of gameState.platforms) {
      const distX = Math.abs(x - plat.x);
      const distY = Math.abs(y - plat.y);
      if (distX < 100 && distY < 50) tooClose = true;
    }
    
    if (!tooClose) {
      gameState.platforms.push({
        x: x,
        y: y,
        width: width,
        height: 20,
        type: 'platform'
      });
    }
  }
}

function enemyGenerator() {
  const enemyTypes = ['walker', 'flyer', 'bobber'];
  
  for (let i = 0; i < 5 + gameState.level; i++) {
    const type = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
    const plat = gameState.platforms[Math.floor(Math.random() * gameState.platforms.length)];
    
    gameState.enemies.push({
      x: plat.x + plat.width / 2 - 20,
      y: plat.y - 40,
      width: 40,
      height: 40,
      type: type,
      vx: type === 'walker' ? (Math.random() > 0.5 ? 2 : -2) : 0,
      vy: type === 'flyer' ? (Math.random() > 0.5 ? 1 : -1) : 0,
      vyBob: type === 'bobber' ? -2 : 0,
      bobSpeed: 0.03 + Math.random() * 0.02,
      baseY: plat.y - 40,
      patrolRange: 100,
      direction: Math.random() > 0.5 ? 1 : -1,
      lastChange: Date.now()
    });
  }
}

function coinGenerator() {
  for (let i = 0; i < 20; i++) {
    const plat = gameState.platforms[Math.floor(Math.random() * gameState.platforms.length)];
    gameState.coins.push({
      x: plat.x + plat.width / 2,
      y: plat.y - 60 - Math.random() * 80,
      size: 15,
      collected: false
    });
  }
}

// Game loop
function gameLoop(timestamp) {
  if (!gameState.running) return;
  
  const deltaTime = timestamp - gameState.lastTime;
  gameState.lastTime = timestamp;
  
  update(deltaTime);
  render();
  
  gameState.lastTime = timestamp;
  requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
  // Player movement
  if (keys['ArrowLeft'] || keys['KeyA']) player.vx = -player.speed;
  else if (keys['ArrowRight'] || keys['KeyD']) player.vx = player.speed;
  else player.vx = 0;
  
  // Jump
  if ((keys['Space'] || keys['ArrowUp'] || keys['KeyW']) && player.grounded) {
    player.vy = player.jumpForce;
    player.grounded = false;
  }
  
  // Fast fall
  if (keys['KeyS'] || keys['ArrowDown']) {
    player.vy += player.gravity * 2;
  }
  
  // Apply gravity
  player.vy += player.gravity;
  
  // Update player position
  player.x += player.vx;
  player.y += player.vy;
  
  // Screen boundaries
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  
  // Ground platform collision
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
        }
      }
    }
  }
  
  // Fall off screen
  if (player.y > canvas.height) {
    player.health -= 25;
    player.y = 100;
    player.vy = 0;
    createParticles(player.x + player.width/2, player.y + player.height, 'red', 10);
  }
  
  // Update enemies
  updateEnemies(deltaTime);
  
  // Coin collection
  updateCoins();
  
  // Update timer
  updateTimer();
  
  // Update health bar
  updateHealthBar();
  
  // Update particles
  updateParticles();
  
  // Check game over
  if (player.health <= 0) {
    gameOver(false);
  } else if (gameState.timeLeft <= 0) {
    gameOver(true);
  }
}

function updateEnemies(deltaTime) {
  for (const enemy of gameState.enemies) {
    const now = Date.now();
    
    switch (enemy.type) {
      case 'walker':
        enemy.x += enemy.vx;
        // Patrol
        if (enemy.x < enemy.startX - enemy.patrolRange || 
            enemy.x > enemy.startX + enemy.patrolRange ||
            now - enemy.lastChange > 2000) {
          enemy.vx *= -1;
          enemy.direction *= -1;
          enemy.lastChange = now;
        }
        break;
        
      case 'flyer':
        enemy.x += enemy.vx;
        enemy.y += enemy.vy;
        // Bounce off walls
        if (enemy.x < 50 || enemy.x > canvas.width - 50) {
          enemy.vx *= -1;
        }
        // Bounce vertically
        if (enemy.y < 100 || enemy.y > canvas.height - 100) {
          enemy.vy *= -1;
        }
        break;
        
      case 'bobber':
        enemy.y = enemy.baseY + Math.sin(now * enemy.bobSpeed) * 30;
        enemy.x += Math.sin(now * 0.002) * 1;
        break;
    }
    
    // Collision with player
    if (checkCollision(player, enemy)) {
      player.health -= 10;
      player.vy = -8;
      player.vx = (player.x < enemy.x) ? -5 : 5;
      createParticles(player.x + player.width/2, player.y + player.height/2, 'orange', 8);
    }
  }
}

function updateCoins() {
  for (const coin of gameState.coins) {
    if (coin.collected) continue;
    
    // Check collection
    const dx = (player.x + player.width/2) - coin.x;
    const dy = (player.y + player.height/2) - coin.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    
    if (dist < player.width/2 + coin.size) {
      coin.collected = true;
      gameState.score += 10 * gameState.level;
      updateScore();
      createParticles(coin.x, coin.y, 'gold', 5);
    }
  }
}

function updateTimer() {
  gameState.timeLeft -= 0.016; // ~60fps
  if (gameState.timeLeft < 0) gameState.timeLeft = 0;
  
  const minutes = Math.floor(gameState.timeLeft / 60);
  const seconds = Math.floor(gameState.timeLeft % 60);
  document.getElementById('timer').textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateScore() {
  document.getElementById('score').textContent = gameState.score;
}

function updateHealthBar() {
  const healthFill = document.getElementById('health-fill');
  healthFill.style.width = Math.max(0, player.health) + '%';
}

function createParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    gameState.particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 6,
      vy: (Math.random() - 0.5) * 6,
      life: 1,
      color: color,
      size: 3 + Math.random() * 4
    });
  }
}

function updateParticles() {
  for (let i = gameState.particles.length - 1; i >= 0; i--) {
    const p = gameState.particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.03;
    if (p.life <= 0) {
      gameState.particles.splice(i, 1);
    }
  }
}

function render() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw platforms
  ctx.fillStyle = '#666';
  for (const plat of gameState.platforms) {
    ctx.fillStyle = plat.type === 'ground' ? '#4CAF50' : '#757575';
    ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
    
    // Platform detail
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(plat.x, plat.y, plat.width, plat.height);
  }
  
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
  
  // Draw player
  ctx.fillStyle = '#4CAF50';
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
  
  // Draw particles
  for (const p of gameState.particles) {
    ctx.globalAlpha = p.life;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, p.size, p.size);
    ctx.globalAlpha = 1;
  }
}

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

// Game control functions
function startGame() {
  if (document.getElementById('level-transition')) document.getElementById('level-transition').remove();
  
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('score-board').classList.remove('hidden');
  document.getElementById('level-info').classList.remove('hidden');
  document.getElementById('timer').classList.remove('hidden');
  document.getElementById('controls-hint').classList.remove('hidden');
  document.getElementById('health-bar').classList.remove('hidden');
  
  gameState.running = true;
  gameState.score = 0;
  gameState.timeLeft = 60 + (gameState.level - 1) * 10;
  gameState.lastTime = performance.now();
  
  updateScore();
  setTimeout(() => document.getElementById('level').textContent = gameState.level, 100);
  
  requestAnimationFrame(gameLoop);
}

function gameOver(won) {
  gameState.running = false;
  
  // Si le joueur a survécu et qu'on peut passer au niveau suivant
  if (won && gameState.level < 5) {
    const transitionMsg = document.createElement('div');
    transitionMsg.id = 'level-transition';
    transitionMsg.style.position = 'fixed';
    transitionMsg.style.top = '50%';
    transitionMsg.style.left = '50%';
    transitionMsg.style.transform = 'translate(-50%, -50%)';
    transitionMsg.style.fontSize = '48px';
    transitionMsg.style.color = '#00BCD4';
    transitionMsg.style.fontWeight = 'bold';
    transitionMsg.style.textShadow = '0 0 20px #00BCD4';
    transitionMsg.style.zIndex = '1000';
    transitionMsg.style.padding = '20px';
    transitionMsg.style.background = 'rgba(0,0,0,0.8)';
    transitionMsg.style.borderRadius = '10px';
    transitionMsg.innerHTML = `NIVEAU ${gameState.level} TERMINÉ !<br>Prêt pour le niveau ${gameState.level + 1}?`;
    document.body.appendChild(transitionMsg);
    
    setTimeout(() => {
      startNextLevel();
      transitionMsg.remove();
    }, 2000);
    
    return;
  }
  
  document.getElementById('game-over-screen').classList.remove('hidden');
  
  const title = document.getElementById('game-over-title');
  const message = document.getElementById('game-over-message');
  
  if (won) {
    title.textContent = '🎉 Victoire Totale !';
    title.style.color = '#FFD700';
    message.textContent = `Score final: ${gameState.score} - FÉLICITIONS! Vous avez terminé tous les niveaux!`;
  } else {
    title.textContent = '💀 Game Over';
    title.style.color = '#FF6B6B';
    message.textContent = `Score final: ${gameState.score} - Vous avez été éliminé !`;
  }
}

function restartGame() {
  gameState.level = 1;
  gameState.running = false;
  gameState.score = 0;
  gameState.timeLeft = 60;
  
  if (document.getElementById('level-transition')) document.getElementById('level-transition').remove();
  
  document.getElementById('start-screen').classList.remove('hidden');
  document.getElementById('game-over-screen').classList.add('hidden');
  document.getElementById('score-board').classList.add('hidden');
  document.getElementById('level-info').classList.add('hidden');
  document.getElementById('timer').classList.add('hidden');
  document.getElementById('controls-hint').classList.add('hidden');
  document.getElementById('health-bar').classList.add('hidden');
  
  initLevel();
  render();
}

function startNextLevel() {
  gameState.level++;
  gameState.score = 0;
  gameState.timeLeft = 60 + (gameState.level - 1) * 10;
  gameState.running = true;
  gameState.lastTime = performance.now();
  
  document.getElementById('score-board').classList.remove('hidden');
  document.getElementById('level-info').classList.remove('hidden');
  document.getElementById('timer').classList.remove('hidden');
  document.getElementById('controls-hint').classList.remove('hidden');
  document.getElementById('health-bar').classList.remove('hidden');
  document.getElementById('level').textContent = gameState.level;
  
  initLevel();
  requestAnimationFrame(gameLoop);
}

// Initialize
resizeCanvas();
initLevel();
render();
