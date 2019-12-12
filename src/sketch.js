import P5 from 'p5'

// Sketch closure
let sketch // passed to P5 instance
let s // use this to reference sketch

export function init() {
  sketch = (sk) => {
    sk.setup = setup
    sk.draw = draw
    s = sk
  }
  const p5 = new P5(sketch)
}

function setup() {
  s.createCanvas(window.innerWidth, window.innerHeight)
  s.clear()
  s.fill(80)
  s.noStroke()
}

function draw() {
  
}
