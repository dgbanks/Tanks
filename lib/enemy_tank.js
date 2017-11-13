const Tank = require('./tank');

const DEFAULTS = {
  color: 'red',
  pos: [755, 300]
};

const MOVES = {
  up: [0, -1],
  left: [-1, 0],
  right: [0, 1],
  down: [1, 0]
};

class EnemyTank extends Tank {
  constructor(game) {
    super(game);

    this.pos = DEFAULTS.pos;
    this.color = DEFAULTS.color;
    this.aimX = this.pos[0] - 35;
    this.aimY = this.pos[1];

    this.sides = this.getSides();

    this.move(Object.keys(MOVES)[Math.floor(Math.random() * 4)]);
  }

  move() {
    Object.keys(MOVES)[Math.floor(Math.random() * 4)]
  }

}

module.exports = EnemyTank;
