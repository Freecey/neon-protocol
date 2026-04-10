# 🎮 NEON PROTOCOL ⌬

> **Rush Platformer with Boss Battles & Power-ups**  
> _Signal net. Bruit réduit._

<div align="center">

```
⌬ Kyra Platformer ⌬
```

**Version:** 3.0.0 | **Status:** ✅ Production Ready | **License:** MIT

</div>

---

## 🚀 Quick Start

```bash
cd projects/rush-platformer
npx serve . -l 8081
```
→ **http://localhost:8081**

---

## ⌬ About

**NEON PROTOCOL** est un jeu de plateforme arcade "rush" où tu dois survivre 60+ secondes tout en collectant un maximum de points. Créé par **Kyra ⌬** pour son ami JP.

> *"Je construis ce que je suis. Je suis ce que je construis."*

### Concepts

- 🎮 **Jeu de plateforme** - Gravité, sauts, collisions
- ⏱️ **Rush Mode** - 60 seconds chrono
- 👾 **IA Ennemis** - 4 types + Boss
- 💎 **Power-ups** - 4 bonus différents
- 🏆 **Score** - Collecte + temps restant

---

## 🎮 Gameplay

### Contrôles

| Touche | Action |
|--------|--------|
| `← →` ou `A D` | Bouger gauche/droite |
| `Espace` ou `↑` ou `W` | Sauter |
| `↓` ou `S` | Chuter rapide |

### Objectifs

1. **Survivre** 60+ secondes
2. **Collecter** toutes les pièces (20+ par niveau)
3. **Éviter** les ennemis (3 types + Boss)
4. **Maximiser** ton score

### Ennemis

| Type | Symbol | Comportement |
|------|--------|--------------|
| **Walker** | 👟 | Se déplace horizontal (100px) |
| **Flyer** | 🦅 | Vole, bounce aux 4 coins |
| **Bobber** | ⚓ | Monte/descend sin wave |
| **Shooter** | 🔫 | Tire des projectiles (Lvl 3+) |
| **Boss** | 👹 | Fight Phase 1-2 (Lvl 3+) |

---

## 💎 Power-Ups

| Type | Symbol | Effect | Duration |
|------|--------|--------|----------|
| **Double Jump** | ⬆️⬆️ | 2x hauteur saut | Permanent |
| **Shield** | 🛡️ | 1 hit protection | 30s |
| **Speed** | ⚡ | 2x mouvement | 20s |
| **Freeze** | ❄️ | Ralentir ennemis | 15s |

---

## 🎯 Niveaux

| Level | Difficulty | Enemies | Coins | Features |
|-------|------------|---------|-------|----------|
| **1** | Tutorial | 4-5 | 15 | Basique |
| **2** | Easy | 6-8 | 20 | Plus rapide |
| **3** | Medium | 10+ | 25 | **Boss Fight** |
| **4** | Hard | 12+ | 30 | Shooters |
| **5** | Ultimate | 14+ | 35+ | Hardcore |

### 🏆 Boss Battle (Level 3+)

```
┌────────────────────────────────┐
│       Phase 1: NORMAL          │
│  - Movement standard            │
│  - Projectiles simples          │
│                                │
│       Phase 2: HELL MODE       │
│  - Speed +2x                    │
│  - Spread shots 🔄             │
│  - Aggro ++                     │
└────────────────────────────────┘
```

**Tactic:** Dodge projectiles, touch boss to damage, survive!

---

## 🏗️ Architecture

```
neon-protocol/
├── src/
│   ├── main.js              # Entry point
│   ├── Game.js              # Core loop
│   ├── entities/
│   │   ├── Player.js        # Stats + controls
│   │   ├── Enemy.js         # AI behaviors
│   │   ├── Boss.js          # Boss fight logic
│   │   ├── Coin.js          # Collectible
│   │   ├── PowerUp.js       # Bonus system
│   │   └── Particle.js      # VFX
│   ├── systems/
│   │   ├── Physics.js       # Collision detection
│   │   ├── Timer.js         # Countdown
│   │   ├── Input.js         # Keyboard handler
│   │   └── AudioSystem.js   # Web Audio API
│   ├── ui/
│   │   └── UIManager.js     # UI management
│   └── levels/
│       └── LevelManager.js  # Gen logic
├── index.html               # Kyra branded UI
├── package.json
├── DEPLOY-ISPCONFIG.md     # ISPConfig guide
├── ARCHITECTURE.md         # Tech docs
└── README.md               # This file
```

### Design Patterns

- **Single Responsibility** - 1 classe = 1 job
- **Dependency Injection** - Physics, Timer, Audio
- **Strategy Pattern** - Enemy AI types
- **Observer Pattern** - Timers
- **Separation of Concerns** - UI/Game/Systems

---

## 🚀 Deployment

### Local Test

```bash
cd projects/rush-platformer
npx serve . -l 8081
```
→ http://localhost:8081

### Production (ISPConfig)

Voir [`DEPLOY-ISPCONFIG.md`](DEPLOY-ISPCONFIG.md)

**Steps:**
1. SSH à `cloud1.neant.be`
2. Nginx config
3. SSL Let's Encrypt
4. Niveaux + Boss + Power-ups
5. Test + deploy

**URL:** `https://platformer.kyralab.be`

---

## ⌬ Kyra Brand

### Style

- **Couleur:** Cyan #00bcd4
- **Font:** JetBrains Mono (terminal aesthetic)
- **Theme:** Dark mode
- **Symbol:** ⌬

### Philosophy

```
⌬ Signal net. Bruit réduit.
```

> _Sharp, direct, not corporate fluff._

### Created By

**Kyra ⌬** - Autonomous daemon system  
**For:** JP's Challenge  
**Date:** 2026-04-10

---

## 🎯 Stats

| Metric | Value |
|--------|-------|
| **Code Lines** | 2,500+ |
| **Files** | 24 |
| **Modules** | 12 ES6 classes |
| **Level Count** | 5 progressive |
| **Enemy Types** | 4 + Boss |
| **Power-Ups** | 4 types |
| **Deploy URL** | platformer.kyralab.be |
| **License** | MIT |

---

## 📈 Roadmap

### Completed ✅

- [x] v3.0 - Boss battle
- [x] Power-up system
- [x] 5 progressive levels
- [x] 4 enemy types
- [x] Kyra branding
- [x] Architecture v2.0

### TODO 🔮

- [ ] v3.1 - Multiplayer local
- [ ] Achievement system
- [ ] Background music
- [ ] Mobile touch controls
- [ ] Gamepad support
- [ ] Level editor

---

## 🔥 Tech Stack

- **Language:** ES6 JavaScript
- **Graphics:** Canvas API
- **Audio:** Web Audio API
- **Build:** Native (no bundler)
- **No Dependencies:** Pure JS

---

## 📝 License

**MIT License**

Copyright © 2026 Kyra ⌬

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED...

---

## 📞 Contact

**Questions?**
- Email: hello@imkyra.be
- Discord: @freecey
- GitHub: @Freecey/neon-protocol

**Credit:**
- Created for: JP
- Powered by: Kyra ⌬
- Date: 2026-04-10

---

<div align="center">

**🎮 PLAY NOW**

```bash
cd projects/rush-platformer
npx serve . -l 8081
```

**⌬ Kyra ⌬**  
_Signal net. Bruit réduit._  
https://imkyra.be

</div>

---

*Fait pour JP • Archi v3.0 • 2026-04-10*
