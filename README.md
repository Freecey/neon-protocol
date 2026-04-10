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

## 🚀 **POUR JP (WINDOWS)**

**🔴 MÉTHODE PRÉFÉRÉE: EXÉCUTABLE**

1. **Reçois** le fichier `.exe` (depuis USB ou email)
2. **Double-clique** → Installation
3. **JOUE!** 🎮 (Pas de npm, pas de node!)

**Si tu n'as pas encore le .exe:**

**Méthode 1 - Play.bat (sans installer):**
1. Télécharge le ZIP: https://github.com/Freecey/neon-protocol
2. Dézippe dans `C:\Games\neon-protocol`
3. Double-clique sur `play.bat`
4. Le jeu s'ouvre!

**Méthode 2 - Installer Node.js (si play.bat ne marche pas):**
1. https://nodejs.org/
2. Clique sur "LTS Version" (vert)
3. Installe
4. Relance `play.bat`

---

## 📞 Support JP
- **Guide complet:** [GUIDE-JP.md](GUIDE-JP.md)
- **Email:** hello@imkyra.be
- **Discord:** @freecey

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
├── dist/                    # 🎮 EXÉCUTABLES
│   ├── NEON PROTOCOL Setup 3.0.0.exe
│   └── ...
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

## 🚀 Deployment & Build

### **Pour JP (Windows):**

**Option 1 - EXE (Recommandé):**
- Voir: [BUILD-WINDOWS.md](BUILD-WINDOWS.md)
- Fichier `.exe` → Double-clique → JOUEZ!

**Option 2 - Play.bat (Sans installer):**
1. Télécharge ZIP: https://github.com/Freecey/neon-protocol
2. Dézippe → `play.bat`
3. Double-clique

### **Pour développeurs:**

```bash
npm install
npm run start
```
→ http://localhost:8081

### **Build EXE:**
```bash
npm run build:win
```
→ `dist/NEON PROTOCOL Setup 3.0.0.exe`

### **Production (ISPConfig)**
Voir [`DEPLOY-ISPCONFIG.md`](DEPLOY-ISPCONFIG.md)

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

## 📈 Stats

| Metric | Value |
|--------|-------|
| **Code Lines** | 2,500+ |
| **Files** | 28 |
| **Modules** | 12 ES6 classes |
| **Levels** | 5 progressive |
| **Enemy Types** | 4 + Boss |
| **Power-Ups** | 4 types |
| **Windows EXE** | 100MB |
| **Deploy URL** | platformer.kyralab.be |
| **License** | MIT |

---

## 📞 Support & Credits

**Pour JP:**
- 📄 [GUIDE-JP.md](GUIDE-JP.md) - Instructions pas à pas
- 🎮 [BUILD-WINDOWS.md](BUILD-WINDOWS.md) - Créer .exe
- 📧 Email: hello@imkyra.be
- 💬 Discord: @freecey

**Technical:**
- Electron v32.0.0
- Node.js v20.x
- No bundler (pure JS)

---

<div align="center">

**🎮 PLAY NOW**

**Windows Exe:** Reçois le `.exe` + Double-clique  
**Windows Play:** `play.bat` + Double-clique  
**Linux/Mac:** `npm run start`

**⌬ Kyra ⌬**  
_Signal net. Bruit réduit._  
https://imkyra.be

</div>

---

*Faitpour JP • Archi v3.0 • 2026-04-10*
