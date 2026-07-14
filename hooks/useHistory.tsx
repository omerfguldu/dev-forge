"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { pushHistoryEntry, type HistoryEntry } from "@/lib/history";
import { useLocalStorage } from "./useLocalStorage";

interface HistoryContextValue {
  history: HistoryEntry[];
  addEntry: (tool: string, snippet: string) => void;
}

const HistoryContext = createContext<HistoryContextValue | null>(null);

export function HistoryProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>(
    "devforge-history",
    [],
  );

  const addEntry = useCallback(
    (tool: string, snippet: string) => {
      setHistory((previous) =>
        pushHistoryEntry(previous, { tool, snippet, timestamp: Date.now() }),
      );
    },
    [setHistory],
  );

  const value = useMemo(() => ({ history, addEntry }), [history, addEntry]);

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
}

export function useHistory(): HistoryContextValue {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory must be used within a HistoryProvider");
  }
  return context;
}
