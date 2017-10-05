class Tank {
  constructor(ctx) {
    // this.draw(ctx)
    // ctx.fillStyle = 'blue';
    // ctx.fillRect(20, 275, 50, 36);
    //
    // ctx.fillStyle = 'white';
    // ctx.beginPath();
    // ctx.arc(45, 300, 10, 0, 2* Math.PI, false);
    // ctx.fill;
  }

  draw(ctx) {
    ctx.fillStyle = 'blue';
    ctx.fillRect(20, 275, 50, 36);
  }

  move(direction) {
    
  }
}

module.exports = Tank;
