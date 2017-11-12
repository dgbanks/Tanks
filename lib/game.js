const Barrier = require('./barrier');
const Tank = require('./tank');
const Bullet = require('./bullet');
const Explosion = require('./explosion');

class Game {
  constructor(canvas) {
    this.dimensions = canvas.dimensions;
    this.tanks = [];
    this.bullets = [];
    this.barriers = [];
    this.explosions = [];
  }

  addTank() {
    const tank = new Tank(this);
    this.tanks.push(tank);
    this.playerTank = tank;
    return tank;
  }

  addBullet(bullet) {
    this.bullets.push(bullet);
    return bullet;
  }

  addBarriers() {
    const boundaries = [
      new Barrier(0, 0, 800, 10),
      new Barrier(0, 590, 800, 10),
      new Barrier(0, 10, 10, 580),
      new Barrier(790, 10, 10, 580)
    ];

    const startingCover = [
      new Barrier(100, 250, 20, 100),
      new Barrier(680, 250, 20, 100)
    ];

    const levelOne = [
      new Barrier(390, 100, 20, 150),
      new Barrier(390, 350, 20, 150)
    ];

    this.barriers = [].concat(boundaries, startingCover, levelOne);
    return this.barriers;
  }


  getMovingObjects() {
    return [].concat(this.tanks, this.bullets);
  }

  willCollide(object) {
    let property;
    if (object instanceof Tank) {
      property = object.width / 2;
    } else {
      property = object.radius;
    }

    let bool;
    this.addBarriers().forEach(barrier => {
      if ((
        (object.pos[0] + property) >= barrier.sides.left &&
        (object.pos[0] - property) <= barrier.sides.right
      ) && (
        (object.pos[1] + property) >= barrier.sides.top &&
        (object.pos[1] - property) <= barrier.sides.bottom
      )) {
        bool = true;
      }
    });

    return bool;
  }

  validatesMove(tank, direction) {
    this.barriers.forEach(barrier => {
      if ((tank.sides.top === barrier.sides.bottom) && (
        (tank.sides.left > barrier.sides.left &&
          tank.sides.left < barrier.sides.right) ||
        (tank.sides.right > barrier.sides.left &&
          tank.sides.right < barrier.sides.right) ||
        (tank.pos[0] > barrier.sides.left &&
          tank.pos[0] < barrier.sides.right))) {
        if (direction === [0, -1]) {
          direction = [0, 0];
        }
      }

      if ((tank.sides.bottom === barrier.sides.top) && (
        (tank.sides.left > barrier.sides.left &&
          tank.sides.left < barrier.sides.right) ||
        (tank.sides.right > barrier.sides.left &&
          tank.sides.right < barrier.sides.right) ||
        (tank.pos[0] > barrier.sides.left &&
          tank.pos[0] < barrier.sides.right))) {
        if (direction === [0, 1]) {
          direction = [0, 0];
        }
      }

      if ((tank.sides.left === barrier.sides.right) && (
        (tank.sides.top > barrier.sides.top &&
          tank.sides.top < barrier.sides.bottom) ||
        (tank.sides.bottom > barrier.sides.top &&
          tank.sides.bottom < barrier.sides.bottom) ||
        (tank.pos[1] > barrier.sides.top &&
          tank.pos[1] < barrier.sides.bottom))) {
        if (direction === [-1, 0]) {
          direction = [0, 0];
        }
      }

      if ((tank.sides.right === barrier.sides.left) && (
        (tank.sides.top > barrier.sides.top &&
          tank.sides.top < barrier.sides.bottom) ||
        (tank.sides.bottom > barrier.sides.top &&
          tank.sides.bottom < barrier.sides.bottom) ||
        (tank.pos[1] > barrier.sides.top &&
          tank.pos[1] < barrier.sides.bottom))) {
        if (direction === [1, 0]) {
          direction = [0, 0];
        }
      }
    });
    tank.move(direction);
  }

  moveObjects(direction) {
    this.getMovingObjects().forEach(object => {
      if (object instanceof Tank) {
        if (!this.willCollide(object)) {
          object.move(direction);
        }
        object.moveDirection = [0, 0];

      } else {
        object.move();
        if (this.willCollide(object)) {
          const explosion = new Explosion(object.pos);
          this.explosions.push(explosion);
          setTimeout(() => {
            this.explosions = this.explosions.filter(ex => (
              ex !== explosion
            ));
          }, 300);

          this.bullets = this.bullets.filter(bullet => (
            bullet !== object
          ));
        }
      }
    });
  }

  drawEverything(ctx, mouseObject) {
    // render the canvas
    ctx.clearRect(0, 0, this.dimensions[0], this.dimensions[1]);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.dimensions[0], this.dimensions[1]);

    // render barriers and boundaries
    this.addBarriers().forEach(barrier => {
      barrier.draw(ctx);
    });

    // render moving objects
    this.getMovingObjects().forEach(object => {
      object.draw(ctx);
    });

    this.explosions.forEach(explosion => {
      explosion.draw(ctx);
    });

    // render the player's aim
    ctx.beginPath();
    ctx.moveTo(this.playerTank.pos[0], this.playerTank.pos[1]);
    ctx.lineTo(mouseObject.mousePos[0], mouseObject.mousePos[1]);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

module.exports = Game;
