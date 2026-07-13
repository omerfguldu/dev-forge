import { describe, expect, it } from "vitest";
import { decodeUrlText, encodeUrlText } from "./url-text";

describe("encodeUrlText", () => {
  it("percent-encodes reserved and non-ASCII characters", () => {
    expect(encodeUrlText("a b/c?d=çğ").data).toBe(
      "a%20b%2Fc%3Fd%3D%C3%A7%C4%9F",
    );
  });
});

describe("decodeUrlText", () => {
  it("decodes a percent-encoded string back to the original", () => {
    const encoded = encodeUrlText("a b/c?d=çğ").data as string;
    expect(decodeUrlText(encoded).data).toBe("a b/c?d=çğ");
  });

  it("rejects malformed percent-escape sequences", () => {
    const result = decodeUrlText("100% off%");
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
  });
});
