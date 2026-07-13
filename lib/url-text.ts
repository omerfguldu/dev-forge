import type { ValidationResult } from "./validation";

export function encodeUrlText(text: string): ValidationResult<string> {
  try {
    return { isValid: true, data: encodeURIComponent(text) };
  } catch (err) {
    return {
      isValid: false,
      error: err instanceof Error ? err.message : "URL kodlama başarısız oldu.",
    };
  }
}

export function decodeUrlText(text: string): ValidationResult<string> {
  try {
    return { isValid: true, data: decodeURIComponent(text) };
  } catch {
    return { isValid: false, error: "Geçersiz URL kodlamalı girdi." };
  }
}
