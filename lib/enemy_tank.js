const Tank = require('./tank');

class EnemyTank extends Tank {
  constructor(game) {
    super(game);

    this.pos = EnemyTank.DEFAULTS.pos.pop();
    this.color = EnemyTank.DEFAULTS.color.pop();
    this.aimX = (this.pos[0] - 35);
    this.aimY = this.pos[1];
    this.sides = this.getSides();
    this.moveDirection = this.getNewDirection();

    this.seesPlayerOne;
    this.lineOfFirePoint = [this.aimX, this.aimY];
    this.pixelsAwayFromCannon = 0;

    // sets this.seesPlayerOne
    setInterval(() => { this.cannonAI(); }, 1);

    // try to fire
    setInterval(() => { if (this.seesPlayerOne) {  this.fire();  }  }, 750);

    // new moveDirection every five seconds
    setInterval(() => {  this.moveDirection = this.getNewDirection();  }, 3000);

  }

  // drawLine(ctx) {
  //   ctx.strokeStyle = 'yellow';
  //   ctx.beginPath();
  //   ctx.arc(this.lineOfFirePoint[0], this.lineOfFirePoint[1], 5, 0, (2 * Math.PI), false);
  //   ctx.stroke();
  // }

  getNewDirection() {
    return EnemyTank.MOVES[(Object.keys(EnemyTank.MOVES)[Math.floor(Math.random() * 8)])];
  }

  cannonAI() {
    let objects = [].concat(this.game.barriers, this.game.tanks);

    objects.forEach(object => {
      if ((this.lineOfFirePoint[0] >= object.sides.left &&
          this.lineOfFirePoint[0] <= object.sides.right) &&
          (this.lineOfFirePoint[1] >= object.sides.top &&
          this.lineOfFirePoint[1] <= object.sides.bottom)) {
          if (object === this.game.playerOne) {
            this.seesPlayerOne = true;
            console.log(`${this.color} sees PlayerOne`);
          } else {
            this.seesPlayerOne = false;
            if (object instanceof Tank) {
              console.log(`${this.color} sees EnemyTank`);
            }
          }
        this.lineOfFirePoint = [this.aimX, this.aimY];
        this.pixelsAwayFromCannon = 0;
      }
    });

    this.lineOfFirePoint = [
      (this.aimX + (this.cannonSlope[0] * this.pixelsAwayFromCannon)),
      (this.aimY + (this.cannonSlope[1] * this.pixelsAwayFromCannon))
    ];

    this.pixelsAwayFromCannon = this.pixelsAwayFromCannon + 10;
  }

  // attackAI() {
  //   if (this.seesPlayerOne) {
  //     console.log('inside attackAI');
  //     this.fire();
  //     setTimeout(this.attackAI, 3000);
  //   }
  // }

}

module.exports = EnemyTank;

EnemyTank.DEFAULTS = {
  color: ['red', 'purple'],
  pos: [[755, 300], [600, 300]]
};

EnemyTank.MOVES = {
  up: [0, -1],
  left: [-1, 0],
  down: [0, 1],
  right: [1, 0],
  upRight: [1, -1],
  downRight: [1, 1],
  downLeft: [-1, 1],
  upLeft: [-1, -1]
};
