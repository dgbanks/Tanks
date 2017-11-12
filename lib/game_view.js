class GameView {

  constructor(game, context, canvas) {
    this.game = game;
    this.context = context;
    this.canvas = canvas;
    this.mousePos = [400, 300];
    this.tank = this.game.addTank();

    this.game.addBarriers();

    this.setMousePosition = this.setMousePosition.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  listenForMouse() {
    this.canvas.addEventListener('mousemove', this.setMousePosition);
  }

  setMousePosition(event) {
    this.mousePos = [event.clientX, event.clientY];
  }

  listenForClick() {
    this.canvas.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.tank.fire(this.mousePos);
  }

  bindKeys() {
    const tank = this.tank;

    Object.keys(GameView.MOVES).forEach((k) => {
      let direction = GameView.MOVES[k];
      global.key(k, () => {
        tank.moveDirection = direction;
      });
    });
  }

  start() {
    this.bindKeys();

    this.listenForMouse();
    this.listenForClick();

    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.moveObjects(this.tank.moveDirection);
    this.game.drawEverything(this.context, {mousePos: this.mousePos});

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
