import P5 from 'p5'

// Sketch closure
let sketch // passed to P5 instance
let s // use this to reference sketch

// Vis settings
let doVis = false
let freqToVis = 0

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
  s.fill('rgba(100, 100, 100, 0.1)')
  s.noStroke()
}

function draw() {
  if(doVis) {
    const value = 600 - freqToVis
    s.circle(value, value, value)
    doVis = false
  }
}

export function prepareVis(freq) {
  console.log(`${freq} will be visualised here`)
  freqToVis = freq
  doVis = true
}
