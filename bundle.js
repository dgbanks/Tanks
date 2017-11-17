/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Bullet = __webpack_require__(1);

class Tank {
  constructor(game) {
    this.game = game;
    this.moveDirection = [0, 0];
    this.width = 50;
    this.speed = 1;
    this.cannonSlope = [0, 0];

    this.bullets = 0;
  }

  idEnemies() {
    return this.game.tanks.filter(tank => (
      tank !== this
    ));
  }

  getSides() {
    return {
      top: this.pos[1] - (this.width / 2),
      right: this.pos[0] + (this.width / 2),
      bottom: this.pos[1] + (this.width / 2),
      left: this.pos[0] - (this.width / 2)
    };
  }

  canMove(direction) {
    let bool = true;
    let otherTanks = this.game.tanks.filter(tank => (
      tank !== this
    ));

    let obstructions = [].concat(this.game.barriers, otherTanks);

    // up
    if ((direction[0] === 0) && (direction[1] === -1)) {
      obstructions.forEach(barrier => {
        if ((this.sides.top === barrier.sides.bottom) && (
          (this.sides.left >= barrier.sides.left &&
          this.sides.left <= barrier.sides.right) ||
          (this.sides.right >= barrier.sides.left &&
          this.sides.right <= barrier.sides.right) ||
          (this.pos[0] >= barrier.sides.left &&
          this.pos[0] <= barrier.sides.right))) {
            bool = false;
          }
      });
    }

    // down
    if ((direction[0] === 0) && (direction[1] === 1)) {
      obstructions.forEach(barrier => {
        if ((this.sides.bottom === barrier.sides.top) && (
          (this.sides.left >= barrier.sides.left &&
          this.sides.left <= barrier.sides.right) ||
          (this.sides.right >= barrier.sides.left &&
          this.sides.right <= barrier.sides.right) ||
          (this.pos[0] >= barrier.sides.left &&
          this.pos[0] <= barrier.sides.right))) {
            bool = false;
          }
      });
    }

    // left
    if ((direction[0] === -1) && (direction[1] === 0)) {
      obstructions.forEach(barrier => {
        if ((this.sides.left === barrier.sides.right) && (
          (this.sides.top >= barrier.sides.top &&
          this.sides.top <= barrier.sides.bottom) ||
          (this.sides.bottom >= barrier.sides.top &&
          this.sides.bottom <= barrier.sides.bottom) ||
          (this.pos[1] >= barrier.sides.top &&
          this.pos[1] <= barrier.sides.bottom))) {
            bool = false;
          }
      });
    }

    // right
    if ((direction[0] === 1) && (direction[1] === 0)) {
      obstructions.forEach(barrier => {
        if ((this.sides.right === barrier.sides.left) && (
          (this.sides.top >= barrier.sides.top &&
          this.sides.top <= barrier.sides.bottom) ||
          (this.sides.bottom >= barrier.sides.top &&
          this.sides.bottom <= barrier.sides.bottom) ||
          (this.pos[1] >= barrier.sides.top &&
          this.pos[1] <= barrier.sides.bottom))) {
            bool = false;
          }
      });
    }

    return bool;
  }

  move(direction) {
    if (!this.canMove(direction)) {
      direction = [0, 0];
      if (this.game.enemies.includes(this)) {
        this.moveDirection = this.getNewDirection();
        return;
      }
    }

    direction = [(direction[0] * this.speed), (direction[1] * this.speed)];

    this.pos = [(this.pos[0] + direction[0]), (this.pos[1] + direction[1])];
    this.sides = this.getSides();
  }

  swivelCannon(mousePos) {
    let dX = this.pos[0] - mousePos[0];
    let dY = mousePos[1] - this.pos[1];
    let magic = Math.atan2(dX, dY) + (Math.PI / 2);

    this.aimX = this.pos[0] + (35 * Math.cos(magic));
    this.aimY = this.pos[1] + (35 * Math.sin(magic));

    /// borrowed from Bullet class

    let slope = [(this.aimX - this.pos[0]),
                (this.aimY - this.pos[1])];

    if (Math.abs(slope[0]) >= Math.abs(slope[1])) {
      slope = [(slope[0] / Math.abs(slope[0])),
              (slope[1] / Math.abs(slope[0]))];
    } else {
      slope = [(slope[0] / Math.abs(slope[1])),
              (slope[1] / Math.abs(slope[1]))];
    }

    this.cannonSlope = slope;
  }

  fire() {
    // console.log(this.game.tanks);
    // if (!this.game.outcome) {
      if (this.game.tanks.includes(this) && this.bullets < 5) {
        console.log(this.color, 'firing');
        this.bullets = this.bullets + 1;
        const bullet = new Bullet({
          game: this.game,
          owner: this,
          tankPos: this.pos,
          slope: this.cannonSlope
        });
        this.game.addBullet(bullet);
      }
    // }
  }

  draw(ctx) {
    // tank body
    ctx.fillStyle = this.color;
    ctx.fillRect(
      (this.pos[0] - (this.width / 2)),
      (this.pos[1] - (this.width / 2)),
      this.width,
      this.width);

    // tank center
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 5, 0, (2 * Math.PI), false);
    ctx.fill();

