# 🎮 NEON PROTOCOL ⌬

**Rush Platformer Game with Advanced Features**  
*Powered by Kyra ⌬ - Signal net. Bruit réduit.*

![Platformer](https://img.shields.io/badge/Platformer-Neon-cyan?style=for-the-badge&color=00bcd4)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-3.0.0-green?style=for-the-badge)

---

## 🚀 Quick Start

```bash
cd projects/rush-platformer
npx serve . -l 8081
```
→ Open http://localhost:8081

---

## 🎮 GAME FEATURES

### **Core Gameplay**
- ⏱️ 60s Rush Mode (survive & score)
- 🎯 5 Progressive Levels (increasing difficulty)
- 💎 Collect coins for score
- ❤️ Health system with 3 colors
- 🏆 High scores tracking

### **Advanced Boss Battle**
- 👾 Boss fight at Level 3+
- 🎯 2 Phases (speed up at 50% HP)
- 🔥 Projectile patterns (normal + spread)
- 💥 Boss health bar visible

### **Power-Ups**
- ⬆️⬆️ **Double Jump** - 2x jump height
- 🛡️ **Shield** - 1 hit protection
- ⚡ **Speed** - 2x movement speed
- ❄️ **Freeze** - Slow down all enemies

### **Enhanced Enemies**
- **Walker** - Patrol horizontal movement
- **Flyer** - 4-corner bouncing
- **Bobber** - Sin wave vertical
- **Shooter** - Fires projectiles (Level 3+)

---

## 📚 Architecture

```
rush-platformer/
├── src/
│   ├── main.js              # Entry point
│   ├── Game.js              # Core game loop
│   ├── entities/
│   │   ├── Player.js        # Player with stats
│   │   ├── Enemy.js         # AI behaviors
│   │   ├── Boss.js          # Boss fight logic
│   │   ├── Coin.js          # Collectible
│   │   ├── PowerUp.js       # Bonus items
│   │   └── Particle.js      # VFX
│   ├── systems/
│   │   ├── Physics.js       # Collision
│   │   ├── Timer.js         # Countdown
│   │   ├── Input.js         # Controls
│   │   └── AudioSystem.js   # Web Audio
│   ├── ui/
│   │   └── UIManager.js     # Interface
│   └── levels/
│       └── LevelManager.js  # Level generation
├── index.html               # Custom Kyra UI
├── package.json
└── README.md
```

**Tech Stack:**
- ES6 Modules + Classes
- Canvas API
- Web Audio API
- No external dependencies

---

## 🎯 Game Controls

**Movement:**
- `← →` or `A D` - Move left/right
- `Space` or `↑` or `W` - Jump
- `↓` or `S` - Fast fall

**Gameplay:**
- Collect coins (+10-20 pts)
- Avoid enemies (-10 HP)
- Grab power-ups for bonuses
- Survive 60s + time bonus

**Boss Fight (Level 3+):**
- Dodge projectiles
- Attack boss by touching it
- Watch health bar
- Survive until boss defeated

---

## 🎨 Customization

**Kyra ⌬ Branding:**
- Cyan color scheme (#00bcd4)
- JetBrains Mono font
- Dark terminal aesthetic
- Pulse animations

**To customize:**
- Edit `src/entities/*.js` for game balance
- Modify `index.html` for UI colors
- Change `DEPLOY-ISPCONFIG.md` for hosting

---

## 📈 Level Progression

| Level | Enemies | Coins | Special |
|-------|---------|-------|---------|
| 1 | 4-5 | 15 | Tutorial |
| 2 | 6-8 | 20 | Faster |
| 3+ | Boss | Power-ups | Boss Fight |
| 5 | 12-14 | 30+ | Hardcore |

---

## 🚀 Deployment

### **Local Test:**
```bash
npx serve . -l 8081
```

### **Production (ISPConfig):**
1. Follow `DEPLOY-ISPCONFIG.md`
2. Domain: `platformer.kyralab.be`
3. SSL: Let's Encrypt
4. Access: https://platformer.kyralab.be

---

## 🎯 Roadmap

**v3.0 (Current):**
- ✅ 5 Levels
- ✅ Boss Battle
- ✅ Power-ups
- ✅ Shield mechanics

**v3.1:**
- [ ] Multiplayer local
- [ ] Achievement system
- [ ] Soundtrack

**v4.0:**
- [ ] Mobile touch controls
- [ ] Gamepad support
- [ ] Level editor

---

## 📝 License

**MIT License**  
Copyright © 2026 Kyra ⌬

**Built with ❤️ for JP**

---

## 📞 Credits

**Created by:** Kyra ⌬  
**For:** JP's Challenge  
**Date:** 2026-04-10  
**Status:** v3.0 Production Ready

**Tags:** platformer, javascript, neo-noir, arcade, casual

---

**🎮 PLAY NOW: http://localhost:8081**  
**🌐 DEPLOY: https://github.com/Freecey/neon-protocol**

*Kyra ⌬ - Signal net. Bruit réduit.*
