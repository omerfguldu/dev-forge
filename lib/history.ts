export interface HistoryEntry {
  tool: string;
  snippet: string;
  timestamp: number;
}

const MAX_ENTRIES = 10;
const SNIPPET_LENGTH = 80;

export function pushHistoryEntry(
  history: HistoryEntry[],
  entry: Omit<HistoryEntry, "snippet"> & { snippet: string },
  max: number = MAX_ENTRIES,
): HistoryEntry[] {
  const trimmed: HistoryEntry = {
    ...entry,
    snippet: entry.snippet.slice(0, SNIPPET_LENGTH),
  };
  return [trimmed, ...history].slice(0, max);
}

export function formatRelativeTime(
  timestamp: number,
  now: number = Date.now(),
): string {
  const seconds = Math.max(0, Math.round((now - timestamp) / 1000));
  if (seconds < 60) return "az önce";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes}dk önce`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}sa önce`;
  const days = Math.round(hours / 24);
  return `${days}g önce`;
}
