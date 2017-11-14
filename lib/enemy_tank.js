const Tank = require('./tank');

class EnemyTank extends Tank {
  constructor(game) {
    super(game);

    this.pos = EnemyTank.DEFAULTS.pos;
    this.color = EnemyTank.DEFAULTS.color;
    this.aimX = (this.pos[0] - 35);
    this.aimY = this.pos[1];
    this.speed = 1;

    this.sides = this.getSides();
    this.moveDirection = this.getNewDirection();

    this.lineOfFirePoint = [this.aimX, this.aimY];
    this.pixelsAwayFromCannon = 1;

    setInterval(() => { this.cannonAI(); }, 1);

    console.log(this.getNewDirection());
  }

  drawLine(ctx) {
    ctx.strokeStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(this.lineOfFirePoint[0], this.lineOfFirePoint[1], 5, 0, (2 * Math.PI), false);
    ctx.stroke();
  }

  getNewDirection() {
    return EnemyTank.MOVES[(Object.keys(EnemyTank.MOVES)[Math.floor(Math.random() * 4)])];
  }

  cannonAI() {
    let objects = [].concat(this.game.coverOnly, [this.game.playerOne]);

    objects.forEach(object => {
      if ((this.lineOfFirePoint[0] >= object.sides.left &&
          this.lineOfFirePoint[0] <= object.sides.right) &&
          (this.lineOfFirePoint[1] >= object.sides.top &&
          this.lineOfFirePoint[1] <= object.sides.bottom)) {
          if (object === this.game.playerOne) {
            this.fire();
          }
        this.lineOfFirePoint = [this.aimX, this.aimY];
        this.pixelsAwayFromCannon = 1;
      }
    });

    this.lineOfFirePoint = [
      (this.aimX + (this.cannonSlope[0] * this.pixelsAwayFromCannon)),
      (this.aimY + (this.cannonSlope[1] * this.pixelsAwayFromCannon))
    ];

    this.pixelsAwayFromCannon = this.pixelsAwayFromCannon + 1;
  }

}

module.exports = EnemyTank;

EnemyTank.DEFAULTS = {
  color: 'red',
  pos: [755, 300]
};

EnemyTank.MOVES = {
  up: [0, -1],
  left: [-1, 0],
  right: [0, 1],
  down: [1, 0]
};
