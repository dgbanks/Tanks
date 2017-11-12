class Explosion {

  constructor(pos) {
    this.pos = pos;
    this.radius = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, (2 * Math.PI), false);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();

    this.radius = this.radius + 1;
  }

}

module.exports = Explosion;
