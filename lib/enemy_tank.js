const Tank = require('./tank');

const DEFAULTS = {
  color: 'red',
  pos: [755, 300]
};

class EnemyTank extends Tank {
  constructor(game) {
    super(game);

    this.pos = DEFAULTS.pos;
    this.color = DEFAULTS.color;
  }
}

module.exports = EnemyTank;