    // tank cannon
    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo(this.aimX, this.aimY);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.stroke();
  }

}

module.exports = Tank;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Explosion = __webpack_require__(2);

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
        };
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
      // this is the bug line
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Explosion {

  constructor(pos) {
    this.pos = pos;
    this.radius = 0;
    this.radiusTwo = 0;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, (2 * Math.PI), false);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radiusTwo, 0, (2 * Math.PI), false);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 3;
    ctx.stroke();

    this.radius = this.radius + 1;
    this.radiusTwo = this.radiusTwo + .5;
  }

}

module.exports = Explosion;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);
const GameView = __webpack_require__(8);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('game-map');
  const context = canvas.getContext('2d');

  // console.log('entry');
  // const start = () => {
  //   console.log('start');
    const game = new Game({dimensions: [canvas.width, canvas.height]});
    new GameView(game, context, canvas).start();
  // };
  // const gameView = new GameView(game, context, canvas);

  // const button = document.createElement('button');
  // button.onclick = gameView.start;
  // const div = document.getElementById('game-info');
  // div.innerHTML = '<button onclick="start">NewGame</button>';
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Tank = __webpack_require__(0);
const PlayerOne = __webpack_require__(5);
const EnemyTank = __webpack_require__(6);
const Barrier = __webpack_require__(7);
const Bullet = __webpack_require__(1);
const Explosion = __webpack_require__(2);

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

  moveObjects() {
    this.getMovingObjects().forEach(object => {
        let props;
        if (object instanceof PlayerOne) {
            // console.log('playerOne');
            props = object.moveDirection;
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
    ctx.beginPath();
    ctx.moveTo(this.playerOne.pos[0], this.playerOne.pos[1]);
    ctx.lineTo(mouseObject.mousePos[0], mouseObject.mousePos[1]);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = .5;
    ctx.stroke();
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Tank = __webpack_require__(0);

const DEFAULTS = {
  color: 'blue',
  pos: [45, 300]
};

class PlayerOne extends Tank {
  constructor(game) {
    super(game);

    this.pos = DEFAULTS.pos;
    this.color = DEFAULTS.color;
    this.aimX = this.pos[0] + 35;
    this.aimY = this.pos[1];
    this.sides = this.getSides();
    // this.enemies = this.idEnemies();
  }

}

module.exports = PlayerOne;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Tank = __webpack_require__(0);

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
    return EnemyTank.MOVES[(Object.keys(EnemyTank.MOVES)[Math.floor(Math.random() * 4)])];
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
          } else {
            this.seesPlayerOne = false;
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
  right: [0, 1],
  down: [1, 0]
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

class Barrier {

  constructor(xPos, yPos, width, height) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width;
    this.height = height;

    this.sides = {
      top: this.yPos,
      right: (this.xPos + this.width),
      bottom: (this.yPos + this.height),
      left: this.xPos
    };
  }

  draw(ctx) {
    ctx.fillStyle = 'gray';
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }

}

module.exports = Barrier;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

class GameView {

  constructor(game, context, canvas) {
    this.game = game;
    this.context = context;
    this.canvas = canvas;
    this.mousePos = [400, 300];
    this.tank = this.game.addTank();
    this.enemy = this.game.addEnemies();
    this.enemy = this.game.addEnemies();

    this.game.addBarriers();

    this.setMousePosition = this.setMousePosition.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // console.log('new gameView');
  }

  listenForMouse() {
    this.canvas.addEventListener('mousemove', this.setMousePosition);
  }

  setMousePosition(event) {
    this.mousePos = [(event.clientX - 350), (event.clientY - 50)];
  }

  listenForClick() {
    this.canvas.addEventListener('click', this.handleClick);
  }

  handleClick() {
    this.tank.fire(this.mousePos);
  }

  bindKeys() {
    Object.keys(GameView.MOVES).forEach((k) => {
      document.addEventListener('keydown', event => {
        this.tank.moveDirection = GameView.MOVES[event.key];
      });
    });

    document.addEventListener('keyup', event => {
      this.tank.moveDirection = [0, 0];
    });
  }

  displayOutcome() {
    document.getElementById('outcome').innerHTML = `${this.game.outcome}`;
    // document.getElementById('new-game-button').innerHTML = 'New Game';
    // this.game = new Game({dimensions: [canvas.width, canvas.height]});
  }

  start() {
    this.bindKeys();
    this.listenForMouse();
    this.listenForClick();

    this.animate();
  }

  animate() {
    this.game.moveObjects();
    this.game.drawEverything(this.context, {mousePos: this.mousePos});
    // this.enemy.drawLine(this.context);

    if (!this.game.outcome) {
      requestAnimationFrame(this.animate.bind(this));
    } else {
      this.displayOutcome();
    }
  }

}

GameView.MOVES = {
  'w': [0, -1],
  'a': [-1, 0],
  's': [0, 1],
  'd': [1, 0]
};

module.exports = GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map