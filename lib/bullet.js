const Explosion = require('./explosion');

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
    this.explosionTimeout = 300;
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

  move(slope) {
    slope = [(slope[0] * this.speed), (slope[1] * this.speed)];
    this.pos = [(this.pos[0] + slope[0]), (this.pos[1] + slope[1])];

    if (this.hasCollided([].concat(this.targets, this.game.barriers))) {
      this.explode();
    }
  }

  hasCollided(objects) {
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
        this.hitsEnemy(object);
        return;
      }
    });

    return bool;
  }

  hitsEnemy(object) {
    if (this.targets.includes(object)) {
      this.game.remove(object);
      this.explosionTimeout = 750;
      this.pos = object.pos;
    }
  }

  explode() {
    this.game.remove(this);

    const explosion = new Explosion(this.pos);
    this.game.explosions.push(explosion);
    setTimeout(() => { this.game.remove(explosion); }, this.explosionTimeout);
    console.log(this.game.tanks);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, (2 * Math.PI), false);
    ctx.fill();
  }

}

module.exports = Bullet;
