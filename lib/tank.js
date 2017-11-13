const Bullet = require('./bullet');

class Tank {
  constructor(game) {
    this.game = game;
    // this.pos = [45, 300];
    this.moveDirection = [0, 0];
    this.width = 50;
    // this.color = 'blue';
    this.aimX = 80;
    this.aimY = 300;
  }

  sides() {
    return {
      top: this.pos[1] - (this.width / 2),
      right: this.pos[0] + (this.width / 2),
      bottom: this.pos[1] + (this.width / 2),
      left: this.pos[0] - (this.width / 2)
    };
  }

  draw(ctx) {
    // tank body
    ctx.fillStyle = this.color;
    ctx.fillRect((this.pos[0] - (this.width / 2)), (this.pos[1] - (this.width / 2)), this.width, this.width);

    // tank center
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 5, 0, (2 * Math.PI), false);
    ctx.fill();

    // tank cannon
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.aimX, this.aimY);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  canMove(direction) {
    let bool = true;

    if ((direction[0] === 0) && (direction[1] === -1)) {
      this.game.barriers.forEach(barrier => {
        if ((this.sides().top === barrier.sides.bottom) && (
          (this.sides().left >= barrier.sides.left &&
          this.sides().left < barrier.sides.right) ||
          (this.sides().right > barrier.sides.left &&
          this.sides().right <= barrier.sides.right) ||
          (this.pos[0] >= barrier.sides.left &&
            this.pos[0] <= barrier.sides.right))) {
              bool = false;
            }
      });
    }

    if ((direction[0] === 0) && (direction[1] === 1)) {
      this.game.barriers.forEach(barrier => {
        if ((this.sides().bottom === barrier.sides.top) && (
          (this.sides().left >= barrier.sides.left &&
          this.sides().left < barrier.sides.right) ||
          (this.sides().right > barrier.sides.left &&
          this.sides().right <= barrier.sides.right) ||
          (this.pos[0] >= barrier.sides.left &&
            this.pos[0] <= barrier.sides.right))) {
              bool = false;
            }
      });
    }

    if ((direction[0] === -1) && (direction[1] === 0)) {
      this.game.barriers.forEach(barrier => {
        if ((this.sides().left === barrier.sides.right) && (
          (this.sides().top > barrier.sides.top &&
          this.sides().top < barrier.sides.bottom) ||
          (this.sides().bottom > barrier.sides.top &&
          this.sides().bottom < barrier.sides.bottom) ||
          (this.pos[1] >= barrier.sides.top &&
            this.pos[1] <= barrier.sides.bottom))) {
              bool = false;
            }
      });
    }

    if ((direction[0] === 1) && (direction[1] === 0)) {
      this.game.barriers.forEach(barrier => {
        if ((this.sides().right === barrier.sides.left) && (
          (this.sides().top > barrier.sides.top &&
          this.sides().top < barrier.sides.bottom) ||
          (this.sides().bottom > barrier.sides.top &&
          this.sides().bottom < barrier.sides.bottom) ||
          (this.pos[1] >= barrier.sides.top &&
            this.pos[1] <= barrier.sides.bottom))) {
              bool = false;
            }
      });
    }

    return bool;
  }

  move(direction) {
    direction = [(direction[0] * 5), (direction[1] * 5)];
    this.pos = [(this.pos[0] + direction[0]), (this.pos[1] + direction[1])];
  }

  swivelCannon(mousePos) {
    let dX = this.pos[0] - mousePos[0];
    let dY = mousePos[1] - this.pos[1];
    let magic = Math.atan2(dX, dY) + (Math.PI / 2);

    this.aimX = this.pos[0] + (35 * Math.cos(magic));
    this.aimY = this.pos[1] + (35 * Math.sin(magic));
  }

  fire(mousePos) {
    const bullet = new Bullet({ mousePos: mousePos, tankPos: this.pos });
    this.game.addBullet(bullet);
  }
}

module.exports = Tank;
