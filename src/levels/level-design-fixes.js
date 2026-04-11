// 🎮 Level Design Fixes - Casual Style (Mario-like)
// Refonte complète pour jeu accessible aux enfants et tous âges

// Configuration de difficulty par niveau
export const levelConfig = {
  1: { 
    platforms: 3, 
    enemies: 2, 
    coins: 8, 
    powerups: 1, 
    boss: false, 
    tutorial: "FULL" 
  },
  2: { 
    platforms: 5, 
    enemies: 3, 
    coins: 10, 
    powerups: 1, 
    boss: false, 
    tutorial: "MINIMAL" 
  },
  3: { 
    platforms: 6, 
    enemies: 4, 
    coins: 12, 
    powerups: 2, 
    boss: true, 
    tutorial: "BOSS_HINT" 
  },
  4: { 
    platforms: 8, 
    enemies: 5, 
    coins: 15, 
    powerups: 2, 
    boss: false, 
    tutorial: "NONE" 
  },
  5: { 
    platforms: 8, 
    enemies: 6, 
    coins: 15, 
    powerups: 3, 
    boss: true, 
    tutorial: "BOSS_HINT" 
  },
  6: { 
    platforms: 10, 
    enemies: 7, 
    coins: 20, 
    powerups: 4, 
    boss: false, 
    tutorial: "NONE" 
  },
  7: { 
    platforms: 6, 
    enemies: 5, 
    coins: 10, 
    powerups: 2, 
    boss: true, 
    tutorial: "BOSS_HINT" 
  }
};

// Vitesse des ennemis par type (style CASUAL)
export const enemySpeeds = {
  walker: { base: 0.8, mult: 0.2, max: 2.5 },    // Lent, facile à esquiver
  flyer:   { base: 1.2, mult: 0.3, max: 3.0 },   // Mouvement sinusoïdal
  bobber:  { base: 0.6, mult: 0.15, max: 2.0 },  // Très lent, vertical
  shooter: { base: 0.3, mult: 0.1, max: 1.5 }    // Statique/rapide
};

// Paramètres de saut pour accessibilité
export const maxJumpHeight = 150;  // Hauteur max jump
export const maxJumpDistance = 200;  // Distance max horizontale
export const minDistanceBetweenPlatforms = 80;  // Minimum entre plateformes

/**
 * Génère un sol visible en bas d'écran
 */
export function generateSol(screenHeight, screenWidth) {
  return {
    x: 0,
    y: screenHeight - 60,  // Sol TOUJOURS fixe en bas
    width: screenWidth,
    height: 60,
    type: 'ground'
  };
}

/**
 * Génère une plateforme de départ garantie
 */
export function generateSpawnPlatform(screenHeight) {
  return {
    x: 50,
    y: screenHeight - 150,  // 150px au-dessus du sol
    width: 200,
    height: 20,
    type: 'start-platform'
  };
}

/**
 * Vérifie si une plateforme est accessible depuis une autre
 */
function isPlatformAccessible(prevPlatform, newPlatform) {
  const diffY = Math.abs(prevPlatform.y - newPlatform.y);
  const diffX = Math.abs(prevPlatform.x - newPlatform.x);
  
  return diffY <= maxJumpHeight && diffX <= maxJumpDistance;
}

/**
 * Génère des plateformes accessibles (style Mario - facile à atteindre)
 */
