const Tank = require('./tank');

const DEFAULTS = {
  color: 'red',
  pos: [755, 300]
};

const MOVES = {
  up: [0, -1],
  left: [-1, 0],
  right: [0, 1],
  down: [1, 0]
};

class EnemyTank extends Tank {
  constructor(game) {
    super(game);

    this.pos = DEFAULTS.pos;
    this.color = DEFAULTS.color;
    this.aimX = (this.pos[0] - 35);
    this.aimY = this.pos[1];

    this.lineOfFirePoint = [this.aimX, this.aimY];
    this.pixelsAwayFromCannon = 1;

    this.sides = this.getSides();

    this.move(Object.keys(MOVES)[Math.floor(Math.random() * 4)]);

    setInterval(() => {
      this.whatAmILookingAt();
    }, 1);
  }

  whatAmILookingAt() {

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
      (this.aimX + (this.cannonSlope[0] * this.pixelsMoved)),
      (this.aimY + (this.cannonSlope[1] * this.pixelsMoved))
    ];
    this.pixelsMoved = this.pixelsMoved + 1;

  }

  move() {
    Object.keys(MOVES)[Math.floor(Math.random() * 4)]
    // this.whatAmILookingAt();
  }

}

module.exports = EnemyTank;
