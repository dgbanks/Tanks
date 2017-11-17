class GameView {

  constructor(game, context, canvas) {
    this.game = game;
    this.context = context;
    this.canvas = canvas;
    this.mousePos = [400, 300];
    this.tank = this.game.addTank();
    this.enemy = this.game.addEnemies();
    this.enemy = this.game.addEnemies();

    this.game.addBarriers();

    this.setMousePosition = this.setMousePosition.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // console.log('new gameView');
  }

  listenForMouse() {
    this.canvas.addEventListener('mousemove', this.setMousePosition);
  }

  setMousePosition(event) {
    this.mousePos = [(event.clientX - 350), (event.clientY - 50)];
  }

  listenForClick() {
    this.canvas.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.tank.fire(this.mousePos);
  }

  bindKeys() {
    Object.keys(GameView.MOVES).forEach((k) => {
      document.addEventListener('keydown', event => {
        let direction = GameView.MOVES[event.key];
        let dirX = this.tank.moveDirection[0] + direction[0];
        let dirY = this.tank.moveDirection[1] + direction[1];
        if (dirX > 0) { dirX = 1; } else if (dirX < 0) { dirX = -1; }
        if (dirY > 0) { dirY = 1; } else if (dirY < 0) { dirY = -1; }
        this.tank.moveDirection = [dirX, dirY];
      });
    });

    document.addEventListener('keyup', event => {
      let direction = GameView.MOVES[event.key];
      let dirX = this.tank.moveDirection[0] - direction[0];
      let dirY = this.tank.moveDirection[1] - direction[1];
      if (dirX > 0) { dirX = 1; } else if (dirX < 0) { dirX = -1; }
      if (dirY > 0) { dirY = 1; } else if (dirY < 0) { dirY = -1; }
      this.tank.moveDirection = [dirX, dirY];
      // this.tank.moveDirection = [0, 0];
    });
  }

  displayOutcome() {
    document.getElementById('outcome').innerHTML = `${this.game.outcome}`;
    // document.getElementById('new-game-button').innerHTML = 'New Game';
    // this.game = new Game({dimensions: [canvas.width, canvas.height]});
  }

  start() {
    this.bindKeys();
    this.listenForMouse();
    this.listenForClick();

    this.animate();
  }

  animate() {
    this.game.moveObjects();
    this.game.drawEverything(this.context, {mousePos: this.mousePos});
    // this.enemy.drawLine(this.context);

    if (!this.game.outcome) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.displayOutcome();
    }
  }

}

GameView.MOVES = {
  'w': [0, -1],
  'a': [-1, 0],
  's': [0, 1],
  'd': [1, 0]
};

module.exports = GameView;
