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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Explosion = __webpack_require__(7);

class Bullet {
  constructor(props) {
    this.game = props.game;
    this.owner = props.owner;
    this.pos = props.tankPos;
    this.slope = props.slope;
    // this.mousePos = props.mousePos;
    this.targets = this.owner.idEnemies();
    this.speed = 5;
    this.radius = 5;
    this.color = 'white';
    this.explosionTimeout = 300;
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(2);
const GameView = __webpack_require__(5);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('game-map');
  const context = canvas.getContext('2d');

  const game = new Game({dimensions: [canvas.width, canvas.height]});
  new GameView(game, context, canvas).start();
});


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Tank = __webpack_require__(4);
const PlayerOne = __webpack_require__(8);
const EnemyTank = __webpack_require__(9);
const Barrier = __webpack_require__(3);
const Bullet = __webpack_require__(0);
const Explosion = __webpack_require__(7);

class Game {
  constructor(canvas) {
    this.dimensions = canvas.dimensions;
    this.tanks = [];
    this.bullets = [];
    this.barriers = [];
    this.coverOnly = [];
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

    this.coverOnly = [].concat(startingCover, levelOne);
    this.barriers = [].concat(boundaries, startingCover, levelOne);
    return this.barriers;
  }

  remove(object) {

    if (object instanceof Barrier) {
      return;
    } else if (object instanceof Tank) {
      this.tanks = this.tanks.filter(tank => (
        tank !== object
      ));
    } else if (object instanceof Bullet) {
      this.bullets = this.bullets.filter(bullet => (
        object !== bullet
      ));
    } else if (object instanceof Explosion) {
      this.explosions = this.explosions.filter(explosion => (
        object !== explosion
      ));
    }

  }

  getMovingObjects() {
    return [].concat(this.tanks, this.bullets);
  }

  moveObjects(direction) {
    this.getMovingObjects().forEach(object => {
        let props;
        if (object instanceof Tank) {
            props = direction;
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

    ctx.beginPath();
    ctx.moveTo(this.enemy.pos[0], this.enemy.pos[1]);
    ctx.lineTo(this.playerOne.pos[0], this.playerOne.pos[1]);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 1;
    ctx.stroke();

    this.playerOne.swivelCannon(mouseObject.mousePos);
    this.enemy.swivelCannon(this.playerOne.pos);
  }
}

module.exports = Game;


/***/ }),
/* 3 */
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
    ctx.fillStyle = 'red';
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }

}

module.exports = Barrier;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const Bullet = __webpack_require__(0);

class Tank {
  constructor(game) {
    this.game = game;
    this.moveDirection = [0, 0];
    this.width = 50;
    this.speed = 5;
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

    // up
    if ((direction[0] === 0) && (direction[1] === -1)) {
      this.game.barriers.forEach(barrier => {
        if ((this.sides.top === barrier.sides.bottom) && (
          (this.sides.left >= barrier.sides.left &&
          this.sides.left < barrier.sides.right) ||
          (this.sides.right > barrier.sides.left &&
          this.sides.right <= barrier.sides.right) ||
          (this.pos[0] >= barrier.sides.left &&
            this.pos[0] <= barrier.sides.right))) {
              bool = false;
            }
      });
    }

    // down
    if ((direction[0] === 0) && (direction[1] === 1)) {
      this.game.barriers.forEach(barrier => {
        if ((this.sides.bottom === barrier.sides.top) && (
          (this.sides.left >= barrier.sides.left &&
          this.sides.left < barrier.sides.right) ||
          (this.sides.right > barrier.sides.left &&
          this.sides.right <= barrier.sides.right) ||
          (this.pos[0] >= barrier.sides.left &&
            this.pos[0] <= barrier.sides.right))) {
              bool = false;
            }
      });
    }

    // left
    if ((direction[0] === -1) && (direction[1] === 0)) {
      this.game.barriers.forEach(barrier => {
        if ((this.sides.left === barrier.sides.right) && (
          (this.sides.top > barrier.sides.top &&
          this.sides.top < barrier.sides.bottom) ||
          (this.sides.bottom > barrier.sides.top &&
          this.sides.bottom < barrier.sides.bottom) ||
          (this.pos[1] >= barrier.sides.top &&
            this.pos[1] <= barrier.sides.bottom))) {
              bool = false;
            }
      });
    }

    // right
    if ((direction[0] === 1) && (direction[1] === 0)) {
      this.game.barriers.forEach(barrier => {
        if ((this.sides.right === barrier.sides.left) && (
          (this.sides.top > barrier.sides.top &&
          this.sides.top < barrier.sides.bottom) ||
          (this.sides.bottom > barrier.sides.top &&
          this.sides.bottom < barrier.sides.bottom) ||
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
    }

    direction = [(direction[0] * this.speed), (direction[1] * this.speed)];

    this.pos = [(this.pos[0] + direction[0]), (this.pos[1] + direction[1])];
    this.sides = this.getSides();
    this.moveDirection = [0, 0];
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

  fire(mousePos) {
    const bullet = new Bullet({
      game: this.game,
      owner: this, 
      tankPos: this.pos,
      slope: this.cannonSlope
    });
    this.game.addBullet(bullet);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {class GameView {

  constructor(game, context, canvas) {
    this.game = game;
    this.context = context;
    this.canvas = canvas;
    this.mousePos = [400, 300];
    this.tank = this.game.addTank();
    this.enemy = this.game.addEnemies();

    this.game.addBarriers();

    this.setMousePosition = this.setMousePosition.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    const tank = this.tank;

    Object.keys(GameView.MOVES).forEach((k) => {
      let direction = GameView.MOVES[k];
      global.key(k, () => {
        tank.moveDirection = direction;
      });
    });
  }

  start() {
    this.bindKeys();

    this.listenForMouse();
    this.listenForClick();

    this.animate();
  }

  animate() {
    this.game.moveObjects(this.tank.moveDirection);
    this.game.drawEverything(this.context, {mousePos: this.mousePos});

    requestAnimationFrame(this.animate.bind(this));
  }

}

GameView.MOVES = {
  'w': [0, -1],
  'a': [-1, 0],
  's': [0, 1],
  'd': [1, 0]
};

module.exports = GameView;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

const Tank = __webpack_require__(4);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Tank = __webpack_require__(4);

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

    this.sides = this.getSides();
    // this.enemies = this.idEnemies();


    this.move(Object.keys(MOVES)[Math.floor(Math.random() * 4)]);
  }

  whatAmILookingAt() {
    // console.log([this.aimX, this.aimY]);
    // console.log('slope', (this.pos[1] - this.aimY)/(this.pos[0] - this.aimX));

    console.log(slope);
    console.log(this.cannonSlope);




  }

  move() {
    Object.keys(MOVES)[Math.floor(Math.random() * 4)]
    this.whatAmILookingAt();
  }

}

module.exports = EnemyTank;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map