import "./style.css";
import * as Tone from "tone";

//create a synth and connect it to the main output (your speakers)
const env = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  attackCurve: "exponential",
  decay: 0.2,
  sustain: 1.0,
  release: 0.8,
}).toDestination();
const osc = new Tone.Oscillator("C4", "sine").connect(env);
osc.debug = true;

//play a middle 'C' for the duration of an 8th note
const button = document.querySelector("#play");
button!.addEventListener("click", async () => {
  await Tone.start();
  if (osc.state !== "started") {
    osc.start();
    env.triggerAttack();
    button!.textContent = "Stop";
  } else {
    env.triggerRelease();
    osc.stop();
    button!.textContent = "Play";
  }
});

const waveformPicker = document.querySelector("#waveform-picker");
waveformPicker!.addEventListener("change", (e) => {
  osc.type = e.target.value;
});

const sliders = document.querySelectorAll("input[type=range]");
sliders.forEach((slider) => {
  slider.addEventListener("input", (e) => {
    const { value, id } = e.target as HTMLInputElement;
    env[id] = value;
    console.log(id, env[id]);
    console.log(env.value);
  });
});
