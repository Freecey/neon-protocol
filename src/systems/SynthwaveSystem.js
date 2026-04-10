// 🎵 SYNTHWAVE SYSTEM - Musique synthétique générée
// Web Audio API + Oscillateurs

export default class SynthwaveSystem {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.loopId = null;
    this.theme = 'idle'; // idle, danger, boss, ultimate
    this.bassOscillator = null;
    this.bassGain = null;
    this.filter = null;
    this.delay = null;
    this.reverb = null;
  }
  
  init() {
    if (this.ctx) return;
    
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    
    // Create master chain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.3;
    
    // Bass synth
    this.createBassSynth();
    
    // Create delay effect
    this.createEffects();
  }
  
  createBassSynth() {
    this.bassGain = this.ctx.createGain();
    this.bassGain.gain.value = 0.2;
    
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 200;
    this.filter.Q.value = 1;
    
    this.masterGain.connect(this.bassGain);
    this.bassGain.connect(this.filter);
    this.filter.connect(this.ctx.destination);
  }
  
  createEffects() {
    // Delay
    this.delay = this.ctx.createDelay();
    this.delay.delayTime.value = 0.3;
    this.delayFeedback = this.ctx.createGain();
    this.delayFeedback.gain.value = 0.4;
    
    // Reverb (simple convolution)
    this.reverb = this.ctx.createConvolver();
    this.createReverbImpulse();
    
    // Connect
    this.masterGain.connect(this.delay);
    this.delay.connect(this.delayFeedback);
    this.delayFeedback.connect(this.delay);
    this.delay.connect(this.ctx.destination);
  }
  
  createReverbImpulse() {
    const duration = 2;
    const decay = 2;
    const rate = this.ctx.sampleRate;
    const length = rate * duration;
    const impulse = this.ctx.createBuffer(2, length, rate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (rate * decay));
      }
    }
    
    this.reverb.buffer = impulse;
  }
  
  playNote(frequency, duration, type = 'sine') {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.value = frequency;
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.1, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
  
  playBassNote(frequency) {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.value = frequency;
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, this.ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    
    osc.connect(gain);
    gain.connect(this.bassGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }
  
  playBassDrop() {
    if (!this.ctx) return;
    
    // Pitch sweep
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.3);
    
    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }
  
  playPowerUpSound() {
    // Bright rising arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.50];
    
    notes.forEach((note, i) => {
      setTimeout(() => {
        this.playNote(note, 0.2, 'sine');
      }, i * 50);
    });
  }
  
  playBossHurtSound() {
    // Dark descending
    const notes = [220, 196, 174.61, 146.83];
    
    notes.forEach((note, i) => {
      setTimeout(() => {
        this.playNote(note, 0.3, 'sawtooth');
      }, i * 100);
    });
  }
  
  playVictorySound() {
    // Triumphant major chord
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    
    notes.forEach((note, i) => {
      setTimeout(() => {
        this.playNote(note, 1.0, 'sine');
      }, i * 100);
    });
  }
  
  startMusic(theme = 'idle') {
    if (!this.ctx) this.init();
    
    this.theme = theme;
    this.isPlaying = true;
    this.currentTime = 0;
    
    if (this.loopId) return;
    
    this.loop();
  }
  
  stopMusic() {
    this.isPlaying = false;
    if (this.loopId) {
      clearInterval(this.loopId);
      this.loopId = null;
    }
  }
  
  loop() {
    if (!this.isPlaying) return;
    
    this.loopId = setInterval(() => {
      this.currentTime++;
      this.playLoopNote();
    }, 100);
  }
  
  playLoopNote() {
    const baseTempo = 120; // BPM
    const beat = this.currentTime % 4;
    
    if (this.theme === 'boss' || this.theme === 'ultimate') {
      this.playBossTheme(beat);
    } else if (this.theme === 'danger') {
      this.playDangerTheme(beat);
    } else {
      this.playMainTheme(beat);
    }
  }
  
  playMainTheme(beat) {
    // Main upbeat theme
    const notes = [440, 523, 440, 587];
    const note = notes[beat];
    
    this.playNote(note, 0.15);
    
    if (beat === 0) {
      this.playBassNote(220);
      this.playBassNote(220);
    }
  }
  
  playDangerTheme(beat) {
    // Tense, darker theme
    const notes = [440, 392, 440, 523];
    const note = notes[beat];
    
    this.playNote(note, 0.2, 'sawtooth');
    
    if (beat === 0) {
      this.playBassNote(220);
    }
  }
  
  playBossTheme(beat) {
    // Dark, menacing theme
    const notes = [220, 196, 220, 261];
    const note = notes[beat];
    
    this.playNode(note, 0.3, 'sawtooth');
    
    if (beat === 0) {
      this.playBassNote(110);
    }
  }
  
  playCollectionSound() {
    // Bright collect sound
    this.playNote(880, 0.1);
    setTimeout(() => {
      this.playNote(1100, 0.1);
    }, 50);
  }
  
  playJumpSound() {
    // Simple jump up
    this.playNote(440, 0.1);
    setTimeout(() => {
      this.playNote(554, 0.1);
    }, 30);
  }
  
  playGameOverSound() {
    // Sad descending
    const notes = [523, 493, 466, 440, 415];
    notes.forEach((note, i) => {
      setTimeout(() => {
        this.playNote(note, 0.4, 'sine');
      }, i * 80);
    });
  }
  
  playGameWinSound() {
    // Victory theme
    this.playVictorySound();
  }
}
