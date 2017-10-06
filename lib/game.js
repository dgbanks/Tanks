const Barrier = require('./barrier');
const Tank = require('./tank');

class Game {
  constructor(object) {
    this.dimensions = object.dimensions;
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
    ctx.clearRect(0, 0, this.dimensions[0], this.dimensions[1]);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.dimensions[0], this.dimensions[1]);

    new Barrier().draw(ctx);
    this.getAllObjects().forEach(object => {
      object.draw(ctx);
    });
  }

}

module.exports = Game;