export function generateAccessiblePlatforms(screenWidth, screenHeight, level = 1) {
  const platforms = [];
  const config = levelConfig[level] || levelConfig[1];
  
  // Sol
  platforms.push(generateSol(screenHeight, screenWidth));
  
  // Plateforme de départ
  const spawnPlat = generateSpawnPlatform(screenHeight);
  platforms.push(spawnPlat);
  
  const numPlatforms = config.platforms;
  let previousPlatform = spawnPlat;
  
  for (let i = 0; i < numPlatforms; i++) {
    let newPlatform = null;
    let attempts = 0;
    const maxAttempts = 50;
    
    while (!newPlatform && attempts < maxAttempts) {
      attempts++;
      
      // Position Y: échelonnée du bas vers le haut
      const minSafeY = screenHeight - 250;
      const maxSafeY = 100;
      const targetY = minSafeY - (i * (minSafeY - maxSafeY) / numPlatforms);
      
      const randomOffset = (Math.random() - 0.5) * 80;
      let candidateY = targetY + randomOffset;
      
      // Position X
      const minX = 150;
      const maxX = screenWidth - 250;
      const candidateX = minX + Math.random() * (maxX - minX);
      
      // Largeur de plateforme
      const candidateWidth = 80 + Math.random() * 80;
      
      newPlatform = {
        x: candidateX,
        y: candidateY,
        width: candidateWidth,
        height: 20,
        type: 'platform',
        difficulty: level
      };
      
      // Vérifier accessibilité
      if (!isPlatformAccessible(previousPlatform, newPlatform)) {
        newPlatform = null; // Essayer de nouveau
      }
      
      // Vérifier superposition
      if (newPlatform) {
        const tooClose = platforms.some(p => {
          const distX = Math.abs(p.x - newPlatform.x);
          const distY = Math.abs(p.y - newPlatform.y);
          return distX < minDistanceBetweenPlatforms && distY < 40;
        });
        
        if (tooClose) {
          newPlatform = null;
        }
      }
    }
    
    if (newPlatform) {
      platforms.push(newPlatform);
      previousPlatform = newPlatform;
    }
  }
  
  return platforms;
}

/**
 * Calcule la vitesse d'un ennemi basée sur son type et le niveau
 */
export function getEnemySpeed(type, level) {
  const config = enemySpeeds[type] || enemySpeeds.walker;
  const calculatedSpeed = config.base + level * config.mult;
  return Math.min(calculatedSpeed, config.max);
}

/**
 * Génère des ennemis avec vitesses réduites (style CASUAL)
 */
export function generateCasualEnemies(level, platforms) {
  const enemies = [];
  const enemyTypes = ['walker', 'flyer', 'bobber', 'shooter'];
  const config = levelConfig[level] || levelConfig[1];
  
  for (let i = 0; i < config.enemies; i++) {
    const plat = platforms[Math.floor(Math.random() * platforms.length)];
    const type = enemyTypes[Math.floor(Math.random() * Math.min(level + 1, enemyTypes.length))];
    
    enemies.push({
      x: plat.x + plat.width / 2 - 20,
      y: plat.y - 40,
      width: 40,
      height: 40,
      type: type,
      startX: plat.x + plat.width / 2 - 20,
      patrolRange: 80 + level * 15,  // Zone de patrol réduite
      speed: getEnemySpeed(type, level)  // Vitesse CASUAL
    });
  }
  
  return enemies;
}

/**
 * Messages tutoriels pour progression douce
 */
export const tutorialMessages = {
  start: "🎮 Aide JP ! Reste en vie 60s",
  move: "← → pour bouger",
  jump: "SPACE pour sauter ↑",
  collect: "🌟 Collecter les étoiles = +points",
  avoid: "⚠️ Évite les ennemis rouges !",
  powerup_first: "💫 Power-up ! Utilise-les ✨",
  boss_hint: "👹 BOSS ! Esquive + patience",
  win: "🎉 NIVEAU TERMINÉ ! Continue !"
};

/**
 * Affiche un message tutoriel
 */
export function showTutorialMessage(messageKey, delay = 1500) {
  const msg = document.createElement('div');
  msg.innerHTML = tutorialMessages[messageKey] || tutorialMessages.start;
  msg.id = `tutorial-${Date.now()}`;
  msg.style.cssText = `
    position: absolute; 
    top: 40%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
    color: #00bcd4; 
    font-size: 24px; 
    font-family: 'JetBrains Mono', monospace; 
    text-align: center; 
    background: rgba(0, 0, 0, 0.7);
    padding: 15px 20px;
    border-radius: 10px;
    border: 2px solid #00bcd4;
    animation: fadeIn 0.5s ease-out;
    pointer-events: none;
    z-index: 1000;
  `;
  
  const canvasParent = document.getElementById('game-canvas')?.parentElement;
  if (canvasParent) {
    canvasParent.appendChild(msg);
    setTimeout(() => msg.remove(), delay);
  }
}

/**
 * Expose toutes les fonctions globalement si dans le navigateur
 */
if (typeof window !== 'undefined') {
  window.TutorialSystem = {
    levelConfig,
    enemySpeeds,
    maxJumpHeight,
    maxJumpDistance,
    generateSol,
    generateSpawnPlatform,
    isPlatformAccessible,
    generateAccessiblePlatforms,
    getEnemySpeed,
    generateCasualEnemies,
    tutorialMessages,
    showTutorialMessage
  };
}
