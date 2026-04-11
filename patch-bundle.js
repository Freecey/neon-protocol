const fs = require('fs');

console.log('🔧 Patching game-bundle.js...');

const bundlePath = './public/game-bundle.js';
const bundle = fs.readFileSync(bundlePath, 'utf8');

// Inject global expose at the END of the IIFE wrapper
const injectCode = `
  // EXPOSE TO GLOBAL (AFTER all functions defined)
  if (typeof window !== 'undefined') {
    window.startGame = window.startGame || startGame;
    window.restartGame = window.restartGame || restartGame;
    window.startNextLevel = window.startNextLevel || startNextLevel;
    window.initLevel = window.initLevel || initLevel;
  }
  
  console.log('NEON PROTOCOL v5.3: Functions exposed!');
`;

// Add injection before closing the IIFE
const patched = bundle.replace(
  /console\.log\('NEON PROTOCOL v5\.3 loaded!\.'\);\n\(\(\) => \{;\n/g,
  injectCode + "console.log('NEON PROTOCOL v5.3 loaded!.');\n(() => {;"
);

// Alternative: Inject at the very end if not found
if (!patched.includes("window.startGame =")) {
  console.log('⚠️ Injection point not found, appending to end...');
  const endInject = `
  
  // EXPOSE TO GLOBAL
  (function() {
    if (typeof window !== 'undefined') {
      window.startGame = window.startGame || startGame;
      window.restartGame = window.restartGame || restartGame;
      window.startNextLevel = window.startNextLevel || startNextLevel;
      window.initLevel = window.initLevel || initLevel;
    }
    console.log('NEON PROTOCOL v5.3: Functions exposed!');
  })();
`;
  fs.writeFileSync(bundlePath, bundle + endInject);
  console.log('✅ Patched by appending at end');
} else {
  fs.writeFileSync(bundlePath, patched);
  console.log('✅ Patched successfully');
}

console.log('Done!');
