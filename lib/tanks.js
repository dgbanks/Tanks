const Game = require('./game.js');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('game-map');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const game = new Game(ctx);
});
