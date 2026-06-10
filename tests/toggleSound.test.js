import { describe, it, expect, beforeEach } from "vitest";
import { toggleSound } from "../lib.js";

let video, muteBtn, hintEl;

beforeEach(() => {
  video = document.createElement("video");
  video.muted = true;

  muteBtn = document.createElement("button");
  muteBtn.textContent = "Sound";
  muteBtn.setAttribute("aria-label", "Unmute video");

  hintEl = document.createElement("button");
  hintEl.style.display = "block";
});

describe("toggleSound — muted → unmuted", () => {
  it("unmutes the video", () => {
    toggleSound(video, muteBtn, hintEl);
    expect(video.muted).toBe(false);
  });

  it("updates button text to 'Mute'", () => {
    toggleSound(video, muteBtn, hintEl);
    expect(muteBtn.textContent).toBe("Mute");
  });

  it("updates aria-label to 'Mute video'", () => {
    toggleSound(video, muteBtn, hintEl);
    expect(muteBtn.getAttribute("aria-label")).toBe("Mute video");
  });

  it("hides the sound hint", () => {
    toggleSound(video, muteBtn, hintEl);
    expect(hintEl.style.display).toBe("none");
  });
});

describe("toggleSound — unmuted → muted", () => {
  beforeEach(() => {
    video.muted = false;
    muteBtn.textContent = "Mute";
    muteBtn.setAttribute("aria-label", "Mute video");
  });

  it("mutes the video", () => {
    toggleSound(video, muteBtn, hintEl);
    expect(video.muted).toBe(true);
  });

  it("updates button text to 'Sound'", () => {
    toggleSound(video, muteBtn, hintEl);
    expect(muteBtn.textContent).toBe("Sound");
  });

  it("updates aria-label to 'Unmute video'", () => {
    toggleSound(video, muteBtn, hintEl);
    expect(muteBtn.getAttribute("aria-label")).toBe("Unmute video");
  });
});

describe("toggleSound — round-trip", () => {
  it("returns to original state after two calls", () => {
    const initialMuted = video.muted;
    toggleSound(video, muteBtn, hintEl);
    toggleSound(video, muteBtn, hintEl);
    expect(video.muted).toBe(initialMuted);
  });
});

describe("toggleSound — without hintEl", () => {
  it("does not throw when hintEl is null", () => {
    expect(() => toggleSound(video, muteBtn, null)).not.toThrow();
  });

  it("still toggles the video muted state when hintEl is null", () => {
    toggleSound(video, muteBtn, null);
    expect(video.muted).toBe(false);
  });
});
