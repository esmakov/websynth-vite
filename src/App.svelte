<script lang="ts">
  import * as Tone from "tone";
  import Keyboard from "./Keyboard.svelte";
  import Settings from "./Settings.svelte";
  import {
    attack,
    attackCurve,
    decay,
    decayCurve,
    filterCutoff,
    gain,
    release,
    releaseCurve,
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
        decayCurve: $decayCurve,
        releaseCurve: $releaseCurve,
        attack: $attack,
        decay: $decay,
        sustain: $sustain,
        release: $release,
      },
    });
    console.log(mainPolySynth.get());
  });

  const mainGainNode = insertNewNode(Tone.Gain);
  $: mainGainNode.gain.value = $gain;

  const mainFilterNode = insertNewNode(Tone.Filter, undefined, mainGainNode);
  mainFilterNode.connect(mainGainNode);
  $: mainFilterNode.frequency.value = $filterCutoff;

  function insertNewNode<T extends Tone.ToneAudioNode>(
    c: { new (): T },
    prev?: Tone.ToneAudioNode,
    next: Tone.ToneAudioNode = Tone.context.destination
  ): T {
    let node = new c();

    if (prev) prev.connect(node);

    node.connect(next);
    return node;
  }
</script>

<Settings />
<Keyboard />
