// Translated into TS from JS from https://alexanderell.is/posts/writing-morse-code-games/

let note_context: AudioContext;
let note_node: OscillatorNode;
let gain_node: GainNode;

export function initializeAudioContext() {
  note_context = new AudioContext();
  note_node = note_context.createOscillator();
  gain_node = note_context.createGain();
  note_node.frequency.value = 440;
  gain_node.gain.value = 0;
  note_node.connect(gain_node);
  gain_node.connect(note_context.destination);
  note_node.start();
}

function startNotePlaying() {
  // Pass a start time of 0 so it starts ramping up immediately.
  gain_node.gain.setTargetAtTime(0.1, 0, 0.001)
}

function stopNotePlaying() {
  // Pass a start time of 0 so it starts ramping down immediately.
  gain_node.gain.setTargetAtTime(0, 0, 0.001)
}

/** Duration of a dot sound */
export const DOT_TIME = 50;

/** Duration of a dash sound */
export const DASH_TIME = DOT_TIME * 3;

/** Waiting time between dashes and dots */
export const SYMBOL_BREAK = DOT_TIME;

/** Waiting time between dashes and dots */
export const LETTER_BREAK = DOT_TIME * 3;

/** Waiting time between words */
export const WORD_BREAK = DOT_TIME * 7;

/** Sleep for a given amount of miliseconds */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** Play a dash sound */
export async function playDash() {
  startNotePlaying();
  await sleep(DASH_TIME);
  stopNotePlaying();
}

/** Play a dot sound */
export async function playDot() {
  startNotePlaying();
  await sleep(DOT_TIME);
  stopNotePlaying();
}
