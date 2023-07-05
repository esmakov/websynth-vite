import "./style.css";
import * as Tone from "tone";
import { createNoteTable, keyCodes } from "./utils/keycodes";

let env: Tone.AmplitudeEnvelope;
let osc: Tone.Oscillator;

const DEFAULT_VOLUME_DB = -12;

function setup() {
  env = new Tone.AmplitudeEnvelope({
    attack: 0.1,
    attackCurve: "exponential",
    decay: 0.2,
    sustain: 1.0,
    release: 0.8,
  }).toDestination();
  osc = new Tone.Oscillator("C4", "sine").connect(env);
  osc.volume.value = DEFAULT_VOLUME_DB;

  osc.debug = true;
  env.debug = true;

  let noteFreq = createNoteTable();

  const volumeSlider = document.querySelector("#volume");
  volumeSlider!.addEventListener("input", (e) => {
    const { value } = e.target as HTMLInputElement;
    const volInDecibels = Tone.gainToDb(Number(value));
    osc.volume.value = Number(volInDecibels);
  });

  const waveformPicker = document.querySelector(
    "#waveform-picker"
  ) as HTMLSelectElement;
  waveformPicker.addEventListener("change", (e) => {
    const { value } = e.target as HTMLSelectElement;
    if (!(value in waveformPicker.options)) return;
    osc.type = value;
  });

  const envSliders = document.querySelectorAll(".envelope > input[type=range]");
  envSliders.forEach((slider) => {
    slider.addEventListener("input", (e) => {
      const { value, id } = e.target as HTMLInputElement;
      env[id] = value;
      console.log(id, env[id]);
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
  keyElement.dataset["octave"] = octave.toString();
  keyElement.dataset["note"] = note;
  keyElement.dataset["frequency"] = freq.toString();

  keyElement.innerHTML = `${note}<sub>${octave}</sub>`;

  keyElement.addEventListener("mousedown", notePressed, false);
  keyElement.addEventListener("mouseup", noteReleased, false);
  keyElement.addEventListener("mouseover", notePressed, false);
  keyElement.addEventListener("mouseleave", noteReleased, false);

  return keyElement;
}

async function notePressed(event) {
  const note = event.target.dataset["note"];
  const octave = event.target.dataset["octave"];

  const noteName = `${note}${octave}`;
  osc.frequency.value = noteName;

  await Tone.start();
  osc.start();
  env.triggerAttack();
}

function noteReleased(event) {
  env.triggerRelease();
  osc.stop();
}

function keyPressed(event) {
  const synthKeys = document.querySelectorAll(".key");
  const keyElement = synthKeys[keyCodes.indexOf(event.code)];

  if (keyElement) {
    if (event.type === "keydown") {
      keyElement.classList.add("active");
      notePressed({ target: keyElement });
    } else if (event.type === "keyup") {
      keyElement.classList.remove("active");
      noteReleased({ target: keyElement });
    }
    event.preventDefault();
  }
}

setup();
