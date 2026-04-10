# 🏗️ Architecture Technique - Rush Platformer v2.0

## 📋 Overview

**Design Pattern:** Object-Oriented + Separation of Concerns  
**Architecture:** ES6 Modules avec classes séparées  
**State Management:** Central Game State dans Game.js

---

## 🎯 Principes de Conception

### 1. **Single Responsibility**
Chaque classe fait UNE SEULE chose:
- `Player.js` → Player uniquement
- `Physics.js` → Calculs physiques uniquement
- `UIManager.js` → UI uniquement

### 2. **Loose Coupling**
Classes dépendent de interfaces, pas d'implémentations:
```javascript
class Game {
  constructor() {
    this.physics = new Physics(); // Injection dépendance
    this.timer = new Timer();     // Injection dépendance
  }
}
```

### 3. **High Cohesion**
Tout code lié ensemble reste ensemble:
- TOUT ce qui concerne la physics → `Physics.js`
- TOUT ce qui concerne l'enemy → `Enemy.js`
- TOUT ce qui concerne l'UI → `UIManager.js`

---

## 🔧 Classes & Responsabilités

### **Game.js** (Core)
- **Responsabilité:** Orchestrateur principal
- **Chargé de:**
  - Boucle principale (gameLoop)
  - État global du jeu
  - Coordination des systèmes
  - Gestion du lifecycle

### **Player.js** (Entity)
- **Responsabilité:** Joueur
- **Chargé de:**
  - Position, vélocité
  - Mouvement, saut
  - Collision ground
  - Rendu visuel

### **Enemy.js** (AI Entity)
- **Responsabilité:** Ennemi avec IA
- **Chargé de:**
  - Comportement (Walker/Flyer/Bobber)
  - Patrol logic
  - Collision detection
  - Rendu

### **Physics.js** (System)
- **Responsabilité:** Logique physique pure
- **Chargé de:**
  - Collision detection
  - Gravity calculation
  - Distance calculation
  - NO UI, NO game loop

### **Timer.js** (System)
- **Responsabilité:** Gestion du temps
- **Chargé de:**
  - Comptage du temps
  - Callbacks d'expiration
  - Pause/Resume
  - Formatage display

### **UIManager.js** (UI)
- **Responsabilité:** Interface utilisateur
- **Chargé de:**
  - Affichage score
  - Timer display
  - Health bar
  - Screens (start/gameover)
  - NO game logic

---

## 🔄 Flux de Données

```javascript
// Init
main.js → Game.js → UIManager.js
           ↓
        Game.loop()
           ↓
  ┌────────┴────────┐
  ↓                 ↓
update()         render()
  ↓                 ↓
Player.update()   Player.render()
Enemy.update()    Enemy.render()
  ↓                 ↓
Physics.check()   Canvas draw()
```

---

##💡 Décisions Architecturales

### Pourquoi ES6 Modules?
- Native browser support
- Tree-shaking possible
- Clear dependencies
- Better organization

### Pourquoi Classes Séparées?
- Testability (unit tests)
- Reusability
- Maintainability
- Scalability

### Pourquoi pas React/Vue?
- Game requires direct canvas control
- Performance critical
- No DOM needed for game loop
- Pure JavaScript is faster here

### Pourquoi pas ECS (Entity-Component-System)?
- Too complex for simple platformer
- Over-engineering for JP's needs
- OOP is simpler and sufficient
- Could add later if needed

---

## 🎨 Design Patterns Utilisés

### 1. **Dependency Injection**
```javascript
class Game {
  constructor() {
    this.physics = new Physics();
    this.uiManager = new UIManager();
  }
}
```

### 2. **Strategy Pattern** (Enemy AI)
```javascript
class Enemy {
  update(deltaTime) {
    switch(this.type) {
      case 'walker': this.walkerAI()
      case 'flyer': this.flyerAI()
      // ...
    }
  }
}
```

### 3. **Observer Pattern** (Timers)
```javascript
class Timer {
  addCallback(fn) {
    this.callbacks.push(fn);
  }
  checkExpire() {
    this.callbacks.forEach(cb => cb());
  }
}
```

### 4. **Singleton Pattern** (Game State)
```javascript
class Game {
  constructor() {
    this.state = { ... };
    // Shared instance accessible everywhere
  }
}
```

---

## 📈 Scalabilité & Évolution

### Niveau 1 → 2 → 3
**Niveau actuel:** Simple OOP  
**Niveau 2:** Ajouter ECS pour plus de performance  
**Niveau 3:** Framework complet (Phaser/Unity)

### Performance Tips
- Object pooling pour particles
- Canvas batch rendering
- Sprite caching
- Spatial hashing for collision

---

## 🔍 Anti-Patterns Évités

❌ **God Object** - Game.js n'est PAS tout le code  
❌ **Tight Coupling** - UI pas connecté à Game Logic  
❌ **Global State** - State dans Game instance, pas `window.gameState`  
❌ **Spaghetti Code** - 1 fichier = 1 classe = 1 responsabilité  

---

## 📚 Références

- [JavaScript Design Patterns](https://github.com/addyosmani/javascript-design-patterns)
- [Game Development Pattern Book](https://github.com/kripken/ammo.js/wiki)
- [ES6 Modules Deep Dive](https://exploringjs.com/es6/ch_modules.html)

---

**Architecture prête pour scale! 🚀**  
*Pour JP - 2026-04-10*
