// Global injection wrapper
(function(global) {
  global.NEON_PROTOCOL = {
    initLevel: null,
    startGame: null,
    restartGame: null,
    startNextLevel: null
  };
  
  // Auto-invoke after main bundle loads
  if (typeof __BUNDLE_READY__ !== 'undefined') {
    window.NEON_PROTOCOL.initLevel = window.__MODULE__.initLevel;
    window.NEON_PROTOCOL.startGame = window.__MODULE__.startGame;
    window.NEON_PROTOCOL.restartGame = window.__MODULE__.restartGame;
    window.NEON_PROTOCOL.startNextLevel = window.__MODULE__.startNextLevel;
  }
  
  console.log('NEON PROTOCOL loaded!');
})();
