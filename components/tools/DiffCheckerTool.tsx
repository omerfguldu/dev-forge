"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { computeLineDiff, type DiffLine } from "@/lib/diff";

const CodeEditor = dynamic(
  () => import("@/components/CodeEditor").then((m) => m.CodeEditor),
  {
    ssr: false,
    loading: () => <div className="size-full animate-pulse bg-muted" />,
  },
);

const SAMPLE_ORIGINAL =
  "FnStack geliştirici araçları\nJSON, YAML, XML, CSV\nBase64 ve URL kodlama";
const SAMPLE_MODIFIED =
  "FnStack Geliştirici araç seti\nJSON, YAML, XML, CSV\nBase64, URL ve JWT araçları";

const LINE_STYLES: Record<
  DiffLine["type"],
  { background: string; color?: string; prefix: string }
> = {
  added: {
    background: "rgba(34, 160, 107, 0.12)",
    color: "#22A06B",
    prefix: "+",
  },
  removed: {
    background: "rgba(220, 76, 76, 0.12)",
    color: "#DC4C4C",
    prefix: "-",
  },
  unchanged: { background: "transparent", prefix: " " },
};

export function DiffCheckerTool() {
  const [original, setOriginal] = useState(SAMPLE_ORIGINAL);
  const [modified, setModified] = useState(SAMPLE_MODIFIED);

  const diff = useMemo(
    () => computeLineDiff(original, modified),
    [original, modified],
  );

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col px-6 py-7">
      <h1 className="text-2xl font-extrabold tracking-tight">
        Metin Karşılaştırıcı
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        İki metin arasındaki farkları görselleştirin
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex h-[260px] flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-3.5 py-2.5 text-[12.5px] font-bold text-muted-foreground">
            ORİJİNAL METİN
          </div>
          <div className="flex-1">
            <CodeEditor
              value={original}
              onChange={setOriginal}
              language="plaintext"
              ariaLabel="Orijinal metin"
            />
          </div>
        </div>
        <div className="flex h-[260px] flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-3.5 py-2.5 text-[12.5px] font-bold text-muted-foreground">
            DEĞİŞTİRİLMİŞ METİN
          </div>
          <div className="flex-1">
            <CodeEditor
              value={modified}
              onChange={setModified}
              language="plaintext"
              ariaLabel="Değiştirilmiş metin"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center gap-4 border-b border-border px-3.5 py-2.5 text-[12.5px] font-bold text-muted-foreground">
          <span>SONUÇ</span>
          <span style={{ color: "#22A06B" }}>+{diff.addedCount} eklendi</span>
          <span style={{ color: "#DC4C4C" }}>-{diff.removedCount} silindi</span>
        </div>
        <div className="max-h-[340px] overflow-y-auto py-1.5 font-mono text-[12.5px] leading-relaxed">
          {diff.lines.length === 0 ? (
            <div className="px-4 py-3 text-muted-foreground">
              Fark bulunamadı.
            </div>
          ) : (
            diff.lines.map((line, index) => {
              const style = LINE_STYLES[line.type];
              return (
                <div
                  // Line text isn't unique (repeated/blank lines collide)
                  // and the whole list is replaced wholesale on every
                  // recompute, never reordered in place, so an index key
                  // is safe here.
                  // oxlint-disable-next-line react/no-array-index-key
                  key={index}
                  className="px-4 py-0.5 whitespace-pre-wrap"
                  style={{ background: style.background, color: style.color }}
                >
                  {style.prefix} {line.text}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
