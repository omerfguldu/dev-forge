import { describe, expect, it } from "vitest";
import { generateUuids } from "./uuid";

const UUID_V4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe("generateUuids", () => {
  it("returns the requested number of UUIDs", () => {
    expect(generateUuids(5)).toHaveLength(5);
    expect(generateUuids(1)).toHaveLength(1);
    expect(generateUuids(0)).toHaveLength(0);
  });

  it("returns valid v4 UUIDs", () => {
    for (const uuid of generateUuids(10)) {
      expect(uuid).toMatch(UUID_V4_PATTERN);
    }
  });

  it("does not repeat UUIDs within a batch", () => {
    const uuids = generateUuids(20);
    expect(new Set(uuids).size).toBe(20);
  });
});
