class Tank {
  constructor() {
    this.pos = [45, 300];
  }

  draw(ctx) {
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 35, 0, (2 * Math.PI), false);
    ctx.stroke();

    ctx.fillStyle = 'blue';
    ctx.fillRect((this.pos[0] - 25), (this.pos[1] - 25), 50, 50);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 5, 0, (2 * Math.PI), false);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.fillRect(this.pos[0],(this.pos[1] - 2.5), 35, 5);
  }

  move(direction) {
    direction = [(direction[0] * 5), (direction[1] * 5)];
    this.pos = [(this.pos[0] + direction[0]), (this.pos[1] + direction[1])];
  }
}

module.exports = Tank;
