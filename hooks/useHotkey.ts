"use client";

import { useEffect, useRef } from "react";

function matchesCombo(event: KeyboardEvent, combo: string): boolean {
  const parts = combo.toLowerCase().split("+");
  const key = parts[parts.length - 1];
  const needsMod = parts.includes("mod");

  const mod = event.metaKey || event.ctrlKey;
  if (needsMod !== mod) return false;

  return event.key.toLowerCase() === key;
}

export function useHotkey(combo: string, callback: () => void): void {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (matchesCombo(event, combo)) {
        event.preventDefault();
        callbackRef.current();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [combo]);
}
