import * as TONE from "tone"
import randomInt from 'random-int'

let osc
let env

const config = {
  osc: {
    defaultFrequency: 440,
    type: TONE.Oscillator.Type.Sine,
    volume: -10
  },
  env: {
    attack: 0.1,
    decay: 0.2,
    sustain: 0.6,
    release: 0.8
  },
  transport: {
    bpm: 124
  },
  tick: {
    chanceOfNote: 60
  }
}

const noteLength = {
  N4: '4n',
  N8: '8n',
  N16: 'n16'
}

/**
 * Init
 */
export function init() {
  initEnvelope()
  initOscilator()
  initTick(noteLength.N8)
  // Test tone
  playNote(noteLength.N8)
  window.Transport = TONE.Transport
}

function initEnvelope() {
  env = new TONE.AmplitudeEnvelope(
    config.env.attack,
    config.env.decay,
    config.env.sustain,
    config.env.release
  ).toMaster()
}

function initOscilator() {
  osc = new TONE.OmniOscillator(config.osc.defaultFrequency, config.osc.type).connect(env).start()
}

function initTick(noteLength) {
  TONE.Transport.scheduleRepeat(time => {
    tick(time)
  }, noteLength)
  TONE.Transport.start()
}

/**
 * Play notes
 */
function playNote(noteLength) {
  env.triggerAttackRelease(noteLength)
}

/**
 * Tick
 */
function tick(time) {
  if(randomInt(0, 100) >= config.tick.chanceOfNote) return
  playNote(noteLength.N8)
}
