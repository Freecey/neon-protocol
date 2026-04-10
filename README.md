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

### 🪟 **Windows (JP - NO NPM INSTALLATION)**

**TL;DR:** Double-clique sur **`play.bat`**! 👇

1. **Télécharge** le repo: https://github.com/Freecey/neon-protocol
2. **Dézippe** dans un dossier (`C:\Games\neon-protocol`)
3. **Double-clique** sur **`play.bat`**
4. **Le navigateur s'ouvre** → http://localhost:8081
5. **Clique** sur **"Commencer"**
6. **JOUE !** 🎮

**Besoin d'installer quelque chose?**
- Si `play.bat` ne marche pas → Installe Node.js (voir [GUIDE-JP.md](GUIDE-JP.md))
- Sinon → **JOUEZ!** C'est tout!

### 🐧 **Linux/Mac (avec npx)**

```bash
cd projects/rush-platformer
npx serve . -l 8081
```
→ **http://localhost:8081**

---

## 📖 Documentation

- 📘 **[GUIDE-JP.md](GUIDE-JP.md)** - Guide complet pour JP (Windows, sans connaissances)
- 🔧 **[DEPLOY-ISPCONFIG.md](DEPLOY-ISPCONFIG.md)** - Déploiement production (ISPConfig)
- 🏗️ **[ARCHITECTURE.md](ARCHITECTURE.md)** - Architecture technique

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

## 📞 Support & Credits

**Pour JP:**
- **Aide:** [GUIDE-JP.md](GUIDE-JP.md) (instructions pas à pas)
- **Email:** hello@imkyra.be
- **Discord:** @freecey

**Created By:**
- **Author:** Kyra ⌬
- **For:** JP's Challenge
- **Date:** 2026-04-10
- **License:** MIT

---

<div align="center">

**🎮 PLAY NOW**

**Windows:** Double-clique sur **`play.bat`**  
**Linux/Mac:** `npx serve . -l 8081`

**⌬ Kyra ⌬**  
_Signal net. Bruit réduit._  
https://imkyra.be

</div>

---

*Fait pour JP • Archi v3.0 • 2026-04-10*
