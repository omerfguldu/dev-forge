import { describe, expect, it } from "vitest";
import { generateLorem } from "./lorem";

describe("generateLorem", () => {
  it("returns an empty array for a non-positive count", () => {
    expect(generateLorem("paragraph", 0)).toEqual([]);
    expect(generateLorem("word", -1)).toEqual([]);
  });

  it("word mode returns a single capitalized, period-terminated blob", () => {
    const [result] = generateLorem("word", 12);
    expect(result).toMatch(/^[A-Z].*\.$/);
    // 12 words joined by single spaces, ignoring the trailing period.
    expect(result.slice(0, -1).split(" ")).toHaveLength(12);
  });

  it("paragraph mode returns the requested number of paragraphs", () => {
    const paragraphs = generateLorem("paragraph", 3);
    expect(paragraphs).toHaveLength(3);
    for (const paragraph of paragraphs) {
      expect(paragraph).toMatch(/^[A-Z]/);
      expect(paragraph.trim().endsWith(".")).toBe(true);
    }
  });

  it("list mode returns the requested number of sentence items", () => {
    const items = generateLorem("list", 5);
    expect(items).toHaveLength(5);
    for (const item of items) {
      expect(item).toMatch(/^[A-Z].*\.$/);
    }
  });

  it("produces different output across calls (non-deterministic)", () => {
    const a = generateLorem("paragraph", 1)[0];
    const b = generateLorem("paragraph", 1)[0];
    // Astronomically unlikely to collide with a 60-word random bank.
    expect(a).not.toBe(b);
  });
});
