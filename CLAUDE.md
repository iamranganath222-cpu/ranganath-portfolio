# ranganath-portfolio — Project Brain

Portfolio site for T. B. Ranganath, Senior Telecommunications and Analytics Engineer.

## Tech stack

- Plain HTML + CSS + vanilla JS — no build step, no dependencies
- Single page: `index.html` / `styles.css` / `script.js`
- Assets in `assets/` (MP4 videos, PNG portrait)

## Design system

| Token | Value |
|---|---|
| `--bg` | `#06080b` (dark background) |
| `--orange` | `#ff9f43` (primary accent) |
| `--blue` | `#5fc9ff` (secondary accent) |
| `--green` | `#75d49b` (success / second brain accent) |
| `--panel` | `rgba(13,18,24,0.72)` |
| Border radius | `8px` on all panels |
| Transitions | `180ms ease` on interactive states |

## Sections

| Anchor | Description |
|---|---|
| `#hero` | Video background, Network Intelligence Console, impact ribbon |
| `#profile` | Career summary + 2×2 metric panel |
| `#skills` | Tabbed skill bars (Analytics, SQL, Telecom, Tools, AI & Prompting) |
| `#experience` | Four-role timeline |
| `#projects` | Video cards — hover to play |
| `#intelligence-os` | 4-step signal→decision framework |
| `#ai-workflow` | Gemini / Perplexity / Claude / Khoj tool cards + Prompt Lab |
| `#second-brain` | Khoj second brain showcase with stats ribbon |
| `#education` | Degree + certifications |

## Key JS data objects

- `skills` — arrays of `[label, level]` per tab key
- `aiTools` — `{ title, setup, use, output }` per tool key: `gemini`, `perplexity`, `claude`, `khoj`
- `prompts` — prompt template strings keyed by `sla`, `hops`, `opex`

## Second Brain (Khoj)

This project integrates **Khoj** (https://github.com/khoj-ai/khoj) as the persistent AI memory layer:

- 35,000+ GitHub stars · Apache 2.0 · self-hostable
- Indexes notes and documents for semantic search across sessions
- Compatible with Claude, Gemini, ChatGPT, Llama, and any API-accessible LLM
- Enables agents to surface SLA risk patterns, opex insights, and KPI trends on demand

## Dev server

```bash
python3 -m http.server 8080
```

## Commit style

Lowercase imperative: `add second brain section`, `fix mobile layout`, `update khoj skill level`
