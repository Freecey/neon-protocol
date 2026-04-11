// 🎮 NEON PROTOCOL v5.3 - INLINE VERSION (No modules required)
// Directly includes all dependencies without ES6 imports

// Initialize all systems
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Global game state
window.gameState = {
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

// Global player object
window.player = {
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

// Global functions
window.startGame = function() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('game-over-screen').classList.add('hidden');
  
  window.gameState.running = true;
  window.gameState.score = 0;
  window.gameState.timeLeft = 60;
  window.gameState.lastTime = performance.now();
  
  window.resizeCanvas();
  window.initLevel();
  window.render();
  
  // Start game loop
  requestAnimationFrame(window.gameLoop);
};

window.restartGame = function() {
  document.getElementById('start-screen').classList.remove('hidden');
  document.getElementById('game-over-screen').classList.add('hidden');
  
  window.gameState.score = 0;
  window.gameState.timeLeft = 60;
  
  window.resizeCanvas();
  window.initLevel();
  window.render();
};

// Expose all critical functions to window
window.initLevel = window.initLevel || function() {
  // Default implementation until actual initLevel is defined
  console.log('initLevel called');
};

window.resizeCanvas = window.resizeCanvas || function() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
};

window.render = window.render || function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

window.gameLoop = window.gameLoop || function() {
  // Default game loop
};

console.log('NEON PROTOCOL v5.3 loaded!');
