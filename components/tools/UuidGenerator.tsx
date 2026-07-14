"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useHistory } from "@/hooks/useHistory";
import { generateUuids } from "@/lib/uuid";

const COUNT_OPTIONS = [3, 5, 10] as const;

function UuidRow({ uuid }: { uuid: string }) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted px-3 py-2 font-mono text-[12.5px]">
      <span className="truncate">{uuid}</span>
      <button
        type="button"
        onClick={() => copy(uuid)}
        aria-label={copied ? "Kopyalandı" : "Satırı kopyala"}
        className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        {copied ? "✓" : "⧉"}
      </button>
    </div>
  );
}

export function UuidGenerator() {
  const [count, setCount] = useState(5);
  // Generating UUIDs during the initial render would run on the server
  // too, and since crypto.randomUUID() is non-deterministic the server
  // and client HTML would never match — start empty and fill in on mount.
  const [uuids, setUuids] = useState<string[]>([]);
  const { copied, copy } = useCopyToClipboard();
  const { addEntry } = useHistory();

  useEffect(() => {
    setUuids(generateUuids(5));
  }, []);

  function regenerate(nextCount: number) {
    setUuids(generateUuids(nextCount));
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold">UUID</h2>
        <div className="flex items-center gap-2">
          <Select
            value={String(count)}
            onValueChange={(value) => {
              const next = Number(value);
              setCount(next);
              regenerate(next);
            }}
          >
            <SelectTrigger size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COUNT_OPTIONS.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option} adet
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" onClick={() => regenerate(count)}>
            Yeniden Üret
          </Button>
        </div>
      </div>

      <div className="mt-3 flex max-h-[280px] flex-col gap-1.5 overflow-y-auto">
        {uuids.map((uuid) => (
          <UuidRow key={uuid} uuid={uuid} />
        ))}
      </div>

      <Button
        size="sm"
        variant="outline"
        className="mt-3 w-full"
        onClick={() => {
          const joined = uuids.join("\n");
          copy(joined);
          addEntry("UUID", joined);
        }}
      >
        {copied ? "Kopyalandı! ✓" : "Tümünü Kopyala"}
      </Button>
    </div>
  );
}
