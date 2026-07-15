import { describe, expect, it } from "vitest";
import { decodeBase64, encodeBase64 } from "./base64";

describe("encodeBase64", () => {
  it("encodes ASCII text", () => {
    expect(encodeBase64("hello").data).toBe("aGVsbG8=");
  });

  it("encodes UTF-8 text with multi-byte characters", () => {
    const result = encodeBase64("FnStack çalışıyor 🚀");
    expect(result.isValid).toBe(true);
    expect(decodeBase64(result.data as string).data).toBe(
      "FnStack çalışıyor 🚀",
    );
  });

  it("encodes empty string", () => {
    expect(encodeBase64("").data).toBe("");
  });
});

describe("decodeBase64", () => {
  it("decodes valid base64", () => {
    const result = decodeBase64("aGVsbG8=");
    expect(result.isValid).toBe(true);
    expect(result.data).toBe("hello");
  });

  it("tolerates whitespace and missing padding", () => {
    expect(decodeBase64("aGVsbG8").data).toBe("hello");
    expect(decodeBase64("aGVs\nbG8=").data).toBe("hello");
  });

  it("rejects invalid base64 characters", () => {
    const result = decodeBase64("not-valid-base64!!!");
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
  });
});
