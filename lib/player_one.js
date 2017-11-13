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
    // console.log(DEFAULTS.pos);
  }

}

module.exports = PlayerOne;
