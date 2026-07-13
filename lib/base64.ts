import type { ValidationResult } from "./validation";

export const STANDARD_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
export const URL_SAFE_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";

export function bytesToBase64(
  bytes: Uint8Array,
  alphabet: string,
  pad: boolean,
): string {
  let output = "";
  let i = 0;
  for (; i + 3 <= bytes.length; i += 3) {
    const chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
    output += alphabet[(chunk >> 18) & 63];
    output += alphabet[(chunk >> 12) & 63];
    output += alphabet[(chunk >> 6) & 63];
    output += alphabet[chunk & 63];
  }

  const remaining = bytes.length - i;
  if (remaining === 1) {
    const chunk = bytes[i] << 16;
    output += alphabet[(chunk >> 18) & 63];
    output += alphabet[(chunk >> 12) & 63];
    if (pad) output += "==";
  } else if (remaining === 2) {
    const chunk = (bytes[i] << 16) | (bytes[i + 1] << 8);
    output += alphabet[(chunk >> 18) & 63];
    output += alphabet[(chunk >> 12) & 63];
    output += alphabet[(chunk >> 6) & 63];
    if (pad) output += "=";
  }

  return output;
}

export function base64ToBytes(input: string, alphabet: string): Uint8Array {
  const clean = input.replace(/\s+/g, "").replace(/=+$/, "");
  const lookup = new Map<string, number>();
  for (let i = 0; i < alphabet.length; i++) lookup.set(alphabet[i], i);

  const bytes: number[] = [];
  let buffer = 0;
  let bitsCollected = 0;
  for (const char of clean) {
    const value = lookup.get(char);
    if (value === undefined) {
      throw new Error(`Geçersiz base64 karakteri: "${char}"`);
    }
    buffer = (buffer << 6) | value;
    bitsCollected += 6;
    if (bitsCollected >= 8) {
      bitsCollected -= 8;
      bytes.push((buffer >> bitsCollected) & 0xff);
    }
  }
  return new Uint8Array(bytes);
}

export function encodeBase64(text: string): ValidationResult<string> {
  try {
    const bytes = new TextEncoder().encode(text);
    return {
      isValid: true,
      data: bytesToBase64(bytes, STANDARD_ALPHABET, true),
    };
  } catch (err) {
    return {
      isValid: false,
      error:
        err instanceof Error ? err.message : "Base64 kodlama başarısız oldu.",
    };
  }
}

export function decodeBase64(text: string): ValidationResult<string> {
  try {
    const bytes = base64ToBytes(text, STANDARD_ALPHABET);
    return {
      isValid: true,
      data: new TextDecoder("utf-8", { fatal: true }).decode(bytes),
    };
  } catch {
    return { isValid: false, error: "Geçersiz Base64 girdisi." };
  }
}
