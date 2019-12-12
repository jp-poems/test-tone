import { init as initSketch } from "./sketch"
import { init as initTone } from "./testTone"

window.onload = init()

function init() {
  initSketch()
  initTone()
}
