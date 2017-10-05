const Barrier = require('./barrier');
const Tank = require('./tank');

class Game {
  constructor() {

    this.tanks = [];
    this.bullets = [];

  }

  addTank() {
    const tank = new Tank();
    this.tanks.push(tank);
    return tank;
  }

  getAllObjects() {
    return [].concat(this.tanks, this.bullets);
  }

  moveEverything(direction) {
    this.getAllObjects().forEach(object => {
      object.move(direction);
    });
  }

  drawEverything(ctx) {
    new Barrier().draw(ctx);
    this.getAllObjects().forEach(object => {
      object.draw(ctx);
    });
  }

  clearObjects() {

  }

}

module.exports = Game;
