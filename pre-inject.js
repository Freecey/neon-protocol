// Pre-inject global exports (MUST BE BEFORE ES6 imports)
// This ensures functions are exposed to window BEFORE bundling

(function(global) {
  global.NEON_PROTOCOL_GLOBALS = global.NEON_PROTOCOL_GLOBALS || {};
})(typeof window !== 'undefined' ? window : (function() { return this !== null ? this : {}; })());
