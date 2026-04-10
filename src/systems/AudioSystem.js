// 🎮 Audio System
// Sound effects and music (optional)

export default class AudioSystem {
  constructor() {
    this.enabled = true;
    this.sounds = {
      jump: null,
      collect: null,
      hurt: null,
      gameOver: null,
      win: null
    };
    this.musicTrack = null;
  }
  
  // Initialize audio context (user interaction required first)
  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      console.log('Audio initialized');
    } catch (e) {
      console.warn('Audio not supported:', e);
      this.enabled = false;
    }
  }
  
  // Play simple beep sound
  playTone(freq, duration, type = 'square') {
    if (!this.enabled || !this.audioContext) return;
    
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    
    osc.type = type;
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
    
    osc.start(this.audioContext.currentTime);
    osc.stop(this.audioContext.currentTime + duration);
  }
  
  // Jump sound
  playJump() {
    this.playTone(400, 0.1, 'square');
  }
  
  // Coin collect sound
  playCollect() {
    this.playTone(1200, 0.1, 'sine');
    setTimeout(() => this.playTone(1600, 0.1, 'sine'), 50);
  }
  
  // Hurt sound
  playHurt() {
    this.playTone(200, 0.2, 'sawtooth');
  }
  
  // Game over sound
  playGameOver() {
    this.playTone(300, 0.3, 'sawtooth');
    setTimeout(() => this.playTone(250, 0.3, 'sawtooth'), 200);
    setTimeout(() => this.playTone(200, 0.5, 'sawtooth'), 400);
  }
  
  // Victory sound
  playWin() {
    [523, 659, 784, 1047].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.2, 'square'), i * 150);
    });
  }
  
  // Toggle audio
  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled && this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}
