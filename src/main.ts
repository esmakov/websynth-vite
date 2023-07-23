import "./app.css";
import App from "./App.svelte";
import * as Tone from "tone";

const app = new App({
  target: document.getElementById("app"),
});

// Declared outside of .svelte files so it can be exported
const mainPolySynth = new Tone.PolySynth(Tone.Synth);

export default app;
export { mainPolySynth };
