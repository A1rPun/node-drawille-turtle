const Turtle = require("../index.js");

const t = new Turtle();

for (let i = 0; i < 36; i++) {
  t.right(10);
  for (let j = 0; j < 36; j++) {
    t.right(10);
    t.forward(8);
  }
}
console.log(t.frame());
