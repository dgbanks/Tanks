const Game = require('./game.js');
const GameView = require('./game_view');

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('game-map');
  const context = canvas.getContext('2d');

  const game = new Game({dimensions: [canvas.width, canvas.height]});
  new GameView(game, context, canvas).start();
});
