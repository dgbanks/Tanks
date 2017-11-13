class Bullet {
  constructor(props) {
    this.game = props.game;
    this.owner = props.owner;
    this.pos = props.tankPos;
    this.mousePos = props.mousePos;
    this.targets = this.owner.idEnemies();
    this.speed = 5;
    this.slope = this.calcSlope();
    this.radius = 5;
    this.color = 'white';
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
  }

  willCollide(objects) {
    let bool;

    objects.forEach(object => {
      if ((
        (this.pos[0] + this.radius) >= object.sides.left &&
        (this.pos[0] - this.radius) <= object.sides.right
      ) && (
        (this.pos[1] + this.radius) >= object.sides.top &&
        (this.pos[1] - this.radius) <= object.sides.bottom
      )) {

        bool = true;

        this.game.remove(object);

      }
    });

    return bool;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, (2 * Math.PI), false);
    ctx.fill();
  }

}

module.exports = Bullet;
