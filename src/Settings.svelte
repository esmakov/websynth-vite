<script lang="ts">
  import Slider from "./Slider.svelte";
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
</script>

<section class="settings">
  <label for="waveform-picker">Waveform</label>
  <select id="waveform-picker" bind:value={$waveform}>
    {#each ["Sine", "Square", "Sawtooth", "Triangle"] as waveOption}
      <option value={waveOption}>{waveOption}</option>
    {/each}
  </select>

  <label for="attackcurve-picker">Attack curve</label>
  <select id="attackcurve-picker" bind:value={$attackCurve}>
    {#each ["Sine", "Cosine", "Linear", "Exponential", "Ripple", "Step", "Bounce"] as attackCurveOption}
      <option value={attackCurveOption}>{attackCurveOption}</option>
    {/each}
  </select>

  <Slider
    bind:value={$attack}
    label="Attack"
    id="attack"
    min="0"
    max="2"
    step="0.01"
  />

  <Slider
    bind:value={$decay}
    label="Decay"
    id="decay"
    min="0"
    max="2"
    step="0.01"
  />
  <Slider
    bind:value={$sustain}
    label="Sustain"
    id="sustain"
    min="0"
    max="1"
    step="0.01"
  />
  <Slider
    bind:value={$release}
    label="Release"
    id="release"
    min="0"
    max="5"
    step="0.01"
  />
  <Slider
    bind:value={$gain}
    label="Gain"
    id="gain"
    min="0"
    max="1"
    step="0.01"
  />
  <Slider
    bind:value={$filterCutoff}
    label="Filter cutoff"
    id="filter"
    min="0"
    max="22000"
    step="1"
  />
</section>

<style>
  select {
    background: hsl(160, 30%, 60%);
    border-radius: 1rem;
    cursor: pointer;
  }

  section {
    display: flex;
    flex-direction: column;
    width: clamp(15rem, 40vw, 20rem);
    margin-top: 2rem;
    gap: 0.5rem;
    background-color: hsl(160, 25%, 80%);
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 5px 5px 3px hsl(160, 30%, 10%);
  }
</style>
