import * as TONE from "tone"
import randomInt from 'random-int'
import { prepareVis } from './sketch'

let osc
let env
let currentNoteFreq = 440

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

const noteFreq = [
  110, 220, 329.63, 392, 440, 493.88, 523.25
]

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
  // Avoid duplicate notes
  const freqs = noteFreq.filter(f => {
    if(f !== currentNoteFreq) return f
  })
  currentNoteFreq = freqs[randomInt(0, freqs.length)]
  osc.set('frequency', currentNoteFreq)
  playNote(noteLength.N8)
  prepareVis(currentNoteFreq)
}
