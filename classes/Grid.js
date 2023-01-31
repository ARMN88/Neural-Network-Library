class Grid {
  DrawGrid(scale, offset) {
    // Vertical Lines //
    ctx.strokeStyle = "#1c1c1c";
    ctx.lineWidth = 1;
    for (let i = Snap(canvas.width / -2 - offset.x, scale); i < canvas.width / 2 - offset.x; i += scale) {
      ctx.beginPath();
      ctx.moveTo(i, -canvas.height / 2 - offset.y);
      ctx.lineTo(i, canvas.height / 2 - offset.y);
      ctx.stroke();
    }

    // Horizontal Lines //
    for (let i = Snap(canvas.height / -2 - offset.y, scale); i < canvas.height / 2 - offset.y; i += scale) {
      ctx.beginPath();
      ctx.moveTo(-canvas.width / 2 - offset.x, i);
      ctx.lineTo(canvas.width / 2 - offset.x, i);
      ctx.stroke();
    }

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-canvas.width / 2 - offset.x, 0);
    ctx.lineTo(canvas.width / 2 - offset.x, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, -canvas.height / 2 - offset.y);
    ctx.lineTo(0, canvas.height / 2 - offset.y);
    ctx.stroke();
  }
}