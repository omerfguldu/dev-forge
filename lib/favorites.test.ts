import { describe, expect, it } from "vitest";
import { incrementUsage, topFavorites } from "./favorites";
import { tools } from "./tools";

describe("incrementUsage", () => {
  it("starts a new counter at 1", () => {
    expect(incrementUsage({}, "/json-formatter")).toEqual({
      "/json-formatter": 1,
    });
  });

  it("increments an existing counter without mutating the input", () => {
    const original = { "/json-formatter": 2 };
    const result = incrementUsage(original, "/json-formatter");
    expect(result).toEqual({ "/json-formatter": 3 });
    expect(original).toEqual({ "/json-formatter": 2 });
  });
});

describe("topFavorites", () => {
  it("returns an empty array when nothing has been used", () => {
    expect(topFavorites({}, tools)).toEqual([]);
  });

  it("ranks tools by usage count, most-used first", () => {
    const usage = {
      "/json-formatter": 5,
      "/converters": 10,
      "/generators": 1,
    };
    const result = topFavorites(usage, tools, 3);
    expect(result.map((tool) => tool.href)).toEqual([
      "/converters",
      "/json-formatter",
      "/generators",
    ]);
  });

  it("respects the limit", () => {
    const usage = {
      "/json-formatter": 1,
      "/converters": 2,
      "/generators": 3,
      "/diff-checker": 4,
    };
    expect(topFavorites(usage, tools, 3)).toHaveLength(3);
  });
});
