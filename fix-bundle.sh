#!/bin/bash
cd ~/projects/rush-platformer

# Read bundle
BUNDLE=$(cat public/game-bundle.js)

# Remove trailing ); and append injection
INJECTION="
  if (typeof window !== 'undefined') {
    window.startGame = window.startGame || startGame;
    window.restartGame = window.restartGame || restartGame;
    window.startNextLevel = window.startNextLevel || startNextLevel;
    window.initLevel = window.initLevel || initLevel;
  }
  console.log('NEON PROTOCOL v5.3 - ALL FUNCTIONS EXPOSED!');
});"

# Find last occurrence of ");"
TRUNCATED=$(echo "$BUNDLE" | sed '$ s/);$//')

echo "$TRUNCATED
$INJECTION" > public/game-bundle.js

echo "✅ Bundle patched!"
tail -5 public/game-bundle.js
