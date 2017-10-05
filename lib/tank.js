class Tank {
  constructor() {
    this.pos = [45, 300];
  }

  draw(ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(20, 285, 50, 30);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    // 45, 300 is the tank's center point's position! the true position
    ctx.arc(this.pos[0], this.pos[1], 5, 0, (2 * Math.PI), false);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.fillRect(40,297.5, 50, 5);
  }

  move(direction) {
    this.pos = [(this.pos[0] + direction[0]), this.pos[1] + direction[1]];
  }
}

module.exports = Tank;
