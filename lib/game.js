const Barrier = require('./barrier');
const Tank = require('./tank');

class Game {
  constructor() {

    this.tanks = [];
    this.bullets = [];
    // this.ctx = ctx;
    // new Tank(ctx);
    // new Barrier(ctx);
    // this.getTank();
  }

  addTank() {
    const tank = new Tank();
    this.tanks.push(tank);
    return tank;
  }

  getAllObjects() {
    return [].concat(this.tanks, this.bullets);
  }

  drawEverything(ctx) {
    new Barrier().draw(ctx);
    this.getAllObjects().forEach(object => {
      object.draw(ctx);
    });
  }

}

module.exports = Game;
