// ⚡ PARTICLES SYSTEM V2 - Advanced FX for everything!
// Collect, Power-up, Jump, Hurt, Kill, Level up

export default class ParticleSystem2 {
  constructor() {
    this.particles = [];
    this.maxParticles = 200;
  }
  
  // Create particle burst at position
  burst(x, y, count, color, speed = 2, size = 4) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * speed + 1;
      
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: Math.random() * size + 2,
        color: color || '#00BCD4',
        alpha: 1,
        decay: Math.random() * 0.03 + 0.02,
        type: 'burst',
        life: 60
      });
    }
  }
  
  // Coin collection particles (golden sparkle)
  collectCoin(x, y) {
    // Golden sparkle burst
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * 3,
        vy: Math.sin(angle) * 3,
        size: Math.random() * 4 + 3,
        color: '#FFD700',
        alpha: 1,
        decay: 0.04,
        type: 'sparkle',
        life: 40,
        scale: 1
      });
    }
    
    // Floating text "+10"
    this.particles.push({
      x: x,
      y: y - 20,
      vx: 0,
      vy: -1,
      size: 0,
      color: '#FFD700',
      alpha: 1,
      decay: 0,
      type: 'text',
      text: '+10',
      life: 30,
      scale: 1
    });
  }
  
  // Power-up collected (colorful explosion)
  collectPowerUp(x, y, type) {
    const colors = {
      doubleJump: '#4CAF50',
      shield: '#2196F3',
      speed: '#FFC107',
      freeze: '#00BCD4',
      timeStop: '#E91E63',
      magnet: '#9C27B0',
      invisible: '#607D8B'
    };
    
    const color = colors[type] || '#FFF';
    
    // Power-up particles
    for (let i = 0; i < 15; i++) {
      const angle = Math.random() * Math.PI * 2;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * 4,
        vy: Math.sin(angle) * 4,
        size: Math.random() * 6 + 4,
        color: color,
        alpha: 1,
        decay: 0.05,
        type: 'powerup',
        life: 50,
        glow: true
      });
    }
    
    // Icon text
    const icons = {
      doubleJump: '⬆️⬆️',
      shield: '🛡️',
      speed: '⚡',
      freeze: '❄️',
      timeStop: '⏸️',
      magnet: '🧲',
      invisible: '👻'
    };
    
    this.particles.push({
      x: x, y: y - 30,
      vx: 0,
      vy: -2,
      size: 0,
      color: '#FFF',
      alpha: 1,
      decay: 0,
      type: 'icon',
      icon: icons[type] || '✨',
      life: 60,
      scale: 2
    });
  }
  
  // Player jump particle (trail effect)
  jumpTrail(x, y) {
    // Swipe effect behind player
    for (let i = 0; i < 5; i++) {
      this.particles.push({
        x: x - i * 8,
        y,
        vx: -1,
        vy: Math.random() - 0.5,
        size: Math.random() * 3 + 2,
        color: '#00BCD4',
        alpha: 0.6 - i * 0.1,
        decay: 0.08,
        type: 'trail',
        life: 20
      });
    }
  }
  
  // Player hurt particle (red sparks)
  hurtEffect(x, y) {
    for (let i = 0; i < 12; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        size: Math.random() * 4 + 2,
        color: '#F44336',
        alpha: 1,
        decay: 0.06,
        type: 'spark',
        life: 35,
        shake: true
      });
    }
    
    // Screen shake flash
    this.particles.push({
      x: Math.random() * 10 - 5,
      y: Math.random() * 10 - 5,
      vx: 0,
      vy: 0,
      size: 0,
      color: '#F44336',
      alpha: 0.5,
      decay: 0.1,
      type: 'flash',
      life: 10
    });
  }
  
  // Enemy death (explosion)
  enemyDeath(x, y, color) {
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8,
        size: Math.random() * 5 + 3,
        color: color,
        alpha: 1,
        decay: 0.07,
        type: 'explosion',
        life: 45,
        gravity: true
      });
    }
    
    // Center glow
    this.particles.push({
      x, y,
      vx: 0,
      vy: 0,
      size: 30,
      color: color,
      alpha: 0.8,
      decay: 0.1,
      type: 'glow',
      life: 20
    });
  }
  
  // Level up celebration
  levelUp(x, y) {
    // Confetti
    const colors = ['#FFC107', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0'];
    
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 200,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 6 - 2,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: 0.02,
        type: 'confetti',
        life: 120,
        rotation: Math.random() * Math.PI,
        rotationSpeed: (Math.random() - 0.5) * 0.2
      });
    }
    
    // Level text
    this.particles.push({
      x: x, y: y - 50,
      vx: 0,
      vy: -1,
      size: 0,
      color: '#00BCD4',
      alpha: 0,
      decay: 0,
      type: 'levelup',
      text: 'LEVEL UP!',
      life: 90,
      scale: 0,
      targetScale: 3
    });
  }
  
  // Boss death (big explosion)
  bossDeath(x, y) {
    // Huge explosion
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        size: Math.random() * 8 + 4,
        color: Math.random() > 0.5 ? '#E91E63' : '#00BCD4',
        alpha: 1,
        decay: 0.05,
        type: 'boss-dead',
        life: 80,
        glow: true,
        gravity: true
      });
    }
    
    // Center shockwave
    this.particles.push({
      x, y,
      vx: 0,
      vy: 0,
      size: 5,
      color: '#FFF',
      alpha: 1,
      decay: 0.03,
      type: 'shockwave',
      life: 60
    });
    
    // Victory confetti
    for (let i = 0; i < 40; i++) {
      this.particles.push({
        x: x + (Math.random() - 0.5) * 300,
        y: y + (Math.random() - 0.5) * 200,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 10 - 5,
        size: Math.random() * 6 + 4,
        color: ['#FFD700', '#00BCD4', '#E91E63'][Math.floor(Math.random() * 3)],
        alpha: 1,
        decay: 0.02,
        type: 'victory',
        life: 100,
        rotation: Math.random() * Math.PI
      });
    }
  }
  
  update(delta) {
    // Update all particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      // Apply physics
      p.x += p.vx;
      p.y += p.vy;
      
      // Gravity for some types
      if (p.gravity) {
        p.vy += 0.2;
      }
      
      // Decay
      p.alpha -= p.decay;
      p.life--;
      
      // Special effects
      if (p.type === 'scale') {
        p.scale += 0.1;
      }
      
      if (p.type === 'levelup') {
        if (p.scale < p.targetScale) {
          p.scale += 0.2;
          p.alpha += 0.05;
        }
        if (p.alpha > 1) p.alpha = 1;
      }
      
      if (p.type === 'confetti' || p.type === 'victory') {
        p.rotation += p.rotationSpeed;
      }
      
      // Remove dead particles
      if (p.life <= 0 || p.alpha <= 0) {
        this.particles.splice(i, 1);
      }
    }
    
    // Limit total particles
    if (this.particles.length > this.maxParticles) {
      this.particles.splice(0, this.particles.length - this.maxParticles);
    }
  }
  
  render(ctx) {
    if (this.particles.length === 0) return;
    
    this.particles.forEach(p => {
      switch (p.type) {
        case 'text':
        case 'icon':
        case 'levelup':
          this.renderText(ctx, p);
          break;
        case 'confetti':
        case 'victory':
          this.renderConfetti(ctx, p);
          break;
        case 'flash':
          this.renderFlash(ctx, p);
          break;
        case 'levelup':
          this.renderLevelUp(ctx, p);
          break;
        case 'glow':
        case 'shockwave':
          this.renderGlow(ctx, p);
          break;
        default:
          this.renderCircle(ctx, p);
      }
    });
  }
  
  renderCircle(ctx, p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    
    if (p.glow) {
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 15;
    }
    
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  
  renderText(ctx, p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.font = p.type === 'levelup' ? 'bold 48px Jetbrains Mono' : p.type === 'icon' ? '32px Arial' : '20px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 3;
    
    if (p.type === 'text') {
      ctx.fillText(p.text, p.x, p.y);
    } else if (p.type === 'icon') {
      ctx.font = '24px Arial';
      ctx.fillText(p.icon, p.x, p.y);
    } else if (p.type === 'levelup') {
      const scale = Math.min(p.scale, p.targetScale);
      ctx.scale(scale, scale);
      ctx.fillText(p.text, p.x, p.y);
    }
    
    ctx.restore();
  }
  
  renderConfetti(ctx, p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = p.color;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  }
  
  renderFlash(ctx, p) {
    ctx.save();
    ctx.globalAlpha = p.alpha * 0.3;
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, ctx.canvas.width, ctx.canvas.height);
    ctx.restore();
  }
  
  renderGlow(ctx, p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.strokeStyle = p.color;
    ctx.lineWidth = p.size;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
  
  renderLevelUp(ctx, p) {
    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = '#00BCD4';
    ctx.font = 'bold 64px Jetbrains Mono';
    ctx.textAlign = 'center';
    ctx.shadowColor = '#FFF';
    ctx.shadowBlur = 20;
    ctx.fillText(p.text, p.x, p.y);
    ctx.restore();
  }
  
  clear() {
    this.particles = [];
  }
}
