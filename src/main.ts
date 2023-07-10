import "./style.css";
import * as Tone from "tone";
import { createNoteTable, reducedKeyCodes } from "./utils";

let mainGainNode = new Tone.Gain(0.1).toDestination();

let oscList = new Array(9).fill({});
let envList = new Array(9).fill({});

const wavePicker = document.querySelector(
  "#waveform-picker"
) as HTMLSelectElement;

const volumeSlider = document.querySelector("#volume");
volumeSlider!.addEventListener("input", (e) => {
  const { value } = e.target as HTMLInputElement;
  mainGainNode.gain.value = Number(value);
});

const STARTING_OCTAVE = 4;
let currentOctave = STARTING_OCTAVE;
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
  const keyAreaElem = document.querySelector(".keyarea");
  const octaveElem = document.querySelector(".octave");
  if (octaveElem) {
    keyAreaElem!.removeChild(octaveElem);
  }
  addKeysToKeyboard(octaveIdx);
}

function addKeysToKeyboard(octaveIdx: number) {
  const octaveElem = document.createElement("div");
  octaveElem.className = "octave";
  const keyAreaElem = document.querySelector(".keyarea");
  keyAreaElem!.appendChild(octaveElem);

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
  keyElement.innerHTML = `${note}<sub>${octave}</sub>`;
  keyElement.className = note.length == 1 ? "key white" : "key black";

  keyElement.dataset["note"] = note;
  keyElement.dataset["octave"] = octave.toString();
  keyElement.dataset["frequency"] = freq.toString();

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
      console.log("read key as keydown");
      handleSynthNotePress({ buttons: 1, target: keyElement });
    } else if (event.type === "keyup") {
      console.log("read key as keyup");
      handleSynthNoteRelease({ target: keyElement });
    }
    event.preventDefault();
  }
}

function handleSynthNotePress(event) {
  if (!event.buttons) return;
  const dataset = event.target.dataset;
  console.log("press event triggered", dataset["note"]);

  if (!dataset["pressed"]) {
    const octave = Number(dataset["octave"]);
    const note = dataset["note"];
    const { osc, env } = playNote(Number(dataset.frequency));
    oscList[octave][note] = osc;
    envList[octave][note] = env;
    dataset["pressed"] = "yes";
    event.target.classList.add("active");
  }
}

function handleSynthNoteRelease(event) {
  const dataset = event.target.dataset;
  console.log("release trigger", dataset["note"]);
  if (dataset && dataset["pressed"]) {
    const octave = Number(dataset["octave"]);
    const note = dataset["note"];
    oscList[octave][note].stop();
    envList[octave][note].triggerRelease();
    // delete oscList[octave][note];
    delete dataset["pressed"];
    event.target.classList.remove("active");
  }
}

function playNote(freq: number) {
  const type = wavePicker.options[wavePicker.selectedIndex]
    .value as Tone.ToneOscillatorType;

  const envSliders = document.querySelectorAll(".envelope > input[type=range]");
  const envOptionKeys = ["attack", "decay", "sustain", "release"];
  const envOptionValues = Array.from(envSliders).map((slider) => slider.value);
  let envOptionsObj = envOptionKeys.reduce((acc, element, index) => {
    return {
      ...acc,
      [element]: envOptionValues[index],
    };
  }, {});

  let env = new Tone.AmplitudeEnvelope({
    attackCurve: "exponential",
    ...envOptionsObj,
  }).connect(mainGainNode);

  const osc = new Tone.Oscillator(freq, type).connect(env);
  osc.start();
  env.triggerAttack();

  return {
    osc,
    env,
  };
}
