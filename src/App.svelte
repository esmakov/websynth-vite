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

  // references to the synth must be done after import resolves
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
  });

  const mainGainNode = new Tone.Gain($gain).toDestination();
  $: mainGainNode.gain.value = $gain;

  const mainFilterNode = new Tone.Filter($filterCutoff, "lowpass").connect(
    mainGainNode
  );
  $: mainFilterNode.frequency.value = $filterCutoff;
</script>

<Settings />
<Keyboard />
