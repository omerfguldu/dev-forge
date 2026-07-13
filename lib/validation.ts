export interface ValidationResult<T> {
  isValid: boolean;
  data?: T;
  error?: string;
  line?: number;
  column?: number;
}

export type IndentOption = 2 | 4 | "tab";

export function indentToSpace(indent: IndentOption): string | number {
  return indent === "tab" ? "\t" : indent;
}
