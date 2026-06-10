import { describe, it, expect } from "vitest";
import { skills, aiTools, prompts } from "../lib.js";

describe("skills data structure", () => {
  const EXPECTED_KEYS = ["analytics", "data", "telecom", "tools", "ai"];

  it("has all five category keys", () => {
    EXPECTED_KEYS.forEach((key) => {
      expect(skills).toHaveProperty(key);
    });
  });

  it("each category contains exactly six skills", () => {
    EXPECTED_KEYS.forEach((key) => {
      expect(skills[key]).toHaveLength(6);
    });
  });

  it("every skill entry is a [string, number] tuple", () => {
    EXPECTED_KEYS.forEach((key) => {
      skills[key].forEach(([label, level]) => {
        expect(typeof label).toBe("string");
        expect(label.length).toBeGreaterThan(0);
        expect(typeof level).toBe("number");
      });
    });
  });

  it("all proficiency levels are within 0–100", () => {
    EXPECTED_KEYS.forEach((key) => {
      skills[key].forEach(([, level]) => {
        expect(level).toBeGreaterThanOrEqual(0);
        expect(level).toBeLessThanOrEqual(100);
      });
    });
  });
});

describe("aiTools data structure", () => {
  const EXPECTED_KEYS = ["gemini", "perplexity", "claude"];
  const REQUIRED_FIELDS = ["title", "setup", "use", "output"];

  it("has all three tool keys", () => {
    EXPECTED_KEYS.forEach((key) => {
      expect(aiTools).toHaveProperty(key);
    });
  });

  it("each tool has the four required string fields", () => {
    EXPECTED_KEYS.forEach((key) => {
      REQUIRED_FIELDS.forEach((field) => {
        expect(typeof aiTools[key][field]).toBe("string");
        expect(aiTools[key][field].length).toBeGreaterThan(0);
      });
    });
  });
});

describe("prompts data structure", () => {
  const EXPECTED_KEYS = ["sla", "hops", "opex"];

  it("has all three prompt keys", () => {
    EXPECTED_KEYS.forEach((key) => {
      expect(prompts).toHaveProperty(key);
    });
  });

  it("every prompt is a non-empty string", () => {
    EXPECTED_KEYS.forEach((key) => {
      expect(typeof prompts[key]).toBe("string");
      expect(prompts[key].length).toBeGreaterThan(0);
    });
  });

  it("every prompt contains a Mission line", () => {
    EXPECTED_KEYS.forEach((key) => {
      expect(prompts[key]).toMatch(/^Mission:/);
    });
  });

  it("every prompt contains a numbered Return section", () => {
    EXPECTED_KEYS.forEach((key) => {
      expect(prompts[key]).toContain("Return:");
      expect(prompts[key]).toContain("1.");
      expect(prompts[key]).toContain("5.");
    });
  });
});
