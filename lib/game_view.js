class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.context = context;
    this.tank = this.game.addTank();
  }

  bindKeys() {
    const tank = this.tank;

    Object.keys(GameView.MOVES).forEach((k) => {
      let direction = GameView.MOVES[k];
      key(k, () => { tank.move(direction); });
    });

  }

  animate() {
    
  }


}

GameView.MOVES = {
  'w': [0, -1],
  'a': [-1, 0],
  's': [0, 1],
  'd': [1, 0]
};

module.exports = GameView;
