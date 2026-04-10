// 🎮 Timer System
// Handles game timer and countdowns

export default class Timer {
  constructor() {
    this.startTime = 0;
    this.totalTime = 0;
    this.elapsedTime = 0;
    this.isActive = false;
    this.callbacks = [];
  }
  
  start(duration, onExpire = null) {
    this.startTime = Date.now();
    this.totalTime = duration;
    this.elapsedTime = 0;
    this.isActive = true;
    
    if (onExpire) {
      this.callbacks.push(() => {
        onExpire();
        this.reset();
      });
    }
  }
  
  update(deltaTime) {
    if (!this.isActive) return;
    
    this.elapsedTime += deltaTime;
    
    // Check expiration
    if (this.elapsedTime >= this.totalTime) {
      this.isActive = false;
      this.callbacks.forEach(cb => cb());
    }
    
    return this.elapsedTime;
  }
  
  getTimeRemaining() {
    return Math.max(0, this.totalTime - this.elapsedTime);
  }
  
  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  reset() {
    this.isActive = false;
    this.elapsedTime = 0;
    this.callbacks = [];
  }
  
  pause() {
    this.isActive = false;
  }
  
  resume() {
    this.isActive = true;
  }
  
  addCallback(callback) {
    this.callbacks.push(callback);
  }
}
