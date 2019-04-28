const Canvas = require("drawille");
const bresenham = require("bresenham");

class Turtle extends Canvas {
  // Turtle graphics interface http://en.wikipedia.org/wiki/Turtle_graphics
  constructor(width, height, x, y) {
    super(width, height);
    this.pos_x = x || this.width / 2;
    this.pos_y = y || this.height / 2;
    this.rotation = 0;
    this.brush_on = true;
  }

  up() {
    this.brush_on = false;
  }

  down() {
    this.brush_on = true;
  }

  forward(step) {
    const x = this.pos_x + Math.cos(this.rotation * (Math.PI / 180)) * step;
    const y = this.pos_y + Math.sin(this.rotation * (Math.PI / 180)) * step;
    this.move(x, y);
  }

  move(x, y) {
    if (this.brush_on)
      for (let point of bresenham(this.pos_x, this.pos_y, x, y))
        this.set(point.x, point.y);
    this.pos_x = x;
    this.pos_y = y;
  }

  right(angle) {
    this.rotation += angle;
  }

  left(angle) {
    this.rotation -= angle;
  }

  back(step) {
    this.forward(-step);
  }
}

[
  ["pu", "up"],
  ["pd", "down"],
  ["fd", "forward"],
  ["mv", "move"],
  ["rt", "right"],
  ["lt", "left"],
  ["bk", "back"]
].forEach(methods => {
  const [alias, fn] = methods;
  Turtle.prototype[alias] = Turtle.prototype[fn];
});

module.exports = Turtle;
