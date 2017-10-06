const Barrier = require('./barrier');
const Tank = require('./tank');

class Game {
  constructor(object) {
    this.dimensions = object.dimensions;
    this.tanks = [];
    this.bullets = [];
    // this.playerTank = "";
  }

  addTank() {
    const tank = new Tank();
    this.tanks.push(tank);
    this.playerTank = tank;
    return tank;
  }

  getAllObjects() {
    return [].concat(this.tanks, this.bullets);
  }

  // moveEverything(direction) {
  //   this.getAllObjects().forEach(object => {
  //     object.move(direction);
  //   });
  // }

  drawEverything(ctx, mouseObject) {
    // render the canvas
    ctx.clearRect(0, 0, this.dimensions[0], this.dimensions[1]);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.dimensions[0], this.dimensions[1]);

    // render barriers and boundaries
    new Barrier().draw(ctx);

    // render moving objects
    this.getAllObjects().forEach(object => {
      object.draw(ctx);
    });

    // render the player's aim
    ctx.beginPath();
    ctx.moveTo(this.playerTank.pos[0], this.playerTank.pos[1]);
    ctx.lineTo(mouseObject.mousePos[0], mouseObject.mousePos[1]);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

}

module.exports = Game;
