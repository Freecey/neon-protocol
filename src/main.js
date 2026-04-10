// 🎮 RUSH PLATFORMER - Main Entry Point
// Architecture: ES6 Modules + Object-Oriented

import Game from './Game';
import UIManager from './ui/UIManager';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  const uiManager = new UIManager(game);
  
  // Start game on button click
  const startBtn = document.querySelector('button');
  startBtn?.addEventListener('click', () => {
    game.start();
    uiManager.showGameUI();
  });
  
  // Handle restart
  window.restartGame = () => {
    game.reset();
    uiManager.hideAllUI();
    document.querySelector('#start-screen')?.classList.remove('hidden');
  };
  
  window.startGame = () => {
    uiManager.hideAllUI();
    game.start();
    uiManager.showGameUI();
  };
  
  window.restartGame = () => {
    document.querySelector('#game-over-screen')?.classList.add('hidden');
    document.querySelector('#start-screen')?.classList.remove('hidden');
    game.reset();
    uiManager.hideAllUI();
  };
  
  // Handle window resize
  window.addEventListener('resize', () => game.resize());
  
  console.log('Rush Platformer - JP\'s Challenge Ready! 🚀');
});
