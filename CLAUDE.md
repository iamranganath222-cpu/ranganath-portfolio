# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A hand-crafted, standalone interactive portfolio for T. B. Ranganath (Senior Telecommunications & Analytics Engineer). It is **pure vanilla HTML/CSS/JavaScript** — no build tools, no package manager, no framework, no transpiler. The entire site is three files: `index.html`, `styles.css`, and `script.js`, plus a `assets/` directory of video/image files.

## Running the Site

Open `index.html` directly in a browser, or serve it with any static file server:

```bash
# Python (no install needed)
python3 -m http.server 8080

# Node (if available)
npx serve .
```

There is no build step, no `npm install`, and no CI pipeline.

## Architecture

All content lives in three files with clear separation of concerns:

- **`index.html`** — Full semantic structure. Sections in order: hero, profile, skills, experience, projects, intelligence-os, ai-workflow, education/certs, footer. Dynamic content areas (skill meters, AI tool cards, prompt lab) are empty shells populated by `script.js` at runtime.
- **`styles.css`** — Design system via CSS custom properties at `:root`. Single responsive breakpoint at `840px`. Animations defined as `@keyframes` at the bottom of the file.
- **`script.js`** — All data (skills, AI tool configs, prompt templates) is stored as plain JS objects at the top of the file. Functions render that data into the DOM. Canvas particle animation runs via `requestAnimationFrame`.

### Dynamic Rendering Pattern

The three interactive sections work the same way: a data object in `script.js` → a `render*()` function → injected into a container `div` in `index.html`. The active state is toggled by click handlers that call the render function with a key.

- **Skill tabs:** `skills` object → `renderSkills(key)` → `#skills-grid`
- **AI tool cards:** `aiTools` object → `renderAiTool(key)` → `#ai-detail`
- **Prompt lab:** `prompts` object → `renderPrompt(key)` → `#prompt-output`

### Design System

All colors, spacing, and blur values are CSS variables in `:root` (top of `styles.css`). Key variables: `--bg`, `--panel`, `--orange`, `--blue`, `--green`, `--text`, `--muted`. Do not introduce hardcoded hex colors — always reference or extend the existing variables.

### Canvas Particle System

The ambient background animation (`script.js`, bottom section) creates up to 96 particles capped by viewport width. It is DPI-aware (scales to `devicePixelRatio`). The canvas sits behind all content via `position: fixed; mix-blend-mode: screen` in CSS.

## Key Conventions

- **No external dependencies.** Do not add CDN links, npm packages, or frameworks.
- **Skill/project data lives in `script.js`.** To add a skill, project, or prompt, edit the data objects at the top of `script.js` — do not hardcode content in HTML.
- **Section layout is HTML.** The overall page structure, navigation links, and static copy (experience timeline, certifications) are in `index.html`.
- **Animations use `@keyframes` + CSS classes.** The `.reveal` class + `IntersectionObserver` in `script.js` drive scroll-triggered reveals. Add new entrance animations the same way.
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` is already handled in `styles.css` — keep it updated when adding new animations.
- **Videos** use `muted loop autoplay playsinline` for background/card contexts. The hero video additionally has manual play/pause/mute controls wired in `script.js`.
