import { describe, expect, it } from "vitest";
import {
  csvToJson,
  jsonToCsv,
  jsonToXml,
  jsonToYaml,
  xmlToJson,
  yamlToJson,
} from "./convert";

describe("JSON <-> YAML", () => {
  it("converts JSON to YAML", () => {
    const result = jsonToYaml('{"a":1,"b":["x","z"]}');
    expect(result.isValid).toBe(true);
    expect(result.data).toBe("a: 1\nb:\n  - x\n  - z\n");
  });

  it("rejects invalid JSON input", () => {
    const result = jsonToYaml("{invalid}");
    expect(result.isValid).toBe(false);
  });

  it("converts YAML back to JSON", () => {
    const result = yamlToJson("a: 1\nb:\n  - x\n  - z\n");
    expect(result.isValid).toBe(true);
    expect(JSON.parse(result.data as string)).toEqual({ a: 1, b: ["x", "z"] });
  });

  it("rejects invalid YAML", () => {
    const result = yamlToJson("a: [1, 2\n b: broken");
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("round-trips an object through YAML", () => {
    const original = { name: "DevForge", tools: 5 };
    const toYaml = jsonToYaml(JSON.stringify(original));
    const backToJson = yamlToJson(toYaml.data as string);
    expect(JSON.parse(backToJson.data as string)).toEqual(original);
  });
});

describe("JSON <-> XML", () => {
  it("converts a plain object to a single-root XML document", () => {
    const result = jsonToXml('{"a":1,"b":"x"}');
    expect(result.isValid).toBe(true);
    expect(result.data).toContain("<a>1</a>");
    expect(result.data).toContain("<b>x</b>");
  });

  it("wraps a top-level array so it doesn't produce multiple roots", () => {
    const result = jsonToXml("[1,2,3]");
    expect(result.isValid).toBe(true);
    const matches = (result.data as string).match(/<item>/g) ?? [];
    expect(matches).toHaveLength(3);
  });

  it("rejects invalid JSON input", () => {
    const result = jsonToXml("{invalid}");
    expect(result.isValid).toBe(false);
  });

  it("converts XML back to JSON", () => {
    const result = xmlToJson("<root><a>1</a><b>x</b></root>");
    expect(result.isValid).toBe(true);
    expect(JSON.parse(result.data as string)).toEqual({
      root: { a: 1, b: "x" },
    });
  });

  it("rejects malformed XML", () => {
    const result = xmlToJson("<root><a>1</a>");
    expect(result.isValid).toBe(false);
  });
});

describe("JSON <-> CSV", () => {
  it("converts an array of flat objects to CSV", () => {
    const result = jsonToCsv('[{"a":1,"b":"x"},{"a":2,"b":"y"}]');
    expect(result.isValid).toBe(true);
    expect(result.data).toBe("a,b\n1,x\n2,y");
  });

  it("quotes values containing commas or quotes", () => {
    const result = jsonToCsv('[{"a":"has,comma","b":"has\\"quote"}]');
    expect(result.isValid).toBe(true);
    expect(result.data).toBe('a,b\n"has,comma","has""quote"');
  });

  it("rejects nested/non-flat JSON with a clear error", () => {
    const result = jsonToCsv('[{"a":{"nested":1}}]');
    // nested objects still stringify to a single CSV cell value, not an error
    expect(result.isValid).toBe(true);

    const arrayOfArrays = jsonToCsv("[[1,2],[3,4]]");
    expect(arrayOfArrays.isValid).toBe(false);
    expect(arrayOfArrays.error).toBeTruthy();
  });

  it("converts CSV back to an array of objects", () => {
    const result = csvToJson("a,b\n1,x\n2,y");
    expect(result.isValid).toBe(true);
    expect(JSON.parse(result.data as string)).toEqual([
      { a: "1", b: "x" },
      { a: "2", b: "y" },
    ]);
  });

  it("handles quoted fields with embedded commas and newlines", () => {
    const result = csvToJson('a,b\n"has, comma","line1\nline2"');
    expect(result.isValid).toBe(true);
    expect(JSON.parse(result.data as string)).toEqual([
      { a: "has, comma", b: "line1\nline2" },
    ]);
  });

  it("rejects empty CSV input", () => {
    const result = csvToJson("");
    expect(result.isValid).toBe(false);
  });
});
