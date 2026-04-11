#!/bin/bash
cd ~/projects/rush-platformer

# Read bundle
BUNDLE=$(tail -n +1 public/game-bundle.js | head -n -1)

# Add global expose at the END
INJECTION="
  if (typeof window !== 'undefined') {
    window.startGame = window.startGame || startGame;
    window.restartGame = window.restartGame || restartGame;
    window.startNextLevel = window.startNextLevel || startNextLevel;
    window.initLevel = window.initLevel || initLevel;
  }
  console.log('NEON PROTOCOL v5.4 - All systems loaded!');
});"

# Write patched
echo "$BUNDLE"$'\n'"$INJECTION" > public/game-bundle.js

echo "✅ Patch applied!"
tail -5 public/game-bundle.js
