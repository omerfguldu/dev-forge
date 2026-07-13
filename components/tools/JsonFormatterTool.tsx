"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  buildJsonTree,
  formatJson,
  minifyJson,
  validateJson,
} from "@/lib/json";
import { cn } from "@/lib/utils";
import type { IndentOption } from "@/lib/validation";

const CodeEditor = dynamic(
  () => import("@/components/CodeEditor").then((m) => m.CodeEditor),
  {
    ssr: false,
    loading: () => <div className="size-full animate-pulse bg-muted" />,
  },
);

const SAMPLE_JSON = `{
  "name": "DevForge",
  "tools": ["json", "yaml", "xml", "csv"],
  "active": true
}`;

const INDENT_OPTIONS = [2, 4, "tab"] as const;

export function JsonFormatterTool() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [indent, setIndent] = useState<IndentOption>(2);
  const [minify, setMinify] = useState(false);
  const [treeView, setTreeView] = useState(false);
  const { copied, copy } = useCopyToClipboard();

  const validation = useMemo(() => validateJson(input), [input]);

  const formatted = useMemo(() => {
    if (!validation.isValid) return null;
    return minify ? minifyJson(input) : formatJson(input, indent);
  }, [input, indent, minify, validation.isValid]);

  const tree = useMemo(() => {
    if (!validation.isValid || !treeView) return null;
    return buildJsonTree(validation.data);
  }, [validation, treeView]);

  const markers = useMemo(() => {
    if (validation.isValid || validation.line === undefined) return [];
    const column = validation.column ?? 1;
    return [
      {
        startLineNumber: validation.line,
        startColumn: column,
        endLineNumber: validation.line,
        endColumn: column + 1,
        message: validation.error ?? "Geçersiz JSON",
      },
    ];
  }, [validation]);

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col px-6 py-7">
      <h1 className="text-2xl font-extrabold tracking-tight">JSON Suite</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        JSON biçimlendirme, sıkıştırma ve doğrulama
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card p-2.5">
        <span className="mr-1 text-[12.5px] font-bold text-muted-foreground">
          GİRİNTİ:
        </span>
        {INDENT_OPTIONS.map((option) => (
          <Button
            key={option}
            size="sm"
            variant={indent === option && !minify ? "default" : "outline"}
            disabled={minify}
            onClick={() => setIndent(option)}
          >
            {option === "tab" ? "Tab" : `${option} boşluk`}
          </Button>
        ))}
        <div className="mx-1 h-5 w-px bg-border" />
        <Button
          size="sm"
          variant={minify ? "default" : "outline"}
          onClick={() => setMinify((value) => !value)}
        >
          {minify ? "Girintili Göster" : "Sıkıştır"}
        </Button>
        <Button
          size="sm"
          variant={treeView ? "default" : "outline"}
          onClick={() => setTreeView((value) => !value)}
        >
          {treeView ? "Metin Görünümü" : "Ağaç Görünümü"}
        </Button>
        <Button size="sm" variant="outline" onClick={() => setInput("")}>
          Temizle
        </Button>
        <Button
          size="sm"
          className="ml-auto"
          disabled={!formatted?.isValid}
          onClick={() => formatted?.data && copy(formatted.data)}
        >
          {copied ? "Kopyalandı! ✓" : "Kopyala"}
        </Button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex h-[480px] flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-3.5 py-2.5 text-[12.5px] font-bold text-muted-foreground">
            GİRİŞ
          </div>
          <div className="flex-1">
            <CodeEditor
              value={input}
              onChange={setInput}
              language="json"
              markers={markers}
              ariaLabel="JSON girişi"
            />
          </div>
        </div>

        <div
          className={cn(
            "flex h-[480px] flex-col overflow-hidden rounded-xl border bg-card",
            validation.isValid ? "border-border" : "border-destructive/50",
          )}
        >
          <div className="flex items-center justify-between border-b border-border px-3.5 py-2.5 text-[12.5px] font-bold text-muted-foreground">
            <span>ÇIKTI</span>
            <span
              className={
                validation.isValid ? "text-primary" : "text-destructive"
              }
            >
              {validation.isValid ? "Geçerli JSON" : "Geçersiz JSON"}
            </span>
          </div>
          <div className="flex-1 overflow-hidden">
            {!validation.isValid ? (
              <div className="p-4 font-mono text-[13px] text-destructive">
                {validation.error}
                {validation.line !== undefined && (
                  <span className="mt-1 block text-muted-foreground">
                    Satır {validation.line}, Sütun {validation.column}
                  </span>
                )}
              </div>
            ) : treeView ? (
              <div className="h-full overflow-y-auto p-3.5 font-mono text-[13px]">
                {tree?.map((entry) => (
                  <div
                    key={entry.key}
                    className="flex gap-2 border-b border-dashed border-border py-1"
                  >
                    <span className="font-bold text-primary">{entry.key}</span>
                    <span className="text-muted-foreground">{entry.type}</span>
                    <span className="truncate opacity-75">{entry.preview}</span>
                  </div>
                ))}
              </div>
            ) : (
              <CodeEditor
                value={formatted?.data ?? ""}
                language="json"
                readOnly
                ariaLabel="JSON çıktısı"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
