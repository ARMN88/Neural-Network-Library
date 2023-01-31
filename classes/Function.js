class Function {
  constructor(func) {
    this.f = func;
    this.color = `hsl(${RandomInt(0, 360)}, 50%, 40%)`;
    this.point = new Point(0, 0);
    this.hasPoint = true;
  }
  draw(step = 1) {
    ctx.strokeStyle = this.color;
    for (let i = Snap(canvas.width / -2 - offset.x, scale) - scale; i < (canvas.width / 2 - offset.x) + scale; i += scale / step) {
      ctx.beginPath();
      ctx.moveTo(i, this.f(i / scale) * scale)
      ctx.lineTo(i + scale / step, this.f((i + scale / step) / scale) * scale);
      ctx.stroke();
    }
    if (!this.hasPoint) return;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(mouseOrigin.point.x * scale, this.f(mouseOrigin.point.x) * scale, 4, 0, Math.PI * 2);
    ctx.fill();
    if (!Point.hasText) return;
    let transformMatrix = ctx.getTransform();
    ctx.setTransform(1, 0, 0, 1, transformMatrix.e, transformMatrix.f);
    ctx.fillText(`(${Number(mouseOrigin.point.x.toFixed(2))}, ${Number(this.f(mouseOrigin.point.x).toFixed(2))})`, mouseOrigin.point.x * scale + 4, -this.f(mouseOrigin.point.x) * scale - 4);
    ctx.setTransform(transformMatrix);
  }
}