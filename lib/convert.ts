import { XMLBuilder, XMLParser, XMLValidator } from "fast-xml-parser";
import { dump as dumpYaml, load as loadYaml } from "js-yaml";
import { validateJson } from "./json";
import {
  indentToSpace,
  type IndentOption,
  type ValidationResult,
} from "./validation";

function errorResult(err: unknown, fallback: string): ValidationResult<string> {
  return {
    isValid: false,
    error: err instanceof Error ? err.message : fallback,
  };
}

export function jsonToYaml(input: string): ValidationResult<string> {
  const parsed = validateJson(input);
  if (!parsed.isValid) {
    return {
      isValid: false,
      error: parsed.error,
      line: parsed.line,
      column: parsed.column,
    };
  }
  try {
    return { isValid: true, data: dumpYaml(parsed.data) };
  } catch (err) {
    return errorResult(err, "YAML dönüşümü başarısız oldu.");
  }
}

export function yamlToJson(
  input: string,
  indent: IndentOption = 2,
): ValidationResult<string> {
  try {
    const data = loadYaml(input);
    return {
      isValid: true,
      data: JSON.stringify(data, null, indentToSpace(indent)),
    };
  } catch (err) {
    return errorResult(err, "Geçersiz YAML.");
  }
}

const xmlParser = new XMLParser();
const xmlBuilder = new XMLBuilder({ format: true, indentBy: "  " });

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function jsonToXml(input: string): ValidationResult<string> {
  const parsed = validateJson(input);
  if (!parsed.isValid) {
    return {
      isValid: false,
      error: parsed.error,
      line: parsed.line,
      column: parsed.column,
    };
  }
  try {
    // XML requires exactly one root element: a plain object maps directly
    // onto it, anything else (array/primitive) is nested under a synthetic
    // <item> so arrays still repeat as siblings instead of duplicate roots.
    const wrapped = isPlainObject(parsed.data)
      ? { root: parsed.data }
      : { root: { item: parsed.data } };
    return { isValid: true, data: xmlBuilder.build(wrapped) };
  } catch (err) {
    return errorResult(err, "XML dönüşümü başarısız oldu.");
  }
}

export function xmlToJson(
  input: string,
  indent: IndentOption = 2,
): ValidationResult<string> {
  // XMLParser.parse() is lenient by design and won't throw on malformed
  // markup (e.g. unclosed tags), so well-formedness is checked explicitly.
  const validation = XMLValidator.validate(input);
  if (validation !== true) {
    return {
      isValid: false,
      error: validation.err.msg,
      line: validation.err.line,
      column: validation.err.col,
    };
  }
  try {
    const data = xmlParser.parse(input);
    return {
      isValid: true,
      data: JSON.stringify(data, null, indentToSpace(indent)),
    };
  } catch (err) {
    return errorResult(err, "Geçersiz XML.");
  }
}

function csvEscape(value: string): string {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function stringifyCsvValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

export function jsonToCsv(input: string): ValidationResult<string> {
  const parsed = validateJson(input);
  if (!parsed.isValid) {
    return {
      isValid: false,
      error: parsed.error,
      line: parsed.line,
      column: parsed.column,
    };
  }

  const rows = Array.isArray(parsed.data) ? parsed.data : [parsed.data];
  if (rows.length === 0) {
    return { isValid: true, data: "" };
  }
  if (!rows.every(isPlainObject)) {
    return {
      isValid: false,
      error:
        'CSV dönüşümü yalnızca düz obje dizilerini destekler (örn. [{"a":1}]).',
    };
  }

  const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const lines = [headers.map(csvEscape).join(",")];
  for (const row of rows) {
    lines.push(
      headers
        .map((header) => csvEscape(stringifyCsvValue(row[header])))
        .join(","),
    );
  }
  return { isValid: true, data: lines.join("\n") };
}

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  let i = 0;

  while (i < text.length) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i++;
        continue;
      }
      field += char;
      i++;
      continue;
    }
    if (char === '"') {
      inQuotes = true;
      i++;
      continue;
    }
    if (char === ",") {
      row.push(field);
      field = "";
      i++;
      continue;
    }
    if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i++;
      continue;
    }
    field += char;
    i++;
  }
  row.push(field);
  if (row.length > 1 || row[0] !== "") rows.push(row);
  return rows;
}

export function csvToJson(
  input: string,
  indent: IndentOption = 2,
): ValidationResult<string> {
  if (input.trim() === "") {
    return { isValid: false, error: "CSV girdisi boş." };
  }

  const rows = parseCsv(input.trimEnd());
  const [header, ...dataRows] = rows;
  if (!header) {
    return { isValid: false, error: "CSV girdisi boş." };
  }

  const objects = dataRows
    .filter((row) => !(row.length === 1 && row[0] === ""))
    .map((row) => {
      const obj: Record<string, string> = {};
      header.forEach((key, index) => {
        obj[key] = row[index] ?? "";
      });
      return obj;
    });

  return {
    isValid: true,
    data: JSON.stringify(objects, null, indentToSpace(indent)),
  };
}
