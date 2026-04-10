// 🎁 SYSTEME DE POWER-UPS COMPLET (7 types)
// Time Stop, Magnet, Invisibility + anciens

export class PowerUpSystem {
  constructor() {
    this.particles = []
  }
  
  activate(effect, player) {
    switch(effect) {
      case 'doubleJump':
        player.doubleJumpEnabled = true
        this.createParticle(player.x, player.y, '⬆️⬆️')
        break
        
      case 'shield':
        player.shielded = true
        player.shieldDuration = 30 * 60 // 30s (30 frames * 60fps)
        this.createParticle(player.x, player.y, '🛡️')
        break
        
      case 'speed':
        player.speedBoost = true
        player.speedBoostDuration = 20 * 60 // 20s
        this.createParticle(player.x, player.y, '⚡')
        break
        
      case 'freeze':
        this.freezeEnemies(15 * 60) // 15s
        this.createParticle(player.x, player.y, '❄️')
        break
        
      case 'timeStop':
        this.timeStop(5 * 60) // 5s
        this.createParticle(player.x, player.y, '⏸️')
        break
        
      case 'magnet':
        this.magnetCoins(10 * 60) // 10s
        this.createParticle(player.x, player.y, '🧲')
        break
        
      case 'invisibility':
        player.invisible = true
        player.invisibleDuration = 15 * 60 // 15s
        this.createParticle(player.x, player.y, '👻')
        break
    }
  }
  
  createParticle(x, y, symbol) {
    this.particles.push({
      x,
      y,
      symbol,
      life: 60, // 1 seconde
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2 - 2
    })
  }
  
  update(delta) {
    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.1 // gravity
      p.life--
      if (p.life <= 0) {
        this.particles.splice(i, 1)
      }
    }
  }
  
  render(ctx) {
    this.particles.forEach(p => {
      ctx.font = '24px Arial'
      ctx.fillText(p.symbol, p.x, p.y)
    })
  }
  
  freezeEnemies(duration) {
    if (this.freezeDuration) {
      clearTimeout(this.freezeDuration)
    }
    const startTime = Date.now()
    this.freezeEnd = startTime + duration * 16.67 // 60fps
    
    this.originalEnemySpeeds = []
  }
  
  timeStop(duration) {
    const endTime = Date.now() + duration * 16.67
    this.timeStopEnd = endTime
    this.timeStart = Date.now()
  }
  
  magnetCoins(duration) {
    this.magnetEnd = Date.now() + duration * 16.67
    this.magnetRadius = 200
  }
  
  isFrostActive() {
    return this.freezeEnd && Date.now() < this.freezeEnd
  }
  
  isTimeStopActive() {
    return this.timeStopEnd && Date.now() < this.timeStopEnd
  }
  
  isMagnetActive() {
    return this.magnetEnd && Date.now() < this.magnetEnd
  }
}
