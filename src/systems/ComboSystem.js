// ⚡ COMBO SYSTEM - Bonus de scores en séquence
// Collecte rapide = bonus!

export default class ComboSystem {
  constructor() {
    this.comboCount = 0;
    this.comboTime = 0;
    this.comboMultiplier = 1;
    this.maxCombo = 5;
    this.comboDecay = 120; // frames avant que combo baisse
    this.currentScore = 0;
  }
  
  // Called when coin collected
  coinCollected(baseValue) {
    this.comboTime = this.comboDecay;
    this.comboCount++;
    
    // Calculate multiplier
    if (this.comboCount >= this.maxCombo) {
      this.comboMultiplier = 3; // x3 max
    } else {
      this.comboMultiplier = 1 + this.comboCount * 0.5; // x1.5, x2, x2.5...
    }
    
    // Calculate score
    const coinsValue = Math.floor(baseValue * this.comboMultiplier);
    this.comboCount = Math.min(this.comboCount, this.maxCombo);
    
    return coinsValue;
  }
  
  update(delta) {
    if (this.comboTime > 0) {
      this.comboTime -= delta;
      
      if (this.comboTime <= 0) {
        this.comboCount = Math.max(0, this.comboCount - 1);
        this.comboMultiplier = 1 + this.comboCount * 0.5;
      }
    }
    
    // Cap multiplier
    this.comboMultiplier = Math.min(this.comboMultiplier, 3);
  }
  
  getMultiplier() {
    return this.comboMultiplier;
  }
  
  getComboCount() {
    return this.comboCount;
  }
  
  isComboActive() {
    return this.comboCount > 0;
  }
  
  reset() {
    this.comboCount = 0;
    this.comboMultiplier = 1;
    this.comboTime = 0;
  }
  
  getComboText() {
    if (this.comboCount === 0) return '';
    
    const colors = ['#4CAF50', '#FFC107', '#FF9800', '#F44336', '#E91E63'];
    const color = colors[Math.min(this.comboCount - 1, colors.length - 1)];
    
    return `${this.comboMultiplier}x <span style="color:${color}">${this.comboCount}</span>`;
  }
}
