import { base64ToBytes, URL_SAFE_ALPHABET } from "./base64";
import type { ValidationResult } from "./validation";

export interface DecodedJwt {
  header: string;
  payload: string;
  signature: string;
}

function decodeSegment(segment: string): unknown {
  const bytes = base64ToBytes(segment, URL_SAFE_ALPHABET);
  const json = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  return JSON.parse(json);
}

export function decodeJwt(token: string): ValidationResult<DecodedJwt> {
  const parts = token.trim().split(".");
  if (parts.length !== 3) {
    return {
      isValid: false,
      error:
        "Bir JWT üç nokta ile ayrılmış Header.Payload.Signature içermelidir.",
    };
  }
  const [headerPart, payloadPart, signaturePart] = parts;

  try {
    const header = JSON.stringify(decodeSegment(headerPart), null, 2);
    const payload = JSON.stringify(decodeSegment(payloadPart), null, 2);
    return {
      isValid: true,
      data: { header, payload, signature: signaturePart },
    };
  } catch {
    return {
      isValid: false,
      error: "Geçersiz JWT: Header veya Payload çözümlenemedi.",
    };
  }
}
