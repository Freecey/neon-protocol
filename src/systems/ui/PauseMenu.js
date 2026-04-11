// 🎮 PAUSE MENU SYSTEM - NEON PROTOCOL
// Pause, Resume, Quit to menu, Controls recap

class PauseMenu {
  constructor() {
    this.visible = false;
    this.canvas = document.getElementById('game-canvas');
    this.overlay = null;
    this.buttons = {};
    
    this.init();
  }
  
  init() {
    this.createOverlay();
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && window.gameState?.running) {
        e.preventDefault();
        this.toggle();
      }
    });
    console.log('🎮 Pause menu initialized! (Press ESC to pause)');
  }
  
  createOverlay() {
    const existing = document.getElementById('pause-overlay');
    if (existing) existing.remove();
    
    this.overlay = document.createElement('div');
    this.overlay.id = 'pause-overlay';
    this.overlay.className = 'hidden';
    this.overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(13, 13, 26, 0.95);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(5px);
      animation: fadeIn 0.3s ease-out;
    `;
    
    // Title
    const title = document.createElement('div');
    title.textContent = '⏸️ PAUSED';
    title.style.cssText = `
      font-size: 48px;
      font-weight: bold;
      color: #00bcd4;
      font-family: 'JetBrains Mono', monospace;
      text-shadow: 0 0 20px rgba(0, 188, 212, 0.8);
      margin-bottom: 40px;
      animation: pulse 2s infinite;
    `;
    
    // Stats
    const stats = document.createElement('div');
    stats.style.cssText = `
      font-size: 18px;
      color: #e0e0e0;
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 40px;
      text-align: center;
      line-height: 2;
    `;
    stats.innerHTML = `
      <div>Score: <strong id="pause-score">0</strong></div>
      <div>Niveau: <strong id="pause-level">1</strong></div>
      <div>Temps: <strong id="pause-timer">60</strong>s</div>
    `;
    
    // Buttons container
    const btnContainer = document.createElement('div');
    btnContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 300px;
    `;
    
    // Resume button
    this.buttons.resume = this.createButton('▶️ REPRENDRE', () => this.resume(), '#00bcd4');
    
    // Restart button
    this.buttons.restart = this.createButton('🔄 RECOMMENCER', () => this.restart(), '#4CAF50');
    
    // Quit button
    this.buttons.quit = this.createButton('⏹️ MENU PRINCIPAL', () => this.quit(), '#F44336');
    
    // Controls help
    const controls = document.createElement('div');
    controls.style.cssText = `
      margin-top: 40px;
      font-size: 14px;
      color: #888;
      font-family: 'JetBrains Mono', monospace;
      text-align: center;
      line-height: 1.6;
    `;
    controls.innerHTML = `
      <div><strong>CONTROLS CLAVIER</strong></div>
      <div>← → = Bouger</div>
      <div>Espace = Sauter</div>
      <div>D = Chuter rapide</div>
      <div>ESC = Pause</div>
    `;
    
    this.overlay.appendChild(title);
    this.overlay.appendChild(stats);
    this.overlay.appendChild(btnContainer);
    this.overlay.appendChild(controls);
    
    // Add to game container
    const gameContainer = this.canvas.parentElement;
    if (gameContainer) {
      gameContainer.appendChild(this.overlay);
    }
  }
  
  createButton(text, onClick, color) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.cssText = `
      width: 100%;
      padding: 15px 25px;
      font-size: 18px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: bold;
      color: #fff;
      background: ${color};
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
    btn.onmouseover = () => {
      btn.style.transform = 'scale(1.05)';
      btn.style.boxShadow = `0 6px 20px rgba(${this.hexToRgb(color)}, 0.5)`;
    };
    btn.onmouseout = () => {
      btn.style.transform = 'scale(1)';
      btn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
    };
    btn.onclick = (e) => {
      e.preventDefault();
      onClick();
    };
    
    return btn;
  }
  
  hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
  }
  
  toggle() {
    if (this.visible) {
      this.hide();
    } else {
      this.show();
    }
  }
  
  show() {
    if (this.overlay) {
      this.overlay.classList.remove('hidden');
      this.visible = true;
      
      // Update stats
      if (window.gameState) {
        document.getElementById('pause-score').textContent = window.gameState.score;
        document.getElementById('pause-level').textContent = window.gameState.level;
        document.getElementById('pause-timer').textContent = window.gameState.timeLeft;
      }
      
      // Add overlay cursor
      this.overlay.style.cursor = 'default';
      
      console.log('⏸️ Game paused');
    }
  }
  
  hide() {
    if (this.overlay) {
      this.overlay.classList.add('hidden');
      this.visible = false;
      
      // Remove overlay cursor
      this.overlay.style.cursor = 'default';
      
      console.log('▶️ Game resumed');
    }
  }
  
  resume() {
    this.hide();
    if (window.gameState && !window.gameState.running) {
      window.gameState.running = true;
    }
  }
  
  restart() {
    this.hide();
    
    // Call restart function if exists
    if (window.restartGame) {
      window.restartGame();
    } else {
      console.error('❌ restartGame not found');
    }
  }
  
  quit() {
    this.hide();
    
    // Go to main menu
    if (window.gameState) {
      window.gameState.running = false;
    }
    
    document.getElementById('start-screen').classList.remove('hidden');
    document.getElementById('game-over-screen').classList.add('hidden');
    this.overlay.classList.add('hidden');
    
    console.log('🏠 Returned to main menu');
  }
  
  update() {
    if (!this.visible) return;
    
    // Update stats continuously
    if (window.gameState && window.gameState.timeLeft > 0) {
      document.getElementById('pause-score').textContent = window.gameState.score;
      document.getElementById('pause-timer').textContent = Math.ceil(window.gameState.timeLeft);
    }
  }
  
  dispose() {
    if (this.overlay) {
      this.overlay.remove();
    }
  }
}

// Export
if (typeof window !== 'undefined') {
  window.PauseMenu = PauseMenu;
}

export { PauseMenu };
