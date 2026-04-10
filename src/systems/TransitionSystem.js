// ✨ TRANSITION SYSTEM - Effets fluides entre niveaux
// Pas de "cut" sec! Smooth transitions!

export default class TransitionSystem {
  constructor() {
    this.state = 'idle'; // idle, levelUp, boss, victory, gameOver, gameWin
    this.alpha = 0;
    this.progress = 0;
    this.particles = [];
    this.text = '';
    this.color = '#00BCD4'; // Cyan by default
  }
  
  startTransition(type, text = '') {
    this.state = type;
    this.progress = 0;
    this.alpha = 0;
    this.text = text;
    
    // Set colors & particles based on type
    switch(type) {
      case 'levelUp':
        this.color = '#4CAF50'; // Green
        this.createConfetti(20);
        break;
      case 'boss':
        this.color = '#F44336'; // Red
        this.createShake(10);
        break;
      case 'victory':
        this.color = '#E91E63'; // Pink
        this.createConfetti(50);
        break;
      case 'gameOver':
        this.color = '#607D8B'; // Grey
        this.createFadeParticles(10);
        break;
      case 'gameWin':
        this.color = '#00BCD4'; // Cyan
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
    
    // Update progress
    if (this.progress < 1) {
      this.progress += 0.02; // Speed du transition
      if (this.progress > 1) this.progress = 1;
      this.alpha = this.progress;
    }
    
    // Update particles
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
        p.y += 2; // Fall down
      } else {
        p.vy += 0.1; // Gravity
      }
      
      p.life--;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
    
    // Auto reset after 1.5s
    if (this.progress >= 1 && this.alpha >= 0.8) {
      setTimeout(() => {
        this.reset();
      }, 1500);
    }
  }
  
  render(ctx) {
    if (this.state === 'idle') return;
    
    // Background overlay
    const bgColor = this.getOverlayColor();
    ctx.fillStyle = bgColor;
    ctx.globalAlpha = this.alpha * 0.8;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    // Draw particles
    this.particles.forEach(p => {
      if (p.fadeOut) {
        ctx.globalAlpha = p.life / 80;
      } else {
        ctx.globalAlpha = 1;
      }
      
      ctx.fillStyle = p.color;
      ctx.beginPath();
      if (p.shake) {
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      } else if (p.fadeOut) {
        ctx.fillRect(p.x, p.y, p.size, p.size);
      } else {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + 5, p.y - 5);
        ctx.lineTo(p.x + 10, p.y);
        ctx.lineTo(p.x + 5, p.y + 5);
        ctx.fill();
      }
      ctx.fill();
    });
    
    // Draw text
    if (this.text) {
      ctx.fillStyle = '#FFF';
      ctx.font = 'bold 48px Jetbrains Mono';
      ctx.textAlign = 'center';
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 20;
      ctx.fillText(this.text, ctx.canvas.width / 2, ctx.canvas.height / 2);
      ctx.shadowBlur = 0;
      
      // Pulse effect
      const pulse = Math.sin(Date.now() / 200) * 2 + 4;
      ctx.font = `bold ${32 + pulse}px Arial`;
      ctx.fillStyle = this.color;
      ctx.fillText(`⌬ Kyra ⌬`, ctx.canvas.width / 2, ctx.canvas.height / 2 + 50);
    }
    
    ctx.globalAlpha = 1;
  }
  
  getOverlayColor() {
    switch(this.state) {
      case 'boss':
        return 'rgba(244, 67, 54, 0.7)';
      case 'gameOver':
        return 'rgba(96, 125, 139, 0.9)';
      case 'victory':
      case 'gameWin':
        return 'rgba(233, 30, 99, 0.6)';
      default:
        return 'rgba(0, 188, 212, 0.5)';
    }
  }
  
  reset() {
    this.state = 'idle';
    this.alpha = 0;
    this.particles = [];
    this.text = '';
  }
}
