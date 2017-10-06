const Tank = require('./tank');

class PlayerTank extends Tank {
  constructor() {

  }

  draw(ctx) {
    ctx.fillStyle = 'green';
    ctx.fillRect(20, 20, 10, 10);
  }
}

module.exports = PlayerTank;
