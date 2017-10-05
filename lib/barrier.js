class Barrier {
  constructor(ctx) {
    // this.getBoundaries(ctx).bind(this);
    // this.getBarriers(ctx).bind(this);
    this.getBarriers = this.getBarriers.bind(this);
    this.getBoundaries = this.getBoundaries.bind(this);
  }

  getBarriers(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 250, 20, 100);
    ctx.fillStyle = 'white';
    ctx.fillRect(680, 250, 20, 100);
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
