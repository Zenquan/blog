const math = require('mathjs')

function foo(x, y) {
  return math.eval(x + y)
}

console.log(foo(1.1, 1.3))