// 🏆 LEVEL 7: REALM OF KYRA ⌬ - ULTIMATE CHALLENGE
// Le niveau ULTIME - 3x rapide, 20+ ennemis, 100+ coins, Speed x2!

export default class Level7 {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth
    this.height = gameHeight
    this.multiplier = 2.0 // Tout est x2 rapide!
    this.platforms = []
    this.enemies = []
    this.coins = []
    this.powerups = []
    this.bosses = []
  }
  
  generate() {
    this.platforms = []
    this.enemies = []
    this.coins = []
    this.powerups = []
    this.bosses = []
    
    // Plateformes (8)
    for (let i = 0; i < 8; i++) {
      const x = 50 + Math.random() * (this.width - 250)
      const y = 100 + Math.random() * (this.height - 400)
      
      this.platforms.push({
        x: x,
        y: y,
        width: 80 + Math.random() * 100,
        height: 25,
        type: 'kyra'
      })
    }
    
    // 20+ ENNEMIS!
    // Walker x5
    for (let i = 0; i < 5; i++) {
      const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)]
      this.enemies.push({
        x: plat.x + plat.width / 2 - 20,
        y: plat.y - 40,
        width: 40,
        height: 40,
        type: 'walker',
        startX: plat.x + plat.width / 2 - 20,
        patrolRange: 120,
        speed: 6, // x2 speed!
        color: '#FF6B6B' // Red
      })
    }
    
    // Flyer x5
    for (let i = 0; i < 5; i++) {
      const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)]
      this.enemies.push({
        x: plat.x + plat.width / 2 - 20,
        y: plat.y - 40,
        width: 40,
        height: 40,
        type: 'flyer',
        startX: plat.x + plat.width / 2 - 20,
        patrolRange: 150,
        speed: 8, // x2 speed!
        color: '#00BCD4' // Cyan
      })
    }
    
    // Bobber x5
    for (let i = 0; i < 5; i++) {
      const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)]
      this.enemies.push({
        x: plat.x + plat.width / 2 - 20,
        y: plat.y - 40,
        width: 40,
        height: 40,
        type: 'bobber',
        startX: plat.x + plat.width / 2 - 20,
        patrolRange: 100,
        speed: 6,
        amplitude: 40,
        color: '#FFD700' // Gold
      })
    }
    
    // Shooter x3
    for (let i = 0; i < 3; i++) {
      const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)]
      this.enemies.push({
        x: plat.x + plat.width / 2 - 20,
        y: plat.y - 40,
        width: 40,
        height: 40,
        type: 'shooter',
        startX: plat.x + plat.width / 2 - 20,
        patrolRange: 100,
        speed: 6,
        attackCooldown: 90,
        projectiles: [],
        color: '#E91E63' // Pink
      })
    }
    
    // 100+ COINS!
    for (let i = 0; i < 120; i++) {
      const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)]
      this.coins.push({
        x: plat.x + plat.width / 2 + (Math.random() - 0.5) * 40,
        y: plat.y - 100 - Math.random() * 80,
        size: 18,
        collected: false,
        value: Math.floor(Math.random() * 30) + 20 // 20-50 points!
      })
    }
    
    // Power-ups x4
    this.powerups = [
      { x: 100, y: 100, type: 'doubleJump', collected: false },
      { x: this.width - 100, y: 150, type: 'shield', collected: false },
      { x: this.width / 2 - 50, y: 300, type: 'speed', collected: false },
      { x: this.width / 2 + 50, y: 200, type: 'timeStop', collected: false },
      { x: 150, y: 250, type: 'magnet', collected: false },
      { x: this.width - 150, y: 350, type: 'invisibility', collected: false },
    ]
    
    // 2 BOSSES!
    this.bosses.push({
      x: this.width / 2 - 60,
      y: 50,
      width: 120,
      height: 100,
      maxHealth: 800,
      health: 800,
      type: 'kyra',
      phase: 1,
      speed: 10,
      projectiles: []
    })
    
    this.bosses.push({
      x: this.width / 2 + 60,
      y: 50,
      width: 120,
      height: 100,
      maxHealth: 800,
      health: 800,
      type: 'kyra',
      phase: 1,
      speed: 10,
      projectiles: []
    })
  }
  
  update(delta) {
    // Update enemies avec speed x2
    const speedMultiplier = this.multiplier
    
    this.enemies.forEach(enemy => {
      if (enemy.type === 'walker') {
        enemy.x += enemy.speed * speedMultiplier
        if (enemy.x <= enemy.startX - enemy.patrolRange || enemy.x >= enemy.startX + enemy.patrolRange) {
          enemy.speed *= -1
        }
      } else if (enemy.type === 'flyer') {
        // Bounce avec vitesse x2
        const bounceSpeed = 4 * speedMultiplier
        enemy.x += bounceSpeed
        if (enemy.x >= this.width - enemy.width || enemy.x <= 50) {
          enemy.y += 20
        }
      } else if (enemy.type === 'shooter') {
        // Tirer avec vitesse x2
        if (enemy.attackCooldown > 0) {
          enemy.attackCooldown--
        } else {
          this.fireShooterProjectiles(enemy)
          enemy.attackCooldown = 90 / speedMultiplier
        }
        
        // Update projectiles
        for (let i = enemy.projectiles.length - 1; i >= 0; i--) {
          const p = enemy.projectiles[i]
          p.x += p.vx * speedMultiplier
          p.y += p.vy * speedMultiplier
          if (p.y > this.height) {
            enemy.projectiles.splice(i, 1)
          }
        }
      }
    })
    
    // Update bosses
    this.bosses.forEach((boss, index) => {
      boss.x += boss.speed * speedMultiplier * (index % 2 === 0 ? 1 : -1)
      
      if (boss.x <= 100 || boss.x >= this.width - 200) {
        boss.speed *= -1
      }
      
      // Boss projectiles (x2 speed)
      boss.projectiles.forEach((p, pIndex) => {
        p.x += p.vx * speedMultiplier
        p.y += p.vy * speedMultiplier
        if (p.y > this.height) {
          boss.projectiles.splice(pIndex, 1)
        }
      })
    })
  }
  
  fireShooterProjectiles(shooter) {
    shooter.projectiles.push({
      x: shooter.x + shooter.width / 2,
      y: shooter.y + shooter.height,
      vx: Math.random() * 4 - 2,
      vy: 6,
      size: 8,
      damage: 10,
      color: '#FF4081'
    })
  }
  
  render(ctx) {
    // Background Kyra gradient (cyan → pink → purple)
    const gradient = ctx.createLinearGradient(0, 0, this.width, this.height)
    gradient.addColorStop(0, '#00BCD4') // Cyan
    gradient.addColorStop(0.5, '#E91E63') // Pink
    gradient.addColorStop(1, '#9C27B0') // Purple
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this.width, this.height)
    
    // Plateformes
    this.platforms.forEach(plat => {
      ctx.fillStyle = '#222'
      ctx.fillRect(plat.x, plat.y, plat.width, plat.height)
      
      // Bordure néon cyan
      ctx.strokeStyle = '#00BCD4'
      ctx.lineWidth = 4
      ctx.strokeRect(plat.x - 2, plat.y - 2, plat.width + 4, plat.height + 4)
    })
    
    // Ennemis
    this.enemies.forEach(enemy => {
      ctx.fillStyle = enemy.color || '#FFF'
      ctx.beginPath()
      ctx.arc(enemy.x + enemy.width/2, enemy.y + enemy.height/2, 20, 0, Math.PI*2)
      ctx.fill()
      
      // Glow
      ctx.shadowBlur = 15
      ctx.shadowColor = enemy.color || '#FFF'
    })
    ctx.shadowBlur = 0
    
    // Bosses
    this.bosses.forEach((boss, index) => {
      const gradient = ctx.createRadialGradient(
        boss.x + boss.width/2, boss.y + boss.height/2, 20,
        boss.x + boss.width/2, boss.y + boss.height/2, 60
      )
      gradient.addColorStop(0, '#E91E63')
      gradient.addColorStop(1, '#9C27B0')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(boss.x + boss.width/2, boss.y + boss.height/2, 60, 0, Math.PI*2)
      ctx.fill()
      
      // Faces
      ctx.fillStyle = '#000'
      ctx.beginPath()
      ctx.arc(boss.x + 35, boss.y + 35, 10, 0, Math.PI*2)
      ctx.arc(boss.x + 85, boss.y + 35, 10, 0, Math.PI*2)
      ctx.fill()
      
      // Health bars
      const healthPercent = boss.health / boss.maxHealth
      ctx.fillStyle = '#333'
      ctx.fillRect(boss.x, boss.y - 12, boss.width, 8)
      ctx.fillStyle = healthPercent > 0.5 ? '#4CAF50' : healthPercent > 0.25 ? '#FFC107' : '#F44336'
      ctx.fillRect(boss.x, boss.y - 12, boss.width * healthPercent, 8)
      
      // Name
      ctx.font = 'bold 16px Jetbrains Mono'
      ctx.fillStyle = '#E91E63'
      ctx.textAlign = 'center'
      ctx.fillText(boss.phase === 1 ? 'BOSS 1' : 'BOSS 2', boss.x + boss.width/2, boss.y - 17)
    })
    
    // Coins
    this.coins.forEach(coin => {
      if (!coin.collected) {
        ctx.fillStyle = '#FFD700'
        ctx.beginPath()
        ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI*2)
        ctx.fill()
        ctx.strokeStyle = '#FFA500'
        ctx.lineWidth = 2
        ctx.stroke()
      }
    })
    
    // Power-ups
    this.powerups.forEach(powerup => {
      if (!powerup.collected) {
        ctx.fillStyle = '#FFF'
        ctx.beginPath()
        ctx.arc(powerup.x, powerup.y, 15, 0, Math.PI*2)
        ctx.fill()
        
        // Text
        ctx.font = '12px Arial'
        ctx.fillStyle = '#000'
        ctx.textAlign = 'center'
        const label = powerup.type === 'timeStop' ? '⏸️' : powerup.type === 'magnet' ? '🧲' : powerup.type === 'invisibility' ? '👻' : '⚡'
        ctx.fillText(label, powerup.x, powerup.y + 5)
      }
    })
  }
  
  getBosses() {
    return this.bosses
  }
}
