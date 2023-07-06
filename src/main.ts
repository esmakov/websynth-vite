import "./style.css";
import * as Tone from "tone";
import { createNoteTable, keyCodes } from "./utils";

let mainEnvelope: Tone.AmplitudeEnvelope;
let osc: Tone.Oscillator;
let mainGainNode: Tone.Gain;
let oscList: object[] = [];

const wavePicker = document.querySelector(
  "#waveform-picker"
) as HTMLSelectElement;

function setup() {
  mainGainNode = new Tone.Gain().toDestination();
  mainEnvelope = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    attackCurve: "exponential",
    decay: 0.2,
    sustain: 1.0,
    release: 0.8,
  }).connect(mainGainNode);

  let noteFreq = createNoteTable();

  const volumeSlider = document.querySelector("#volume");
  volumeSlider!.addEventListener("input", (e) => {
    const { value } = e.target as HTMLInputElement;
    mainGainNode.gain.value = Number(value);
  });

  mainGainNode.gain.value = volumeSlider!.value;

  wavePicker.addEventListener("change", (e) => {
    const { value } = e.target as HTMLSelectElement;
    if (!(value in wavePicker.options)) return;
    osc.type = value as Tone.ToneOscillatorType;
  });

  for (let i = 0; i < 9; i++) {
    oscList.push({});
  }

  const envSliders = document.querySelectorAll(".envelope > input[type=range]");
  envSliders.forEach((slider) => {
    slider.addEventListener("input", (e) => {
      const { value, id } = e.target as HTMLInputElement;
      mainEnvelope[id] = value;
      console.log(id, mainEnvelope[id]);
    });
  });

  // Create key elements
  const keyboard = document.querySelector(".keyboard");
  noteFreq.forEach((octave, idx) => {
    const keyList = Object.entries(octave);
    const octaveElem = document.createElement("div");
    octaveElem.className = "octave";

    keyList.forEach(([note, frequency]) => {
      // only natural notes
      if (note.length === 1) {
        octaveElem.appendChild(createKey(note, idx, frequency as number));
      }
    });

    keyboard!.appendChild(octaveElem);
  });

  addEventListener("keydown", keyPressed);
  addEventListener("keyup", keyPressed);
}

function createKey(note: string, octave: number, freq: number) {
  const keyElement = document.createElement("div");

  keyElement.className = "key";
  keyElement.dataset["note"] = note;
  keyElement.dataset["octave"] = octave.toString();
  keyElement.dataset["frequency"] = freq.toString();

  keyElement.innerHTML = `${note}<sub>${octave}</sub>`;

  keyElement.addEventListener("mousedown", notePressed, false);
  keyElement.addEventListener("mouseup", noteReleased, false);
  keyElement.addEventListener("mouseover", notePressed, false);
  keyElement.addEventListener("mouseleave", noteReleased, false);

  return keyElement;
}

function playTone(freq: number) {
  const type = wavePicker.options[wavePicker.selectedIndex]
    .value as Tone.ToneOscillatorType;
  const osc = new Tone.Oscillator(freq, type).connect(mainGainNode);
  osc.start();
  mainEnvelope.triggerAttack();
  return osc;
}

function keyPressed(event) {
  const synthKeys = document.querySelectorAll(".key");
  const keyElement = synthKeys[keyCodes.indexOf(event.code)];

  if (keyElement) {
    if (event.type === "keydown") {
      notePressed({ buttons: 1, target: keyElement });
    } else if (event.type === "keyup") {
      noteReleased({ target: keyElement });
    }
    event.preventDefault();
  }
}

async function notePressed(event) {
  if (!event.buttons) return;
  const dataset = event.target.dataset;

  event.target.classList.add("active");
  if (!dataset["pressed"]) {
    const octave = Number(dataset["octave"]);
    const note = dataset["note"];
    oscList[octave][note] = playTone(Number(dataset.frequency));
    dataset["pressed"] = "yes";
  }
}

function noteReleased(event) {
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

setup();
