class Point {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  plot() {
    ctx.textBaseline = "bottom";
    ctx.font = "15px Arial";
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x * scale, this.y * scale, 4, 0, Math.PI * 2);
    ctx.fill();
    if (this.isCursor || !Point.hasText) return;
    let transformMatrix = ctx.getTransform();
    ctx.setTransform(1, 0, 0, 1, transformMatrix.e, transformMatrix.f);
    ctx.fillText(`(${this.x}, ${this.y})`, this.x * scale + 4, -this.y * scale - 4);
    ctx.setTransform(transformMatrix);
  }

  static hasText = false;
}