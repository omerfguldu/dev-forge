import { describe, expect, it } from "vitest";
import { computeHash } from "./hash";

describe("computeHash", () => {
  it("matches known test vectors for the empty string", () => {
    expect(computeHash("", "MD5")).toBe("d41d8cd98f00b204e9800998ecf8427e");
    expect(computeHash("", "SHA-1")).toBe(
      "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    );
    expect(computeHash("", "SHA-256")).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
  });

  it('matches known test vectors for "abc"', () => {
    expect(computeHash("abc", "MD5")).toBe("900150983cd24fb0d6963f7d28e17f72");
    expect(computeHash("abc", "SHA-256")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
  });

  it("produces a different digest per algorithm for the same input", () => {
    const md5 = computeHash("FnStack", "MD5");
    const sha256 = computeHash("FnStack", "SHA-256");
    expect(md5).not.toBe(sha256);
    expect(md5).toHaveLength(32);
    expect(sha256).toHaveLength(64);
  });
});
