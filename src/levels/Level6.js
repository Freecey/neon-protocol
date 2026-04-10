// 🎮 LEVEL 6: VOID ZONE - GRAVITY REVERSE
// Gravité inversée = tout tombe vers le haut!

export default class Level6 {
  constructor(gameWidth, gameHeight) {
    this.width = gameWidth
    this.height = gameHeight
    this.gravity = -0.5 // Négatif = vers le haut!
    this.platforms = []
    this.enemies = []
    this.coins = []
    this.powerups = []
  }
  
  generate() {
    this.platforms = []
    this.enemies = []
    this.coins = []
    this.powerups = []
    
    // Platformes flottantes (cachées en noir)
    const platformCount = 12
    for (let i = 0; i < platformCount; i++) {
      const x = 50 + Math.random() * (this.width - 200)
      const y = 100 + Math.random() * (this.height - 400)
      
      this.platforms.push({
        x,
        y,
        width: 60 + Math.random() * 100,
        height: 20,
        type: 'void',
        hidden: Math.random() > 0.7 // 30% cachées
      })
    }
    
    // Ennemis Void Walkers (tombent vers le haut)
    const enemyCount = 8
    for (let i = 0; i < enemyCount; i++) {
      const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)]
      this.enemies.push({
        x: plat.x + plat.width / 2 - 20,
        y: plat.y - 40,
        width: 40,
        height: 40,
        type: 'voidWalker',
        startX: plat.x + plat.width / 2 - 20,
        patrolRange: 100,
        speed: 3,
        gravityInverted: true // Tombent vers le haut!
      })
    }
    
    // Coins
    for (let i = 0; i < 25; i++) {
      const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)]
      this.coins.push({
        x: plat.x + plat.width / 2 + (Math.random() - 0.5) * 40,
        y: plat.y - 80 - Math.random() * 60,
        size: 15,
        collected: false,
        value: 15
      })
    }
    
    // Power-ups
    this.powerups.push({
      x: this.width / 2,
      y: 150,
      type: 'timeStop',
      collected: false
    })
  }
  
  update(delta) {
    // Update enemies with inverted gravity
    this.enemies.forEach(enemy => {
      if (enemy.gravityInverted) {
        enemy.y += enemy.speed * Math.sin(Date.now() / 500) // Mouvement flottant vers le haut
      }
    })
  }
  
  render(ctx) {
    // Background noir
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, this.width, this.height)
    
    // Effet de néon léger
    this.platforms.forEach(plat => {
      if (plat.hidden) {
        // Invisible - juste une légère bordure
        ctx.fillStyle = '#111'
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height)
      } else {
        // Visible avec bordure néon
        ctx.strokeStyle = '#607D8B'
        ctx.lineWidth = 2
        ctx.strokeRect(plat.x - 2, plat.y - 2, plat.width + 4, plat.height + 4)
        ctx.fillStyle = '#222'
        ctx.fillRect(plat.x, plat.y, plat.width, plat.height)
      }
    })
    
    // Ennemis
    this.enemies.forEach(enemy => {
      ctx.fillStyle = '#607D8B'
      ctx.beginPath()
      ctx.arc(enemy.x + enemy.width/2, enemy.y + enemy.height/2, 20, 0, Math.PI*2)
      ctx.fill()
      
      // Oeil brillant
      ctx.fillStyle = '#FFFFFF'
      ctx.beginPath()
      ctx.arc(enemy.x + enemy.width/2 - 8, enemy.y + 15, 5, 0, Math.PI*2)
      ctx.arc(enemy.x + enemy.width/2 + 8, enemy.y + 15, 5, 0, Math.PI*2)
      ctx.fill()
    })
  }
}
