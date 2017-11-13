const Tank = require('./tank');
const PlayerOne = require('./player_one');
const EnemyTank = require('./enemy_tank');
const Barrier = require('./barrier');
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
    const tank = new PlayerOne(this);
    this.tanks.push(tank);
    this.playerOne = tank;
    return tank;
  }

  addEnemies() {
    const tank = new EnemyTank(this);
    this.tanks.push(tank);
    this.enemy = tank;
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
    this.barriers.forEach(barrier => {
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

  moveObjects(direction) {
    this.getMovingObjects().forEach(object => {
        if (object instanceof Tank) {
            if (!object.canMove(direction)) {
              direction = [0, 0];
            }
            object.move(direction);
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
    this.barriers.forEach(barrier => {
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
    ctx.moveTo(this.playerOne.pos[0], this.playerOne.pos[1]);
    ctx.lineTo(mouseObject.mousePos[0], mouseObject.mousePos[1]);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();

    this.playerOne.swivelCannon(mouseObject.mousePos);
    this.enemy.swivelCannon(this.playerOne.pos);
  }
}

module.exports = Game;
