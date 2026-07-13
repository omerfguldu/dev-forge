import { diffLines } from "diff";

export interface DiffLine {
  type: "added" | "removed" | "unchanged";
  text: string;
}

export interface DiffResult {
  lines: DiffLine[];
  addedCount: number;
  removedCount: number;
}

export function computeLineDiff(
  original: string,
  modified: string,
): DiffResult {
  const changes = diffLines(original, modified, { ignoreNewlineAtEof: true });
  const lines: DiffLine[] = [];
  let addedCount = 0;
  let removedCount = 0;

  for (const change of changes) {
    const type = change.added
      ? "added"
      : change.removed
        ? "removed"
        : "unchanged";

    // diffLines keeps trailing newlines in `value`, so splitting on "\n"
    // leaves one phantom empty string at the end — drop it.
    const segments = change.value.split("\n");
    if (segments[segments.length - 1] === "") segments.pop();

    for (const text of segments) {
      lines.push({ type, text });
      if (type === "added") addedCount++;
      if (type === "removed") removedCount++;
    }
  }

  return { lines, addedCount, removedCount };
}
