const Barrier = require('./barrier');
const Tank = require('./tank');
const Bullet = require('./bullet');

class Game {
  constructor(canvas) {
    this.dimensions = canvas.dimensions;
    this.tanks = [];
    this.bullets = [];
    this.barriers = [];
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

  getBarriers() {
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

    return this.barriers.concat(boundaries, startingCover, levelOne);
  }


  getMovingObjects() {
    return [].concat(this.tanks, this.bullets);
  }

  moveBullets() {
    this.bullets.forEach(bullet => {
      bullet.move();
      // console.log('moveBullets', bullet.pos, bullet.speed);
          this.getBarriers().forEach(barrier => {
              if ((
                bullet.pos[0] > barrier.sides.left &&
                bullet.pos[0] < barrier.sides.right
              ) && (
                bullet.pos[1] > barrier.sides.top &&
                bullet.pos[1] < barrier.sides.bottom
              )) {
                console.log('collision!');
              }
          });
    });
  }

  drawEverything(ctx, mouseObject) {
    // render the canvas
    ctx.clearRect(0, 0, this.dimensions[0], this.dimensions[1]);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.dimensions[0], this.dimensions[1]);


    // render barriers and boundaries
    this.getBarriers().forEach(barrier => {
      barrier.draw(ctx);
    });




    // render moving objects
    this.getMovingObjects().forEach(object => {
      object.draw(ctx);
      // if (typeof(object) === Bullet) {
      //
      //   this.barriers().forEach(barrier => {
      //
      //       if ((
      //         object.pos[0] > barrier.sides.left &&
      //         object.pos[0] < barrier.sides.right
      //       ) && (
      //         object.pos[1] > barrier.sides.top &&
      //         object.pos[1] < barrier.sides.bottom
      //       )) {
      //         console.log('collision!');
      //       }
      //
      //   });
      //
      // }

    });

    // render the player's aim
    ctx.beginPath();
    ctx.moveTo(this.playerTank.pos[0], this.playerTank.pos[1]);
    ctx.lineTo(mouseObject.mousePos[0], mouseObject.mousePos[1]);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }



}

module.exports = Game;
