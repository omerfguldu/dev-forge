import { describe, expect, it } from "vitest";
import { computeLineDiff } from "./diff";

describe("computeLineDiff", () => {
  it("marks unchanged lines when both texts are identical", () => {
    const result = computeLineDiff("a\nb\nc", "a\nb\nc");
    expect(result.lines).toEqual([
      { type: "unchanged", text: "a" },
      { type: "unchanged", text: "b" },
      { type: "unchanged", text: "c" },
    ]);
    expect(result.addedCount).toBe(0);
    expect(result.removedCount).toBe(0);
  });

  it("detects an added line", () => {
    const result = computeLineDiff("a\nb", "a\nb\nc");
    expect(result.lines).toEqual([
      { type: "unchanged", text: "a" },
      { type: "unchanged", text: "b" },
      { type: "added", text: "c" },
    ]);
    expect(result.addedCount).toBe(1);
  });

  it("detects a removed line", () => {
    const result = computeLineDiff("a\nb\nc", "a\nc");
    expect(result.lines).toEqual([
      { type: "unchanged", text: "a" },
      { type: "removed", text: "b" },
      { type: "unchanged", text: "c" },
    ]);
    expect(result.removedCount).toBe(1);
  });

  it("detects a changed line as a removal followed by an addition", () => {
    const result = computeLineDiff("hello world", "hello there");
    expect(result.lines).toEqual([
      { type: "removed", text: "hello world" },
      { type: "added", text: "hello there" },
    ]);
  });

  it("returns no lines for two empty strings", () => {
    const result = computeLineDiff("", "");
    expect(result.lines).toEqual([]);
  });
});
