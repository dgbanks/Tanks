const Tank = require('./tank');

const DEFAULTS = {
  color: 'blue',
  pos: [45, 300]
};

class PlayerOne extends Tank {
  constructor(game) {
    super(game);

    this.pos = DEFAULTS.pos;
    this.color = DEFAULTS.color;
    this.aimX = this.pos[0] + 35;
    this.aimY = this.pos[1];
    this.sides = this.getSides();
  }

}

module.exports = PlayerOne;
