import {
  indentToSpace,
  type IndentOption,
  type ValidationResult,
} from "./validation";

function getLineColumn(
  text: string,
  position: number,
): {
  line: number;
  column: number;
} {
  let line = 1;
  let lastNewline = -1;
  for (let i = 0; i < position && i < text.length; i++) {
    if (text[i] === "\n") {
      line++;
      lastNewline = i;
    }
  }
  return { line, column: position - lastNewline };
}

function extractErrorLocation(
  message: string,
  input: string,
): { line: number; column: number } | null {
  const lineColumnMatch = /line (\d+) column (\d+)/.exec(message);
  if (lineColumnMatch) {
    return {
      line: Number(lineColumnMatch[1]),
      column: Number(lineColumnMatch[2]),
    };
  }
  const positionMatch = /position (\d+)/.exec(message);
  if (positionMatch) {
    return getLineColumn(input, Number(positionMatch[1]));
  }
  return null;
}

export function validateJson(input: string): ValidationResult<unknown> {
  try {
    return { isValid: true, data: JSON.parse(input) };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Geçersiz JSON";
    const location = extractErrorLocation(message, input);
    return {
      isValid: false,
      error: message,
      line: location?.line,
      column: location?.column,
    };
  }
}

export function formatJson(
  input: string,
  indent: IndentOption = 2,
): ValidationResult<string> {
  const result = validateJson(input);
  if (!result.isValid) {
    return {
      isValid: false,
      error: result.error,
      line: result.line,
      column: result.column,
    };
  }
  return {
    isValid: true,
    data: JSON.stringify(result.data, null, indentToSpace(indent)),
  };
}

export function minifyJson(input: string): ValidationResult<string> {
  const result = validateJson(input);
  if (!result.isValid) {
    return {
      isValid: false,
      error: result.error,
      line: result.line,
      column: result.column,
    };
  }
  return { isValid: true, data: JSON.stringify(result.data) };
}

export interface JsonTreeEntry {
  key: string;
  type: string;
  preview: string;
}

function jsonValueType(value: unknown): string {
  if (value === null) return "null";
  if (Array.isArray(value)) return "array";
  return typeof value;
}

function jsonValuePreview(value: unknown): string {
  const type = jsonValueType(value);
  switch (type) {
    case "array":
      return `[${(value as unknown[]).length} items]`;
    case "object":
      return `{${Object.keys(value as object).length} keys}`;
    case "string":
      return JSON.stringify(value);
    default:
      return String(value);
  }
}

export function buildJsonTree(value: unknown): JsonTreeEntry[] {
  const entries: JsonTreeEntry[] = [];

  function walk(current: unknown, path: string) {
    entries.push({
      key: path || "$",
      type: jsonValueType(current),
      preview: jsonValuePreview(current),
    });

    if (jsonValueType(current) === "object") {
      for (const [key, child] of Object.entries(
        current as Record<string, unknown>,
      )) {
        walk(child, path ? `${path}.${key}` : key);
      }
    } else if (jsonValueType(current) === "array") {
      (current as unknown[]).forEach((child, index) => {
        walk(child, `${path}[${index}]`);
      });
    }
  }

  walk(value, "");
  return entries;
}
