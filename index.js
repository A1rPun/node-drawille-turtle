const Canvas = require("drawille");
const bresenham = require("bresenham");
const { abs, cos, min, PI, sin } = Math;

const fullCircle = 360;
const radian = PI / 180;

class Turtle extends Canvas {
  // Turtle graphics interface http://en.wikipedia.org/wiki/Turtle_graphics
  constructor(x, y) {
    super();
    this.x = Number.isInteger(x) ? x : this.width / 2;
    this.y = Number.isInteger(y) ? y : this.height / 2;
    this.rotation = 0;
    this.isPendown = true;
  }

  penup() {
    this.isPendown = false;
  }

  pendown() {
    this.isPendown = true;
  }

  forward(step) {
    const x = this.x + cos(this.rotation * radian) * step;
    const y = this.y + sin(this.rotation * radian) * step;
    this.move(x, y);
  }

  move(x, y) {
    if (this.isPendown)
      bresenham(this.x, this.y, x, y, (x, y) => this.set(x, y));
    this.x = x;
    this.y = y;
  }

  right(angle) {
    this.rotation += angle;
  }

  left(angle) {
    this.rotation -= angle;
  }

  backward(step) {
    this.forward(-step);
  }

  circle(radius, extent = fullCircle, steps) {
    if (!steps) {
      const frac = abs(extent) / fullCircle;
      steps = 1 + (min(11 + abs(radius) / 6, 59) * frac);
    }
    let w = (1 * extent) / steps;
    let w2 = w / 2;
    let l = 2 * radius * sin(w2 * radian);
    if (radius < 0) {
      l = -l;
      w = -w;
      w2 = -w2;
    }
    this.right(w2);
    for (let i = 0; i < steps; i++) {
      this.forward(l);
      this.right(w);
    }
    this.left(w2);
  }
}

[
  ["pu", "penup"],
  ["up", "penup"],
  ["pd", "pendown"],
  ["down", "pendown"],
  ["fd", "forward"],
  ["mv", "move"],
  ["rt", "right"],
  ["lt", "left"],
  ["bk", "backward"],
  ["back", "backward"],
  ["arc", "circle"],
].forEach(methods => {
  const [alias, fn] = methods;
  Turtle.prototype[alias] = Turtle.prototype[fn];
});

module.exports = Turtle;
