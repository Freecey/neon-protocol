const fs = require('fs');

const bundlePath = './public/game-bundle.js';
const bundle = fs.readFileSync(bundlePath, 'utf8');

// Find the end of the IIFE and insert before closing
const endPattern = /}\);\s*$/;
const injection = `
  if (typeof window !== 'undefined') {
    window.startGame = window.startGame || startGame;
    window.restartGame = window.restartGame || restartGame;
    window.startNextLevel = window.startNextLevel || startNextLevel;
    window.initLevel = window.initLevel || initLevel;
  }
  console.log('NEON PROTOCOL v5.3 - FUNCTIONS EXPOSED!');
});`;

// Remove trailing `})();` and insert our injection
const matched = bundle.match(/}\);\s*$/);
if (matched) {
  const truncated = bundle.substring(0, matched.index);
  fs.writeFileSync(bundlePath, truncated + '\n' + injection);
  console.log('✅ Bundle patched successfully!');
} else {
  console.log('❌ Could not find end pattern');
  console.log('Last 200 chars:', bundle.slice(-200));
}
