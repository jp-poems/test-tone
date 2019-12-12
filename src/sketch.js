import P5 from 'p5'
import * as TONE from 'tone'

// Sketch closure
let sketch // passed to P5 instance
let s // use this to reference sketch

// Tone oscillator
let osc

export function init() {
  sketch = (sk) => {
    sk.setup = setup
    sk.draw = draw
    s = sk
  }
  const p5 = new P5(sketch)

  osc = new TONE.OmniOscillator(440, TONE.Oscillator.Type.Sine).toMaster()
  osc.volume.value = -10 // roll of some volume
}

function setup() {
  s.createCanvas(window.innerWidth, window.innerHeight)
  s.clear()
  s.fill(80)
  s.noStroke()
}

function draw() {
  if (s.mouseIsPressed) {
    if(osc.state === 'stopped') {
      osc.start()
    }
    s.circle(s.mouseX, s.mouseY, 28)
  } else {
    if(osc.state === 'started') {
      osc.stop()
      s.clear()
    }
  }
}
