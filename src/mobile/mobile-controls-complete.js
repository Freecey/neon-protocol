// 📱 NEON PROTOCOL - MOBILE TOUCH CONTROLS (COMPLETE)
// Multi-touch, Swipe, On-screen buttons, Responsive

class MobileTouchControls {
  constructor() {
    this.enabled = navigator.maxTouchPoints > 0;
    
    if (!this.enabled) {
      console.log('⚠️ Touch support disabled - not a touch device');
      return;
    }

    this.touchButtons = {
      left: { active: false, id: null, rect: null },
      right: { active: false, id: null, rect: null },
      jump: { active: false, id: null, rect: null }
    };
    
    this.touchZoneLeft = { x: 0, y: 0, width: 120, height: 120 };
    this.touchZoneRight = { x: 0, y: 0, width: 120, height: 120 };
    this.touchZoneJump = { x: 0, y: window.innerHeight - 150, width: 100, height: 100 };
    
    this.swipeThreshold = 30;
    this.swipeStartX = 0;
    this.swipeStartY = 0;
    this.swipeActive = false;
    
    this.touchActive = false;
    this.lastTouchId = null;
    
    this.orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
    
    this.init();
  }
  
  init() {
    this.setupTouchEvents();
    this.setupUIControls();
    this.updateZones();
    window.addEventListener('resize', () => this.updateZones());
    window.addEventListener('orientationchange', () => this.updateZones());
    console.log('📱 Mobile controls initialized!');
  }
  
