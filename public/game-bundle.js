(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/mobile/mobile-controls-complete.js
  var mobile_controls_complete_exports = {};
  __export(mobile_controls_complete_exports, {
    MobileTouchControls: () => MobileTouchControls
  });
  var MobileTouchControls;
  var init_mobile_controls_complete = __esm({
    "src/mobile/mobile-controls-complete.js"() {
      MobileTouchControls = class {
        static {
          __name(this, "MobileTouchControls");
        }
        constructor() {
          this.enabled = navigator.maxTouchPoints > 0;
          if (!this.enabled) {
            console.log("\u26A0\uFE0F Touch support disabled - not a touch device");
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
          this.orientation = window.innerWidth > window.innerHeight ? "landscape" : "portrait";
          this.init();
        }
        init() {
          this.setupTouchEvents();
          this.setupUIControls();
          this.updateZones();
          window.addEventListener("resize", () => this.updateZones());
          window.addEventListener("orientationchange", () => this.updateZones());
          console.log("\u{1F4F1} Mobile controls initialized!");
        }
        updateZones() {
          const width = window.innerWidth;
          const height = window.innerHeight;
          this.touchZoneLeft = { x: 20, y: height - 140, width: 100, height: 100 };
          this.touchZoneJump = { x: width / 2 - 50, y: height - 140, width: 100, height: 100 };
          this.touchZoneRight = { x: width - 120, y: height - 140, width: 100, height: 100 };
        }
        setupUIControls() {
          const existing = document.querySelectorAll(".touch-btn");
          existing.forEach((btn) => btn.remove());
          const container = document.createElement("div");
          container.id = "mobile-controls";
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
          const leftBtn = this.createTouchButton("left", "\u25C0", "Droite");
          container.appendChild(leftBtn);
          const jumpBtn = this.createTouchButton("jump", "\u25B3", "Saut", "#00bcd4");
          container.appendChild(jumpBtn);
          const rightBtn = this.createTouchButton("right", "\u25B6", "Droite");
          container.appendChild(rightBtn);
          document.body.appendChild(container);
          leftBtn.addEventListener("touchstart", (e) => this.handleTouchStart(e, "left"));
          leftBtn.addEventListener("touchend", (e) => this.handleTouchEnd(e, "left"));
          jumpBtn.addEventListener("touchstart", (e) => this.handleTouchStart(e, "jump"));
          jumpBtn.addEventListener("touchend", (e) => this.handleTouchEnd(e, "jump"));
          rightBtn.addEventListener("touchstart", (e) => this.handleTouchStart(e, "right"));
          rightBtn.addEventListener("touchend", (e) => this.handleTouchEnd(e, "right"));
        }
        createTouchButton(type, unicode, label, color = null) {
          const btn = document.createElement("div");
          btn.className = "touch-btn";
          btn.textContent = unicode;
          const size = 100;
          const yPos = window.innerHeight - 140;
          btn.style.cssText = `
      position: fixed;
      bottom: ${Math.max(20, yPos + 10)}px;
      ${type === "jump" ? `left: ${window.innerWidth / 2 - 50}px` : type === "left" ? "left: 20px" : "right: 20px"};
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
            btn.style.background = `rgba(${color === "#00bcd4" ? "0, 188, 212" : "233, 30, 99"}, 0.4)`;
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
            const btn = document.querySelector(`.touch-btn[data-type="${control}"]`);
            if (btn) {
              btn.style.transform = "scale(0.9)";
              btn.style.background = "rgba(0, 188, 212, 0.6)";
            }
          }
          this.lastTouchId = id;
          this.swipeStartX = touch.clientX;
          this.swipeStartY = touch.clientY;
          this.swipeActive = true;
        }
        handleTouchEnd(e, control) {
          e.preventDefault();
          if (control) {
            this.touchButtons[control].active = false;
            const btn = document.querySelector(`.touch-btn[data-type="${control}"]`);
            if (btn) {
              btn.style.transform = "scale(1)";
              btn.style.background = "";
            }
          }
        }
        setupTouchEvents() {
          document.addEventListener("touchstart", (e) => {
            if (e.target.tagName === "CANVAS" || e.target.id === "game-canvas") {
              this.touchActive = true;
              for (let i = 0; i < e.changedTouches.length; i++) {
                const touch = e.changedTouches[i];
                if (this.isInZone(touch.clientX, touch.clientY, this.touchZoneLeft)) {
                  keys["ArrowLeft"] = true;
                  if (typeof keys !== "undefined") keys["keyA"] = true;
                }
                if (this.isInZone(touch.clientX, touch.clientY, this.touchZoneRight)) {
                  keys["ArrowRight"] = true;
                  if (typeof keys !== "undefined") keys["keyD"] = true;
                }
                if (this.isInZone(touch.clientX, touch.clientY, this.touchZoneJump)) {
                  keys["Space"] = true;
                }
              }
            }
          }, { passive: false, capture: true });
          document.addEventListener("touchmove", (e) => {
            e.preventDefault();
            for (let i = 0; i < e.changedTouches.length; i++) {
              const touch = e.changedTouches[i];
              this.updateZones();
              if (this.isInZone(touch.clientX, touch.clientY, this.touchZoneLeft)) {
                keys["ArrowLeft"] = true;
                if (typeof keys !== "undefined") keys["keyA"] = true;
              } else {
                keys["ArrowLeft"] = false;
                if (typeof keys !== "undefined") keys["keyA"] = false;
              }
              if (this.isInZone(touch.clientX, touch.clientY, this.touchZoneRight)) {
                keys["ArrowRight"] = true;
                if (typeof keys !== "undefined") keys["keyD"] = true;
              } else {
                keys["ArrowRight"] = false;
                if (typeof keys !== "undefined") keys["keyD"] = false;
              }
            }
          }, { passive: false, capture: true });
          document.addEventListener("touchend", (e) => {
            if (e.target.tagName === "CANVAS" || e.target.id === "game-canvas") {
              this.touchActive = false;
              keys["ArrowLeft"] = false;
              keys["ArrowRight"] = false;
              keys["Space"] = false;
              if (typeof keys !== "undefined") {
                keys["keyA"] = false;
                keys["keyD"] = false;
              }
            }
          }, { passive: false, capture: true });
          document.addEventListener("touchstart", (e) => {
            if (e.target.tagName !== "CANVAS" && e.target.id !== "game-canvas") return;
            if (e.touches.length === 1) {
              this.swipeStartX = e.touches[0].clientX;
              this.swipeStartY = e.touches[0].clientY;
              this.swipeActive = true;
            }
          }, { passive: false });
          document.addEventListener("touchend", (e) => {
            if (!this.swipeActive) return;
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const dx = endX - this.swipeStartX;
            const dy = endY - this.swipeStartY;
            if (Math.abs(dx) > this.swipeThreshold && Math.abs(dy) < this.swipeThreshold * 2) {
              if (dx > 0 && dx > Math.abs(dy)) {
                keys["ArrowRight"] = true;
                keys["keyD"] = true;
              } else if (dx < 0 && Math.abs(dx) > Math.abs(dy)) {
                keys["ArrowLeft"] = true;
                keys["keyA"] = true;
              }
            }
            if (Math.abs(dy) > this.swipeThreshold && Math.abs(dx) < this.swipeThreshold * 2) {
              if (dy < 0 && Math.abs(dy) > Math.abs(dx)) {
                keys["Space"] = true;
              }
            }
            this.swipeActive = false;
          }, { passive: false });
        }
        isInZone(x, y, zone) {
          return x >= zone.x && x <= zone.x + zone.width && y >= zone.y && y <= zone.y + zone.height;
        }
        getZoneState() {
          return {
            left: this.touchButtons.left.active,
            right: this.touchButtons.right.active,
            jump: this.touchButtons.jump.active
          };
        }
        dispose() {
          const container = document.getElementById("mobile-controls");
          if (container) container.remove();
        }
      };
      if (typeof window !== "undefined") {
        window.MobileTouchControls = MobileTouchControls;
      }
    }
  });

  // src/systems/TransitionSystem.js
  var TransitionSystem = class {
    static {
      __name(this, "TransitionSystem");
    }
    constructor() {
      this.state = "idle";
      this.alpha = 0;
      this.progress = 0;
      this.particles = [];
      this.text = "";
      this.color = "#00BCD4";
    }
    startTransition(type, text = "") {
      this.state = type;
      this.progress = 0;
      this.alpha = 0;
      this.text = text;
      switch (type) {
        case "levelUp":
          this.color = "#4CAF50";
          this.createConfetti(20);
          break;
        case "boss":
          this.color = "#F44336";
          this.createShake(10);
          break;
        case "victory":
          this.color = "#E91E63";
          this.createConfetti(50);
          break;
        case "gameOver":
          this.color = "#607D8B";
          this.createFadeParticles(10);
          break;
        case "gameWin":
          this.color = "#00BCD4";
          this.createConfetti(100);
          break;
      }
    }
    createConfetti(count) {
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * window.innerWidth,
          y: -20,
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 4 + 2,
          color: this.getRandomColor(),
          size: Math.random() * 6 + 4,
          life: 120
        });
      }
    }
    createShake(count) {
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * window.innerWidth,
          y: -20,
          vx: 0,
          vy: Math.random() * 3 + 2,
          color: "#F44336",
          size: 8,
          shake: true,
          life: 60
        });
      }
    }
    createFadeParticles(count) {
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * window.innerWidth,
          y: window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: -Math.random() * 2 - 1,
          color: "#607D8B",
          fadeOut: true,
          life: 80
        });
      }
    }
    getRandomColor() {
      const colors = ["#FFC107", "#4CAF50", "#E91E63", "#2196F3", "#9C27B0"];
      return colors[Math.floor(Math.random() * colors.length)];
    }
    update(delta) {
      if (this.state === "idle") return;
      if (this.progress < 1) {
        this.progress += 0.02;
        if (this.progress > 1) this.progress = 1;
        this.alpha = this.progress;
      }
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.shake) {
          p.x += (Math.random() - 0.5) * 4;
          p.y += (Math.random() - 0.5) * 4;
        }
        if (p.fadeOut) {
          p.alpha = p.life / 80;
          p.y += 2;
        } else {
          p.vy += 0.1;
        }
        p.life--;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
        }
      }
      if (this.progress >= 1 && this.alpha >= 0.8) {
        setTimeout(() => {
          this.reset();
        }, 1500);
      }
    }
    render(ctx2) {
      if (this.state === "idle") return;
      const bgColor = this.getOverlayColor();
      ctx2.fillStyle = bgColor;
      ctx2.globalAlpha = this.alpha * 0.8;
      ctx2.fillRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
      this.particles.forEach((p) => {
        if (p.fadeOut) {
          ctx2.globalAlpha = p.life / 80;
        } else {
          ctx2.globalAlpha = 1;
        }
        ctx2.fillStyle = p.color;
        ctx2.beginPath();
        if (p.shake) {
          ctx2.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        } else if (p.fadeOut) {
          ctx2.fillRect(p.x, p.y, p.size, p.size);
        } else {
          ctx2.beginPath();
          ctx2.moveTo(p.x, p.y);
          ctx2.lineTo(p.x + 5, p.y - 5);
          ctx2.lineTo(p.x + 10, p.y);
          ctx2.lineTo(p.x + 5, p.y + 5);
          ctx2.fill();
        }
        ctx2.fill();
      });
      if (this.text) {
        ctx2.fillStyle = "#FFF";
        ctx2.font = "bold 48px Jetbrains Mono";
        ctx2.textAlign = "center";
        ctx2.shadowColor = this.color;
        ctx2.shadowBlur = 20;
        ctx2.fillText(this.text, ctx2.canvas.width / 2, ctx2.canvas.height / 2);
        ctx2.shadowBlur = 0;
        const pulse = Math.sin(Date.now() / 200) * 2 + 4;
        ctx2.font = `bold ${32 + pulse}px Arial`;
        ctx2.fillStyle = this.color;
        ctx2.fillText(`\u232C Kyra \u232C`, ctx2.canvas.width / 2, ctx2.canvas.height / 2 + 50);
      }
      ctx2.globalAlpha = 1;
    }
    getOverlayColor() {
      switch (this.state) {
        case "boss":
          return "rgba(244, 67, 54, 0.7)";
        case "gameOver":
          return "rgba(96, 125, 139, 0.9)";
        case "victory":
        case "gameWin":
          return "rgba(233, 30, 99, 0.6)";
        default:
          return "rgba(0, 188, 212, 0.5)";
      }
    }
    reset() {
      this.state = "idle";
      this.alpha = 0;
      this.particles = [];
      this.text = "";
    }
  };

  // src/systems/LeaderboardSystem.js
  var LeaderboardSystem = class {
    static {
      __name(this, "LeaderboardSystem");
    }
    constructor() {
      this.data = this.load();
      this.recentScores = [];
    }
    load() {
      const saved = localStorage.getItem("neon-protocol-leaderboard");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Error loading leaderboard:", e);
        }
      }
      return {
        global: { highest: 0, date: null },
        levels: {
          1: { highest: 0, date: null, attempts: 0 },
          2: { highest: 0, date: null, attempts: 0 },
          3: { highest: 0, date: null, attempts: 0 },
          4: { highest: 0, date: null, attempts: 0 },
          5: { highest: 0, date: null, attempts: 0 },
          6: { highest: 0, date: null, attempts: 0 },
          7: { highest: 0, date: null, attempts: 0 }
        },
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    save() {
      localStorage.setItem("neon-protocol-leaderboard", JSON.stringify(this.data));
    }
    submitScore(level, score, timestamp = Date.now()) {
      const newScore = { level, score, timestamp, date: (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR") };
      if (score > this.data.global.highest) {
        this.data.global.highest = score;
        this.data.global.date = (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR");
      }
      if (score > this.data.levels[level].highest) {
        this.data.levels[level].highest = score;
        this.data.levels[level].date = (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR");
      }
      this.data.levels[level].attempts++;
      this.recentScores.push(newScore);
      if (this.recentScores.length > 10) {
        this.recentScores.shift();
      }
      this.save();
      return { isNewRecord: score >= this.data.levels[level].highest };
    }
    getTopScores(level = null) {
      if (level === null) {
        return this.data.global;
      }
      return this.data.levels[level];
    }
    getRecentScores() {
      return this.recentScores;
    }
    getRecords() {
      return this.data;
    }
    getLevelCount() {
      return 7;
    }
    exportCSV() {
      let csv = "Level,Score,Date,Global Record\n";
      for (let level = 1; level <= 7; level++) {
        const rec = this.data.levels[level];
        const global = this.data.global.highest;
        csv += `${level},${rec.highest},${rec.date},${level === 1 || global === rec.highest ? "YES" : "NO"}
`;
      }
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "neon-protocol-scores.csv";
      a.click();
      URL.revokeObjectURL(url);
    }
    reset() {
      localStorage.removeItem("neon-protocol-leaderboard");
      this.data = this.load();
      this.recentScores = [];
    }
  };

  // src/systems/AchievementSystem.js
  var AchievementSystem = class {
    static {
      __name(this, "AchievementSystem");
    }
    constructor(leaderboard2) {
      this.leaderboard = leaderboard2;
      this.achievements = this.load();
      this.stats = {
        coinsCollected: 0,
        jumps: 0,
        kills: 0,
        timeSurvived: 0,
        powerUpsUsed: 0,
        timeStopsUsed: 0
      };
    }
    load() {
      const saved = localStorage.getItem("neon-protocol-achievements");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Error loading achievements:", e);
        }
      }
      return [
        { id: "welcome", name: "Bienvenue!", desc: "Jouer \xE0 NEON PROTOCOL", unlocked: false },
        { id: "firstScore", name: "Premier Score", desc: "Atteindre 100 points", unlocked: false, condition: /* @__PURE__ */ __name((stats) => stats.coinsCollected >= 5, "condition") },
        { id: "coinHunter", name: "Chasseur de Pi\xE8ces", desc: "Collecter 50 pi\xE8ces", unlocked: false, condition: /* @__PURE__ */ __name((s) => s.coinsCollected >= 50, "condition") },
        { id: "masterJumper", name: "Ma\xEEtre du Saut", desc: "Faire 100 sauts", unlocked: false, condition: /* @__PURE__ */ __name((s) => s.jumps >= 100, "condition") },
        { id: "survivor", name: "Survivant", desc: "Survivre 60 secondes", unlocked: false, condition: /* @__PURE__ */ __name((s) => s.timeSurvived >= 60, "condition") },
        { id: "speedDemon", name: "D\xE9mon Vitesse", desc: "Survivre avec bonus temps > 50s", unlocked: false },
        { id: "bossSlayer", name: "Tueur de Boss", desc: "Vaincre un boss", unlocked: false, condition: /* @__PURE__ */ __name((s) => s.kills >= 1, "condition") },
        { id: "chaosMode", name: "Mode Chaos", desc: "Survivre au Niveau 7", unlocked: false },
        { id: "collector", name: "Perfectionniste", desc: "Collecter 100% des pi\xE8ces", unlocked: false, condition: /* @__PURE__ */ __name((s, score) => score >= 2e3, "condition") },
        { id: "timeMaster", name: "Ma\xEEtre du Temps", desc: "Utiliser Time Stop 10 fois", unlocked: false, condition: /* @__PURE__ */ __name((s) => s.timeStopsUsed >= 10, "condition") },
        { id: "powerUpMaster", name: "Ma\xEEtre Power-up", desc: "Utiliser 50 power-ups", unlocked: false, condition: /* @__PURE__ */ __name((s) => s.powerUpsUsed >= 50, "condition") }
      ];
    }
    save() {
      localStorage.setItem("neon-protocol-achievements", JSON.stringify(this.achievements));
    }
    updateStats(what, amount = 1) {
      if (this.stats.hasOwnProperty(what)) {
        this.stats[what] += amount;
      }
      this.checkAchievements();
    }
    checkAchievements() {
      const newUnlockeds = [];
      this.achievements.forEach((achievement) => {
        if (!achievement.unlocked) {
          let isUnlocked = false;
          if (achievement.id === "welcome") {
            isUnlocked = true;
          } else if (achievement.condition) {
            isUnlocked = achievement.condition(this.stats, this.leaderboard ? this.leaderboard.data.global.highest : 0);
          }
          if (isUnlocked) {
            achievement.unlocked = true;
            newUnlockeds.push(achievement);
            this.triggerNotification(achievement);
          }
        }
      });
      if (newUnlockeds.length > 0) {
        this.save();
      }
      return newUnlockeds;
    }
    triggerNotification(achievement) {
      const notif = document.createElement("div");
      notif.className = "achievement-notification";
      notif.innerHTML = `
      <div style="background: linear-gradient(135deg, #00BCD4, #E91E63); padding: 20px; border-radius: 10px; color: white; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
        <div style="font-size: 48px; margin-bottom: 10px;">\u{1F3C6}</div>
        <div style="font-size: 24px; font-weight: bold;">${achievement.name}</div>
        <div style="font-size: 14px; margin-top: 5px;">${achievement.desc}</div>
      </div>
    `;
      notif.style.position = "fixed";
      notif.style.top = "20px";
      notif.style.right = "20px";
      notif.style.zIndex = "10000";
      notif.style.animation = "slideIn 0.5s ease-out, fadeOut 0.5s ease-in 3.5s";
      document.body.appendChild(notif);
      this.playNotificationSound();
      setTimeout(() => notif.remove(), 4e3);
    }
    playNotificationSound() {
      const ctx2 = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx2.createOscillator();
      const gain = ctx2.createGain();
      osc.connect(gain);
      gain.connect(ctx2.destination);
      osc.frequency.setValueAtTime(523.25, ctx2.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx2.currentTime + 0.1);
      osc.frequency.setValueAtTime(783.99, ctx2.currentTime + 0.2);
      osc.frequency.setValueAtTime(1046.5, ctx2.currentTime + 0.3);
      gain.gain.setValueAtTime(0.3, ctx2.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx2.currentTime + 0.5);
      osc.start();
      osc.stop(ctx2.currentTime + 0.5);
    }
    getUnlockedCount() {
      return this.achievements.filter((a) => a.unlocked).length;
    }
    getTotalCount() {
      return this.achievements.length;
    }
    getProgress() {
      return this.getUnlockedCount() / this.getTotalCount() * 100;
    }
    reset() {
      localStorage.removeItem("neon-protocol-achievements");
      this.achievements = this.load();
    }
  };

  // src/systems/ParticleSystem2.js
  var ParticleSystem2 = class {
    static {
      __name(this, "ParticleSystem2");
    }
    constructor() {
      this.particles = [];
      this.maxParticles = 200;
    }
    // Create particle burst at position
    burst(x, y, count, color, speed = 2, size = 4) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * speed + 1;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * size + 2,
          color: color || "#00BCD4",
          alpha: 1,
          decay: Math.random() * 0.03 + 0.02,
          type: "burst",
          life: 60
        });
      }
    }
    // Coin collection particles (golden sparkle)
    collectCoin(x, y) {
      for (let i = 0; i < 8; i++) {
        const angle = i / 8 * Math.PI * 2;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * 3,
          vy: Math.sin(angle) * 3,
          size: Math.random() * 4 + 3,
          color: "#FFD700",
          alpha: 1,
          decay: 0.04,
          type: "sparkle",
          life: 40,
          scale: 1
        });
      }
      this.particles.push({
        x,
        y: y - 20,
        vx: 0,
        vy: -1,
        size: 0,
        color: "#FFD700",
        alpha: 1,
        decay: 0,
        type: "text",
        text: "+10",
        life: 30,
        scale: 1
      });
    }
    // Power-up collected (colorful explosion)
    collectPowerUp(x, y, type) {
      const colors = {
        doubleJump: "#4CAF50",
        shield: "#2196F3",
        speed: "#FFC107",
        freeze: "#00BCD4",
        timeStop: "#E91E63",
        magnet: "#9C27B0",
        invisible: "#607D8B"
      };
      const color = colors[type] || "#FFF";
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI * 2;
        this.particles.push({
          x,
          y,
          vx: Math.cos(angle) * 4,
          vy: Math.sin(angle) * 4,
          size: Math.random() * 6 + 4,
          color,
          alpha: 1,
          decay: 0.05,
          type: "powerup",
          life: 50,
          glow: true
        });
      }
      const icons = {
        doubleJump: "\u2B06\uFE0F\u2B06\uFE0F",
        shield: "\u{1F6E1}\uFE0F",
        speed: "\u26A1",
        freeze: "\u2744\uFE0F",
        timeStop: "\u23F8\uFE0F",
        magnet: "\u{1F9F2}",
        invisible: "\u{1F47B}"
      };
      this.particles.push({
        x,
        y: y - 30,
        vx: 0,
        vy: -2,
        size: 0,
        color: "#FFF",
        alpha: 1,
        decay: 0,
        type: "icon",
        icon: icons[type] || "\u2728",
        life: 60,
        scale: 2
      });
    }
    // Player jump particle (trail effect)
    jumpTrail(x, y) {
      for (let i = 0; i < 5; i++) {
        this.particles.push({
          x: x - i * 8,
          y,
          vx: -1,
          vy: Math.random() - 0.5,
          size: Math.random() * 3 + 2,
          color: "#00BCD4",
          alpha: 0.6 - i * 0.1,
          decay: 0.08,
          type: "trail",
          life: 20
        });
      }
    }
    // Player hurt particle (red sparks)
    hurtEffect(x, y) {
      for (let i = 0; i < 12; i++) {
        this.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          size: Math.random() * 4 + 2,
          color: "#F44336",
          alpha: 1,
          decay: 0.06,
          type: "spark",
          life: 35,
          shake: true
        });
      }
      this.particles.push({
        x: Math.random() * 10 - 5,
        y: Math.random() * 10 - 5,
        vx: 0,
        vy: 0,
        size: 0,
        color: "#F44336",
        alpha: 0.5,
        decay: 0.1,
        type: "flash",
        life: 10
      });
    }
    // Enemy death (explosion)
    enemyDeath(x, y, color) {
      for (let i = 0; i < 20; i++) {
        this.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          size: Math.random() * 5 + 3,
          color,
          alpha: 1,
          decay: 0.07,
          type: "explosion",
          life: 45,
          gravity: true
        });
      }
      this.particles.push({
        x,
        y,
        vx: 0,
        vy: 0,
        size: 30,
        color,
        alpha: 0.8,
        decay: 0.1,
        type: "glow",
        life: 20
      });
    }
    // Level up celebration
    levelUp(x, y) {
      const colors = ["#FFC107", "#4CAF50", "#2196F3", "#E91E63", "#9C27B0"];
      for (let i = 0; i < 30; i++) {
        this.particles.push({
          x: x + (Math.random() - 0.5) * 200,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: -Math.random() * 6 - 2,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.02,
          type: "confetti",
          life: 120,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.2
        });
      }
      this.particles.push({
        x,
        y: y - 50,
        vx: 0,
        vy: -1,
        size: 0,
        color: "#00BCD4",
        alpha: 0,
        decay: 0,
        type: "levelup",
        text: "LEVEL UP!",
        life: 90,
        scale: 0,
        targetScale: 3
      });
    }
    // Boss death (big explosion)
    bossDeath(x, y) {
      for (let i = 0; i < 50; i++) {
        this.particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 12,
          vy: (Math.random() - 0.5) * 12,
          size: Math.random() * 8 + 4,
          color: Math.random() > 0.5 ? "#E91E63" : "#00BCD4",
          alpha: 1,
          decay: 0.05,
          type: "boss-dead",
          life: 80,
          glow: true,
          gravity: true
        });
      }
      this.particles.push({
        x,
        y,
        vx: 0,
        vy: 0,
        size: 5,
        color: "#FFF",
        alpha: 1,
        decay: 0.03,
        type: "shockwave",
        life: 60
      });
      for (let i = 0; i < 40; i++) {
        this.particles.push({
          x: x + (Math.random() - 0.5) * 300,
          y: y + (Math.random() - 0.5) * 200,
          vx: (Math.random() - 0.5) * 8,
          vy: -Math.random() * 10 - 5,
          size: Math.random() * 6 + 4,
          color: ["#FFD700", "#00BCD4", "#E91E63"][Math.floor(Math.random() * 3)],
          alpha: 1,
          decay: 0.02,
          type: "victory",
          life: 100,
          rotation: Math.random() * Math.PI
        });
      }
    }
    update(delta) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.gravity) {
          p.vy += 0.2;
        }
        p.alpha -= p.decay;
        p.life--;
        if (p.type === "scale") {
          p.scale += 0.1;
        }
        if (p.type === "levelup") {
          if (p.scale < p.targetScale) {
            p.scale += 0.2;
            p.alpha += 0.05;
          }
          if (p.alpha > 1) p.alpha = 1;
        }
        if (p.type === "confetti" || p.type === "victory") {
          p.rotation += p.rotationSpeed;
        }
        if (p.life <= 0 || p.alpha <= 0) {
          this.particles.splice(i, 1);
        }
      }
      if (this.particles.length > this.maxParticles) {
        this.particles.splice(0, this.particles.length - this.maxParticles);
      }
    }
    render(ctx2) {
      if (this.particles.length === 0) return;
      this.particles.forEach((p) => {
        switch (p.type) {
          case "text":
          case "icon":
          case "levelup":
            this.renderText(ctx2, p);
            break;
          case "confetti":
          case "victory":
            this.renderConfetti(ctx2, p);
            break;
          case "flash":
            this.renderFlash(ctx2, p);
            break;
          case "levelup":
            this.renderLevelUp(ctx2, p);
            break;
          case "glow":
          case "shockwave":
            this.renderGlow(ctx2, p);
            break;
          default:
            this.renderCircle(ctx2, p);
        }
      });
    }
    renderCircle(ctx2, p) {
      ctx2.save();
      ctx2.globalAlpha = p.alpha;
      ctx2.fillStyle = p.color;
      if (p.glow) {
        ctx2.shadowColor = p.color;
        ctx2.shadowBlur = 15;
      }
      ctx2.beginPath();
      ctx2.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.restore();
    }
    renderText(ctx2, p) {
      ctx2.save();
      ctx2.globalAlpha = p.alpha;
      ctx2.fillStyle = p.color;
      ctx2.font = p.type === "levelup" ? "bold 48px Jetbrains Mono" : p.type === "icon" ? "32px Arial" : "20px Arial";
      ctx2.textAlign = "center";
      ctx2.shadowColor = "#000";
      ctx2.shadowBlur = 3;
      if (p.type === "text") {
        ctx2.fillText(p.text, p.x, p.y);
      } else if (p.type === "icon") {
        ctx2.font = "24px Arial";
        ctx2.fillText(p.icon, p.x, p.y);
      } else if (p.type === "levelup") {
        const scale = Math.min(p.scale, p.targetScale);
        ctx2.scale(scale, scale);
        ctx2.fillText(p.text, p.x, p.y);
      }
      ctx2.restore();
    }
    renderConfetti(ctx2, p) {
      ctx2.save();
      ctx2.globalAlpha = p.alpha;
      ctx2.fillStyle = p.color;
      ctx2.translate(p.x, p.y);
      ctx2.rotate(p.rotation);
      ctx2.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx2.restore();
    }
    renderFlash(ctx2, p) {
      ctx2.save();
      ctx2.globalAlpha = p.alpha * 0.3;
      ctx2.fillStyle = p.color;
      ctx2.fillRect(p.x, p.y, ctx2.canvas.width, ctx2.canvas.height);
      ctx2.restore();
    }
    renderGlow(ctx2, p) {
      ctx2.save();
      ctx2.globalAlpha = p.alpha;
      ctx2.strokeStyle = p.color;
      ctx2.lineWidth = p.size;
      ctx2.beginPath();
      ctx2.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx2.stroke();
      ctx2.restore();
    }
    renderLevelUp(ctx2, p) {
      ctx2.save();
      ctx2.globalAlpha = p.alpha;
      ctx2.fillStyle = "#00BCD4";
      ctx2.font = "bold 64px Jetbrains Mono";
      ctx2.textAlign = "center";
      ctx2.shadowColor = "#FFF";
      ctx2.shadowBlur = 20;
      ctx2.fillText(p.text, p.x, p.y);
      ctx2.restore();
    }
    clear() {
      this.particles = [];
    }
  };

  // src/systems/ComboSystem.js
  var ComboSystem = class {
    static {
      __name(this, "ComboSystem");
    }
    constructor() {
      this.comboCount = 0;
      this.comboTime = 0;
      this.comboMultiplier = 1;
      this.maxCombo = 5;
      this.comboDecay = 120;
      this.currentScore = 0;
    }
    // Called when coin collected
    coinCollected(baseValue) {
      this.comboTime = this.comboDecay;
      this.comboCount++;
      if (this.comboCount >= this.maxCombo) {
        this.comboMultiplier = 3;
      } else {
        this.comboMultiplier = 1 + this.comboCount * 0.5;
      }
      const coinsValue = Math.floor(baseValue * this.comboMultiplier);
      this.comboCount = Math.min(this.comboCount, this.maxCombo);
      return coinsValue;
    }
    update(delta) {
      if (this.comboTime > 0) {
        this.comboTime -= delta;
        if (this.comboTime <= 0) {
          this.comboCount = Math.max(0, this.comboCount - 1);
          this.comboMultiplier = 1 + this.comboCount * 0.5;
        }
      }
      this.comboMultiplier = Math.min(this.comboMultiplier, 3);
    }
    getMultiplier() {
      return this.comboMultiplier;
    }
    getComboCount() {
      return this.comboCount;
    }
    isComboActive() {
      return this.comboCount > 0;
    }
    reset() {
      this.comboCount = 0;
      this.comboMultiplier = 1;
      this.comboTime = 0;
    }
    getComboText() {
      if (this.comboCount === 0) return "";
      const colors = ["#4CAF50", "#FFC107", "#FF9800", "#F44336", "#E91E63"];
      const color = colors[Math.min(this.comboCount - 1, colors.length - 1)];
      return `${this.comboMultiplier}x <span style="color:${color}">${this.comboCount}</span>`;
    }
  };

  // src/systems/PowerUpSystem.js
  var PowerUpSystem = class {
    static {
      __name(this, "PowerUpSystem");
    }
    constructor() {
      this.particles = [];
    }
    activate(effect, player2) {
      switch (effect) {
        case "doubleJump":
          player2.doubleJumpEnabled = true;
          this.createParticle(player2.x, player2.y, "\u2B06\uFE0F\u2B06\uFE0F");
          break;
        case "shield":
          player2.shielded = true;
          player2.shieldDuration = 30 * 60;
          this.createParticle(player2.x, player2.y, "\u{1F6E1}\uFE0F");
          break;
        case "speed":
          player2.speedBoost = true;
          player2.speedBoostDuration = 20 * 60;
          this.createParticle(player2.x, player2.y, "\u26A1");
          break;
        case "freeze":
          this.freezeEnemies(15 * 60);
          this.createParticle(player2.x, player2.y, "\u2744\uFE0F");
          break;
        case "timeStop":
          this.timeStop(5 * 60);
          this.createParticle(player2.x, player2.y, "\u23F8\uFE0F");
          break;
        case "magnet":
          this.magnetCoins(10 * 60);
          this.createParticle(player2.x, player2.y, "\u{1F9F2}");
          break;
        case "invisibility":
          player2.invisible = true;
          player2.invisibleDuration = 15 * 60;
          this.createParticle(player2.x, player2.y, "\u{1F47B}");
          break;
      }
    }
    createParticle(x, y, symbol) {
      this.particles.push({
        x,
        y,
        symbol,
        life: 60,
        // 1 seconde
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2 - 2
      });
    }
    update(delta) {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life--;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
        }
      }
    }
    render(ctx2) {
      this.particles.forEach((p) => {
        ctx2.font = "24px Arial";
        ctx2.fillText(p.symbol, p.x, p.y);
      });
    }
    freezeEnemies(duration) {
      if (this.freezeDuration) {
        clearTimeout(this.freezeDuration);
      }
      const startTime = Date.now();
      this.freezeEnd = startTime + duration * 16.67;
      this.originalEnemySpeeds = [];
    }
    timeStop(duration) {
      const endTime = Date.now() + duration * 16.67;
      this.timeStopEnd = endTime;
      this.timeStart = Date.now();
    }
    magnetCoins(duration) {
      this.magnetEnd = Date.now() + duration * 16.67;
      this.magnetRadius = 200;
    }
    isFrostActive() {
      return this.freezeEnd && Date.now() < this.freezeEnd;
    }
    isTimeStopActive() {
      return this.timeStopEnd && Date.now() < this.timeStopEnd;
    }
    isMagnetActive() {
      return this.magnetEnd && Date.now() < this.magnetEnd;
    }
  };

  // src/systems/ui/MenuSystem.js
  var MenuSystem = class {
    static {
      __name(this, "MenuSystem");
    }
    constructor() {
      this.state = "title";
      this.levelSelection = 1;
      this.selectedLevel = 1;
      this.animation = 0;
      this.showCredits = false;
      this.levelNames = {
        1: "\u{1F7E2} TUTORIAL",
        2: "\u{1F7E1} WIND VALLEY",
        3: "\u{1F534} BOSS LAKE",
        4: "\u{1F535} CYBER CITY",
        5: "\u{1F7E3} NEON JUNGLE",
        6: "\u26AB VOID ZONE",
        7: "\u{1F308} REALM OF KYRA"
      };
    }
    update(delta) {
      this.animation += delta * 0.05;
      if (window.keys && window.keys["ArrowDown"]) {
        this.levelSelection = Math.min(7, this.levelSelection + 1);
      }
      if (window.keys && window.keys["ArrowUp"]) {
        this.levelSelection = Math.max(1, this.levelSelection - 1);
      }
      if (window.keys && window.keys["Enter"] && this.state === "title") {
        this.state = "menu";
      }
      if (window.keys && window.keys["Escape"]) {
        this.state = "title";
      }
    }
    render(ctx2) {
      if (this.showCredits) {
        this.renderCredits(ctx2);
        return;
      }
      if (this.state === "title") {
        this.renderTitle(ctx2);
      } else if (this.state === "menu") {
        this.renderLevelSelect(ctx2);
      }
    }
    renderTitle(ctx2) {
      const width = ctx2.canvas.width;
      const height = ctx2.canvas.height;
      const gradient = ctx2.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#00BCD4");
      gradient.addColorStop(0.5, "#E91E63");
      gradient.addColorStop(1, "#9C27B0");
      const pulse = Math.sin(this.animation * 2) * 20 + 10;
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, width, height);
      ctx2.font = "bold 72px Jetbrains Mono";
      ctx2.textAlign = "center";
      ctx2.shadowColor = "#FFFFFF";
      ctx2.shadowBlur = pulse;
      ctx2.fillStyle = "#FFFFFF";
      ctx2.fillText("NEON PROTOCOL \u232C", width / 2, height / 2 - 100);
      ctx2.shadowBlur = 0;
      ctx2.font = "italic 24px Arial";
      ctx2.fillStyle = "#FFC107";
      ctx2.fillText("Powered by Kyra \u232C", width / 2, height / 2 - 50);
      const scaleX = 1 + Math.sin(this.animation) * 0.1;
      const scaleY = 1 + Math.cos(this.animation) * 0.1;
      ctx2.save();
      ctx2.translate(width / 2, height / 2 + 50);
      ctx2.scale(scaleX, scaleY);
      ctx2.fillStyle = "#00BCD4";
      ctx2.fillRect(-150, -30, 300, 60);
      ctx2.fillStyle = "#FFFFFF";
      ctx2.font = "bold 24px Jetbrains Mono";
      ctx2.fillText("PRESS ENTER TO START", 0, 0);
      ctx2.restore();
      ctx2.fillStyle = "#888";
      ctx2.font = "16px Arial";
      ctx2.fillText("v5.0.0", width / 2, height - 30);
    }
    renderLevelSelect(ctx2) {
      const width = ctx2.canvas.width;
      const height = ctx2.canvas.height;
      ctx2.fillStyle = "#0d0d1a";
      ctx2.fillRect(0, 0, width, height);
      ctx2.fillStyle = "#00BCD4";
      ctx2.font = "bold 48px Jetbrains Mono";
      ctx2.textAlign = "center";
      ctx2.fillText("SELECT LEVEL", width / 2, 80);
      const startX = width / 2 - 200;
      const startY = 140;
      const spacing = 70;
      for (let i = 1; i <= 7; i++) {
        const y = startY + (i - 1) * spacing;
        const isSelected2 = this.levelSelection === i;
        if (isSelected2) {
          const pulse = Math.sin(this.animation * 4) * 5;
          ctx2.fillStyle = `rgba(0, 188, 212, ${0.5 + pulse / 10})`;
          ctx2.fillRect(startX - 10, y - 25, 410, 50 + pulse);
        }
        ctx2.fillStyle = isSelected2 ? "#00BCD4" : "#666";
        ctx2.font = "bold 36px Jetbrains Mono";
        ctx2.textAlign = "right";
        ctx2.fillText(`LVL ${i}`, startX - 15, y + 10);
        ctx2.textAlign = "left";
        ctx2.fillStyle = "#FFF";
        ctx2.font = "18px Arial";
        ctx2.fillText(this.levelNames[i], startX + 20, y + 10);
        ctx2.fillStyle = "#4CAF50";
        ctx2.font = "24px Arial";
        ctx2.fillText("\u2713", width / 2 + 120, y + 15);
      }
      ctx2.fillStyle = "#888";
      ctx2.font = "16px Arial";
      ctx2.textAlign = "center";
      ctx2.fillText("\u2191\u2193 to select \u2022 ENTER to start", width / 2, height - 100);
      ctx2.textAlign = "center";
      ctx2.font = "16px Jetbrains Mono";
      ctx2.fillStyle = "#E91E63";
      if (isSelected) {
        ctx2.fillText("[ESC] Back", width / 2, height - 50);
      } else {
        ctx2.fillText("[ESC] Back", width / 2, height - 50);
      }
    }
    renderCredits(ctx2) {
      const width = ctx2.canvas.width;
      const height = ctx2.canvas.height;
      ctx2.fillStyle = "#0d0d1a";
      ctx2.fillRect(0, 0, width, height);
      ctx2.fillStyle = "#00BCD4";
      ctx2.font = "bold 48px Jetbrains Mono";
      ctx2.textAlign = "center";
      ctx2.fillText("CREDITS", width / 2, 80);
      const credits = [
        "\u{1F3AE} Developed by Kyra \u232C",
        "\u{1F916} Powered by OpenClaw",
        "\u{1F3A8} Art & Design: Kyra Autonomous",
        "\u{1F3B5} Music Generated by Synthwave AI",
        "\u{1F3D7}\uFE0F Architecture v5.0 by Kyra",
        "\u{1F4E2} Special Thanks to JP",
        "\u{1F310} Platform: Web + Electron",
        "\u{1F4DC} Code: ES6 Modules",
        "\u26A1 Build: v5.0.0"
      ];
      const startY = 150;
      const spacing = 40;
      credits.forEach((text, i) => {
        ctx2.fillStyle = "#FFF";
        ctx2.font = "20px Arial";
        ctx2.textAlign = "center";
        ctx2.fillText(text, width / 2, startY + i * spacing);
      });
      ctx2.fillStyle = "#E91E63";
      ctx2.font = "24px Jetbrains Mono";
      ctx2.fillText("[ESC] Back to Menu", width / 2, height - 50);
    }
    getSelectedLevel() {
      return this.levelSelection;
    }
    setCredits(show) {
      this.showCredits = show;
    }
  };

  // src/entities/Boss.js
  var Boss = class {
    static {
      __name(this, "Boss");
    }
    constructor(x, y, level) {
      this.x = x;
      this.y = y;
      this.width = 100;
      this.height = 80;
      this.maxHealth = 10 * level;
      this.health = 10 * level;
      this.level = level;
      this.phase = 1;
      this.direction = 1;
      this.speed = 2;
      this.attackCooldown = 0;
      this.attackInterval = 120;
      this.projectiles = [];
      this.floatOffset = 0;
    }
    update(deltaTime) {
      this.floatOffset += deltaTime * 2e-3;
      this.x += this.direction * this.speed;
      if (this.x <= 50 || this.x >= window.innerWidth - 150) {
        this.direction *= -1;
      }
      if (this.health <= this.maxHealth * 0.5 && this.phase === 1) {
        this.phase = 2;
        this.speed += 2;
      }
      if (this.attackCooldown > 0) {
        this.attackCooldown--;
      }
      if (this.attackCooldown <= 0) {
        this.fireProjectiles();
        this.attackCooldown = this.attackInterval / this.phase;
      }
      for (let i = this.projectiles.length - 1; i >= 0; i--) {
        const p = this.projectiles[i];
        p.y += p.vy;
        if (p.y > window.innerHeight) {
          this.projectiles.splice(i, 1);
        }
      }
    }
    fireProjectiles() {
      const projectileTypes = ["normal", "spread"];
      const type = this.phase === 2 ? projectileTypes[Math.floor(Math.random() * projectileTypes.length)] : "normal";
      if (type === "normal") {
        this.projectiles.push({
          x: this.x + this.width / 2,
          y: this.y + this.height,
          vx: 0,
          vy: 5,
          size: 8,
          damage: 10,
          color: "#FF6B6B"
        });
      } else {
        for (let i = -1; i <= 1; i++) {
          this.projectiles.push({
            x: this.x + this.width / 2,
            y: this.y + this.height,
            vx: i * 3,
            vy: 4,
            size: 6,
            damage: 8,
            color: "#FF1493"
          });
        }
      }
    }
    render(ctx2) {
      const colors = {
        1: "#FF6B6B",
        2: "#E91E63"
      };
      const color = colors[this.phase] || "#FF6B6B";
      const glow = ctx2.createRadialGradient(this.x + this.width / 2, this.y + this.height / 2, 20, this.x + this.width / 2, this.y + this.height / 2, 60);
      glow.addColorStop(0, color);
      glow.addColorStop(1, "transparent");
      ctx2.fillStyle = glow;
      ctx2.beginPath();
      ctx2.arc(this.x + this.width / 2, this.y + this.height / 2, 60, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.fillStyle = color;
      ctx2.fillRect(this.x, this.y, this.width, this.height);
      ctx2.fillStyle = "white";
      ctx2.beginPath();
      ctx2.arc(this.x + 25, this.y + 30, 10, 0, Math.PI * 2);
      ctx2.arc(this.x + 75, this.y + 30, 10, 0, Math.PI * 2);
      ctx2.fill();
      ctx2.fillStyle = "black";
      ctx2.beginPath();
      ctx2.arc(this.x + 25, this.y + 30, 4, 0, Math.PI * 2);
      ctx2.arc(this.x + 75, this.y + 30, 4, 0, Math.PI * 2);
      ctx2.fill();
      const healthPercent = this.health / this.maxHealth;
      ctx2.fillStyle = "#333";
      ctx2.fillRect(this.x, this.y - 15, this.width, 8);
      ctx2.fillStyle = healthPercent > 0.5 ? "#4CAF50" : healthPercent > 0.25 ? "#FFC107" : "#F44336";
      ctx2.fillRect(this.x, this.y - 15, this.width * healthPercent, 8);
      ctx2.strokeStyle = "#000";
      ctx2.lineWidth = 1;
      ctx2.strokeRect(this.x, this.y - 15, this.width, 8);
      ctx2.font = "bold 14px Jetbrains Mono";
      ctx2.fillStyle = color;
      ctx2.textAlign = "center";
      ctx2.fillText("BOSS Lvl " + this.level, this.x + this.width / 2, this.y - 20);
    }
    takesDamage(amount) {
      this.health -= amount;
      return this.health <= 0;
    }
    getHealth() {
      return this.health;
    }
    getMaxHealth() {
      return this.maxHealth;
    }
    getProjectiles() {
      return this.projectiles;
    }
  };

  // src/levels/Level6.js
  var Level6 = class {
    static {
      __name(this, "Level6");
    }
    constructor(gameWidth, gameHeight) {
      this.width = gameWidth;
      this.height = gameHeight;
      this.gravity = -0.5;
      this.platforms = [];
      this.enemies = [];
      this.coins = [];
      this.powerups = [];
    }
    generate() {
      this.platforms = [];
      this.enemies = [];
      this.coins = [];
      this.powerups = [];
      const platformCount = 12;
      for (let i = 0; i < platformCount; i++) {
        const x = 50 + Math.random() * (this.width - 200);
        const y = 100 + Math.random() * (this.height - 400);
        this.platforms.push({
          x,
          y,
          width: 60 + Math.random() * 100,
          height: 20,
          type: "void",
          hidden: Math.random() > 0.7
          // 30% cachées
        });
      }
      const enemyCount = 8;
      for (let i = 0; i < enemyCount; i++) {
        const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)];
        this.enemies.push({
          x: plat.x + plat.width / 2 - 20,
          y: plat.y - 40,
          width: 40,
          height: 40,
          type: "voidWalker",
          startX: plat.x + plat.width / 2 - 20,
          patrolRange: 100,
          speed: 3,
          gravityInverted: true
          // Tombent vers le haut!
        });
      }
      for (let i = 0; i < 25; i++) {
        const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)];
        this.coins.push({
          x: plat.x + plat.width / 2 + (Math.random() - 0.5) * 40,
          y: plat.y - 80 - Math.random() * 60,
          size: 15,
          collected: false,
          value: 15
        });
      }
      this.powerups.push({
        x: this.width / 2,
        y: 150,
        type: "timeStop",
        collected: false
      });
    }
    update(delta) {
      this.enemies.forEach((enemy) => {
        if (enemy.gravityInverted) {
          enemy.y += enemy.speed * Math.sin(Date.now() / 500);
        }
      });
    }
    render(ctx2) {
      ctx2.fillStyle = "#000000";
      ctx2.fillRect(0, 0, this.width, this.height);
      this.platforms.forEach((plat) => {
        if (plat.hidden) {
          ctx2.fillStyle = "#111";
          ctx2.fillRect(plat.x, plat.y, plat.width, plat.height);
        } else {
          ctx2.strokeStyle = "#607D8B";
          ctx2.lineWidth = 2;
          ctx2.strokeRect(plat.x - 2, plat.y - 2, plat.width + 4, plat.height + 4);
          ctx2.fillStyle = "#222";
          ctx2.fillRect(plat.x, plat.y, plat.width, plat.height);
        }
      });
      this.enemies.forEach((enemy) => {
        ctx2.fillStyle = "#607D8B";
        ctx2.beginPath();
        ctx2.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 20, 0, Math.PI * 2);
        ctx2.fill();
        ctx2.fillStyle = "#FFFFFF";
        ctx2.beginPath();
        ctx2.arc(enemy.x + enemy.width / 2 - 8, enemy.y + 15, 5, 0, Math.PI * 2);
        ctx2.arc(enemy.x + enemy.width / 2 + 8, enemy.y + 15, 5, 0, Math.PI * 2);
        ctx2.fill();
      });
    }
  };

  // src/levels/Level7.js
  var Level7 = class {
    static {
      __name(this, "Level7");
    }
    constructor(gameWidth, gameHeight) {
      this.width = gameWidth;
      this.height = gameHeight;
      this.multiplier = 2;
      this.platforms = [];
      this.enemies = [];
      this.coins = [];
      this.powerups = [];
      this.bosses = [];
    }
    generate() {
      this.platforms = [];
      this.enemies = [];
      this.coins = [];
      this.powerups = [];
      this.bosses = [];
      for (let i = 0; i < 8; i++) {
        const x = 50 + Math.random() * (this.width - 250);
        const y = 100 + Math.random() * (this.height - 400);
        this.platforms.push({
          x,
          y,
          width: 80 + Math.random() * 100,
          height: 25,
          type: "kyra"
        });
      }
      for (let i = 0; i < 5; i++) {
        const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)];
        this.enemies.push({
          x: plat.x + plat.width / 2 - 20,
          y: plat.y - 40,
          width: 40,
          height: 40,
          type: "walker",
          startX: plat.x + plat.width / 2 - 20,
          patrolRange: 120,
          speed: 6,
          // x2 speed!
          color: "#FF6B6B"
          // Red
        });
      }
      for (let i = 0; i < 5; i++) {
        const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)];
        this.enemies.push({
          x: plat.x + plat.width / 2 - 20,
          y: plat.y - 40,
          width: 40,
          height: 40,
          type: "flyer",
          startX: plat.x + plat.width / 2 - 20,
          patrolRange: 150,
          speed: 8,
          // x2 speed!
          color: "#00BCD4"
          // Cyan
        });
      }
      for (let i = 0; i < 5; i++) {
        const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)];
        this.enemies.push({
          x: plat.x + plat.width / 2 - 20,
          y: plat.y - 40,
          width: 40,
          height: 40,
          type: "bobber",
          startX: plat.x + plat.width / 2 - 20,
          patrolRange: 100,
          speed: 6,
          amplitude: 40,
          color: "#FFD700"
          // Gold
        });
      }
      for (let i = 0; i < 3; i++) {
        const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)];
        this.enemies.push({
          x: plat.x + plat.width / 2 - 20,
          y: plat.y - 40,
          width: 40,
          height: 40,
          type: "shooter",
          startX: plat.x + plat.width / 2 - 20,
          patrolRange: 100,
          speed: 6,
          attackCooldown: 90,
          projectiles: [],
          color: "#E91E63"
          // Pink
        });
      }
      for (let i = 0; i < 120; i++) {
        const plat = this.platforms[Math.floor(Math.random() * this.platforms.length)];
        this.coins.push({
          x: plat.x + plat.width / 2 + (Math.random() - 0.5) * 40,
          y: plat.y - 100 - Math.random() * 80,
          size: 18,
          collected: false,
          value: Math.floor(Math.random() * 30) + 20
          // 20-50 points!
        });
      }
      this.powerups = [
        { x: 100, y: 100, type: "doubleJump", collected: false },
        { x: this.width - 100, y: 150, type: "shield", collected: false },
        { x: this.width / 2 - 50, y: 300, type: "speed", collected: false },
        { x: this.width / 2 + 50, y: 200, type: "timeStop", collected: false },
        { x: 150, y: 250, type: "magnet", collected: false },
        { x: this.width - 150, y: 350, type: "invisibility", collected: false }
      ];
      this.bosses.push({
        x: this.width / 2 - 60,
        y: 50,
        width: 120,
        height: 100,
        maxHealth: 800,
        health: 800,
        type: "kyra",
        phase: 1,
        speed: 10,
        projectiles: []
      });
      this.bosses.push({
        x: this.width / 2 + 60,
        y: 50,
        width: 120,
        height: 100,
        maxHealth: 800,
        health: 800,
        type: "kyra",
        phase: 1,
        speed: 10,
        projectiles: []
      });
    }
    update(delta) {
      const speedMultiplier = this.multiplier;
      this.enemies.forEach((enemy) => {
        if (enemy.type === "walker") {
          enemy.x += enemy.speed * speedMultiplier;
          if (enemy.x <= enemy.startX - enemy.patrolRange || enemy.x >= enemy.startX + enemy.patrolRange) {
            enemy.speed *= -1;
          }
        } else if (enemy.type === "flyer") {
          const bounceSpeed = 4 * speedMultiplier;
          enemy.x += bounceSpeed;
          if (enemy.x >= this.width - enemy.width || enemy.x <= 50) {
            enemy.y += 20;
          }
        } else if (enemy.type === "shooter") {
          if (enemy.attackCooldown > 0) {
            enemy.attackCooldown--;
          } else {
            this.fireShooterProjectiles(enemy);
            enemy.attackCooldown = 90 / speedMultiplier;
          }
          for (let i = enemy.projectiles.length - 1; i >= 0; i--) {
            const p = enemy.projectiles[i];
            p.x += p.vx * speedMultiplier;
            p.y += p.vy * speedMultiplier;
            if (p.y > this.height) {
              enemy.projectiles.splice(i, 1);
            }
          }
        }
      });
      this.bosses.forEach((boss, index) => {
        boss.x += boss.speed * speedMultiplier * (index % 2 === 0 ? 1 : -1);
        if (boss.x <= 100 || boss.x >= this.width - 200) {
          boss.speed *= -1;
        }
        boss.projectiles.forEach((p, pIndex) => {
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;
          if (p.y > this.height) {
            boss.projectiles.splice(pIndex, 1);
          }
        });
      });
    }
    fireShooterProjectiles(shooter) {
      shooter.projectiles.push({
        x: shooter.x + shooter.width / 2,
        y: shooter.y + shooter.height,
        vx: Math.random() * 4 - 2,
        vy: 6,
        size: 8,
        damage: 10,
        color: "#FF4081"
      });
    }
    render(ctx2) {
      const gradient = ctx2.createLinearGradient(0, 0, this.width, this.height);
      gradient.addColorStop(0, "#00BCD4");
      gradient.addColorStop(0.5, "#E91E63");
      gradient.addColorStop(1, "#9C27B0");
      ctx2.fillStyle = gradient;
      ctx2.fillRect(0, 0, this.width, this.height);
      this.platforms.forEach((plat) => {
        ctx2.fillStyle = "#222";
        ctx2.fillRect(plat.x, plat.y, plat.width, plat.height);
        ctx2.strokeStyle = "#00BCD4";
        ctx2.lineWidth = 4;
        ctx2.strokeRect(plat.x - 2, plat.y - 2, plat.width + 4, plat.height + 4);
      });
      this.enemies.forEach((enemy) => {
        ctx2.fillStyle = enemy.color || "#FFF";
        ctx2.beginPath();
        ctx2.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 20, 0, Math.PI * 2);
        ctx2.fill();
        ctx2.shadowBlur = 15;
        ctx2.shadowColor = enemy.color || "#FFF";
      });
      ctx2.shadowBlur = 0;
      this.bosses.forEach((boss, index) => {
        const gradient2 = ctx2.createRadialGradient(
          boss.x + boss.width / 2,
          boss.y + boss.height / 2,
          20,
          boss.x + boss.width / 2,
          boss.y + boss.height / 2,
          60
        );
        gradient2.addColorStop(0, "#E91E63");
        gradient2.addColorStop(1, "#9C27B0");
        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(boss.x + boss.width / 2, boss.y + boss.height / 2, 60, 0, Math.PI * 2);
        ctx2.fill();
        ctx2.fillStyle = "#000";
        ctx2.beginPath();
        ctx2.arc(boss.x + 35, boss.y + 35, 10, 0, Math.PI * 2);
        ctx2.arc(boss.x + 85, boss.y + 35, 10, 0, Math.PI * 2);
        ctx2.fill();
        const healthPercent = boss.health / boss.maxHealth;
        ctx2.fillStyle = "#333";
        ctx2.fillRect(boss.x, boss.y - 12, boss.width, 8);
        ctx2.fillStyle = healthPercent > 0.5 ? "#4CAF50" : healthPercent > 0.25 ? "#FFC107" : "#F44336";
        ctx2.fillRect(boss.x, boss.y - 12, boss.width * healthPercent, 8);
        ctx2.font = "bold 16px Jetbrains Mono";
        ctx2.fillStyle = "#E91E63";
        ctx2.textAlign = "center";
        ctx2.fillText(boss.phase === 1 ? "BOSS 1" : "BOSS 2", boss.x + boss.width / 2, boss.y - 17);
      });
      this.coins.forEach((coin) => {
        if (!coin.collected) {
          ctx2.fillStyle = "#FFD700";
          ctx2.beginPath();
          ctx2.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
          ctx2.fill();
          ctx2.strokeStyle = "#FFA500";
          ctx2.lineWidth = 2;
          ctx2.stroke();
        }
      });
      this.powerups.forEach((powerup) => {
        if (!powerup.collected) {
          ctx2.fillStyle = "#FFF";
          ctx2.beginPath();
          ctx2.arc(powerup.x, powerup.y, 15, 0, Math.PI * 2);
          ctx2.fill();
          ctx2.font = "12px Arial";
          ctx2.fillStyle = "#000";
          ctx2.textAlign = "center";
          const label = powerup.type === "timeStop" ? "\u23F8\uFE0F" : powerup.type === "magnet" ? "\u{1F9F2}" : powerup.type === "invisibility" ? "\u{1F47B}" : "\u26A1";
          ctx2.fillText(label, powerup.x, powerup.y + 5);
        }
      });
    }
    getBosses() {
      return this.bosses;
    }
  };

  // src/levels/LevelManager.js
  var LevelManager = class {
    static {
      __name(this, "LevelManager");
    }
    constructor() {
      this.level = 1;
      this.currentLevel = null;
      this.enemies = [];
      this.coins = [];
      this.platforms = [];
      this.powerups = [];
      this.boss = null;
      this.bosses = [];
      this.screenWidth = window.innerWidth;
      this.screenHeight = window.innerHeight;
    }
    loadLevel(levelNum) {
      this.level = levelNum;
      this.screenHeight = document.getElementById("canvas")?.height || window.innerHeight;
      this.screenWidth = document.getElementById("canvas")?.width || window.innerWidth;
      if (levelNum === 6) {
        this.currentLevel = new Level6(this.screenWidth, this.screenHeight);
        this.currentLevel.generate();
        this.platforms = this.currentLevel.platforms;
        this.enemies = this.currentLevel.enemies;
        this.coins = this.currentLevel.coins;
        this.powerups = this.currentLevel.powerups;
        return;
      }
      if (levelNum === 7) {
        this.currentLevel = new Level7(this.screenWidth, this.screenHeight);
        this.currentLevel.generate();
        this.platforms = this.currentLevel.platforms;
        this.enemies = this.currentLevel.enemies;
        this.coins = this.currentLevel.coins;
        this.powerups = this.currentLevel.powerups;
        this.bosses = this.currentLevel.getBosses();
        return;
      }
      this.platforms = this.generatePlatforms(this.screenWidth, this.screenHeight, levelNum);
      this.enemies = this.generateEnemies(levelNum, this.platforms);
      this.coins = this.generateCoins(this.platforms, levelNum);
      this.powerups = this.generatePowerups(levelNum, this.platforms);
      if (levelNum >= 3 && levelNum <= 5) {
        this.generateBoss();
      }
    }
    generateBoss() {
      this.boss = new Boss(this.screenWidth / 2 - 50, 50, this.level || 1);
      this.boss.maxLevel = 5;
      return this.boss;
    }
    generatePlatforms(screenWidth, groundY, level) {
      const platforms = [];
      platforms.push({
        x: 0,
        y: groundY - 60,
        width: screenWidth,
        height: 60,
        type: "ground"
      });
      const platformCount = 10 + level * 5;
      for (let i = 0; i < platformCount; i++) {
        const x = 150 + Math.random() * (screenWidth - 600);
        const y = 150 + Math.random() * (groundY - 300);
        const width = 60 + Math.random() * 100;
        let tooClose = false;
        for (const plat of platforms) {
          const distX = Math.abs(x - plat.x);
          const distY = Math.abs(y - plat.y);
          if (distX < 80 && distY < 40) {
            tooClose = true;
            break;
          }
        }
        if (!tooClose) {
          platforms.push({
            x,
            y,
            width,
            height: 20,
            type: "platform",
            difficulty: level
            // Higher platforms at higher levels
          });
        }
      }
      return platforms;
    }
    generateEnemies(level, platforms) {
      const enemies = [];
      const enemyTypes = ["walker", "flyer", "bobber", "shooter"];
      const count = 4 + level * 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        const plat = platforms[Math.floor(Math.random() * platforms.length)];
        const type = enemyTypes[Math.floor(Math.random() * Math.min(level + 1, enemyTypes.length))];
        enemies.push({
          x: plat.x + plat.width / 2 - 20,
          y: plat.y - 40,
          width: 40,
          height: 40,
          type,
          startX: plat.x + plat.width / 2 - 20,
          patrolRange: 80 + level * 20,
          speed: 2 + level * 0.5
        });
      }
      return enemies;
    }
    generateCoins(platforms, level) {
      const coins = [];
      const coinCount = 15 + level * 5;
      for (let i = 0; i < coinCount; i++) {
        const plat = platforms[Math.floor(Math.random() * platforms.length)];
        coins.push({
          x: plat.x + plat.width / 2 + (Math.random() - 0.5) * 40,
          y: plat.y - 60 - Math.random() * 60,
          size: 15,
          collected: false,
          value: level
          // Higher value at higher levels
        });
      }
      return coins;
    }
    generatePowerups(platforms, level) {
      const powerups = [];
      if (level === 6) {
        powerups.push({
          x: this.screenWidth / 2,
          y: 150,
          type: "timeStop",
          collected: false
        });
        return powerups;
      }
      if (level === 7) {
        return [
          { x: 100, y: 100, type: "doubleJump", collected: false },
          { x: this.screenWidth - 100, y: 150, type: "shield", collected: false },
          { x: this.screenWidth / 2 - 50, y: 300, type: "speed", collected: false },
          { x: this.screenWidth / 2 + 50, y: 200, type: "timeStop", collected: false },
          { x: 150, y: 250, type: "magnet", collected: false },
          { x: this.screenWidth - 150, y: 350, type: "invisibility", collected: false }
        ];
      }
      const powerupTypes = ["doubleJump", "shield", "speed", "freeze"];
      const powerupCount = 1 + Math.floor(level / 2);
      for (let i = 0; i < powerupCount; i++) {
        const plat = platforms[Math.floor(Math.random() * platforms.length)];
        const type = powerupTypes[Math.floor(Math.random() * powerupTypes.length)];
        powerups.push({
          x: plat.x + plat.width / 2,
          y: plat.y - 80 - Math.random() * 40,
          type,
          collected: false
        });
      }
      return powerups;
    }
    update(delta) {
      if (this.currentLevel) {
        this.currentLevel.update?.(delta);
      }
      if (this.bosses) {
        this.bosses.forEach((boss) => {
          if (boss.getProjectiles) {
            const projectiles = boss.getProjectiles();
          }
        });
      }
    }
    render(ctx2) {
      if (this.currentLevel) {
        this.currentLevel.render(ctx2);
      } else {
        this.platforms.forEach((plat) => {
          ctx2.fillStyle = "#333";
          ctx2.fillRect(plat.x, plat.y, plat.width, plat.height);
        });
      }
    }
    getBosses() {
      if (this.bosses && this.bosses.length > 0) {
        return this.bosses;
      }
      return this.boss ? [this.boss] : [];
    }
    resize(width, height) {
      this.screenWidth = width;
      this.screenHeight = height;
    }
  };

  // src/systems/ui/PauseMenu.js
  var PauseMenu = class {
    static {
      __name(this, "PauseMenu");
    }
    constructor() {
      this.visible = false;
      this.canvas = document.getElementById("game-canvas");
      this.overlay = null;
      this.buttons = {};
      this.init();
    }
    init() {
      this.createOverlay();
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && window.gameState?.running) {
          e.preventDefault();
          this.toggle();
        }
      });
      console.log("\u{1F3AE} Pause menu initialized! (Press ESC to pause)");
    }
    createOverlay() {
      const existing = document.getElementById("pause-overlay");
      if (existing) existing.remove();
      this.overlay = document.createElement("div");
      this.overlay.id = "pause-overlay";
      this.overlay.className = "hidden";
      this.overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(13, 13, 26, 0.95);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(5px);
      animation: fadeIn 0.3s ease-out;
    `;
      const title = document.createElement("div");
      title.textContent = "\u23F8\uFE0F PAUSED";
      title.style.cssText = `
      font-size: 48px;
      font-weight: bold;
      color: #00bcd4;
      font-family: 'JetBrains Mono', monospace;
      text-shadow: 0 0 20px rgba(0, 188, 212, 0.8);
      margin-bottom: 40px;
      animation: pulse 2s infinite;
    `;
      const stats = document.createElement("div");
      stats.style.cssText = `
      font-size: 18px;
      color: #e0e0e0;
      font-family: 'JetBrains Mono', monospace;
      margin-bottom: 40px;
      text-align: center;
      line-height: 2;
    `;
      stats.innerHTML = `
      <div>Score: <strong id="pause-score">0</strong></div>
      <div>Niveau: <strong id="pause-level">1</strong></div>
      <div>Temps: <strong id="pause-timer">60</strong>s</div>
    `;
      const btnContainer = document.createElement("div");
      btnContainer.style.cssText = `
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 300px;
    `;
      this.buttons.resume = this.createButton("\u25B6\uFE0F REPRENDRE", () => this.resume(), "#00bcd4");
      this.buttons.restart = this.createButton("\u{1F504} RECOMMENCER", () => this.restart(), "#4CAF50");
      this.buttons.quit = this.createButton("\u23F9\uFE0F MENU PRINCIPAL", () => this.quit(), "#F44336");
      const controls = document.createElement("div");
      controls.style.cssText = `
      margin-top: 40px;
      font-size: 14px;
      color: #888;
      font-family: 'JetBrains Mono', monospace;
      text-align: center;
      line-height: 1.6;
    `;
      controls.innerHTML = `
      <div><strong>CONTROLS CLAVIER</strong></div>
      <div>\u2190 \u2192 = Bouger</div>
      <div>Espace = Sauter</div>
      <div>D = Chuter rapide</div>
      <div>ESC = Pause</div>
    `;
      this.overlay.appendChild(title);
      this.overlay.appendChild(stats);
      this.overlay.appendChild(btnContainer);
      this.overlay.appendChild(controls);
      const gameContainer = this.canvas.parentElement;
      if (gameContainer) {
        gameContainer.appendChild(this.overlay);
      }
    }
    createButton(text, onClick, color) {
      const btn = document.createElement("button");
      btn.textContent = text;
      btn.style.cssText = `
      width: 100%;
      padding: 15px 25px;
      font-size: 18px;
      font-family: 'JetBrains Mono', monospace;
      font-weight: bold;
      color: #fff;
      background: ${color};
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    `;
      btn.onmouseover = () => {
        btn.style.transform = "scale(1.05)";
        btn.style.boxShadow = `0 6px 20px rgba(${this.hexToRgb(color)}, 0.5)`;
      };
      btn.onmouseout = () => {
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "0 4px 15px rgba(0,0,0,0.3)";
      };
      btn.onclick = (e) => {
        e.preventDefault();
        onClick();
      };
      return btn;
    }
    hexToRgb(hex) {
      const bigint = parseInt(hex.slice(1), 16);
      const r = bigint >> 16 & 255;
      const g = bigint >> 8 & 255;
      const b = bigint & 255;
      return `${r},${g},${b}`;
    }
    toggle() {
      if (this.visible) {
        this.hide();
      } else {
        this.show();
      }
    }
    show() {
      if (this.overlay) {
        this.overlay.classList.remove("hidden");
        this.visible = true;
        if (window.gameState) {
          document.getElementById("pause-score").textContent = window.gameState.score;
          document.getElementById("pause-level").textContent = window.gameState.level;
          document.getElementById("pause-timer").textContent = window.gameState.timeLeft;
        }
        this.overlay.style.cursor = "default";
        console.log("\u23F8\uFE0F Game paused");
      }
    }
    hide() {
      if (this.overlay) {
        this.overlay.classList.add("hidden");
        this.visible = false;
        this.overlay.style.cursor = "default";
        console.log("\u25B6\uFE0F Game resumed");
      }
    }
    resume() {
      this.hide();
      if (window.gameState && !window.gameState.running) {
        window.gameState.running = true;
      }
    }
    restart() {
      this.hide();
      if (window.restartGame) {
        window.restartGame();
      } else {
        console.error("\u274C restartGame not found");
      }
    }
    quit() {
      this.hide();
      if (window.gameState) {
        window.gameState.running = false;
      }
      document.getElementById("start-screen").classList.remove("hidden");
      document.getElementById("game-over-screen").classList.add("hidden");
      this.overlay.classList.add("hidden");
      console.log("\u{1F3E0} Returned to main menu");
    }
    update() {
      if (!this.visible) return;
      if (window.gameState && window.gameState.timeLeft > 0) {
        document.getElementById("pause-score").textContent = window.gameState.score;
        document.getElementById("pause-timer").textContent = Math.ceil(window.gameState.timeLeft);
      }
    }
    dispose() {
      if (this.overlay) {
        this.overlay.remove();
      }
    }
  };
  if (typeof window !== "undefined") {
    window.PauseMenu = PauseMenu;
  }

  // src/systems/AudioSystem.js
  var AudioSystem = class {
    static {
      __name(this, "AudioSystem");
    }
    constructor() {
      this.enabled = false;
      this.musicEnabled = true;
      this.sfxEnabled = true;
      this.masterVolume = 0.5;
      this.musicVolume = 0.4;
      this.sfxVolume = 0.6;
      this.ctx = null;
      this.currentMusic = null;
      this.musicGain = null;
      this.sounds = {
        jump: null,
        collect: null,
        kill: null,
        powerup: null,
        boss: null,
        win: null,
        lose: null,
        ui_click: null
      };
      this.synthSounds();
    }
    init() {
      if (this.ctx) {
        try {
          this.ctx.close();
        } catch (e) {
        }
        this.ctx = null;
      }
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();
        this.enabled = true;
        if (this.ctx.state === "suspended") {
          this.ctx.resume();
        }
        console.log("\u{1F3B5} Audio system initialized!");
      } catch (e) {
        console.warn("\u274C Audio not supported:", e);
        this.enabled = false;
      }
    }
    synthSounds() {
      this.sounds.jump = () => {
        if (!this.enabled || !this.sfxEnabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.frequency.setValueAtTime(220, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, this.ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3 * this.sfxVolume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.2);
      };
      this.sounds.collect = () => {
        if (!this.enabled || !this.sfxEnabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2 * this.sfxVolume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.15);
      };
      this.sounds.kill = () => {
        if (!this.enabled || !this.sfxEnabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3 * this.sfxVolume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.3);
      };
      this.sounds.powerup = () => {
        if (!this.enabled || !this.sfxEnabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.setValueAtTime(554, this.ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(659, this.ctx.currentTime + 0.2);
        osc.frequency.setValueAtTime(880, this.ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.25 * this.sfxVolume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.5);
      };
      this.sounds.boss = () => {
        if (!this.enabled || !this.sfxEnabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = "square";
        osc.frequency.setValueAtTime(60, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.8);
        osc.frequency.setValueAtTime(60, this.ctx.currentTime + 0.8);
        osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 1.6);
        gain.gain.setValueAtTime(0.4 * this.sfxVolume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 2);
        osc.start();
        osc.stop(this.ctx.currentTime + 2);
      };
      this.sounds.win = () => {
        if (!this.enabled || !this.sfxEnabled) return;
        const notes = [523, 659, 784, 1047, 784, 1047];
        let time = this.ctx.currentTime;
        notes.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.frequency.setValueAtTime(freq, time);
          gain.gain.setValueAtTime(0.25 * this.sfxVolume, time);
          gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);
          osc.start(time);
          osc.stop(time + 0.4);
          time += 0.3;
        });
      };
      this.sounds.lose = () => {
        if (!this.enabled || !this.sfxEnabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(220, this.ctx.currentTime + 1.5);
        gain.gain.setValueAtTime(0.3 * this.sfxVolume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1.5);
        osc.start();
        osc.stop(this.ctx.currentTime + 1.5);
      };
      this.sounds.ui_click = () => {
        if (!this.enabled || !this.sfxEnabled) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.1 * this.sfxVolume, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
      };
    }
    playSound(soundName) {
      if (this.sounds[soundName]) {
        this.sounds[soundName]();
      }
    }
    playMusic() {
      if (!this.musicEnabled || !this.enabled) return;
      if (this.currentMusic) {
        this.fadeOutMusic(() => {
          this.startMusicLoop();
        });
      } else {
        this.startMusicLoop();
      }
    }
    startMusicLoop() {
      this.currentMusic = {
        notes: [
          [110, 121, 130, 146, 164, 174, 196, 220],
          // C2 -> C3
          [146, 155, 164, 185, 207, 220, 246, 276],
          // D2 -> D3
          [87, 115, 155, 174, 196, 232, 261, 293]
          // A1 -> E3
        ],
        index: 0,
        timeout: null,
        gain: null,
        master: this.ctx.createGain()
      };
      this.currentMusic.master.connect(this.ctx.destination);
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = this.musicVolume;
      this.currentMusic.master.connect(this.musicGain);
      this.musicGain.connect(this.ctx.destination);
      this.playNextMusicNote();
    }
    playNextMusicNote() {
      if (!this.currentMusic || !this.musicEnabled) return;
      const now = this.ctx.currentTime;
      const loop = this.currentMusic;
      const noteData = loop.notes[loop.index % loop.notes.length];
      const bassFreq = noteData[0];
      const bass = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();
      bass.type = "sawtooth";
      bass.frequency.setValueAtTime(bassFreq, now);
      bassGain.gain.setValueAtTime(0.15 * this.musicVolume, now);
      bassGain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
      bass.connect(bassGain);
      bassGain.connect(this.currentMusic.master);
      bass.start(now);
      bass.stop(now + 0.5);
      noteData.forEach((freq, i) => {
        const note = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        note.type = "sine";
        note.frequency.setValueAtTime(freq, now + i * 0.1);
        noteGain.gain.setValueAtTime(0.1 * this.musicVolume, now + i * 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.3);
        note.connect(noteGain);
        noteGain.connect(this.currentMusic.master);
        note.start(now + i * 0.1);
        note.stop(now + i * 0.1 + 0.3);
      });
      loop.timeout = setTimeout(() => {
        loop.index++;
        this.playNextMusicNote();
      }, 500);
    }
    stopMusic() {
      if (this.currentMusic) {
        if (this.currentMusic.timeout) {
          clearTimeout(this.currentMusic.timeout);
        }
        this.currentMusic = null;
      }
      if (this.ctx) {
        try {
          this.ctx.close();
        } catch (e) {
        }
        this.ctx = null;
      }
    }
    fadeOutMusic(onComplete) {
      if (!this.musicGain) return;
      const now = this.ctx.currentTime;
      const duration = 0.5;
      this.musicGain.gain.setValueAtTime(this.musicGain.gain.value, now);
      this.musicGain.gain.exponentialRampToValueAtTime(1e-3, now + duration);
      setTimeout(onComplete, duration * 1e3);
    }
    toggleMusic() {
      this.musicEnabled = !this.musicEnabled;
      if (this.musicEnabled) {
        this.playMusic();
      } else {
        this.stopMusic();
      }
      return this.musicEnabled;
    }
    toggleSFX() {
      this.sfxEnabled = !this.sfxEnabled;
      return this.sfxEnabled;
    }
    setMasterVolume(vol) {
      this.masterVolume = Math.max(0, Math.min(1, vol));
      if (this.currentMusic) {
        this.currentMusic.master.gain.value = this.musicVolume;
      }
      this.sfxVolume = this.masterVolume * 0.7;
    }
    toggleAll() {
      const nowEnabled = !this.enabled;
      if (nowEnabled) {
        this.init();
      } else {
        if (this.ctx) {
          this.ctx.close();
          this.ctx = null;
        }
      }
      return nowEnabled;
    }
    dispose() {
      this.stopMusic();
      if (this.ctx) {
        this.ctx.close();
        this.ctx = null;
      }
    }
  };
  if (typeof window !== "undefined") {
    window.AudioSystem = AudioSystem;
  }

  // game.js
  if (typeof window !== "undefined") {
    window.__NEON_PROTOCOL_GLOBALS__ = {};
  }
  var MobileTouchControls2 = null;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    Promise.resolve().then(() => (init_mobile_controls_complete(), mobile_controls_complete_exports)).then((mod) => {
      MobileTouchControls2 = mod.MobileTouchControls;
      if (MobileTouchControls2) {
        const mobile = new MobileTouchControls2();
      }
    }).catch(() => console.log("Mobile controls not available"));
  }
  Object.assign(typeof window !== "undefined" ? window.__NEON_PROTOCOL_GLOBALS__ : {}, {
    TransitionSystem,
    LeaderboardSystem,
    AchievementSystem,
    ParticleSystem2,
    ComboSystem,
    PowerUpSystem,
    MenuSystem,
    LevelManager,
    Boss
  });
  var canvas = document.getElementById("game-canvas");
  var ctx = canvas.getContext("2d");
  var transitions = new TransitionSystem();
  var leaderboard = new LeaderboardSystem();
  var achievements = new AchievementSystem(leaderboard);
  var combo = new ComboSystem();
  var audio = new AudioSystem();
  var pauseMenu = new PauseMenu();
  var particles = new ParticleSystem2();
  var powerUps = new PowerUpSystem();
  var menu = new MenuSystem();
  var levelManager = new LevelManager();
  var gameState = {
    running: false,
    score: 0,
    level: 1,
    timeLeft: 60,
    lastTime: 0,
    enemies: [],
    platforms: [],
    coins: [],
    powerUpsList: [],
    bosses: [],
    particles: []
  };
  var player = {
    x: 100,
    y: 300,
    width: 40,
    height: 40,
    vx: 0,
    vy: 0,
    speed: 5,
    jumpForce: -15,
    gravity: 0.6,
    grounded: false,
    health: 100,
    doubleJumpEnabled: false,
    jumpCount: 0,
    shielded: false,
    shieldDuration: 0,
    speedBoost: false,
    speedBoostDuration: 0,
    invisible: false,
    invisibleDuration: 0
  };
  var keys2 = {};
  document.addEventListener("keydown", (e) => {
    keys2[e.code] = true;
    if (keys2["ArrowUp"] || keys2["ArrowDown"] || keys2["ArrowLeft"] || keys2["ArrowRight"] || keys2["Space"]) {
      e.preventDefault();
    }
    if (e.code === "Escape") {
      pauseMenu.toggle();
    }
    if (e.code === "KeyM") {
      audio.toggleAll();
    }
    if (e.code === "KeyR") {
      if (window.restartGame) window.restartGame();
    }
  });
  document.addEventListener("keyup", (e) => keys2[e.code] = false);
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
  }
  __name(resizeCanvas, "resizeCanvas");
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  function updateUI() {
    const scoreEl = document.getElementById("score");
    function resizeCanvas2() {
      const oldWidth = canvas.width;
      const oldHeight = canvas.height;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      const scaleX = canvas.width / oldWidth;
      const scaleY = canvas.height / oldHeight;
      if (gameState && gameState.platforms && player) {
        player.x *= scaleX;
        player.y *= scaleY;
        gameState.platforms.forEach((p) => {
          p.y *= scaleY;
        });
      }
    }
    __name(resizeCanvas2, "resizeCanvas");
    const timerEl = document.getElementById("timer");
    const comboEl = document.getElementById("combo");
    const levelEl = document.getElementById("level");
    if (scoreEl) scoreEl.textContent = gameState.score;
    if (timerEl) timerEl.textContent = Math.ceil(gameState.timeLeft);
    if (comboEl) comboEl.textContent = "x" + gameState.comboMultiplier.toFixed(1);
    if (levelEl) levelEl.textContent = gameState.level;
  }
  __name(updateUI, "updateUI");
  function initLevel() {
    loadLevel(1);
    render();
    updateUI();
    const message = document.createElement("div");
    message.innerHTML = "<strong>\u{1F3AE} NEON PROTOCOL</strong><br>Aide JP!<br>Succ\xE8s : Survivre 60s";
    message.style.cssText = "position:absolute; top:40%; left:50%; transform:translate(-50%,-50%); color:#00bcd4; font-size:24px; font-family:JetBrains Mono; text-align:center; animation:fadeIn 1s;";
    document.getElementById("game-canvas").parentElement.appendChild(message);
    setTimeout(() => message.remove(), 3e3);
  }
  __name(initLevel, "initLevel");
  function loadLevel(levelNum) {
    gameState.level = levelNum;
    gameState.timeLeft = 60 + (levelNum - 1) * 10;
    gameState.running = true;
    gameState.lastTime = performance.now();
    gameState.score = 0;
    player.x = 100;
    player.y = 300;
    player.health = 100;
    player.vx = 0;
    player.vy = 0;
    player.grounded = false;
    player.speedBoost = false;
    player.invisible = false;
    levelManager.loadLevel(levelNum);
    gameState.platforms = levelManager.platforms;
    gameState.enemies = levelManager.enemies;
    gameState.coins = levelManager.coins;
    gameState.powerUpsList = levelManager.powerups;
    gameState.bosses = levelManager.getBosses();
    updateScore();
    document.getElementById("level").textContent = gameState.level;
    document.getElementById("score-board").classList.remove("hidden");
    document.getElementById("level-info").classList.remove("hidden");
    document.getElementById("timer").classList.remove("hidden");
    document.getElementById("controls-hint").classList.remove("hidden");
    document.getElementById("health-bar").classList.remove("hidden");
    if (gameState.level > 1) {
      transitions.startTransition("levelUp", `NIVEAU ${gameState.level} COMMENC\xC9!`);
    }
  }
  __name(loadLevel, "loadLevel");
  function gameLoop(timestamp) {
    if (!gameState.running) return;
    const deltaTime = timestamp - gameState.lastTime;
    gameState.lastTime = timestamp;
    update(deltaTime);
    render();
    requestAnimationFrame(gameLoop);
  }
  __name(gameLoop, "gameLoop");
  function update(deltaTime) {
    let currentSpeed = player.speed;
    if (player.speedBoost) currentSpeed *= 2;
    if (keys2["ArrowLeft"] || keys2["KeyA"]) player.vx = -currentSpeed;
    else if (keys2["ArrowRight"] || keys2["KeyD"]) player.vx = currentSpeed;
    else player.vx = 0;
    if ((keys2["Space"] || keys2["ArrowUp"] || keys2["KeyW"]) && player.grounded) {
      player.vy = player.jumpForce;
      player.grounded = false;
      player.jumpCount = 1;
      particles.jumpTrail(player.x + player.width / 2, player.y + player.height);
      achievements.updateStats("jumps");
    }
    if ((keys2["Space"] || keys2["ArrowUp"] || keys2["KeyW"]) && player.jumpCount === 1 && player.doubleJumpEnabled) {
      player.vy = player.jumpForce;
      player.jumpCount = 2;
      particles.burst(player.x + player.width / 2, player.y + player.height, 8, "#4CAF50");
    }
    if (keys2["KeyS"] || keys2["ArrowDown"]) {
      player.vy += player.gravity * 2;
    }
    player.vy += player.gravity;
    player.x += player.vx;
    player.y += player.vy;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    player.grounded = false;
    for (const plat of gameState.platforms) {
      if (player.y + player.height >= plat.y && player.y + player.height <= plat.y + player.vy + player.gravity + 5 && player.x + player.width > plat.x && player.x < plat.x + plat.width && plat.type === "ground") {
        player.y = plat.y - player.height;
        player.vy = 0;
        player.grounded = true;
        player.jumpCount = 0;
      }
    }
    if (!player.grounded) {
      for (const plat of gameState.platforms) {
        if (plat.type === "platform") {
          if (player.vy > 0 && player.y + player.height >= plat.y && player.y + player.height <= plat.y + player.vy + 10 && player.x + player.width > plat.x && player.x < plat.x + plat.width) {
            player.y = plat.y - player.height;
            player.vy = 0;
            player.grounded = true;
            player.jumpCount = 0;
          }
        }
      }
    }
    if (player.y > canvas.height) {
      player.health -= 25;
      player.y = 100;
      player.vy = 0;
      particles.hurtEffect(player.x + player.width / 2, player.y);
    }
    updateEnemies();
    updateCoins();
    updatePowerUps();
    gameState.timeLeft -= deltaTime / 1e3;
    if (gameState.timeLeft < 0) gameState.timeLeft = 0;
    const minutes = Math.floor(gameState.timeLeft / 60);
    const seconds = Math.floor(gameState.timeLeft % 60);
    document.getElementById("timer").textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    const healthFill = document.getElementById("health-fill");
    if (healthFill) healthFill.style.width = Math.max(0, player.health) + "%";
    particles.update(deltaTime);
    transitions.update(deltaTime);
    combo.update(deltaTime);
    if (player.health <= 0) {
      gameOver(false);
    } else if (gameState.timeLeft <= 0 && gameState.bosses.length === 0) {
      gameOver(true);
    }
    if (player.shielded && player.shieldDuration > 0) {
      player.shieldDuration--;
      if (player.shieldDuration <= 0) {
        player.shielded = false;
      }
    }
    if (player.speedBoost && player.speedBoostDuration > 0) {
      player.speedBoostDuration--;
      if (player.speedBoostDuration <= 0) {
        player.speedBoost = false;
      }
    }
    if (player.invisible && player.invisibleDuration > 0) {
      player.invisibleDuration--;
      if (player.invisibleDuration <= 0) {
        player.invisible = false;
      }
    }
  }
  __name(update, "update");
  function updateEnemies() {
    if (gameState.enemies.length === 0 && gameState.bosses.length === 0 && gameState.timeLeft <= 0) {
      gameOver(true);
      return;
    }
    for (let i = gameState.enemies.length - 1; i >= 0; i--) {
      const enemy = gameState.enemies[i];
      switch (enemy.type) {
        case "walker":
          enemy.x += enemy.vx;
          if (Math.abs(enemy.x - enemy.startX) > enemy.patrolRange) {
            enemy.vx *= -1;
          }
          break;
        case "flyer":
          enemy.x += enemy.vx;
          enemy.y += enemy.vy;
          if (enemy.x < 50 || enemy.x > canvas.width - 50) {
            enemy.vx *= -1;
          }
          if (enemy.y < 100 || enemy.y > canvas.height - 100) {
            enemy.vy *= -1;
          }
          break;
        case "bobber":
          const time = Date.now();
          enemy.y = enemy.baseY + Math.sin(time * enemy.bobSpeed) * 30;
          enemy.x += Math.sin(time * 2e-3) * 1;
          break;
      }
      if (!player.invisible && checkCollision(player, enemy)) {
        if (player.shielded) {
          player.shielded = false;
          player.shieldDuration = 0;
          player.health = 100;
          particles.burst(player.x + player.width / 2, player.y + player.height / 2, 10, "#2196F3");
        } else if (checkCollision(player, { x: enemy.x, y: enemy.y, width: enemy.width - 20, height: enemy.height - 20 })) {
          player.health -= 10;
          player.vy = -8;
          player.vx = player.x < enemy.x ? -5 : 5;
          particles.hurtEffect(player.x + player.width / 2, player.y + player.height / 2);
        }
      }
    }
  }
  __name(updateEnemies, "updateEnemies");
  function updateCoins() {
    for (let i = gameState.coins.length - 1; i >= 0; i--) {
      const coin = gameState.coins[i];
      if (coin.collected) continue;
      const dx = player.x + player.width / 2 - coin.x;
      const dy = player.y + player.height / 2 - coin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < player.width / 2 + coin.size) {
        coin.collected = true;
        const value = coin.value || 10;
        const scored = combo.coinCollected(value);
        gameState.score += scored;
        achievements.updateStats("coinsCollected");
        leaderboard.data.levels[gameState.level].coinsCollected = (leaderboard.data.levels[gameState.level].coinsCollected || 0) + 1;
        particles.collectCoin(coin.x, coin.y);
        updateScore();
      }
    }
  }
  __name(updateCoins, "updateCoins");
  function updatePowerUps() {
    for (let i = gameState.powerUpsList.length - 1; i >= 0; i--) {
      const pu = gameState.powerUpsList[i];
      if (pu.collected) continue;
      const dx = player.x + player.width / 2 - pu.x;
      const dy = player.y + player.height / 2 - pu.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < player.width / 2 + 20) {
        pu.collected = true;
        powerUps.activate(pu.type, player);
        achievements.updateStats("powerUpsUsed");
        particles.collectPowerUp(pu.x, pu.y, pu.type);
        switch (pu.type) {
          case "doubleJump":
            player.doubleJumpEnabled = true;
            break;
          case "shield":
            player.shielded = true;
            player.shieldDuration = 30 * 60;
            break;
          case "speed":
            player.speedBoost = true;
            player.speedBoostDuration = 20 * 60;
            break;
          case "freeze":
            gameState.enemies.forEach((e) => e.speed *= 0.5);
            break;
          case "timeStop":
            achievements.updateStats("timeStopsUsed");
            break;
          case "magnet":
            achievements.updateStats("magnetsUsed");
            break;
          case "invisibility":
            player.invisible = true;
            player.invisibleDuration = 15 * 60;
            break;
        }
      }
    }
  }
  __name(updatePowerUps, "updatePowerUps");
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    levelManager.render(ctx);
    for (const coin of gameState.coins) {
      if (coin.collected) continue;
      ctx.beginPath();
      ctx.arc(coin.x, coin.y, coin.size, 0, Math.PI * 2);
      ctx.fillStyle = "#FFD700";
      ctx.fill();
      ctx.strokeStyle = "#FFA500";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
    }
    for (const enemy of gameState.enemies) {
      ctx.fillStyle = getEnemyColor(enemy.type);
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(enemy.x + 10, enemy.y + 15, 5, 0, Math.PI * 2);
      ctx.arc(enemy.x + 30, enemy.y + 15, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(enemy.x + 10, enemy.y + 15, 2, 0, Math.PI * 2);
      ctx.arc(enemy.x + 30, enemy.y + 15, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const boss of gameState.bosses) {
      ctx.fillStyle = "#E91E63";
      ctx.fillRect(boss.x, boss.y, boss.width, boss.height);
      const healthPercent = boss.health / boss.maxHealth;
      ctx.fillStyle = "#333";
      ctx.fillRect(boss.x, boss.y - 12, boss.width, 8);
      ctx.fillStyle = healthPercent > 0.5 ? "#4CAF50" : healthPercent > 0.25 ? "#FFC107" : "#F44336";
      ctx.fillRect(boss.x, boss.y - 12, boss.width * healthPercent, 8);
    }
    ctx.globalAlpha = player.invisible ? 0.3 : 1;
    ctx.fillStyle = player.shielded ? "#2196F3" : "#4CAF50";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(player.x + 10, player.y + 15, 5, 0, Math.PI * 2);
    ctx.arc(player.x + 30, player.y + 15, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(player.x + 10, player.y + 15, 2, 0, Math.PI * 2);
    ctx.arc(player.x + 30, player.y + 15, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    particles.render(ctx);
    transitions.render(ctx);
    if (combo.isComboActive()) {
      ctx.fillStyle = "#FFF";
      ctx.font = "bold 24px Arial";
      ctx.textAlign = "center";
      ctx.fillText(combo.getComboText(), canvas.width - 100, 50);
    }
  }
  __name(render, "render");
  function getEnemyColor(type) {
    switch (type) {
      case "walker":
        return "#FF6B6B";
      case "flyer":
        return "#4ECDC4";
      case "bobber":
        return "#FFE66D";
      default:
        return "#FF6B6B";
    }
  }
  __name(getEnemyColor, "getEnemyColor");
  function checkCollision(obj1, obj2) {
    return obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y;
  }
  __name(checkCollision, "checkCollision");
  function updateScore() {
    document.getElementById("score").textContent = gameState.score;
    leaderboard.data.global.highest = Math.max(leaderboard.data.global.highest, gameState.score);
    leaderboard.save();
  }
  __name(updateScore, "updateScore");
  function startGame() {
    if (document.getElementById("level-transition")) document.getElementById("level-transition").remove();
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-over-screen").classList.add("hidden");
    document.getElementById("menu-overlay")?.classList.add("hidden");
    audio.init();
    audio.playMusic();
    loadLevel(1);
    requestAnimationFrame(gameLoop);
  }
  __name(startGame, "startGame");
  function gameOver(won) {
    gameState.running = false;
    leaderboard.submitScore(gameState.level, gameState.score);
    achievements.updateStats("timeSurvived", Math.floor(gameState.timeLeft));
    if (won && gameState.level < 5) {
      transitions.startTransition("levelUp", `NIVEAU ${gameState.level} TERMIN\xC9!`);
      setTimeout(() => {
        startNextLevel();
      }, 2e3);
      return;
    } else if (won && gameState.level === 5) {
      leaderboard.submitScore(0, gameState.score);
      transitions.startTransition("victory", "\u{1F389} VICTOIRE TOTALE! \u{1F389}");
      particles.levelUp(canvas.width / 2, canvas.height / 2);
      setTimeout(() => {
        document.getElementById("game-over-screen").classList.remove("hidden");
        document.getElementById("game-over-title").textContent = "\u{1F389} Victoire Totale !";
        document.getElementById("game-over-title").style.color = "#FFD700";
        document.getElementById("game-over-message").textContent = `Score final: ${gameState.score} - F\xC9LICITIONS! Vous avez termin\xE9 tous les niveaux!`;
      }, 2e3);
      return;
    } else {
      transitions.startTransition("gameOver", "\u{1F480} Game Over");
      setTimeout(() => {
        document.getElementById("game-over-screen").classList.remove("hidden");
        document.getElementById("game-over-title").textContent = "\u{1F480} Game Over";
        document.getElementById("game-over-title").style.color = "#FF6B6B";
        document.getElementById("game-over-message").textContent = `Score final: ${gameState.score} - Vous avez \xE9t\xE9 \xE9limin\xE9 !`;
      }, 1e3);
      return;
    }
  }
  __name(gameOver, "gameOver");
  function startNextLevel() {
    loadLevel(gameState.level + 1);
  }
  __name(startNextLevel, "startNextLevel");
  function restartGame() {
    if (document.getElementById("level-transition")) document.getElementById("level-transition").remove();
    document.getElementById("start-screen").classList.remove("hidden");
    document.getElementById("game-over-screen").classList.add("hidden");
    document.getElementById("menu-overlay")?.classList.add("hidden");
    gameState.score = 0;
    gameState.timeLeft = 60;
    loadLevel(1);
    requestAnimationFrame(gameLoop);
  }
  __name(restartGame, "restartGame");
  resizeCanvas();
  initLevel();
  render();
  (function() {
    if (typeof window !== "undefined") {
      window.startGame = window.startGame || startGame;
      window.restartGame = window.restartGame || restartGame;
      window.startNextLevel = window.startNextLevel || startNextLevel;
      window.initLevel = window.initLevel || initLevel;
    }
    console.log("NEON PROTOCOL v5.3 ready!");
  })();
})();
