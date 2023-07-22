<script lang="ts">
  import { mainPolySynth } from "./main";

  const STARTING_OCTAVE = 5;

  let currentOctave = STARTING_OCTAVE;

  const keyCodes = [
    "KeyA", // C
    "KeyW", // C#
    "KeyS", // D
    "KeyE", // D#
    "KeyD", // E
    "KeyF", // F
    "KeyT", // F#
    "KeyG", // G
    "KeyY", // G#
    "KeyH", // A
    "KeyU", // A#
    "KeyJ", // B
  ];

  addEventListener("keydown", onKeyPress);
  addEventListener("keyup", onKeyPress);
  function onKeyPress(event: KeyboardEvent) {
    event.preventDefault();
    const synthKeys = document.querySelectorAll(".key");
    if (!keyCodes.includes(event.code)) return;
    const target = synthKeys[keyCodes.indexOf(event.code)];

    if (event.type === "keydown") {
      triggerSynthNotePress({ buttons: 1, target });
    } else if (event.type === "keyup") {
      triggerSynthNoteRelease({ target });
    }
  }

  function triggerSynthNotePress(event) {
    const dataset = event.target.dataset;
    if (!event.buttons || dataset["pressed"]) return;

    const note = dataset["note"] + currentOctave;
    mainPolySynth.triggerAttack(note);
    dataset["pressed"] = true;
    event.target.classList.add("active");
  }

  function triggerSynthNoteRelease(event) {
    const dataset = event.target.dataset;
    if (dataset["pressed"]) {
      const note = dataset["note"] + currentOctave;
      mainPolySynth.triggerRelease(note);
      delete dataset["pressed"];
      event.target.classList.remove("active");
    }
  }
</script>

<section class="keyboard">
  <div class="keyboard-controls">
    <button
      id="octIncrement"
      disabled={currentOctave === 8}
      on:click={() => {
        ++currentOctave;
      }}>Oct +</button
    >
    <button
      id="octDecrement"
      disabled={currentOctave === 0}
      on:click={() => {
        --currentOctave;
      }}>Oct -</button
    >
  </div>
  <div class="keyarea">
    {#each ["C", "C#", "D", "D#", "E", "F", "G", "G#", "A", "A#", "B"] as note}
      <button
        type="button"
        data-note={note}
        class="key"
        class:black={note.length > 1}
        on:mousedown={triggerSynthNotePress}
        on:mouseup={triggerSynthNoteRelease}
      >
        {note}{currentOctave}
      </button>
    {/each}
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

  .keyarea {
    display: flex;
    gap: 5px;
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

  .keyarea {
    display: flexnset 2px 2px 1px hsl(160, 30%, 10%);
  }
</style>
