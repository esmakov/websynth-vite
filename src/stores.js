import { writable } from "svelte/store";

export let gain = writable(1);

export let filterCutoff = writable(22000);

export let waveform = writable("square");

export let attackCurve = writable("linear");
export let attack = writable(0.01);
export let decay = writable(0.01);
export let sustain = writable(0.5);
export let release = writable(0.5);
