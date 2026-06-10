export const skills = {
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

export const aiTools = {
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

export const prompts = {
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

export function renderSkills(container, key) {
  if (!container || !skills[key]) return;
  container.innerHTML = skills[key]
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

export function renderAiTool(container, key) {
  if (!container || !aiTools[key]) return;
  const tool = aiTools[key];
  container.innerHTML = `
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

export function renderPrompt(container, key) {
  if (!container || !prompts[key]) return;
  container.textContent = prompts[key];
}

export function updateScrollProgress(el, scrollY, scrollHeight, innerHeight) {
  if (!el) return;
  const maxScroll = scrollHeight - innerHeight;
  const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
  el.style.width = `${Math.min(100, Math.max(0, progress))}%`;
}

export function toggleSound(video, muteBtn, hintEl) {
  video.muted = !video.muted;
  muteBtn.textContent = video.muted ? "Sound" : "Mute";
  muteBtn.setAttribute("aria-label", video.muted ? "Unmute video" : "Mute video");
  if (hintEl) hintEl.style.display = "none";
}
