import { describe, it, expect, beforeEach } from "vitest";
import { updateScrollProgress } from "../lib.js";

let el;

beforeEach(() => {
  el = document.createElement("div");
  el.style.width = "";
});

describe("updateScrollProgress", () => {
  it("sets width to 0% at the top of the page", () => {
    updateScrollProgress(el, 0, 2000, 800);
    expect(el.style.width).toBe("0%");
  });

  it("sets width to 100% at the bottom of the page", () => {
    updateScrollProgress(el, 1200, 2000, 800);
    expect(el.style.width).toBe("100%");
  });

  it("calculates the correct percentage midway through the page", () => {
    updateScrollProgress(el, 600, 2000, 800);
    expect(el.style.width).toBe("50%");
  });

  it("clamps to 0% when scrollY is negative", () => {
    updateScrollProgress(el, -50, 2000, 800);
    expect(el.style.width).toBe("0%");
  });

  it("clamps to 100% when scrollY exceeds maxScroll", () => {
    updateScrollProgress(el, 9999, 2000, 800);
    expect(el.style.width).toBe("100%");
  });

  it("sets width to 0% when the page fits in the viewport (no scroll possible)", () => {
    updateScrollProgress(el, 0, 800, 800);
    expect(el.style.width).toBe("0%");
  });

  it("sets width to 0% when scrollHeight is smaller than innerHeight", () => {
    updateScrollProgress(el, 0, 400, 800);
    expect(el.style.width).toBe("0%");
  });

  it("does nothing when the element is null", () => {
    expect(() => updateScrollProgress(null, 100, 2000, 800)).not.toThrow();
  });
});
