import { describe, expect, it } from "vitest";
import { decodeJwt } from "./jwt";

// The canonical jwt.io example token — a public sample, not a real credential.
const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

describe("decodeJwt", () => {
  it("decodes the header and payload as pretty-printed JSON", () => {
    const result = decodeJwt(SAMPLE_JWT);
    expect(result.isValid).toBe(true);
    expect(JSON.parse(result.data!.header)).toEqual({
      alg: "HS256",
      typ: "JWT",
    });
    expect(JSON.parse(result.data!.payload)).toEqual({
      sub: "1234567890",
      name: "John Doe",
      iat: 1516239022,
    });
  });

  it("keeps the signature as the raw base64url segment", () => {
    const result = decodeJwt(SAMPLE_JWT);
    expect(result.data!.signature).toBe(
      "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    );
  });

  it("rejects tokens that don't have exactly three segments", () => {
    const result = decodeJwt("not.a.jwt.token");
    expect(result.isValid).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("rejects a token with an unparsable payload", () => {
    const result = decodeJwt("aGVsbG8=.aGVsbG8=.sig");
    expect(result.isValid).toBe(false);
  });
});
