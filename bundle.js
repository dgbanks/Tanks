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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const GameView = __webpack_require__(4);

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('game-map');
  const context = canvas.getContext('2d');

  const game = new Game({dimensions: [canvas.width, canvas.height]});
  new GameView(game, context, canvas).start();
});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Barrier = __webpack_require__(2);
const Tank = __webpack_require__(3);
const Bullet = __webpack_require__(5);

class Game {
  constructor(object) {
    this.dimensions = object.dimensions;
    this.tanks = [];
    this.bullets = [];
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

  getAllObjects() {
    return [].concat(this.tanks, this.bullets);
  }

  moveBullets() {
    this.bullets.forEach(bullet => {
      bullet.move();
    });
  }

  drawEverything(ctx, mouseObject) {
    // render the canvas
    ctx.clearRect(0, 0, this.dimensions[0], this.dimensions[1]);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.dimensions[0], this.dimensions[1]);

    // render barriers and boundaries
    new Barrier().draw(ctx);

    // render moving objects
    this.getAllObjects().forEach(object => {
      object.draw(ctx);
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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Barrier {
  constructor() {
    // this.getBarriers = this.getBarriers.bind(this);
    // this.getBoundaries = this.getBoundaries.bind(this);
  }

  getBarriers(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 250, 20, 100);
    ctx.fillStyle = 'white';
    ctx.fillRect(680, 250, 20, 100);
    ctx.fillStyle = 'white';
    ctx.fillRect(390, 100, 20, 150);
    ctx.fillStyle = 'white';
    ctx.fillRect(390, 350, 20, 150);
  }

  getBoundaries(ctx) {
    // boundaries
    ctx.fillStyle = 'white';
    ctx.fillRect(2, 2, 796, 10);
    ctx.fillStyle = 'white';
    ctx.fillRect(2, 588, 796, 10);
    ctx.fillStyle = 'white';
    ctx.fillRect(2, 14, 10, 572);
    ctx.fillStyle = 'white';
    ctx.fillRect(788, 14, 10, 572);
  }

  draw(ctx) {
    this.getBoundaries(ctx);
    this.getBarriers(ctx);
  }
}

module.exports = Barrier;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Bullet = __webpack_require__(5);

class Tank {
  constructor(game) {
    this.pos = [45, 300];
    this.game = game;
  }

  draw(ctx) {
    // tank radius
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 35, 0, (2 * Math.PI), false);
    ctx.stroke();

    // tank body
    ctx.fillStyle = 'blue';
    ctx.fillRect((this.pos[0] - 25), (this.pos[1] - 25), 50, 50);

    // tank center
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 5, 0, (2 * Math.PI), false);
    ctx.fill();

    // tank cannon
    ctx.fillStyle = 'white';
    ctx.fillRect(this.pos[0],(this.pos[1] - 2.5), 35, 5);
  }

  move(direction) {
    direction = [(direction[0] * 5), (direction[1] * 5)];
    this.pos = [(this.pos[0] + direction[0]), (this.pos[1] + direction[1])];
  }

  fire(mousePos) {
    const bullet = new Bullet({ mousePos: mousePos, tankPos: this.pos });

    this.game.addBullet(bullet);
  }
}

module.exports = Tank;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class GameView {

  constructor(game, context, canvas) {
    this.game = game;
    this.context = context;
    this.canvas = canvas;
    this.mousePos = [400, 300];
    this.tank = this.game.addTank();

    this.setMousePosition = this.setMousePosition.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  listenForMouse() {
    this.canvas.addEventListener('mousemove', this.setMousePosition);
  }

  setMousePosition(event) {
    this.mousePos = [event.clientX, event.clientY];
  }

  listenForClick() {
    this.canvas.addEventListener('click', this.handleClick);
  }

  handleClick() {
    console.log(this.mousePos);
    this.tank.fire(this.mousePos);
  }

  bindKeys() {
    const tank = this.tank;

    Object.keys(GameView.MOVES).forEach((k) => {
      let direction = GameView.MOVES[k];
      key(k, () => { tank.move(direction); });
    });

    // key('space', () => { tank.fire(this.mousePos); });
  }

  start() {
    this.bindKeys();

    this.listenForMouse();
    this.listenForClick();

    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.moveBullets();
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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

class Bullet {
  constructor(posObject) {
    this.pos = posObject.tankPos;
    this.mousePos = posObject.mousePos;
    this.speed = 5;
    this.slope = this.calcSlope();
  }

  calcSlope() {
    let slope = [(this.mousePos[0] - this.pos[0]),
                (this.mousePos[1] - this.pos[1])];

    if (Math.abs(slope[0]) >= Math.abs(slope[1])) {
      slope = [(slope[0] / Math.abs(slope[0])),
              (slope[1] / Math.abs(slope[0]))];
    } else {
      slope = [(slope[0] / Math.abs(slope[1])),
              (slope[1] / Math.abs(slope[1]))];
    }

    return slope;
  }

  move() {
    let slope = this.slope;

    slope = [(slope[0] * this.speed), (slope[1] * this.speed)];
    this.pos = [(this.pos[0] + slope[0]), (this.pos[1] + slope[1])];
  }

  draw(ctx) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], 5, 0, (2 * Math.PI), false);
    ctx.fill();
  }
}

module.exports = Bullet;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map