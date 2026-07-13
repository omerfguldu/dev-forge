import { describe, expect, it } from "vitest";
import { buildJsonTree, formatJson, minifyJson, validateJson } from "./json";

describe("validateJson", () => {
  it("parses valid JSON", () => {
    const result = validateJson('{"a":1}');
    expect(result.isValid).toBe(true);
    expect(result.data).toEqual({ a: 1 });
  });

  it("reports line and column for invalid JSON", () => {
    const result = validateJson('{\n  "a": 1,\n  b: 2\n}');
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
    expect(result.line).toBe(3);
    expect(result.column).toBeGreaterThan(0);
  });

  it("does not throw on empty input", () => {
    const result = validateJson("");
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
  });
});

describe("formatJson", () => {
  it("indents with the given number of spaces", () => {
    const result = formatJson('{"a":1,"b":2}', 2);
    expect(result.isValid).toBe(true);
    expect(result.data).toBe('{\n  "a": 1,\n  "b": 2\n}');
  });

  it("indents with tabs", () => {
    const result = formatJson('{"a":1}', "tab");
    expect(result.data).toBe('{\n\t"a": 1\n}');
  });

  it("propagates validation errors instead of formatting", () => {
    const result = formatJson("{invalid}", 2);
    expect(result.isValid).toBe(false);
    expect(result.data).toBeUndefined();
  });
});

describe("minifyJson", () => {
  it("collapses whitespace", () => {
    const result = minifyJson('{\n  "a": 1,\n  "b": [1, 2]\n}');
    expect(result.isValid).toBe(true);
    expect(result.data).toBe('{"a":1,"b":[1,2]}');
  });
});

describe("buildJsonTree", () => {
  it("flattens nested objects and arrays with dot/bracket paths", () => {
    const entries = buildJsonTree({ a: 1, b: { c: [true, null] } });
    const keys = entries.map((e) => e.key);
    expect(keys).toEqual(["$", "a", "b", "b.c", "b.c[0]", "b.c[1]"]);
  });

  it("describes primitive types and previews", () => {
    const entries = buildJsonTree("hello");
    expect(entries).toEqual([{ key: "$", type: "string", preview: '"hello"' }]);
  });

  it("summarizes containers by size", () => {
    const entries = buildJsonTree({ a: 1, b: 2 });
    expect(entries[0]).toEqual({
      key: "$",
      type: "object",
      preview: "{2 keys}",
    });
  });
});
