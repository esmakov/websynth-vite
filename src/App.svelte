<script lang="ts">
  import * as Tone from "tone";
  import Keyboard from "./Keyboard.svelte";
  import Settings from "./Settings.svelte";
  import {
    attack,
    attackCurve,
    decay,
    filterCutoff,
    gain,
    release,
    sustain,
    waveform,
  } from "./stores.js";
  import { afterUpdate } from "svelte";
  import { mainPolySynth } from "./main.ts";

  afterUpdate(async () => {
    await Tone.start();
    mainPolySynth.connect(mainFilterNode);
    mainPolySynth.set({
      oscillator: {
        type: $waveform,
      },
      envelope: {
        attackCurve: $attackCurve,
        attack: $attack,
        decay: $decay,
        sustain: $sustain,
        release: $release,
      },
    });
    console.log($waveform);
  });

  const mainGainNode = new Tone.Gain($gain).toDestination();
  const mainFilterNode = new Tone.Filter($filterCutoff, "lowpass").connect(
    mainGainNode
  );
</script>

<Settings />
<Keyboard />
