// 🎮 MAIN MENU SYSTEM - Écran de sélection stylé
// Menu Kyra ⌬ style cybernétique

export default class MenuSystem {
  constructor() {
    this.state = 'title'; // title, menu, levels
    this.levelSelection = 1;
    this.selectedLevel = 1;
    this.animation = 0;
    this.showCredits = false;
    
    // Level names
    this.levelNames = {
      1: '🟢 TUTORIAL',
      2: '🟡 WIND VALLEY',
      3: '🔴 BOSS LAKE',
      4: '🔵 CYBER CITY',
      5: '🟣 NEON JUNGLE',
      6: '⚫ VOID ZONE',
      7: '🌈 REALM OF KYRA'
    };
  }
  
  update(delta) {
    this.animation += delta * 0.05;
    
    // Navigation
    if (window.keys && window.keys['ArrowDown']) {
      this.levelSelection = Math.min(7, this.levelSelection + 1);
    }
    if (window.keys && window.keys['ArrowUp']) {
      this.levelSelection = Math.max(1, this.levelSelection - 1);
    }
    if (window.keys && window.keys['Enter'] && this.state === 'title') {
      this.state = 'menu';
    }
    if (window.keys && window.keys['Escape']) {
      this.state = 'title';
    }
  }
  
  render(ctx) {
    if (this.showCredits) {
      this.renderCredits(ctx);
      return;
    }
    
    if (this.state === 'title') {
      this.renderTitle(ctx);
    } else if (this.state === 'menu') {
      this.renderLevelSelect(ctx);
    }
  }
  
  renderTitle(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Animated background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#00BCD4');
    gradient.addColorStop(0.5, '#E91E63');
    gradient.addColorStop(1, '#9C27B0');
    
    // Pulsing animation
    const pulse = Math.sin(this.animation * 2) * 20 + 10;
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Title text
    ctx.font = 'bold 72px Jetbrains Mono';
    ctx.textAlign = 'center';
    
    // Glow effect
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = pulse;
    
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText('NEON PROTOCOL ⌬', width / 2, height / 2 - 100);
    
    // Subtitle
    ctx.shadowBlur = 0;
    ctx.font = 'italic 24px Arial';
    ctx.fillStyle = '#FFC107';
    ctx.fillText('Powered by Kyra ⌬', width / 2, height / 2 - 50);
    
    // Start button
    const scaleX = 1 + Math.sin(this.animation) * 0.1;
    const scaleY = 1 + Math.cos(this.animation) * 0.1;
    
    ctx.save();
    ctx.translate(width / 2, height / 2 + 50);
    ctx.scale(scaleX, scaleY);
    
    ctx.fillStyle = '#00BCD4';
    ctx.fillRect(-150, -30, 300, 60);
    
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Jetbrains Mono';
    ctx.fillText('PRESS ENTER TO START', 0, 0);
    
    ctx.restore();
    
    // Version
    ctx.fillStyle = '#888';
    ctx.font = '16px Arial';
    ctx.fillText('v5.0.0', width / 2, height - 30);
  }
  
  renderLevelSelect(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Dark background
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, width, height);
    
    // Select header
    ctx.fillStyle = '#00BCD4';
    ctx.font = 'bold 48px Jetbrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText('SELECT LEVEL', width / 2, 80);
    
    // Level list
    const startX = width / 2 - 200;
    const startY = 140;
    const spacing = 70;
    
    for (let i = 1; i <= 7; i++) {
      const y = startY + (i - 1) * spacing;
      const isSelected = this.levelSelection === i;
      
      // Highlight box
      if (isSelected) {
        const pulse = Math.sin(this.animation * 4) * 5;
        ctx.fillStyle = `rgba(0, 188, 212, ${0.5 + pulse/10})`;
        ctx.fillRect(startX - 10, y - 25, 410, 50 + pulse);
      }
      
      // Level number
      ctx.fillStyle = isSelected ? '#00BCD4' : '#666';
      ctx.font = 'bold 36px Jetbrains Mono';
      ctx.textAlign = 'right';
      ctx.fillText(`LVL ${i}`, startX - 15, y + 10);
      
      // Level name
      ctx.textAlign = 'left';
      ctx.fillStyle = '#FFF';
      ctx.font = '18px Arial';
      ctx.fillText(this.levelNames[i], startX + 20, y + 10);
      
      // Check mark if completed (placeholder)
      ctx.fillStyle = '#4CAF50';
      ctx.font = '24px Arial';
      ctx.fillText('✓', width / 2 + 120, y + 15);
    }
    
    // Instructions
    ctx.fillStyle = '#888';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('↑↓ to select • ENTER to start', width / 2, height - 100);
    
    // Credits button
    ctx.textAlign = 'center';
    ctx.font = '16px Jetbrains Mono';
    ctx.fillStyle = '#E91E63';
    
    if (isSelected) {
      ctx.fillText('[ESC] Back', width / 2, height - 50);
    } else {
      ctx.fillText('[ESC] Back', width / 2, height - 50);
    }
  }
  
  renderCredits(ctx) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    // Dark background
    ctx.fillStyle = '#0d0d1a';
    ctx.fillRect(0, 0, width, height);
    
    // Credits title
    ctx.fillStyle = '#00BCD4';
    ctx.font = 'bold 48px Jetbrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText('CREDITS', width / 2, 80);
    
    // Credit list
    const credits = [
      '🎮 Developed by Kyra ⌬',
      '🤖 Powered by OpenClaw',
      '🎨 Art & Design: Kyra Autonomous',
      '🎵 Music Generated by Synthwave AI',
      '🏗️ Architecture v5.0 by Kyra',
      '📢 Special Thanks to JP',
      '🌐 Platform: Web + Electron',
      '📜 Code: ES6 Modules',
      '⚡ Build: v5.0.0'
    ];
    
    const startY = 150;
    const spacing = 40;
    
    credits.forEach((text, i) => {
      ctx.fillStyle = '#FFF';
      ctx.font = '20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(text, width / 2, startY + i * spacing);
    });
    
    // Back button
    ctx.fillStyle = '#E91E63';
    ctx.font = '24px Jetbrains Mono';
    ctx.fillText('[ESC] Back to Menu', width / 2, height - 50);
  }
  
  getSelectedLevel() {
    return this.levelSelection;
  }
  
  setCredits(show) {
    this.showCredits = show;
  }
}
