import { describe, it, expect, beforeEach } from "vitest";
import { renderSkills, skills } from "../lib.js";

let container;

beforeEach(() => {
  container = document.createElement("div");
});

describe("renderSkills", () => {
  it("renders one skill-item per entry for each valid key", () => {
    Object.keys(skills).forEach((key) => {
      renderSkills(container, key);
      const items = container.querySelectorAll(".skill-item");
      expect(items).toHaveLength(skills[key].length);
    });
  });

  it("renders the skill label in a <strong> element", () => {
    renderSkills(container, "analytics");
    const labels = [...container.querySelectorAll("strong")].map((el) => el.textContent);
    skills.analytics.forEach(([label]) => {
      expect(labels).toContain(label);
    });
  });

  it("sets the --level CSS custom property on the meter span", () => {
    renderSkills(container, "analytics");
    const spans = container.querySelectorAll(".skill-meter span");
    spans.forEach((span, i) => {
      const expected = `--level:${skills.analytics[i][1]}%`;
      expect(span.getAttribute("style")).toContain(expected);
    });
  });

  it("sets an aria-label containing the skill name and level", () => {
    renderSkills(container, "telecom");
    const meters = container.querySelectorAll(".skill-meter");
    meters.forEach((meter, i) => {
      const [label, level] = skills.telecom[i];
      expect(meter.getAttribute("aria-label")).toContain(label);
      expect(meter.getAttribute("aria-label")).toContain(String(level));
    });
  });

  it("replaces previous content on subsequent calls", () => {
    renderSkills(container, "analytics");
    renderSkills(container, "tools");
    const labels = [...container.querySelectorAll("strong")].map((el) => el.textContent);
    skills.tools.forEach(([label]) => expect(labels).toContain(label));
    skills.analytics.forEach(([label]) => expect(labels).not.toContain(label));
  });

  it("does nothing when the key does not exist", () => {
    renderSkills(container, "nonexistent");
    expect(container.innerHTML).toBe("");
  });

  it("does nothing when the container is null", () => {
    expect(() => renderSkills(null, "analytics")).not.toThrow();
  });
});
