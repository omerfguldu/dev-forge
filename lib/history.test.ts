import { describe, expect, it } from "vitest";
import {
  formatRelativeTime,
  pushHistoryEntry,
  type HistoryEntry,
} from "./history";

describe("pushHistoryEntry", () => {
  it("prepends the new entry", () => {
    const existing: HistoryEntry[] = [
      { tool: "JSON Suite", snippet: "old", timestamp: 1 },
    ];
    const result = pushHistoryEntry(existing, {
      tool: "Base64",
      snippet: "new",
      timestamp: 2,
    });
    expect(result[0]).toEqual({ tool: "Base64", snippet: "new", timestamp: 2 });
    expect(result[1]).toEqual(existing[0]);
  });

  it("caps the list at the given max, dropping the oldest", () => {
    const existing: HistoryEntry[] = Array.from({ length: 10 }, (_, i) => ({
      tool: "JSON Suite",
      snippet: `entry-${i}`,
      timestamp: i,
    }));
    const result = pushHistoryEntry(
      existing,
      { tool: "Base64", snippet: "newest", timestamp: 99 },
      10,
    );
    expect(result).toHaveLength(10);
    expect(result[0].snippet).toBe("newest");
    expect(result.at(-1)?.snippet).toBe("entry-8");
  });

  it("truncates long snippets to 80 characters", () => {
    const longSnippet = "x".repeat(200);
    const [entry] = pushHistoryEntry([], {
      tool: "Lorem Ipsum",
      snippet: longSnippet,
      timestamp: 1,
    });
    expect(entry.snippet).toHaveLength(80);
  });
});

describe("formatRelativeTime", () => {
  const now = 1_000_000;

  it('returns "az önce" for anything under a minute', () => {
    expect(formatRelativeTime(now - 30_000, now)).toBe("az önce");
  });

  it("formats minutes", () => {
    expect(formatRelativeTime(now - 5 * 60_000, now)).toBe("5dk önce");
  });

  it("formats hours", () => {
    expect(formatRelativeTime(now - 3 * 3_600_000, now)).toBe("3sa önce");
  });

  it("formats days", () => {
    expect(formatRelativeTime(now - 2 * 86_400_000, now)).toBe("2g önce");
  });
});
