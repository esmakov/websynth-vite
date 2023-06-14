import "./style.css";
import Tone from "tone";

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();
const env = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  attackCurve: "exponential",
  decay: 0.2,
  sustain: 1.0,
  release: 0.8,
});

//play a middle 'C' for the duration of an 8th note
const button = document.createElement("button");
button.textContent = "play";
document.body.appendChild(button);
button.addEventListener("click", async () => {
  await Tone.start();
  synth.triggerAttackRelease("C4", "8n");
});
