class Bullet {
  constructor(posObject) {
    this.pos = posObject.tankPos;
    this.mousePos = posObject.mousePos;
    this.speed = 5;
    this.slope = this.calcSlope();
  }

  calcSlope() {
    let slope = [(this.mousePos[0] - this.pos[0]),
                (this.mousePos[1] - this.pos[1])];

    if (Math.abs(slope[0]) >= Math.abs(slope[1])) {
      slope = [(slope[0] / Math.abs(slope[0])),
              (slope[1] / Math.abs(slope[0]))];
    } else {
      slope = [(slope[0] / Math.abs(slope[1])),
              (slope[1] / Math.abs(slope[1]))];
    }

    return slope;
  }

  move() {
    let slope = this.slope;

    slope = [(slope[0] * this.speed), (slope[1] * this.speed)];
    this.pos = [(this.pos[0] + slope[0]), (this.pos[1] + slope[1])];
    // console.log(this.pos);
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 5, 0, (2 * Math.PI), false);
    ctx.fill();
  }
}

module.exports = Bullet;
