// 🎵 NEON PROTOCOL - AUDIO SYSTEM
// Background music, SFX, Volume control, Mute toggle

class AudioSystem {
  constructor() {
    this.enabled = false;
    this.musicEnabled = true;
    this.sfxEnabled = true;
    this.masterVolume = 0.5;
    this.musicVolume = 0.4;
    this.sfxVolume = 0.6;
    
    this.ctx = null;
    this.currentMusic = null;
    this.musicGain = null;
    
    this.sounds = {
      jump: null,
      collect: null,
      kill: null,
      powerup: null,
      boss: null,
      win: null,
      lose: null,
      ui_click: null
    };
    
    // Synthesize sounds (no external assets needed)
    this.synthSounds();
  }
  
  init() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.enabled = true;
      
      // Resume context if suspended (browsers require user interaction)
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      
      console.log('🎵 Audio system initialized!');
    } catch (e) {
      console.warn('❌ Audio not supported:', e);
      this.enabled = false;
    }
  }
  
  synthSounds() {
    // Synthesize all sound effects without external files
    
    // JUMP sound
    this.sounds.jump = () => {
      if (!this.enabled || !this.sfxEnabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.15);
      
      gain.gain.setValueAtTime(0.3 * this.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.2);
    };
    
    // COLLECT coin sound
    this.sounds.collect = () => {
      if (!this.enabled || !this.sfxEnabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.2 * this.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    };
    
    // KILL enemy sound
    this.sounds.kill = () => {
      if (!this.enabled || !this.sfxEnabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.3 * this.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    };
    
    // POWERUP sound
    this.sounds.powerup = () => {
      if (!this.enabled || !this.sfxEnabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.setValueAtTime(554, this.ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(659, this.ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.25 * this.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    };
    
    // BOSS fight sound
    this.sounds.boss = () => {
      if (!this.enabled || !this.sfxEnabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(60, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.8);
      osc.frequency.setValueAtTime(60, this.ctx.currentTime + 0.8);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 1.6);
      
      gain.gain.setValueAtTime(0.4 * this.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 2);
    };
    
    // WIN/Victory sound
    this.sounds.win = () => {
      if (!this.enabled || !this.sfxEnabled) return;
      const notes = [523, 659, 784, 1047, 784, 1047];
      let time = this.ctx.currentTime;
      
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.frequency.setValueAtTime(freq, time);
        
        gain.gain.setValueAtTime(0.25 * this.sfxVolume, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
        
        osc.start(time);
        osc.stop(time + 0.4);
        time += 0.3;
      });
    };
    
    // LOSE/Game Over sound
    this.sounds.lose = () => {
      if (!this.enabled || !this.sfxEnabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(220, this.ctx.currentTime + 1.5);
      
      gain.gain.setValueAtTime(0.3 * this.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 1.5);
    };
    
    // UI Click sound
    this.sounds.ui_click = () => {
      if (!this.enabled || !this.sfxEnabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      
      gain.gain.setValueAtTime(0.1 * this.sfxVolume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    };
  }
  
  playSound(soundName) {
    if (this.sounds[soundName]) {
      this.sounds[soundName]();
    }
  }
  
  playMusic() {
    if (!this.musicEnabled || !this.enabled) return;
    
    if (this.currentMusic) {
      this.fadeOutMusic(() => {
        this.startMusicLoop();
      });
    } else {
      this.startMusicLoop();
    }
  }
  
  startMusicLoop() {
    // Simple cyberpunk background loop (synthesized)
    this.currentMusic = {
      notes: [
        [110, 121, 130, 146, 164, 174, 196, 220], // C2 -> C3
        [146, 155, 164, 185, 207, 220, 246, 276], // D2 -> D3
        [87, 115, 155, 174, 196, 232, 261, 293]   // A1 -> E3
      ],
      index: 0,
      timeout: null,
      gain: null,
      master: this.ctx.createGain()
    };
    
    this.currentMusic.master.connect(this.ctx.destination);
    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.value = this.musicVolume;
    this.currentMusic.master.connect(this.musicGain);
    this.musicGain.connect(this.ctx.destination);
    
    this.playNextMusicNote();
  }
  
  playNextMusicNote() {
    if (!this.currentMusic || !this.musicEnabled) return;
    
    const now = this.ctx.currentTime;
    const loop = this.currentMusic;
    const noteData = loop.notes[loop.index % loop.notes.length];
    
    // Create bass line
    const bassFreq = noteData[0];
    const bass = this.ctx.createOscillator();
    const bassGain = this.ctx.createGain();
    
    bass.type = 'sawtooth';
    bass.frequency.setValueAtTime(bassFreq, now);
    bassGain.gain.setValueAtTime(0.15 * this.musicVolume, now);
    bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    
    bass.connect(bassGain);
    bassGain.connect(this.currentMusic.master);
    bass.start(now);
    bass.stop(now + 0.5);
    
    // Create arpeggio
    noteData.forEach((freq, i) => {
      const note = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      note.type = 'sine';
      note.frequency.setValueAtTime(freq, now + i * 0.1);
      noteGain.gain.setValueAtTime(0.1 * this.musicVolume, now + i * 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
      
      note.connect(noteGain);
      noteGain.connect(this.currentMusic.master);
      note.start(now + i * 0.1);
      note.stop(now + i * 0.1 + 0.3);
    });
    
    // Schedule next note
    loop.timeout = setTimeout(() => {
      loop.index++;
      this.playNextMusicNote();
    }, 500);
  }
  
  stopMusic() {
    if (this.currentMusic) {
      if (this.currentMusic.timeout) {
        clearTimeout(this.currentMusic.timeout);
      }
      this.currentMusic = null;
    }
  }
  
  fadeOutMusic(onComplete) {
    if (!this.musicGain) return;
    
    const now = this.ctx.currentTime;
    const duration = 0.5;
    
    this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, now);
    this.musicGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    setTimeout(onComplete, duration * 1000);
  }
  
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.playMusic();
    } else {
      this.stopMusic();
    }
    return this.musicEnabled;
  }
  
  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled;
    return this.sfxEnabled;
  }
  
  setMasterVolume(vol) {
    this.masterVolume = Math.max(0, Math.min(1, vol));
    if (this.currentMusic) {
      this.currentMusic.master.gain.value = this.musicVolume;
    }
    this.sfxVolume = this.masterVolume * 0.7; // SFX slightly quieter
  }
  
  toggleAll() {
    const nowEnabled = !this.enabled;
    
    if (nowEnabled) {
      this.init();
    } else {
      if (this.ctx) {
        this.ctx.close();
        this.ctx = null;
      }
    }
    
    return nowEnabled;
  }
  
  dispose() {
    this.stopMusic();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

// Export
if (typeof window !== 'undefined') {
  window.AudioSystem = AudioSystem;
}

export { AudioSystem };
