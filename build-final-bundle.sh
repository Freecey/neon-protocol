#!/bin/bash
# 🎮 FINAL BUNDLE BUILD - NEON PROTOCOL v5.3
# Non-minifié pour préserver les noms de fonctions

set -e

echo "🚀 Build final du bundle..."

cd ~/projects/rush-platformer

# Build sans minification (préserve les noms de fonctions)
npx esbuild game.js \
  --bundle \
  --outfile=public/game-bundle.js \
  --format=iife \
  --target=es2020 \
  --minify=false \
  --keep-names \
  2>&1 | grep -v "duplicate-case"

echo "✅ Bundle créé: public/game-bundle.js"
echo "📏 Taille: $(wc -c public/game-bundle.js | awk '{print $1}') bytes"
echo "🎮 FONCTIONS: startGame, restartGame, initLevel, etc. PRESERVES!"
