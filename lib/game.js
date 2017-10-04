const Barrier = require('./barrier');
const Tank = require('./tank');

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    new Tank(ctx);
    new Barrier(ctx);
    // this.getTank();
  }

  // drawEverything(ctx) {
  //
  // }

  // getTank() {
  //   const tank = new Tank();
  // }
}

module.exports = Game;
