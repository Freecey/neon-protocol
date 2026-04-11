// 📱 TOUCH CONTROLS FOR MOBILE/ANDROID
// Support tactile pour tablette et smartphone

class MobileTouchControls {
  constructor() {
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.swipeThreshold = 30;
    this.touchActive = false;
    
    this.setupTouchEvents();
    this.setupUIControls();
  }
  
  setupTouchEvents() {
    // Swipe detection
    document.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
        this.touchActive = true;
      }
    }, { passive: false });
    
    document.addEventListener('touchend', (e) => {
      if (this.touchActive) {
        this.touchEndX = e.changedTouches[0].clientX;
        this.touchEndY = e.changedTouches[0].clientY;
        this.handleGesture();
        this.touchActive = false;
        
        // Prevent default (scroll lock)
        e.preventDefault();
      }
    }, { passive: false });
    
    // Multi-touch support (2 fingers = jump + move)
    document.addEventListener('touchmove', (e) => {
      if (e.touches.length === 2 && gameState.running) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        
        // Touch 1: Move, Touch 2: Jump
        if (touch1.clientX < touch2.clientX) {
          keys['ArrowLeft'] = true;
        } else {
          keys['ArrowRight'] = true;
        }
        
        if (touch2.clientY < touch1.clientY) {
          keys['Space'] = true; // Jump
        }
      }
    }, { passive: false });
  }
  
  handleGesture() {
    const dx = this.touchEndX - this.touchStartX;
    const dy = this.touchEndY - this.touchStartY;
    
    // Determine swipe direction
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > this.swipeThreshold) {
        keys['ArrowRight'] = true;
      } else if (dx < -this.swipeThreshold) {
        keys['ArrowLeft'] = true;
      }
    } else {
      // Vertical swipe
      if (dy > this.swipeThreshold) {
        keys['ArrowDown'] = true;
      } else if (dy < -this.swipeThreshold) {
        keys['Space'] = true; // Jump
      }
    }
    
    // Clear keys after gesture
    setTimeout(() => {
      keys['ArrowRight'] = false;
      keys['ArrowLeft'] = false;
      keys['ArrowDown'] = false;
      keys['Space'] = false;
    }, 50);
  }
  
  setupUIControls() {
    // Create on-screen buttons
    const createButton = (id, action) => {
      const btn = document.createElement('div');
      btn.id = id;
      btn.className = 'mobile-btn';
      btn.innerHTML = action;
      btn.style.position = 'fixed';
      btn.style.pointerEvents = 'auto';
      btn.style.userSelect = 'none';
      btn.addEventListener('touchstart', (e) => {
        e.stopPropagation();
        this.handleButtonClick(action);
      }, { passive: false });
      btn.addEventListener('touchend', (e) => {
        e.stopPropagation();
        this.releaseButton(action);
      }, { passive: false });
      return btn;
    };
    
    // Touch controls UI
    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'mobile-controls';
    controlsContainer.style.cssText = `
      display: ${this.isTablet() ? 'flex' : 'none'};
      position: fixed;
      bottom: 20px;
      left: 0;
      width: 100%;
      justify-content: space-between;
      padding: 0 20px;
      pointer-events: none;
      z-index: 1000;
    `;
    
    // Left side: Direction buttons
    const leftControls = document.createElement('div');
    leftControls.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: auto;
    `;
    
    const leftBtn = createButton('mobile-left', '⬅️');
    leftBtn.style.cssText = this.btnStyle();
    leftBtn.id = 'mobile-left';
    leftControls.appendChild(leftBtn);
    
    const rightBtn = createButton('mobile-right', '➡️');
    rightBtn.style.cssText = this.btnStyle();
    rightBtn.id = 'mobile-right';
    rightControls.appendChild(rightBtn);
    
    // Right side: Jump + Action
    const rightControls = document.createElement('div');
    rightControls.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: auto;
    `;
    
    const jumpBtn = createButton('mobile-jump', '⬆️');
    jumpBtn.style.cssText = this.btnStyle('#2196F3');
    jumpBtn.id = 'mobile-jump';
    rightControls.appendChild(jumpBtn);
    
    const downBtn = createButton('mobile-down', '⬇️');
    downBtn.style.cssText = this.btnStyle();
    downBtn.id = 'mobile-down';
    rightControls.appendChild(downBtn);
    
    controlsContainer.appendChild(leftControls);
    controlsContainer.appendChild(rightControls);
    document.body.appendChild(controlsContainer);
  }
  
  btnStyle(color = '#E91E63') {
    return `
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: ${color};
      color: white;
      font-size: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid white;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      transition: transform 0.1s;
      opacity: 0.7;
    `;
  }
  
  handleButtonClick(action) {
    switch(action) {
      case '⬅️': keys['ArrowLeft'] = true; break;
      case '➡️': keys['ArrowRight'] = true; break;
      case '⬆️': keys['Space'] = true; break;
      case '⬇️': keys['ArrowDown'] = true; break;
    }
  }
  
  releaseButton(action) {
    switch(action) {
      case '⬅️': keys['ArrowLeft'] = false; break;
      case '➡️': keys['ArrowRight'] = false; break;
      case '⬆️': keys['Space'] = false; break;
      case '⬇️': keys['ArrowDown'] = false; break;
    }
  }
  
  isTablet() {
    return window.innerWidth >= 600; // Simple tablet detection
  }
  
  showControls() {
    const controls = document.getElementById('mobile-controls');
    if (controls) {
      controls.style.display = 'flex';
    }
  }
  
  hideControls() {
    const controls = document.getElementById('mobile-controls');
    if (controls) {
      controls.style.display = 'none';
    }
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MobileTouchControls;
} else {
  window.MobileTouchControls = MobileTouchControls;
}
