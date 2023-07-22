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
    {#each ["sine", "square", "sawtooth", "triangle"] as waveOption}
      <option value={waveOption}>{waveOption}</option>
    {/each}
  </select>

  <label for="attack-curve-picker">Attack curve</label>
  <select id="attack-curve-picker" bind:value={$attackCurve}>
    {#each ["sine", "cosine", "linear", "exponential", "ripple", "step", "bounce"] as attackCurveOption}
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
    min="0.01"
    max="2"
    step="0.01"
  />
  <Slider
    bind:value={$sustain}
    label="Sustain"
    id="sustain"
    min="0.01"
    max="1"
    step="0.01"
  />
  <Slider
    bind:value={$release}
    label="Release"
    id="release"
    min="0.01"
    max="5"
    step="0.01"
  />
  <Slider
    bind:value={$gain}
    label="Gain"
    id="gain"
    min="0.01"
    max="1"
    step="0.01"
  />
  <Slider
    bind:value={$filterCutoff}
    label="Filter cutoff"
    id="filter"
    min="0.01"
    max="20000"
    step="1"
  />
</section>

<style>
  select {
    background: var(--light);
    border-radius: 7px;
    height: 2rem;
    cursor: pointer;
  }

  section {
    display: flex;
    flex-direction: column;
    width: clamp(15rem, 40vw, 20rem);
    gap: 0.5rem;
    background-color: var(--midtone);
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 5px 5px 3px var(--shadow);
  }
</style>
