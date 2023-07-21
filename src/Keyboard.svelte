<script lang="ts">
  import * as Tone from "tone";
  import { createNoteTable, reducedKeyCodes } from "./utils";
  import { onMount } from "svelte";

  const STARTING_OCTAVE = 5;

  let currentOctave = STARTING_OCTAVE;
  //   onMount(() => {
  // setKeyboardOctave(STARTING_OCTAVE);
  //   });
  //   const wavePicker = document.querySelector(
  //     "#waveform-picker"
  //   ) as HTMLSelectElement;
  //   const keyAreaElem = document.querySelector(".keyarea");
  //   const volumeSlider = document.querySelector("#volume");
  //   volumeSlider!.addEventListener("input", (e) => {
  //     const { value } = e.target as HTMLInputElement;
  //     mainGainNode.gain.value = Number(value);
  //   });

  //   const filterSlider = document.querySelector("#filter");
  //   filterSlider!.addEventListener("input", (e) => {
  //     const { value } = e.target as HTMLInputElement;
  //     mainFilterNode.frequency.value = Number(value);
  //   });

  //   function setKeyboardOctave(octaveIdx: number) {
  //     const octaveElem = document.querySelector(".octave");
  //     if (octaveElem) {
  //       keyAreaElem!.removeChild(octaveElem);
  //     }
  //     addKeysToKeyboard(octaveIdx);
  //   }

  //   function addKeysToKeyboard(octaveIdx: number) {
  //     const octaveElem = document.createElement("div");
  //     octaveElem.className = "octave";
  //     keyAreaElem!.appendChild(octaveElem);

  //     let noteTable = createNoteTable();
  //     let currentOctave = noteTable[octaveIdx];
  //     const noteFreqPairs = Object.entries(currentOctave);
  //     noteFreqPairs.forEach(([note, frequency]) => {
  //       octaveElem.appendChild(createKeyElement(note, octaveIdx, frequency));
  //     });
  //   }

  //   function createKeyElement(note: string, octave: number, freq: number) {
  //     const keyElement = document.createElement("div");
  //     keyElement.innerHTML = `${note}<sub>${octave}</sub>`;
  //     keyElement.className = note.length == 1 ? "key white" : "key black";

  //     keyElement.dataset["note"] = note;
  //     keyElement.dataset["octave"] = octave.toString();
  //     keyElement.dataset["frequency"] = freq.toString();

  //     keyElement.addEventListener("mousedown", handleSynthNotePress, false);
  //     keyElement.addEventListener("mouseup", handleSynthNoteRelease, false);
  //     keyElement.addEventListener("mouseover", handleSynthNotePress, false);
  //     keyElement.addEventListener("mouseleave", handleSynthNoteRelease, false);

  //     return keyElement;
  //   }

  //   addEventListener("keydown", onKeyPress);
  //   addEventListener("keyup", onKeyPress);
  //   function onKeyPress(event: KeyboardEvent) {
  //     const synthKeys = document.querySelectorAll(".key");
  //     const keyElement = synthKeys[reducedKeyCodes.indexOf(event.code)];

  //     if (keyElement) {
  //       if (event.type === "keydown") {
  //         handleSynthNotePress({ buttons: 1, target: keyElement });
  //       } else if (event.type === "keyup") {
  //         handleSynthNoteRelease({ target: keyElement });
  //       }
  //       event.preventDefault();
  //     }
  //   }

  //   function handleSynthNotePress(event) {
  //     if (!event.buttons) return;
  //     const dataset = event.target.dataset;

  //     if (!dataset["pressed"]) {
  //       const octave = Number(dataset["octave"]);
  //       const note = dataset["note"];
  //       const { osc, env } = playNote(Number(dataset.frequency));
  //       oscList[octave][note] = osc;
  //       envList[octave][note] = env;
  //       dataset["pressed"] = "yes";
  //       event.target.classList.add("active");
  //     }
  //   }

  //   function handleSynthNoteRelease(event) {
  //     const dataset = event.target.dataset;
  //     if (dataset && dataset["pressed"]) {
  //       const octave = Number(dataset["octave"]);
  //       const note = dataset["note"];
  //       oscList[octave][note].stop();
  //       envList[octave][note].triggerRelease();
  //       // delete oscList[octave][note];
  //       delete dataset["pressed"];
  //       event.target.classList.remove("active");
  //     }
  //   }

  //   function playNote(freq: number) {
  //     const envSliders = document.querySelectorAll(
  //       ".slider-container > input[type=range]"
  //     ) as NodeListOf<HTMLInputElement>;
  //     const envOptionKeys = ["attack", "decay", "sustain", "release"];
  //     const envOptionValues = Array.from(envSliders).map(
  //       (slider) => slider.value
  //     );
  //     const envOptionsObj = envOptionKeys.reduce((acc, element, index) => {
  //       return {
  //         ...acc,
  //         [element]: envOptionValues[index],
  //       };
  //     }, {});

  //     const attackCurvePicker = document.querySelector(
  //       "#attackcurve-picker"
  //     ) as HTMLSelectElement;
  //     const attackCurveType =
  //       attackCurvePicker.options[attackCurvePicker.selectedIndex].value;

  //     let env = new Tone.AmplitudeEnvelope({
  //       attackCurve: attackCurveType,
  //       ...envOptionsObj,
  //     }).connect(mainFilterNode);

  //     const type = wavePicker.options[wavePicker.selectedIndex].value;
  //     const osc = new Tone.Oscillator(freq, type).connect(env);
  //     osc.start();
  //     env.triggerAttack();

  //     return {
  //       osc,
  //       env,
  //     };
  //   }
</script>

<section class="keyboard">
  <div class="keyboard-controls">
    {#if currentOctave < 8}
      <button
        id="octIncrement"
        on:click={() => {
          if (currentOctave !== 8) ++currentOctave;
        }}>Oct +</button
      >
    {/if}
    {#if currentOctave > 0}
      <button
        id="octDecrement"
        on:click={() => {
          if (currentOctave !== 0) --currentOctave;
        }}>Oct -</button
      >
    {/if}
  </div>
  <div class="keyarea">
    <!-- Keys -->
  </div>
</section>

<style>
  .keyboard {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    outline: 2px solid hsl(160, 30%, 30%);
    border-radius: 7px;
    background-color: hsl(160, 30%, 30%);
    box-shadow: 8px 8px 3px hsl(160, 30%, 10%);
  }

  .keyboard-controls {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .keyboard-controls > button {
    padding: 2px;
    height: 3rem;
    border-radius: 5px;
    background-color: hsl(160, 30%, 90%);
    cursor: pointer;
  }

  .key {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 10px;
    width: 50px;
    height: 200px;
    background-color: hsl(160, 30%, 90%);
    border-radius: 7px;
    cursor: pointer;
    box-shadow: 5px 5px 3px hsl(160, 30%, 10%);
  }

  .black {
    background-color: black;
    color: white;
    width: 35px;
    height: 140px;
    margin-left: -30px;
    z-index: 1;
  }

  .octave {
    display: flex;
    gap: 5px;
  }
  .active {
    box-shadow: inset 2px 2px 1px hsl(160, 30%, 10%);
  }
</style>
