const Turtle = require("../index.js");

const t = new Turtle(null, 0);
let size = 10;
const increase = 5;
let steps = 3;

for (let i = 0; i < 8; i++) {
  t.circle(size, 360, steps);
  steps++;
  size += increase;
}

process.stdout.write(t.frame());
