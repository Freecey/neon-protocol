# 🎮 NEON PROTOCOL v5.4

**Version:** 5.4.0 - Production Ready  
**Date:** 2026-04-11  
**Status:** ✅ COMPLETE

---

## 🎯 ABOUT

**NEON PROTOCOL** est un jeu de plateforme néon stylé inspiré par le style de JP. Aide **JP** à traverser 7 niveaux, éviter les ennemis, collecter des pièces, et vaincre des bosses!

**Concept:** Survivre 60 secondes en collectant un maximum de points.

**Auteur:** Cey (freecey)  
**Design:** Inspired by JP  
**UI/UX:** Kyra ⌬ aesthetic

---

## 🎮 FEATURES (100% COMPLETE!)

- ✅ **7 Niveaux** - De tutoriel à Ultimate (Kyra's Realm)
- ✅ **2 Boss Battles** - Niveaux 3, 5, et 7
- ✅ **Menu Principal** - Stylé avec transitions
- ✅ **Transitions Animées** - LevelUp, Victory, Boss, GameOver
- ✅ **Particules Avancées** - Confetti, Shake, Fade effects
- ✅ **Combo System** - x1.5 à x3 multiplier
- ✅ **Leaderboard** - Global + par niveau (localStorage)
- ✅ **11 Achievements** - À débloquer
- ✅ **7 Power-ups**:
  - 🔸 Shield (invincibilité)
  - ⚡ Speed Boost
  - ⬆️ Double Jump
  - ⏸️ Time Stop (freeze)
  - 🧲 Magnet (attraction)
  - 🛡️ Flash/Invisible
  - ❄️ Freeze (ennemis)
- ✅ **Audio Complet**:
  - 🎵 Background music cyberpunk (synthétisé)
  - 🔊 8 Sound Effects (jump, collect, kill, etc.)
  - 🎚️ Volume control + Mute toggle
- ✅ **Pause Menu** - ESC pause, Resume/Restart/Quit
- ✅ **Mobile Controls** - Tactile, multi-touch, swipe
- ✅ **Desktop Controls** - Clavier complet

---

## 🚀 HOW TO PLAY

### **Option A: Direct (File://)**
```bash
cd ~/projects/rush-platformer
# Double-click index.html
```

### **Option B: Local Server**
```bash
cd ~/projects/rush-platformer
npx serve . -l 8081
# http://localhost:8081
```

---

## 🎮 CONTROLS

### **Clavier:**
- `← →` ou `A D` - Boucher
- `Espace` ou `J` - Sauter
- `D` - Chuter rapide
- `R` - Restart
- `M` - Mute/Unmute
- `ESC` - Pause

### **Tactile (Mobile):**
- **Boutons:** ◀ ▶ △ visuels
- **Swipe:** Gauche/Droite pour bouger, Haut pour sauter
- **Multi-touch:** 3+ doigts simultanés

---

## 🏆 ACHIEVEMENTS (11/11)

1. **Bienvenue!** - Jouer au jeu
2. **Premier Score** - 100 points
3. **Chasseur de Pièces** - 50 pièces
4. **Maître du Saut** - 100 sauts
5. **Survivant** - 60 secondes
6. **Démon Vitesse** - Bonus >50s
7. **Tueur de Boss** - 1 boss vaincu
8. **Mode Chaos** - Niveau 7
9. **Perfectionniste** - 100% pièces
10. **Maître du Temps** - 10x Time Stop
11. **Maître Power-up** - 50 power-ups

---

## 🔧 CONSTRUCTION

### **Build Bundle:**
```bash
npx esbuild game.js \
  --bundle \
  --outfile=public/game-bundle.js \
  --format=iife \
  --target=es2020 \
  --minify=false \
  --keep-names
```

### **Build EXE (Windows):**
```bash
npm install electron electron-builder --save-dev
npm run build:win
# → dist/NEON PROTOCOL Setup X.X.X.exe
```

### **Build APK (Android):**
```bash
./build-mobile.sh
# → platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 📊 STATS

- **Bundle Size:** 102.3KB (unminified)
- **Lignes Code:** ~3,500+
- **Fichiers:** 30+
- **Systèmes:** 8 intégrés

---

## 🎨 ARCHITECTURE

```
projects/rush-platformer/
├── src/
│   ├── systems/
│   │   ├── TransitionSystem.js
│   │   ├── LeaderboardSystem.js
│   │   ├── AchievementSystem.js
│   │   ├── ParticleSystem2.js
│   │   ├── ComboSystem.js
│   │   ├── PowerUpSystem.js
│   │   ├── AudioSystem.js      <-- NEW
│   │   └── ui/
│   │       ├── MenuSystem.js
│   │       └── PauseMenu.js    <-- NEW
│   ├── levels/
│   │   ├── LevelManager.js
│   │   ├── Level6.js (Void)
│   │   └── Level7.js (Kyra)
│   └── mobile/
│       └── mobile-controls.js  <-- UPGRADED
├── public/
│   └── game-bundle.js
├── game.js
└── index.html
```

---

## 🐛 KNOWN ISSUES

- **Minification:** Ne pas minifier pour préserver noms de fonctions
- **Audio:** Nécessite interaction utilisateur pour démarrer (browsers autoplay policy)
- **Mobile:** Testing recommandé sur véritable device

---

## 📞 CONTACT

- **Discord:** @freecey
- **Email:** hello@imkyra.be
- **GitHub:** github.com/Freecey/neon-protocol

---

## 📜 LICENSE

MIT License - Feel free to use, modify, and distribute!

---

**Made with 💜 by Kyra ⌬**  
**Credits:** JP (inspiration), Cey (dev), Kyra (UI/UX/System)

*Kyralab v5.4 • 2026-04-11*
