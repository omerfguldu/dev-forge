"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { generateLorem, type LoremMode } from "@/lib/lorem";

const MODE_LABELS: Record<LoremMode, string> = {
  word: "Kelime",
  paragraph: "Paragraf",
  list: "Liste",
};

const MODES = Object.keys(MODE_LABELS) as LoremMode[];

export function LoremGenerator() {
  const [mode, setMode] = useState<LoremMode>("paragraph");
  const [count, setCount] = useState(3);
  // Generating on the server would produce different random text than the
  // client's own initial render (same hydration hazard as UuidGenerator),
  // so start empty and fill in after mount.
  const [items, setItems] = useState<string[]>([]);
  const { copied, copy } = useCopyToClipboard();

  useEffect(() => {
    setItems(generateLorem("paragraph", 3));
  }, []);

  function regenerate(nextMode: LoremMode, nextCount: number) {
    setItems(generateLorem(nextMode, nextCount));
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold">Lorem Ipsum</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {MODES.map((option) => (
              <Button
                key={option}
                size="sm"
                variant={mode === option ? "default" : "outline"}
                onClick={() => {
                  setMode(option);
                  regenerate(option, count);
                }}
              >
                {MODE_LABELS[option]}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Adet: {count}</span>
            <input
              type="range"
              min={1}
              max={10}
              value={count}
              onChange={(event) => {
                const next = Number(event.target.value);
                setCount(next);
                regenerate(mode, next);
              }}
              className="w-32"
              aria-label="Üretilecek adet"
            />
          </div>
          <Button size="sm" onClick={() => regenerate(mode, count)}>
            Yeniden Üret
          </Button>
        </div>
      </div>

      <div className="mt-3 max-h-[260px] overflow-y-auto rounded-lg border border-border bg-muted p-3.5 text-[13.5px] leading-relaxed">
        {mode === "list" ? (
          <ul className="list-disc space-y-1.5 pl-4">
            {items.map((item, index) => (
              // Items are freshly generated, non-unique lorem sentences with
              // no natural id, and the whole list is replaced wholesale
              // each regeneration — an index key is safe here.
              // oxlint-disable-next-line react/no-array-index-key
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col gap-2.5">
            {items.map((item, index) => (
              // oxlint-disable-next-line react/no-array-index-key
              <p key={index}>{item}</p>
            ))}
          </div>
        )}
      </div>

      <Button
        size="sm"
        variant="outline"
        className="mt-3 w-full"
        onClick={() => copy(items.join("\n\n"))}
      >
        {copied ? "Kopyalandı! ✓" : "Kopyala"}
      </Button>
    </div>
  );
}
