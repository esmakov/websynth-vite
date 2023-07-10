import "./style.css";
import * as Tone from "tone";
import { createNoteTable, reducedKeyCodes } from "./utils";

let mainGainNode = new Tone.Gain(0.1).toDestination();
let mainEnvelope = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  attackCurve: "exponential",
  decay: 0.2,
  sustain: 1.0,
  release: 0.8,
}).connect(mainGainNode);

let oscList: object[] = [];
for (let i = 0; i < 9; i++) {
  oscList.push({});
}

const wavePicker = document.querySelector(
  "#waveform-picker"
) as HTMLSelectElement;

const volumeSlider = document.querySelector("#volume");
volumeSlider!.addEventListener("input", (e) => {
  const { value } = e.target as HTMLInputElement;
  mainGainNode.gain.value = Number(value);
});

const envSliders = document.querySelectorAll(".envelope > input[type=range]");
envSliders.forEach((slider) => {
  slider.addEventListener("input", (e) => {
    const { value, id } = e.target as HTMLInputElement;
    mainEnvelope[id] = value;
    console.log(id, mainEnvelope[id]);
  });
});

const keyboard = document.querySelector(".keyboard");
let currentOctave = 0;
setKeyboardOctave(currentOctave);

const octIncrementButton = document.querySelector("#octIncrement");
const octDecrementButton = document.querySelector("#octDecrement");
octIncrementButton!.addEventListener("click", () => {
  if (currentOctave !== 8) setKeyboardOctave(++currentOctave);
});
octDecrementButton!.addEventListener("click", () => {
  if (currentOctave !== 0) setKeyboardOctave(--currentOctave);
});

function setKeyboardOctave(octaveIdx: number) {
  const octaveElem = document.querySelector(".octave");
  if (octaveElem) {
    keyboard!.removeChild(octaveElem);
  }
  addKeysToKeyboard(octaveIdx);
}

function addKeysToKeyboard(octaveIdx: number) {
  const octaveElem = document.createElement("div");
  octaveElem.className = "octave";
  keyboard!.appendChild(octaveElem);

  let noteTable = createNoteTable();
  let currentOctave = noteTable[octaveIdx];
  const noteFreqPairs = Object.entries(currentOctave);
  noteFreqPairs.forEach(([note, frequency]) => {
    octaveElem.appendChild(
      createKeyElement(note, octaveIdx, frequency as number)
    );
  });
}

function createKeyElement(note: string, octave: number, freq: number) {
  const keyElement = document.createElement("div");

  keyElement.className = "key";
  keyElement.dataset["note"] = note;
  keyElement.dataset["octave"] = octave.toString();
  keyElement.dataset["frequency"] = freq.toString();

  keyElement.innerHTML = `${note}<sub>${octave}</sub>`;

  keyElement.addEventListener("mousedown", handleSynthNotePress, false);
  keyElement.addEventListener("mouseup", handleSynthNoteRelease, false);
  keyElement.addEventListener("mouseover", handleSynthNotePress, false);
  keyElement.addEventListener("mouseleave", handleSynthNoteRelease, false);

  return keyElement;
}

addEventListener("keydown", onKeyPress);
addEventListener("keyup", onKeyPress);
function onKeyPress(event) {
  const synthKeys = document.querySelectorAll(".key");
  const keyElement = synthKeys[reducedKeyCodes.indexOf(event.code)];

  if (keyElement) {
    if (event.type === "keydown") {
      handleSynthNotePress({ buttons: 1, target: keyElement });
    } else if (event.type === "keyup") {
      handleSynthNoteRelease({ target: keyElement });
    }
    event.preventDefault();
  }
}

async function handleSynthNotePress(event) {
  await Tone.start();
  if (!event.buttons) return;
  const dataset = event.target.dataset;

  if (!dataset["pressed"]) {
    const octave = Number(dataset["octave"]);
    const note = dataset["note"];
    oscList[octave][note] = playNote(Number(dataset.frequency));
    dataset["pressed"] = "yes";
    event.target.classList.add("active");
  }
}

function handleSynthNoteRelease(event) {
  const dataset = event.target.dataset;

  if (dataset && dataset["pressed"]) {
    const octave = Number(dataset["octave"]);
    const note = dataset["note"];
    oscList[octave][note].stop();
    delete oscList[octave][note];
    delete dataset["pressed"];
    event.target.classList.remove("active");
    mainEnvelope.triggerRelease();
  }
}

function playNote(freq: number) {
  const type = wavePicker.options[wavePicker.selectedIndex]
    .value as Tone.ToneOscillatorType;
  const osc = new Tone.Oscillator(freq, type).connect(mainGainNode);
  osc.start();
  mainEnvelope.triggerAttack();
  return osc;
}
