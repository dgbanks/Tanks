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
    this.enemies = [];
    this.bullets = [];
    this.barriers = [];
    this.coverOnly = [];
    this.explosions = [];
    this.outcome;
    // console.log('newgame');
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
    this.enemies.push(tank);
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

    this.coverOnly = [].concat(startingCover, levelOne);
    this.barriers = [].concat(boundaries, startingCover, levelOne);
    return this.barriers;
  }

  remove(object) {
    if (object instanceof Barrier) {
      return;
    } else if (object instanceof Tank) {
      if (!this.tanks.includes(this.playerOne)) {
        this.tanks.forEach(enemy => (enemy.seesPlayerOne = false ));
      }
      this.tanks = this.tanks.filter(tank => (
        tank !== object
      ));
      // object = undefined;
      // this.bullets.forEach(bullet => {
      //   if (bullet.owner === object) {
      //     bullet.explode();
      //   }
      // });
      // object.pos = undefined;

      // this.gameOver();
      setTimeout(() => { this.gameOver(); }, 1000);

    } else if (object instanceof Bullet) {
      console.log('goodbye', object.owner.color, object.owner.bullets);
      this.bullets = this.bullets.filter(bullet => (
        object !== bullet
      ));
      object = undefined;
    } else if (object instanceof Explosion) {
      this.explosions = this.explosions.filter(explosion => (
        object !== explosion
      ));
      object = undefined;
    }
  }

  gameOver() {
    console.log('inside gameOver');
    // if (this.tanks.length === 1) {
      if (this.tanks.length === 0) {
        this.outcome = 'Draw!';
      } else if (this.tanks.length === 1 && this.tanks[0] instanceof PlayerOne) {
        this.outcome = 'You win!';
        console.log('You win!');
      } else if (!this.tanks.includes(this.playerOne)) {
        this.outcome = 'You lose!';
        console.log('You lose!');
      }

      // if (this.tanks.length === 1 && this.tanks[0] instanceof PlayerOne) {
      //   this.outcome = 'You win!';
      //   console.log('You win!');
      // } else if (!this.tanks.includes(this.playerOne)) {
      //   this.outcome = 'You lose!';
      //   console.log('You lose!');
      // } else if (this.tanks.length === 0) {
      //   this.outcome = 'Draw!';
      // }
    // }
  }

  getMovingObjects() {
    return [].concat(this.tanks, this.bullets);
  }

  moveObjects(direction) {
    this.getMovingObjects().forEach(object => {
        let props;
        if (object instanceof PlayerOne) {
            // console.log('playerOne');
            props = direction;
        } else if (object instanceof EnemyTank) {
          // console.log('EnemyTank');
            // RISKY
            props = object.moveDirection;
            // console.log(props);
        } else {
            props = object.slope;
        }
        object.move(props);
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

      if (object instanceof Tank) {
        let props;
        if (object instanceof PlayerOne) {
          props = mouseObject.mousePos;
        } else {
          props = this.playerOne.pos;
        }
        object.swivelCannon(props);
      }
    });

    // this.playerOne.swivelCannon(mouseObject.mousePos);
    // this.enemy.swivelCannon(this.playerOne.pos);

    this.explosions.forEach(explosion => {
      explosion.draw(ctx);
    });



    // render the player's aim
    // ctx.beginPath();
    // ctx.moveTo(this.playerOne.pos[0], this.playerOne.pos[1]);
    // ctx.lineTo(mouseObject.mousePos[0], mouseObject.mousePos[1]);
    // ctx.strokeStyle = 'white';
    // ctx.lineWidth = 1;
    // ctx.stroke();
    //
    // ctx.beginPath();
    // ctx.moveTo(this.enemy.pos[0], this.enemy.pos[1]);
    // ctx.lineTo(this.playerOne.pos[0], this.playerOne.pos[1]);
    // ctx.strokeStyle = 'yellow';
    // ctx.lineWidth = 1;
    // ctx.stroke();

  }
}

module.exports = Game;
