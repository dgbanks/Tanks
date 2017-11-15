const Explosion = require('./explosion');

class Bullet {
  constructor(props) {
    this.game = props.game;
    this.owner = props.owner;
    this.pos = props.tankPos;
    this.slope = props.slope;
    this.targets = this.owner.idEnemies();
    this.speed = 5;
    this.radius = 5;
    this.color = 'white';
    this.explosionTimeout = 300;
    console.log('hello', this.owner.color, this.owner.bullets);
  }

  move(slope) {
    slope = [(slope[0] * this.speed), (slope[1] * this.speed)];
    this.pos = [(this.pos[0] + slope[0]), (this.pos[1] + slope[1])];

    let otherBullets = this.game.bullets.filter(bullet => (bullet !== this));
    if (this.hasCollided([].concat(this.targets, this.game.barriers, otherBullets))) {
      this.explode();
    }
  }

  hasCollided(objects) {
    let bool;


    objects.forEach(object => {
      let objectDimensions;

      if (object instanceof Bullet || object instanceof Explosion) {
        objectDimensions = {
          top: (object.pos[1] - object.radius),
          right: (object.pos[0] + object.radius),
          bottom: (object.pos[1] + object.radius),
          left: (object.pos[0] - object.radius)
        }
      } else {
        objectDimensions = {
          top: object.sides.top,
          right: object.sides.right,
          bottom: object.sides.bottom,
          left: object.sides.left
        };
      }

      if ((
        (this.pos[0] + this.radius) >= objectDimensions.left &&
        (this.pos[0] - this.radius) <= objectDimensions.right
      ) && (
        (this.pos[1] + this.radius) >= objectDimensions.top &&
        (this.pos[1] - this.radius) <= objectDimensions.bottom
      )) {
        bool = true;
        this.hitsMovingObject(object);
        // return;
      }
    });

    return bool;
  }

  hitsMovingObject(object) {
    if (object instanceof Bullet) {
      object.explode();
    }

    if (this.targets.includes(object)) {
      console.log('hits ', object);
      this.game.remove(object);
      // this.pos = object.pos;
      this.explosionTimeout = 750;

      console.log(`${this.owner.color} ${this.owner.bullets} hits ${object.color}`);
      if (object !== this.game.playerOne) {
        console.log(`${object.color}.pos FROM ${object.pos}`);
        object.pos = undefined;
        console.log(`${object.color}.pos TO ${object.pos}`);
        // object.sides = undefined;

        // setTimeout(() => { object.pos = undefined; }, 500);
      }
    }
  }

  explode() {
    this.owner.bullets = this.owner.bullets - 1;
    this.game.remove(this);

    const explosion = new Explosion(this.pos);
    this.game.explosions.push(explosion);
    setTimeout(() => { this.game.remove(explosion); }, this.explosionTimeout);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, (2 * Math.PI), false);
    ctx.fill();
  }

}

module.exports = Bullet;
