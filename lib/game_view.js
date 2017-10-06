class GameView {

  constructor(game, context) {
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

  start() {
    this.bindKeys();

    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    // const timeDelta = time - this.lastTime;

    // this.game.step(timeDelta);
    this.game.drawEverything(this.context);
    /// POSSIBLY NEED THE STEP METHOD OR SOME WAY OF CALLING MOVE FOR THE TANKS
    requestAnimationFrame(this.animate.bind(this));
  }

}

GameView.MOVES = {
  'w': [0, -1],
  'a': [-1, 0],
  's': [0, 1],
  'd': [1, 0]
};

module.exports = GameView;
