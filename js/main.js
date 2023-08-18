import { $ } from "./utils.js";
import { Bar } from "./Bar.js";

window.addEventListener("load", () => {
  const canvas = $("#canvas");
  const ctx = canvas.getContext("2d");
  const snail = $("#snail");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animate);
  };
  animate();
});
