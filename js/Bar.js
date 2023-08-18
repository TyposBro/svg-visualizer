export class Bar {
  constructor(x, y, width, height, color, index) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.index = index;
  }

  update = (mic) => {
    this.height = mic * 1000;
  };

  draw = (ctx, volume) => {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}
