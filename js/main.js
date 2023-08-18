import { $ } from "./utils.js";
import { Bar } from "./Bar.js";
import { Mic } from "./Mic.js";

window.addEventListener("load", () => {
  const canvas = $("#canvas");
  const ctx = canvas.getContext("2d");
  const snail = $("#snail");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const fftSize = 512;
  const mic = new Mic(fftSize);
  const bars = [];
  const barWidth = (canvas.width / fftSize) * 2;
  const createBars = () => {
    for (let i = 0; i < fftSize / 2; i++) bars.push(new Bar(barWidth * i, 300, 0.5, 250, "red", i));
  };
  createBars();
  const animate = () => {
    if (!mic.init) {
      requestAnimationFrame(animate);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const samples = mic.getSamples();
    console.log(samples);
    bars.forEach((bar, i) => {
      bar.update(samples[i]);
      bar.draw(ctx, 1);
    });
    requestAnimationFrame(animate);
  };
  animate();
});
