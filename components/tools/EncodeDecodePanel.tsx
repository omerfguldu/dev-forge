"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";
import type { ValidationResult } from "@/lib/validation";

const CodeEditor = dynamic(
  () => import("@/components/CodeEditor").then((m) => m.CodeEditor),
  {
    ssr: false,
    loading: () => <div className="size-full animate-pulse bg-muted" />,
  },
);

interface EncodeDecodePanelProps {
  title: string;
  description: string;
  encode: (text: string) => ValidationResult<string>;
  decode: (text: string) => ValidationResult<string>;
  sample: string;
  ariaLabelPrefix: string;
}

export function EncodeDecodePanel({
  title,
  description,
  encode,
  decode,
  sample,
  ariaLabelPrefix,
}: EncodeDecodePanelProps) {
  const encodedSample = useMemo(
    () => encode(sample).data ?? "",
    [encode, sample],
  );
  const [encoding, setEncoding] = useState(true);
  const [input, setInput] = useState(sample);
  const { copied, copy } = useCopyToClipboard();

  const result = useMemo(
    () => (encoding ? encode(input) : decode(input)),
    [input, encoding, encode, decode],
  );

  function setMode(nextEncoding: boolean) {
    if (nextEncoding === encoding) return;
    setEncoding(nextEncoding);
    setInput(nextEncoding ? sample : encodedSample);
  }

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold">{title}</h2>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={encoding ? "default" : "outline"}
            onClick={() => setMode(true)}
          >
            Kodla
          </Button>
          <Button
            size="sm"
            variant={!encoding ? "default" : "outline"}
            onClick={() => setMode(false)}
          >
            Çöz
          </Button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex h-[220px] flex-col overflow-hidden rounded-lg border border-border">
          <div className="border-b border-border px-3 py-2 text-[12px] font-bold text-muted-foreground">
            GİRİŞ
          </div>
          <div className="flex-1">
            <CodeEditor
              value={input}
              onChange={setInput}
              language="plaintext"
              ariaLabel={`${ariaLabelPrefix} girişi`}
            />
          </div>
        </div>

        <div
          className={cn(
            "flex h-[220px] flex-col overflow-hidden rounded-lg border",
            result.isValid ? "border-border" : "border-destructive/50",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-[12px] font-bold text-muted-foreground">
              ÇIKTI
            </span>
            <Button
              size="xs"
              disabled={!result.isValid}
              onClick={() => result.data && copy(result.data)}
            >
              {copied ? "Kopyalandı! ✓" : "Kopyala"}
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            {result.isValid ? (
              <CodeEditor
                value={result.data ?? ""}
                language="plaintext"
                readOnly
                ariaLabel={`${ariaLabelPrefix} çıktısı`}
              />
            ) : (
              <div className="p-3 font-mono text-[13px] text-destructive">
                {result.error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
