// 🎮 UI Manager
// Handles all UI elements and interactions

export default class UIManager {
  constructor() {
    this.scoreElement = document.getElementById('score');
    this.timerElement = document.getElementById('timer');
    this.levelElement = document.getElementById('level');
    this.healthFill = document.getElementById('health-fill');
    this.startScreen = document.getElementById('start-screen');
    this.gameOverScreen = document.getElementById('game-over-screen');
    this.gameOverTitle = document.getElementById('game-over-title');
    this.gameOverMessage = document.getElementById('game-over-message');
  }
  
  showGameUI() {
    if (this.scoreElement) this.scoreElement.parentElement.classList.remove('hidden');
    if (this.timerElement) this.timerElement.classList.remove('hidden');
    if (this.levelElement) this.levelElement.parentElement.classList.remove('hidden');
    if (document.getElementById('controls-hint')) {
      document.getElementById('controls-hint').classList.remove('hidden');
    }
    if (document.getElementById('health-bar')) {
      document.getElementById('health-bar').classList.remove('hidden');
    }
  }
  
  hideAllUI() {
    if (this.scoreElement) this.scoreElement.parentElement.classList.add('hidden');
    if (this.timerElement) this.timerElement.classList.add('hidden');
    if (this.levelElement) this.levelElement.parentElement.classList.add('hidden');
    if (document.getElementById('controls-hint')) {
      document.getElementById('controls-hint').classList.add('hidden');
    }
    if (document.getElementById('health-bar')) {
      document.getElementById('health-bar').classList.add('hidden');
    }
  }
  
  updateScore(score) {
    if (this.scoreElement) {
      this.scoreElement.textContent = score;
    }
  }
  
  updateTimer(seconds) {
    if (this.timerElement) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      this.timerElement.textContent = 
        `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      
      // Change color when urgent
      if (seconds < 10) {
        this.timerElement.style.background = 'rgba(255, 0, 0, 0.9)';
      } else {
        this.timerElement.style.background = 'rgba(255, 69, 0, 0.9)';
      }
    }
  }
  
  updateLevel(level) {
    if (this.levelElement) {
      this.levelElement.textContent = level;
    }
  }
  
  updateHealth(health) {
    if (this.healthFill) {
      const percentage = Math.max(0, Math.min(100, health));
      this.healthFill.style.width = percentage + '%';
      
      // Color based on health
      if (percentage > 60) {
        this.healthFill.style.background = 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)';
      } else if (percentage > 30) {
        this.healthFill.style.background = 'linear-gradient(90deg, #FFC107 0%, #FF9800 100%)';
      } else {
        this.healthFill.style.background = 'linear-gradient(90deg, #F44336 0%, #E91E63 100%)';
      }
    }
  }
  
  showVictory(score, timeLeft) {
    this.gameOverScreen.classList.remove('hidden');
    this.gameOverTitle.textContent = '🎉 Victoire !';
    this.gameOverTitle.style.color = '#FFD700';
    this.gameOverMessage.textContent = `Temps restant: ${Math.floor(timeLeft)}s - Score: ${score}`;
  }
  
  showGameOver(score) {
    this.gameOverScreen.classList.remove('hidden');
    this.gameOverTitle.textContent = '💀 Game Over';
    this.gameOverTitle.style.color = '#FF6B6B';
    this.gameOverMessage.textContent = `Score final: ${score} - Vous avez été éliminé !`;
  }
  
  showStartScreen() {
    this.startScreen.classList.remove('hidden');
  }
  
  hideStartScreen() {
    this.startScreen.classList.add('hidden');
  }
}
