<script>
import "./app.css";
import * as Tone from "tone";
import { createNoteTable, reducedKeyCodes } from "./utils";

let mainGainNode = new Tone.Gain(1.1).toDestination();
let mainFilterNode = new Tone.Filter(22000, "lowpass").connect(mainGainNode);

let oscList = new Array(9).fill({});
let envList = new Array(9).fill({});

const keyAreaElem = document.querySelector(".keyarea");
const wavePicker = document.querySelector(
  "#waveform-picker"
);

const volumeSlider = document.querySelector("#volume");
volumeSlider.addEventListener("input", (e) => {
  const { value } = e.target ;
  mainGainNode.gain.value = Number(value);
});

const filterSlider = document.querySelector("#filter");
filterSlider.addEventListener("input", (e) => {
  const { value } = e.target ;
  mainFilterNode.frequency.value = Number(value);
});

const allSliders = document.querySelectorAll("input[type=range]");
let isMouseDown = false;
allSliders.forEach((slider) => {
  slider.addEventListener("input", (e) => {
    const tooltipElem = slider.nextElementSibling;
    const { value } = e.target ;
    tooltipElem.innerHTML = value;
  });

  slider.addEventListener("mousedown", function () {
    isMouseDown = true;
  });

  slider.addEventListener("mouseup", function () {
    isMouseDown = false;
  });

  slider.addEventListener("mousemove", function (event) {
    if (isMouseDown) {
      const tooltipElem = slider.nextElementSibling;
      const tooltipWidth = tooltipElem.offsetWidth;
      const containerWidth = slider.parentElement.offsetWidth;
      const xPos = event.offsetX;
      const tooltipXPos = Math.max(
        0,
        Math.min(containerWidth - tooltipWidth, xPos - tooltipWidth / 2)
      );

      tooltipElem.style.left = `${tooltipXPos}px`;
    }
  });
});

const STARTING_OCTAVE = 5;
let currentOctave = STARTING_OCTAVE;
setKeyboardOctave(currentOctave);

const octIncrementButton = document.querySelector("#octIncrement");
const octDecrementButton = document.querySelector("#octDecrement");
octIncrementButton.addEventListener("click", () => {
  if (currentOctave !== 8) setKeyboardOctave(++currentOctave);
});
octDecrementButton.addEventListener("click", () => {
  if (currentOctave !== 0) setKeyboardOctave(--currentOctave);
});

function setKeyboardOctave(octaveIdx) {
  const octaveElem = document.querySelector(".octave");
  if (octaveElem) {
    keyAreaElem.removeChild(octaveElem);
  }
  addKeysToKeyboard(octaveIdx);
}

function addKeysToKeyboard(octaveIdx) {
  const octaveElem = document.createElement("div");
  octaveElem.className = "octave";
  keyAreaElem.appendChild(octaveElem);

  let noteTable = createNoteTable();
  let currentOctave = noteTable[octaveIdx];
  const noteFreqPairs = Object.entries(currentOctave);
  noteFreqPairs.forEach(([note, frequency]) => {
    octaveElem.appendChild(
      createKeyElement(note, octaveIdx, frequency )
    );
  });
}

function createKeyElement(note, octave, freq) {
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
      handleSynthNotePress({ buttons: 1, target: keyElement });
    } else if (event.type === "keyup") {
      handleSynthNoteRelease({ target: keyElement });
    }
    event.preventDefault();
  }
}

function handleSynthNotePress(event) {
  if (!event.buttons) return;
  const dataset = event.target.dataset;

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

function playNote(freq) {
  const envSliders = document.querySelectorAll(
    ".envelope > .slider-container > input[type=range]"
  );
  const envOptionKeys = ["attack", "decay", "sustain", "release"];
  const envOptionValues = Array.from(envSliders).map((slider) => slider.value);
  const envOptionsObj = envOptionKeys.reduce((acc, element, index) => {
    return {
      ...acc,
      [element]: envOptionValues[index],
    };
  }, {});

  const attackCurvePicker = document.querySelector(
    "#attackcurve-picker"
  ) ;
  const attackCurveType =
    attackCurvePicker.options[attackCurvePicker.selectedIndex].value;

  let env = new Tone.AmplitudeEnvelope({
    attackCurve: attackCurveType,
    ...envOptionsObj,
  }).connect(mainFilterNode);

  const type = wavePicker.options[wavePicker.selectedIndex]
    .value;
  const osc = new Tone.Oscillator(freq, type).connect(env);
  osc.start();
  env.triggerAttack();

  return {
    osc,
    env,
  };
}</script>