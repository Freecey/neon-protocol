// 📊 LEADERBOARD SYSTEM - High Score Tracker
// localStorage + Top 10 + Records

export class LeaderboardSystem {
  constructor() {
    this.data = this.load();
    this.recentScores = [];
  }
  
  load() {
    const saved = localStorage.getItem('neon-protocol-leaderboard');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error loading leaderboard:', e);
      }
    }
    
    // Default structure
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
    
    // Update global
    if (score > this.data.global.highest) {
      this.data.global.highest = score;
      this.data.global.date = new Date().toLocaleDateString('fr-FR');
    }
    
    // Update level
    if (score > this.data.levels[level].highest) {
      this.data.levels[level].highest = score;
      this.data.levels[level].date = new Date().toLocaleDateString('fr-FR');
    }
    
    this.data.levels[level].attempts++;
    
    // Add to recent
    this.recentScores.push(newScore);
    if (this.recentScores.length > 10) {
      this.recentScores.shift();
    }
    
    // Save
    this.save();
    
    return { isNewRecord: score >= this.data.levels[level].highest };
  }
  
  getTopScores(level = null) {
    if (level === null) {
      // Global top
      return this.data.global;
    }
    
    return this.data.levels[level];
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
