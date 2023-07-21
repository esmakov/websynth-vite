<script lang="ts">
  import * as Tone from "tone";
  import Keyboard from "./Keyboard.svelte";
  import Settings from "./Settings.svelte";
  import { gain, waveform } from "./stores.js";
  import { onMount } from "svelte";

  onMount(async () => {
    await Tone.start();
  });
  let mainGainNode = new Tone.Gain($gain).toDestination();
  let mainFilterNode = new Tone.Filter(22000, "lowpass").connect(mainGainNode);

  let oscList = new Array(9).fill({});
  let envList = new Array(9).fill({});
</script>

<Settings />
<Keyboard />
