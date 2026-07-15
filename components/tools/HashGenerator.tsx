"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
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
import { computeHash, HASH_ALGORITHMS, type HashAlgorithm } from "@/lib/hash";

const CodeEditor = dynamic(
  () => import("@/components/CodeEditor").then((m) => m.CodeEditor),
  {
    ssr: false,
    loading: () => <div className="size-full animate-pulse bg-muted" />,
  },
);

export function HashGenerator() {
  const [input, setInput] = useState("FnStack");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("SHA-256");
  const { copied, copy } = useCopyToClipboard();
  const { addEntry } = useHistory();

  const hash = useMemo(() => computeHash(input, algorithm), [input, algorithm]);

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-bold">Hash Üretici</h2>
        <Select
          value={algorithm}
          onValueChange={(value) => setAlgorithm(value as HashAlgorithm)}
        >
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {HASH_ALGORITHMS.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-3 h-16 overflow-hidden rounded-lg border border-border">
        <CodeEditor
          value={input}
          onChange={setInput}
          language="plaintext"
          ariaLabel="Hash girişi"
        />
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2.5">
        <span className="flex-1 overflow-hidden font-mono text-[12.5px] text-ellipsis whitespace-nowrap">
          {hash}
        </span>
        <Button
          size="xs"
          onClick={() => {
            copy(hash);
            addEntry("Hash Üretici", hash);
          }}
        >
          {copied ? "Kopyalandı! ✓" : "Kopyala"}
        </Button>
      </div>
    </div>
  );
}
