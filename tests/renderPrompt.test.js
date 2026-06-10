import { describe, it, expect, beforeEach } from "vitest";
import { renderPrompt, prompts } from "../lib.js";

let container;

beforeEach(() => {
  container = document.createElement("pre");
});

describe("renderPrompt", () => {
  it("sets textContent to the matching prompt for each valid key", () => {
    Object.keys(prompts).forEach((key) => {
      renderPrompt(container, key);
      expect(container.textContent).toBe(prompts[key]);
    });
  });

  it("preserves newlines in the prompt text", () => {
    renderPrompt(container, "sla");
    expect(container.textContent).toContain("\n");
  });

  it("replaces previous content on subsequent calls", () => {
    renderPrompt(container, "sla");
    renderPrompt(container, "hops");
    expect(container.textContent).toBe(prompts.hops);
    expect(container.textContent).not.toBe(prompts.sla);
  });

  it("does not set innerHTML — uses textContent only", () => {
    renderPrompt(container, "sla");
    expect(container.textContent).toBe(prompts.sla);
    expect(container.innerHTML).toBe(prompts.sla);
  });

  it("does nothing when the key does not exist", () => {
    renderPrompt(container, "invalid");
    expect(container.textContent).toBe("");
  });

  it("does nothing when the container is null", () => {
    expect(() => renderPrompt(null, "sla")).not.toThrow();
  });
});
