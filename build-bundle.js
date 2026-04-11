#!/usr/bin/env node
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Lire game-v5.2.js (version sans modules)
const gameFile = path.resolve(__dirname, 'game-v5.2.js');

if (!fs.existsSync(gameFile)) {
  console.log('⚠️ game-v5.2.js not found, trying game.js...');
  // Si pas de version sans modules, on va utiliser une autre approche
  console.log('📦 Bundling game.js with dependencies...');
  
  esbuild.build({
    entryPoints: ['game.js'],
    bundle: true,
    outfile: 'public/bundle.js',
    format: 'iife', // Immediately Invoked Function Expression
    platform: 'browser',
    minify: false,
    sourcemap: true,
    define: {
      'process.env.NODE_ENV': '"production"'
    },
    keepNames: true,
    logLevel: 'info',
  }).catch(() => process.exit(1));
} else {
  console.log('📦 Bundling game-v5.2.js...');
  
  fs.copyFileSync(gameFile, 'public/game-bundle.js');
  console.log('✅ Copy game-v5.2.js to public/game-bundle.js');
  console.log('🎮 Update index.html to use: <script src="public/game-bundle.js"></script>');
}
