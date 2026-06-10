import {
  skills,
  aiTools,
  prompts,
  renderSkills,
  renderAiTool,
  renderPrompt,
  updateScrollProgress,
  toggleSound,
} from "./lib.js";

const heroVideo = document.querySelector("#heroVideo");
const playToggle = document.querySelector("#playToggle");
const muteToggle = document.querySelector("#muteToggle");
const soundHint = document.querySelector("#soundHint");
const scrollProgress = document.querySelector("#scrollProgress");
const cursorGlow = document.querySelector("#cursorGlow");
const skillStage = document.querySelector("#skillStage");
const tabs = document.querySelectorAll(".tab");
const aiDetail = document.querySelector("#aiDetail");
const aiCards = document.querySelectorAll(".ai-tool-card");
const promptOutput = document.querySelector("#promptOutput");
const promptChips = document.querySelectorAll(".prompt-chip");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderSkills(skillStage, tab.dataset.skill);
  });
});

renderSkills(skillStage, "analytics");

aiCards.forEach((card) => {
  card.addEventListener("click", () => {
    aiCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    renderAiTool(aiDetail, card.dataset.aiTool);
  });
});

renderAiTool(aiDetail, "gemini");

promptChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    promptChips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    renderPrompt(promptOutput, chip.dataset.prompt);
  });
});

renderPrompt(promptOutput, "sla");

window.addEventListener(
  "scroll",
  () =>
    updateScrollProgress(
      scrollProgress,
      window.scrollY,
      document.documentElement.scrollHeight,
      window.innerHeight,
    ),
  { passive: true },
);
updateScrollProgress(
  scrollProgress,
  window.scrollY,
  document.documentElement.scrollHeight,
  window.innerHeight,
);

if (cursorGlow) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  },
  { threshold: 0.14 },
);

document
  .querySelectorAll(".section, .project-card, .timeline article, .os-card, .ai-tool-card")
  .forEach((element) => revealObserver.observe(element));

playToggle.addEventListener("click", async () => {
  if (heroVideo.paused) {
    await heroVideo.play();
    playToggle.textContent = "Pause";
    playToggle.setAttribute("aria-label", "Pause video");
  } else {
    heroVideo.pause();
    playToggle.textContent = "Play";
    playToggle.setAttribute("aria-label", "Play video");
  }
});

muteToggle.addEventListener("click", () => toggleSound(heroVideo, muteToggle, soundHint));
soundHint.addEventListener("click", () => toggleSound(heroVideo, muteToggle, soundHint));
window.setTimeout(() => {
  if (soundHint) soundHint.style.opacity = "0";
}, 5200);

document.querySelectorAll(".project-card").forEach((card) => {
  const video = card.querySelector("video");
  card.addEventListener("mouseenter", () => video.play());
  card.addEventListener("mouseleave", () => {
    video.pause();
    video.currentTime = 0;
  });
  card.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });
});

const canvas = document.querySelector("#ambientCanvas");
const ctx = canvas.getContext("2d");
let width = 0;
let height = 0;
let mouseX = 0;
let mouseY = 0;
let particles = [];

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  particles = Array.from({ length: Math.min(96, Math.floor(width / 14)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    r: 1 + Math.random() * 3.8,
    speed: 0.12 + Math.random() * 0.34,
    phase: Math.random() * Math.PI * 2,
    hue: Math.random() > 0.62 ? "95, 201, 255" : "255, 159, 67",
  }));
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("pointermove", (event) => {
  mouseX = (event.clientX / width - 0.5) * 18;
  mouseY = (event.clientY / height - 0.5) * 18;
});

function drawParticles(time) {
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = "lighter";
  particles.forEach((p) => {
    const drift = Math.sin(time * 0.001 + p.phase) * 18;
    const x = p.x + drift + mouseX;
    const y = p.y + Math.cos(time * 0.0008 + p.phase) * 14 + mouseY;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.r * 8);
    gradient.addColorStop(0, `rgba(${p.hue}, 0.42)`);
    gradient.addColorStop(1, `rgba(${p.hue}, 0)`);
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, p.r * 8, 0, Math.PI * 2);
    ctx.fill();
    p.y -= p.speed;
    if (p.y < -30) {
      p.y = height + 30;
      p.x = Math.random() * width;
    }
  });
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
requestAnimationFrame(drawParticles);
