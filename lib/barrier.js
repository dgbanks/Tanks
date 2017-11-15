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
