eruda.init();
// eruda.show();
// eruda.isShowing = true;

const menu = document.querySelector(".menu");

let snappingButton = new Button("Snapping", "Enable");
let pointTextWidget = new Button("Coordinates", "Enable");
let incrementWidget = new Slider("Increment", [1, 1, 10]);
let lineResolutionWidget = new Slider('Line Resolution', [1, 10, 200]);

const canvas = document.querySelector("#gameCanvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
canvas.imageSmoothingEnabled = false;

const ctx = canvas.getContext("2d");
ctx.setTransform(1, 0, 0, -1, canvas.width / 2, canvas.height / 2);

const keyboard = {};

let scale = 10;
let scaleWidget = new Variable("Scale");

let grid = new Grid();

const offset = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0
}

const m1 = new Matrix([
  [1, 2, 3],
  [4, 5, 6]
]);

const m2 = new Matrix([
  [6, 5, 4],
  [3, 2, 1]
]);

const m3 = new Matrix([
  [1, 2],
  [3, 4],
  [5, 6]
]);

let rand1 = {
  x: RandomInt(-5, 5),
  y: RandomInt(-10, 10)
}

function f(x) {
  return x * rand1.x + rand1.y
}

let rand = {
  x: RandomInt(-5, 5),
  y: RandomInt(-10, 10)
}

let costWidget = new Variable("Cost");
let biasWidget = new Variable("Bias");
const net1 = new NeuralNetwork(2, 1);

const networkLine = new Function(f);

const inputs = [];

for (let i = 0; i < 100; i++) {
  inputs[i] = new Matrix([[RandomInt(-25, 25)], [RandomInt(-25, 25)]]);
  inputs[i].createPoint((net1.feedForward(inputs[i]).elements[0][0] > 0.5) ? "#39bf2a" : "#0352fc");
}

const mouseOrigin = {
  x: 0,
  y: 0,
  point: new Point(0, 0, "#424242"),
  snap: false
}

mouseOrigin.point.isCursor = true;

function Update() {
  requestAnimationFrame(Update);

  scaleWidget.update(scale.toFixed(2));
  biasWidget.update(net1.layers[0].biases.elements[0][0].toFixed(2));

  for (let i = 0; i < 5000; i++) {
    rand = {
      x: RandomInt(-50, 50),
      y: RandomInt(-50, 50)
    }
    net1.backProp(new Matrix([[rand.x], [rand.y]]), new Matrix([[(f(rand.x) < rand.y) ? 1 : 0]]));
  }

  costWidget.update(net1.avgError(f).toFixed(4));

  if (keyboard[76]) {
    offset.dx = offset.x - offset.x / 1.2;
    offset.dy = offset.y - offset.y / 1.2;
    offset.x /= 1.2;
    offset.y /= 1.2;
    ctx.translate(-offset.dx, -offset.dy);
    scale = Lerp(scale, 20, 0.2);
  }

  if (keyboard[32]) {
    offset.dx = Lerp(-offset.x / scale, 5, 0.1) * scale;
    offset.dy = Lerp(-offset.y / scale, 5, 0.1) * scale;
    offset.x += offset.dx;
    offset.y += offset.dy;
    ctx.translate(offset.dx, offset.dy);
  }

  ctx.clearRect(-canvas.width / 2 - offset.x, -canvas.height / 2 - offset.y, canvas.width, canvas.height);
  grid.DrawGrid(scale, offset);

  networkLine.draw(lineResolutionWidget.slider.number);

  for (let input of inputs) {
    input.point.color = (net1.feedForward(input).elements[0][0] > 0.5) ? "#39bf2a" : "#0352fc";
    input.point.plot();
  }

  mouseOrigin.point.plot();
}

function Snap(number, increment) {
  return Math.round(number / increment) * increment;
}

function RandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Lerp(start, end, increment) {
  return start + (end - start) * increment;
}

canvas.onmousemove = function(moveEvent) {
  if (!moveEvent.buttons) {
    if (mouseOrigin.snap) {
      mouseOrigin.point.x = Math.round((moveEvent.x - canvas.width / 2 - offset.x) / scale / (1 / Number(incrementWidget.slider.value))) * (1 / Number(incrementWidget.slider.value));
      mouseOrigin.point.y = Math.round((moveEvent.y - canvas.height / 2 + offset.y) / -scale / (1 / Number(incrementWidget.slider.value))) * (1 / Number(incrementWidget.slider.value));
      return;
    }
    mouseOrigin.point.x = (moveEvent.x - canvas.width / 2 - offset.x) / scale;
    mouseOrigin.point.y = (moveEvent.y - canvas.height / 2 + offset.y) / -scale;
    return;
  }

  offset.dx = (moveEvent.x - mouseOrigin.x);
  offset.dy = -(moveEvent.y - mouseOrigin.y);
  offset.x += offset.dx;
  offset.y += offset.dy;
  ctx.translate(offset.dx, offset.dy);
  mouseOrigin.x = moveEvent.x;
  mouseOrigin.y = moveEvent.y;
}

canvas.onmousedown = function(e) {
  mouseOrigin.x = e.x;
  mouseOrigin.y = e.y;
}

canvas.onmousewheel = function(e) {
  scale -= e.deltaY / 100;
  scale = Math.max(scale, 2);
}

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 77:
      if (menu.style.right !== '-25vw') {
        menu.style.right = "-25vw";
        break;
      }
      menu.style.right = "1vh";
      break;
    case 67:
      eruda.isShowing ? eruda.hide() : eruda.show();
      eruda.isShowing = !eruda.isShowing;
      break;
    default:
      keyboard[e.keyCode] = true;
      break;
  }
}

snappingButton.button.onclick = function() {
  mouseOrigin.snap = !mouseOrigin.snap;
  this.innerHTML = (!mouseOrigin.snap ? "Enable" : "Disable");
}

pointTextWidget.button.onclick = function() {
  Point.hasText = !Point.hasText;
  this.innerHTML = (!Point.hasText ? "Enable" : "Disable");
}

document.onkeyup = function(e) {
  keyboard[e.keyCode] = false;
}

Update();

(function() { var script = document.createElement('script'); script.onload = function() { var stats = new Stats(); document.body.appendChild(stats.dom); requestAnimationFrame(function loop() { stats.update(); requestAnimationFrame(loop) }); }; script.src = '//mrdoob.github.io/stats.js/build/stats.min.js'; document.head.appendChild(script); })()