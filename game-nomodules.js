// 🎮 NEON PROTOCOL v5.3 - VERSION SANS MODULES (IIFE)
// Compatible avec file:// et tous les navigateurs

(function(global) {
  // --- DEPENDENCIES (inline pour éviter import) ---
  
  // TransitionSystem
  class TransitionSystem {
    constructor() {
      this.state = 'idle';
      this.alpha = 0;
      this.progress = 0;
      this.particles = [];
      this.text = '';
      this.color = '#00BCD4';
    }
    
    startTransition(type, text = '') {
      this.state = type;
      this.progress = 0;
      this.alpha = 0;
      this.text = text;
      
      switch(type) {
        case 'levelUp':
          this.color = '#4CAF50';
          this.createConfetti(20);
          break;
        case 'boss':
          this.color = '#F44336';
          this.createShake(10);
          break;
        case 'victory':
          this.color = '#E91E63';
          this.createConfetti(50);
          break;
        case 'gameOver':
          this.color = '#607D8B';
          this.createFadeParticles(10);
          break;
        case 'gameWin':
          this.color = '#00BCD4';
          this.createConfetti(100);
          break;
      }
    }
    
    createConfetti(count) {
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * window.innerWidth,
          y: -20,
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 4 + 2,
          color: this.getRandomColor(),
          size: Math.random() * 6 + 4,
          life: 120
        });
      }
    }
    
    createShake(count) {
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * window.innerWidth,
          y: -20,
          vx: 0,
          vy: Math.random() * 3 + 2,
          color: '#F44336',
          size: 8,
          shake: true,
          life: 60
        });
      }
    }
    
    createFadeParticles(count) {
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2 - 1,
          color: '#607D8B',
          fadeOut: true,
          life: 80
        });
      }
    }
    
    getRandomColor() {
      const colors = ['#FFC107', '#4CAF50', '#E91E63', '#2196F3', '#9C27B0'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    
    update(delta) {
      if (this.state === 'idle') return;
      
      if (this.progress < 1) {
        this.progress += 0.02;
        if (this.progress > 1) this.progress = 1;
        this.alpha = this.progress;
      }
      
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.shake) {
          p.x += (Math.random() - 0.5) * 4;
          p.y += (Math.random() - 0.5) * 4;
        }
        
        if (p.fadeOut) {
          p.alpha = (p.life / 80);
          p.y += 2;
        } else {
          p.vy += 0.1;
        }
        
        p.life--;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
        }
      }
      
      if (this.progress >= 1 && this.alpha >= 0.8) {
        setTimeout(() => { reset(); }, 1500);
      }
    }
    
    reset() {
      this.state = 'idle';
      this.alpha = 0;
      this.particles = [];
      this.text = '';
    }
    
    render(ctx) {
      if (this.state === 'idle') return;
      
      const bgColor = this.getOverlayColor();
      ctx.fillStyle = bgColor;
      ctx.globalAlpha = this.alpha * 0.8;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      
      this.particles.forEach(p => {
        if (p.fadeOut) ctx.globalAlpha = p.life / 80;
        else ctx.globalAlpha = 1;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        if (p.shake) {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        } else if (p.fadeOut) {
          ctx.fillRect(p.x, p.y, p.size, p.size);
        } else {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + 5, p.y - 5);
          ctx.lineTo(p.x + 10, p.y);
          ctx.lineTo(p.x + 5, p.y + 5);
        }
        ctx.fill();
      });
      
      if (this.text) {
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 48px Jetbrains Mono';
        ctx.textAlign = 'center';
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fillText(this.text, ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.shadowBlur = 0;
        
        const pulse = Math.sin(Date.now() / 200) * 2 + 4;
        ctx.font = `bold ${32 + pulse}px Arial`;
        ctx.fillStyle = this.color;
        ctx.fillText(`⌬ Kyra ⌬`, ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
      }
      
      ctx.globalAlpha = 1;
    }
    
    getOverlayColor() {
      switch(this.state) {
        case 'boss': return 'rgba(244, 67, 54, 0.7)';
        case 'gameOver': return 'rgba(96, 125, 139, 0.9)';
        case 'victory':
        case 'gameWin': return 'rgba(233, 30, 99, 0.6)';
        default: return 'rgba(0, 188, 212, 0.5)';
      }
    }
  }
  
  // LeaderboardSystem
  class LeaderboardSystem {
    constructor() {
      this.data = this.load();
      this.recentScores = [];
    }
    
    load() {
      const saved = localStorage.getItem('neon-protocol-leaderboard');
      if (saved) {
        try { return JSON.parse(saved); }
        catch (e) { console.error('Error loading leaderboard:', e); }
      }
      
      return {
        global: { highest: 0, date: null },
        levels: {
          1: { highest: 0, date: null, attempts: 0 },
          2: { highest: 0, date: null, attempts: 0 },
          3: { highest: 0, date: null, attempts: 0 },
          4: { highest: 0, date: null, attempts: 0 },
          5: { highest: 0, date: null, attempts: 0 },
          6: { highest: 0, date: null, attempts: 0 },
          7: { highest: 0, date: null, attempts: 0 }
        },
        createdAt: new Date().toISOString()
      };
    }
    
    save() {
      localStorage.setItem('neon-protocol-leaderboard', JSON.stringify(this.data));
    }
    
    submitScore(level, score, timestamp = Date.now()) {
      const newScore = { level, score, timestamp, date: new Date().toLocaleDateString('fr-FR') };
      
      if (score > this.data.global.highest) {
        this.data.global.highest = score;
        this.data.global.date = new Date().toLocaleDateString('fr-FR');
      }
      
      if (score > this.data.levels[level].highest) {
        this.data.levels[level].highest = score;
        this.data.levels[level].date = new Date().toLocaleDateString('fr-FR');
      }
      
      this.data.levels[level].attempts++;
      this.recentScores.push(newScore);
      if (this.recentScores.length > 10) this.recentScores.shift();
      
      this.save();
      
      return { isNewRecord: score >= this.data.levels[level].highest };
    }
    
    getTopScores(level = null) {
      return level === null ? this.data.global : this.data.levels[level];
    }
    
    getRecentScores() {
      return this.recentScores;
    }
    
    getRecords() {
      return this.data;
    }
    
    getLevelCount() {
      return 7;
    }
    
    exportCSV() {
      let csv = 'Level,Score,Date,Global Record\n';
      for (let level = 1; level <= 7; level++) {
        const rec = this.data.levels[level];
        const global = this.data.global.highest;
        csv += `${level},${rec.highest},${rec.date},${level === 1 || global === rec.highest ? 'YES' : 'NO'}\n`;
      }
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'neon-protocol-scores.csv';
      a.click();
      URL.revokeObjectURL(url);
    }
    
    reset() {
      localStorage.removeItem('neon-protocol-leaderboard');
      this.data = this.load();
      this.recentScores = [];
    }
  }
  
  // AchievementSystem
  class AchievementSystem {
    constructor(leaderboard) {
      this.leaderboard = leaderboard;
      this.achievements = this.load();
      this.stats = {
        coinsCollected: 0,
        jumps: 0,
        kills: 0,
        timeSurvived: 0,
        powerUpsUsed: 0,
        timeStopsUsed: 0
      };
    }
    
    load() {
      const saved = localStorage.getItem('neon-protocol-achievements');
      if (saved) {
        try { return JSON.parse(saved); }
        catch (e) { console.error('Error loading achievements:', e); }
      }
      
      return [
        { id: 'welcome', name: 'Bienvenue!', desc: 'Jouer à NEON PROTOCOL', unlocked: false },
        { id: 'firstScore', name: 'Premier Score', desc: 'Atteindre 100 points', unlocked: false, condition: (stats) => stats.coinsCollected >= 5 },
        { id: 'coinHunter', name: 'Chasseur de Pièces', desc: 'Collecter 50 pièces', unlocked: false, condition: (s) => s.coinsCollected >= 50 },
        { id: 'masterJumper', name: 'Maître du Saut', desc: 'Faire 100 sauts', unlocked: false, condition: (s) => s.jumps >= 100 },
        { id: 'survivor', name: 'Survivant', desc: 'Survivre 60 secondes', unlocked: false, condition: (s) => s.timeSurvived >= 60 },
        { id: 'speedDemon', name: 'Démon Vitesse', desc: 'Survivre avec bonus temps > 50s', unlocked: false },
        { id: 'bossSlayer', name: 'Tueur de Boss', desc: 'Vaincre un boss', unlocked: false, condition: (s) => s.kills >= 1 },
        { id: 'chaosMode', name: 'Mode Chaos', desc: 'Survivre au Niveau 7', unlocked: false },
        { id: 'collector', name: 'Perfectionniste', desc: 'Collecter 100% des pièces', unlocked: false, condition: (s, score) => score >= 2000 },
        { id: 'timeMaster', name: 'Maître du Temps', desc: 'Utiliser Time Stop 10 fois', unlocked: false, condition: (s) => s.timeStopsUsed >= 10 },
        { id: 'powerUpMaster', name: 'Maître Power-up', desc: 'Utiliser 50 power-ups', unlocked: false, condition: (s) => s.powerUpsUsed >= 50 }
      ];
    }
    
    save() {
      localStorage.setItem('neon-protocol-achievements', JSON.stringify(this.achievements));
    }
    
    updateStats(what, amount = 1) {
      if (this.stats.hasOwnProperty(what)) {
        this.stats[what] += amount;
      }
      this.checkAchievements();
    }
    
    checkAchievements() {
      const newUnlockeds = [];
      
      this.achievements.forEach(achievement => {
        if (!achievement.unlocked) {
          let isUnlocked = false;
          
          if (achievement.id === 'welcome') {
            isUnlocked = true;
          } else if (achievement.condition) {
            isUnlocked = achievement.condition(this.stats, this.leaderboard ? this.leaderboard.data.global.highest : 0);
          }
          
          if (isUnlocked) {
            achievement.unlocked = true;
            newUnlockeds.push(achievement);
            this.triggerNotification(achievement);
          }
        }
      });
      
      if (newUnlockeds.length > 0) {
        this.save();
      }
      
      return newUnlockeds;
    }
    
    triggerNotification(achievement) {
      const notif = document.createElement('div');
      notif.className = 'achievement-notification';
      notif.innerHTML = `
        <div style="background: linear-gradient(135deg, #00BCD4, #E91E63); padding: 20px; border-radius: 10px; color: white; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
          <div style="font-size: 48px; margin-bottom: 10px;">🏆</div>
          <div style="font-size: 24px; font-weight: bold;">${achievement.name}</div>
          <div style="font-size: 14px; margin-top: 5px;">${achievement.desc}</div>
        </div>
      `;
      
      notif.style.position = 'fixed';
      notif.style.top = '20px';
      notif.style.right = '20px';
      notif.style.zIndex = '10000';
      notif.style.animation = 'slideIn 0.5s ease-out, fadeOut 0.5s ease-in 3.5s';
      
      document.body.appendChild(notif);
      
      this.playNotificationSound();
      
      setTimeout(() => notif.remove(), 4000);
    }
    
    playNotificationSound() {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }
    
    getUnlockedCount() {
      return this.achievements.filter(a => a.unlocked).length;
    }
    
    getTotalCount() {
      return this.achievements.length;
    }
    
    getProgress() {
      return (this.getUnlockedCount() / this.getTotalCount()) * 100;
    }
    
    reset() {
      localStorage.removeItem('neon-protocol-achievements');
      this.achievements = this.load();
    }
  }
  
  // ... (Reste du code à inclure)
  
  // Exposer au scope global
  global.TransitionSystem = TransitionSystem;
  global.TransitionSystem = LeaderboardSystem;
  global.AchievementSystem = AchievementSystem;
  
})(window);
