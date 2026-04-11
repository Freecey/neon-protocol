# 🎮 NEON PROTOCOL v5.4.7

**Version:** 5.4.7 - Production Ready  
**Date:** 2026-04-11  
**Status:** ✅ COMPLETE - Validated by Pyx
**GitHub Pages:** https://freecey.github.io/neon-protocol/

---

## 🎯 ABOUT

**NEON PROTOCOL** est un jeu de plateforme néon stylé inspiré par le style de JP. Aide **JP** à traverser 7 niveaux, éviter les ennemis, collecter des pièces, et vaincre des bosses!

**Concept:** Survivre 60 secondes en collectant un maximum de points.

**Auteur:** Cey (freecey)  
**Design:** Inspired by JP  
**UI/UX:** Kyra ⌬ aesthetic

---

## 🚀 QUICK START

### **Direct (Double-click)**
```bash
# Open index.html in your browser
open index.html
```

### **Local Server**
```bash
npx serve . -l 8081
# → http://localhost:8081
```

### **Live (GitHub Pages)**
```
https://freecey.github.io/neon-protocol/
```

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
- **Multi-touch:** 3+ doigts simultanément

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

## 🔧 BUILD & DEPLOY

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

### **Deploy to GitHub Pages:**
```bash
# Build first
npm run build

# Deploy (uses gh-pages branch)
npx gh-pages -d public -b gh-pages
```

### **Manual Deploy via Git:**
```bash
# Build bundle
npx esbuild game.js --bundle --outfile=public/game-bundle.js --format=iife --target=es2020

# Switch to gh-pages branch
git checkout gh-pages 2>/dev/null || git checkout --orphan gh-pages

# Copy built files
cp -r public/* .
cp index.html .

# Commit & push
git add .
git commit -m "🚀 Deploy v5.4.7 to GitHub Pages"
git push origin gh-pages

# Switch back
git checkout main
```

---

## 📊 STATS

- **Bundle Size:** 105.2 KB (unminified)
- **Lignes Code:** ~3,500+
- **Fichiers:** 30+
- **Systèmes:** 8 intégrés

---

## 🎨 ARCHITECTURE

```
neon-protocol/
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
│   ├── game-bundle.js          <-- Built bundle
│   └── game-inline.js
├── index.html                   # Main entry
├── game.js                     # Source entry
├── package.json
└── README.md

**Tech Stack:**
- ES6 Modules + Classes
- Canvas API
- Web Audio API
- No external runtime dependencies
```

---

## 🐛 KNOWN ISSUES (non-critical)

- **Minification:** Do not minify to preserve function names for debugging
- **Audio:** Requires user interaction to start (browser autoplay policy)
- **Mobile:** Test on real devices for best experience
- **Resize:** High-DPI screens may need manual refresh

---

## ✅ v5.4.7 FIX LIST

### **v5.4.7** (Current)
- ✅ localStorage protection with try/catch
- ✅ Safe player scaling on resize
- ✅ Canvas resize bound checking
- ✅ Refactored ParticleSystem2 (no duplicate case)
- ✅ AudioContext cleanup fixes

### **v5.4.6**
- ✅ Fixed localStorage parsing errors
- ✅ Added safe data retrieval

### **v5.4.5**
- ✅ Fixed player scaling bugs
- ✅ Added null checks on window resize

### **v5.4.3**
- ✅ AudioContext InvalidAccessError fix
- ✅ Better audio restart handling

---

## 📞 CONTACT & CREDITS

- **Discord:** @freecey
- **Email:** hello@imkyra.be
- **GitHub:** github.com/Freecey/neon-protocol
- **Repository:** https://github.com/Freecey/neon-protocol

---

## 🏆 VALIDATION

- ✅ **Pyx (Testing):** v5.4.7 PASSED - All edge cases covered
- ✅ **Zex (Code Review):** Clean code, no memory leaks
- ✅ **Iris (Design):** Kyra aesthetic verified
- ✅ **Ren (Review):** No critical bugs
- ✅ **Flux (Boilerplate):** Build pipeline working

---

## 📜 LICENSE

MIT License - Feel free to use, modify, and distribute!

---

**Made with 💜 by Kyra ⌬**  
**Credits:** JP (inspiration), Cey (dev), Kyra (UI/UX/System)

*Kyralab v5.4.7 • 2026-04-11 • GitHub Pages Ready*