  updateZones() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Bottom row: Left, Jump, Right
    this.touchZoneLeft = { x: 20, y: height - 140, width: 100, height: 100 };
    this.touchZoneJump = { x: width / 2 - 50, y: height - 140, width: 100, height: 100 };
    this.touchZoneRight = { x: width - 120, y: height - 140, width: 100, height: 100 };
  }
  
  setupUIControls() {
    // Create visual buttons if they don't exist
    const existing = document.querySelectorAll('.touch-btn');
    existing.forEach(btn => btn.remove());
    
    const container = document.createElement('div');
    container.id = 'mobile-controls';
    container.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 0;
      right: 0;
      height: 140px;
      pointer-events: none;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
    `;
    
    // Left button
    const leftBtn = this.createTouchButton('left', '◀', 'Droite');
    container.appendChild(leftBtn);
    
    // Jump button
    const jumpBtn = this.createTouchButton('jump', '△', 'Saut', '#00bcd4');
    container.appendChild(jumpBtn);
    
    // Right button
    const rightBtn = this.createTouchButton('right', '▶', 'Droite');
    container.appendChild(rightBtn);
    
    document.body.appendChild(container);
    
    // Add touch listeners to buttons
    leftBtn.addEventListener('touchstart', (e) => this.handleTouchStart(e, 'left'));
    leftBtn.addEventListener('touchend', (e) => this.handleTouchEnd(e, 'left'));
    
    jumpBtn.addEventListener('touchstart', (e) => this.handleTouchStart(e, 'jump'));
    jumpBtn.addEventListener('touchend', (e) => this.handleTouchEnd(e, 'jump'));
    
    rightBtn.addEventListener('touchstart', (e) => this.handleTouchStart(e, 'right'));
    rightBtn.addEventListener('touchend', (e) => this.handleTouchEnd(e, 'right'));
  }
  
  createTouchButton(type, unicode, label, color = null) {
    const btn = document.createElement('div');
    btn.className = 'touch-btn';
    btn.textContent = unicode;
    
    const size = 100;
    const yPos = window.innerHeight - 140;
    
    btn.style.cssText = `
      position: fixed;
      bottom: ${Math.max(20, yPos + 10)}px;
      ${type === 'jump' ? `left: ${window.innerWidth / 2 - 50}px` : type === 'left' ? 'left: 20px' : 'right: 20px'};
      width: ${size}px;
      height: ${size}px;
      background: rgba(0, 188, 212, 0.3);
      border: 2px solid #00bcd4;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      color: #fff;
      pointer-events: auto;
      touch-action: none;
      transition: all 0.1s;
      user-select: none;
      -webkit-user-select: none;
    `;
    
    if (color) {
      btn.style.borderColor = color;
      btn.style.background = `rgba(${color === '#00bcd4' ? '0, 188, 212' : '233, 30, 99'}, 0.4)`;
    }
    
    return btn;
  }
  
  handleTouchStart(e, control) {
    e.preventDefault();
    
    const touch = e.changedTouches[0];
    const id = touch.identifier;
    
    if (control) {
      this.touchButtons[control].active = true;
      this.touchButtons[control].id = id;
      
      // Visual feedback
      const btn = document.querySelector(`.touch-btn[data-type="${control}"]`);
      if (btn) {
        btn.style.transform = 'scale(0.9)';
        btn.style.background = 'rgba(0, 188, 212, 0.6)';
      }
    }
    
    // Track last touch for swipe detection
    this.lastTouchId = id;
    this.swipeStartX = touch.clientX;
    this.swipeStartY = touch.clientY;
    this.swipeActive = true;
  }
  
  handleTouchEnd(e, control) {
    e.preventDefault();
    
    if (control) {
      this.touchButtons[control].active = false;
      
      // Visual feedback
      const btn = document.querySelector(`.touch-btn[data-type="${control}"]`);
      if (btn) {
        btn.style.transform = 'scale(1)';
        btn.style.background = '';
      }
    }
  }
  
  setupTouchEvents() {
    document.addEventListener('touchstart', (e) => {
      if (e.target.tagName === 'CANVAS' || e.target.id === 'game-canvas') {
        this.touchActive = true;
        
        for (let i = 0; i < e.changedTouches.length; i++) {
          const touch = e.changedTouches[i];
          
          // Check if touch is on left zone
          if (this.isInZone(touch.clientX, touch.clientY, this.touchZoneLeft)) {
            // Simulate left button press
            keys['ArrowLeft'] = true;
            if (typeof keys !== 'undefined') keys['keyA'] = true;
          }
          
          // Right zone
          if (this.isInZone(touch.clientX, touch.clientY, this.touchZoneRight)) {
            keys['ArrowRight'] = true;
            if (typeof keys !== 'undefined') keys['keyD'] = true;
          }
          
          // Jump zone
          if (this.isInZone(touch.clientX, touch.clientY, this.touchZoneJump)) {
            keys['Space'] = true;
          }
        }
      }
    }, { passive: false, capture: true });
    
    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
      
      for (let i = 0; i < e.changedTouches.length; i++) {
        const touch = e.changedTouches[i];
        
        // Update zones on the fly
        this.updateZones();
        
        // Check zones again
        if (this.isInZone(touch.clientX, touch.clientY, this.touchZoneLeft)) {
          keys['ArrowLeft'] = true;
          if (typeof keys !== 'undefined') keys['keyA'] = true;
        } else {
          keys['ArrowLeft'] = false;
          if (typeof keys !== 'undefined') keys['keyA'] = false;
        }
        
        if (this.isInZone(touch.clientX, touch.clientY, this.touchZoneRight)) {
          keys['ArrowRight'] = true;
          if (typeof keys !== 'undefined') keys['keyD'] = true;
        } else {
          keys['ArrowRight'] = false;
          if (typeof keys !== 'undefined') keys['keyD'] = false;
        }
      }
    }, { passive: false, capture: true });
    
    document.addEventListener('touchend', (e) => {
      if (e.target.tagName === 'CANVAS' || e.target.id === 'game-canvas') {
        this.touchActive = false;
        
        // Release all keys if canvas touch ended
        keys['ArrowLeft'] = false;
        keys['ArrowRight'] = false;
        keys['Space'] = false;
        if (typeof keys !== 'undefined') {
          keys['keyA'] = false;
          keys['keyD'] = false;
        }
      }
    }, { passive: false, capture: true });
    
    // Swipe gestures
    document.addEventListener('touchstart', (e) => {
      if (e.target.tagName !== 'CANVAS' && e.target.id !== 'game-canvas') return;
      
      if (e.touches.length === 1) {
        this.swipeStartX = e.touches[0].clientX;
        this.swipeStartY = e.touches[0].clientY;
        this.swipeActive = true;
      }
    }, { passive: false });
    
    document.addEventListener('touchend', (e) => {
      if (!this.swipeActive) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      
      const dx = endX - this.swipeStartX;
      const dy = endY - this.swipeStartY;
      
      // Horizontal swipe (left/right)
      if (Math.abs(dx) > this.swipeThreshold && Math.abs(dy) < this.swipeThreshold * 2) {
        if (dx > 0 && dx > Math.abs(dy)) {
          // Swiped RIGHT
          keys['ArrowRight'] = true;
          keys['keyD'] = true;
        } else if (dx < 0 && Math.abs(dx) > Math.abs(dy)) {
          // Swiped LEFT
          keys['ArrowLeft'] = true;
          keys['keyA'] = true;
        }
      }
      
      // Vertical swipe (jump only on up)
      if (Math.abs(dy) > this.swipeThreshold && Math.abs(dx) < this.swipeThreshold * 2) {
        if (dy < 0 && Math.abs(dy) > Math.abs(dx)) {
          // Swiped UP
          keys['Space'] = true;
        }
      }
      
      this.swipeActive = false;
    }, { passive: false });
  }
  
  isInZone(x, y, zone) {
    return x >= zone.x && x <= zone.x + zone.width &&
           y >= zone.y && y <= zone.y + zone.height;
  }
  
  getZoneState() {
    return {
      left: this.touchButtons.left.active,
      right: this.touchButtons.right.active,
      jump: this.touchButtons.jump.active
    };
  }
  
  dispose() {
    const container = document.getElementById('mobile-controls');
    if (container) container.remove();
  }
}

// Export
if (typeof window !== 'undefined') {
  window.MobileTouchControls = MobileTouchControls;
}

export { MobileTouchControls };
