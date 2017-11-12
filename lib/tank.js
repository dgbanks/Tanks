const Bullet = require('./bullet');

class Tank {
  constructor(game) {
    this.pos = [45, 300];
    this.game = game;
    this.moveDirection = [0, 0];
    this.width = 50;
    // this.sides = {
    //   top: this.pos[1] - (this.width / 2),
    //   right: this.pos[0] + (this.width / 2),
    //   bottom: this.pos[1] + (this.width / 2),
    //   left: this.pos[0] - (this.width / 2)
    // };
  }

  draw(ctx) {
    // tank radius
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 35, 0, (2 * Math.PI), false);
    ctx.stroke();

    // tank body
    ctx.fillStyle = 'blue';
    ctx.fillRect((this.pos[0] - (this.width / 2)), (this.pos[1] - (this.width / 2)), this.width, this.width);

    // tank center
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 5, 0, (2 * Math.PI), false);
    ctx.fill();

    // tank cannon
    ctx.fillStyle = 'white';
    ctx.fillRect(this.pos[0],(this.pos[1] - 2.5), 35, 5);

  }

  move(direction) {
    direction = [(direction[0] * 5), (direction[1] * 5)];
    this.pos = [(this.pos[0] + direction[0]), (this.pos[1] + direction[1])];
    // console.log(this.pos);
    // console.log(this.sides);
  }

  fire(mousePos) {
    const bullet = new Bullet({ mousePos: mousePos, tankPos: this.pos });

    this.game.addBullet(bullet);
  }
}

module.exports = Tank;
