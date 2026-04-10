// 🏆 ACHIEVEMENT SYSTEM - Tracker des exploits
// Badges à débloquer + Progression

export class AchievementSystem {
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
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading achievements:', e);
      }
    }
    
    // Default unlocked achievements
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
    // Create notification UI
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
    
    // Play sound
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
