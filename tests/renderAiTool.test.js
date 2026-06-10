import { describe, it, expect, beforeEach } from "vitest";
import { renderAiTool, aiTools } from "../lib.js";

let container;

beforeEach(() => {
  container = document.createElement("div");
});

describe("renderAiTool", () => {
  it("renders the tool title in an <h3>", () => {
    Object.keys(aiTools).forEach((key) => {
      renderAiTool(container, key);
      const h3 = container.querySelector("h3");
      expect(h3).not.toBeNull();
      expect(h3.textContent).toBe(aiTools[key].title);
    });
  });

  it("renders a <dl> with three <dt>/<dd> pairs", () => {
    renderAiTool(container, "gemini");
    const dts = container.querySelectorAll("dt");
    const dds = container.querySelectorAll("dd");
    expect(dts).toHaveLength(3);
    expect(dds).toHaveLength(3);
  });

  it("populates setup, use, and output fields", () => {
    Object.keys(aiTools).forEach((key) => {
      renderAiTool(container, key);
      const dds = [...container.querySelectorAll("dd")].map((el) => el.textContent);
      expect(dds[0]).toBe(aiTools[key].setup);
      expect(dds[1]).toBe(aiTools[key].use);
      expect(dds[2]).toBe(aiTools[key].output);
    });
  });

  it("shows the 'Selected Tool' label", () => {
    renderAiTool(container, "claude");
    expect(container.textContent).toContain("Selected Tool");
  });

  it("replaces previous content on subsequent calls", () => {
    renderAiTool(container, "gemini");
    renderAiTool(container, "perplexity");
    expect(container.querySelector("h3").textContent).toBe(aiTools.perplexity.title);
  });

  it("does nothing when the key does not exist", () => {
    renderAiTool(container, "unknown");
    expect(container.innerHTML).toBe("");
  });

  it("does nothing when the container is null", () => {
    expect(() => renderAiTool(null, "gemini")).not.toThrow();
  });
});
