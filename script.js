const skills = {
  analytics: [
    ["Power BI Desktop", 96],
    ["DAX and Power Query", 94],
    ["KPI and SLA Dashboards", 97],
    ["Data Modeling", 90],
    ["RLS and Incremental Refresh", 84],
    ["Custom Visuals and Tooltips", 88],
  ],
  data: [
    ["SQL Server and MySQL", 90],
    ["BigQuery and HiveQL", 86],
    ["Window Functions and CTEs", 88],
    ["ETL and Views", 84],
    ["Query Optimization", 82],
    ["10M-50M Row Models", 86],
  ],
  telecom: [
    ["5G SA and LTE-A", 91],
    ["RAN Operations", 96],
    ["Huawei U2000 / U2020", 90],
    ["ZTE OMC-R", 88],
    ["Nokia NetAct", 82],
    ["Ericsson ENM", 84],
  ],
  tools: [
    ["Linux and Shell Scripting", 84],
    ["Git and GitHub", 86],
    ["Jenkins", 76],
    ["Python Basics", 70],
    ["IoT Gateways", 83],
    ["MS Office", 88],
  ],
  ai: [
    ["Prompt Engineering", 88],
    ["AI Research Synthesis", 84],
    ["Gemini Workflow Design", 80],
    ["Perplexity Source Review", 82],
    ["Claude Draft Iteration", 86],
    ["BI Automation Ideation", 84],
  ],
};

const aiTools = {
  gemini: {
    title: "Gemini account and workflow",
    setup:
      "Use gemini.google.com and sign in with a Google Account for saved activity and additional features. Personal Google Accounts, qualifying work accounts, and enabled school accounts are supported where available.",
    use:
      "Best portfolio fit: brainstorm dashboard narratives, summarize requirements, turn screenshots or documents into structured notes, and create prompt drafts for BI automation.",
    output:
      "Portfolio outcome: faster ideation for Power BI stories, AI-generated visual concepts, and clearer executive summaries before dashboard build-out.",
  },
  perplexity: {
    title: "Perplexity account and workflow",
    setup:
      "Create an account with Google, Apple, or email. Email sign-in uses a secure link or one-time verification rather than a traditional password.",
    use:
      "Best portfolio fit: research telecom, analytics, and AI topics with source-backed answers, compare vendors, and collect reference links for stakeholder notes.",
    output:
      "Portfolio outcome: stronger evidence trails for analytics recommendations and faster discovery before SQL, Power BI, or business case work.",
  },
  claude: {
    title: "Claude account and workflow",
    setup:
      "Access Claude on the web, desktop, or mobile in supported locations. Claude's help center states users must be at least 18 years old.",
    use:
      "Best portfolio fit: refine prompts, draft documentation, analyze long requirements, explain SQL/DAX logic, and iterate on portfolio copy conversationally.",
    output:
      "Portfolio outcome: cleaner technical writing, sharper problem framing, and reusable prompt patterns for analytics and automation projects.",
  },
};

const prompts = {
  sla: `Mission: Predict SLA breach risk from telecom ticket data.

Act as a senior telecom analytics architect. Review columns for ticket age, priority, domain, hops, ownership changes, alarm severity, and historical closure time.

Return:
1. Risk factors ranked by impact
2. SQL feature engineering ideas
3. Power BI DAX measures
4. Executive summary for NOC leadership
5. Data quality checks before publishing`,
  hops: `Mission: Reduce repeated ticket hops across support queues.

Analyze the ticket lifecycle and identify avoidable transfers, unclear ownership, queue loops, and missing resolution patterns.

Return:
1. Hop reduction hypotheses
2. SQL logic for first owner, last owner, and hop count
3. Dashboard visuals for queue accountability
4. Recommended operating actions
5. Expected KPI movement`,
  opex: `Mission: Find opex leakage and profitability gaps.

Compare site-level cost, incident volume, downtime, vendor effort, change activity, and revenue impact.

Return:
1. Leakage categories
2. Cost-to-serve KPIs
3. Power BI model structure
4. Savings opportunity narrative
5. CFO-ready action summary`,
};

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

function renderSkills(key) {
  skillStage.innerHTML = skills[key]
    .map(
      ([label, level]) => `
      <div class="skill-item">
        <strong>${label}</strong>
        <div class="skill-meter" aria-label="${label} level ${level} percent">
          <span style="--level:${level}%"></span>
        </div>
      </div>
    `,
    )
    .join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderSkills(tab.dataset.skill);
  });
});

renderSkills("analytics");

function renderAiTool(key) {
  if (!aiDetail || !aiTools[key]) return;
  const tool = aiTools[key];
  aiDetail.innerHTML = `
    <div>
      <span>Selected Tool</span>
      <h3>${tool.title}</h3>
    </div>
    <dl>
      <div>
        <dt>Account setup</dt>
        <dd>${tool.setup}</dd>
      </div>
      <div>
        <dt>How to use it</dt>
        <dd>${tool.use}</dd>
      </div>
      <div>
        <dt>Portfolio value</dt>
        <dd>${tool.output}</dd>
      </div>
    </dl>
  `;
}

aiCards.forEach((card) => {
  card.addEventListener("click", () => {
    aiCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    renderAiTool(card.dataset.aiTool);
  });
});

renderAiTool("gemini");

function renderPrompt(key) {
  if (!promptOutput || !prompts[key]) return;
  promptOutput.textContent = prompts[key];
}

promptChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    promptChips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    renderPrompt(chip.dataset.prompt);
  });
});

renderPrompt("sla");

function updateScrollProgress() {
  if (!scrollProgress) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

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

function toggleSound() {
  heroVideo.muted = !heroVideo.muted;
  muteToggle.textContent = heroVideo.muted ? "Sound" : "Mute";
  muteToggle.setAttribute("aria-label", heroVideo.muted ? "Unmute video" : "Mute video");
  soundHint.style.display = "none";
}

muteToggle.addEventListener("click", toggleSound);
soundHint.addEventListener("click", toggleSound);
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
