// 🎮 Input System
// Keyboard input handling

export default class InputSystem {
  constructor() {
    this.keys = {};
    this.bindEvents();
  }
  
  bindEvents() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      
      // Prevent scrolling with arrow keys/space
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
    });
    
    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });
  }
  
  isPressed(code) {
    return this.keys[code] === true;
  }
  
  isJustPressed(code) {
    return this.keys[code] === true;
  }
  
  isReleased(code) {
    return this.keys[code] !== true;
  }
  
  getDirection() {
    let dir = 0;
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) dir -= 1;
    if (this.keys['ArrowRight'] || this.keys['KeyD']) dir += 1;
    return dir;
  }
  
  getVerticalDirection() {
    let dir = 0;
    if (this.keys['ArrowUp'] || this.keys['KeyW']) dir -= 1;
    if (this.keys['ArrowDown'] || this.keys['KeyS']) dir += 1;
    return dir;
  }
  
  isJumping() {
    return this.keys['Space'] || this.keys['ArrowUp'] || this.keys['KeyW'];
  }
  
  isCrouching() {
    return this.keys['ArrowDown'] || this.keys['KeyS'];
  }
}
