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
import {
  csvToJson,
  jsonToCsv,
  jsonToXml,
  jsonToYaml,
  xmlToJson,
  yamlToJson,
} from "@/lib/convert";
import { cn } from "@/lib/utils";
import type { ValidationResult } from "@/lib/validation";

const CodeEditor = dynamic(
  () => import("@/components/CodeEditor").then((m) => m.CodeEditor),
  {
    ssr: false,
    loading: () => <div className="size-full animate-pulse bg-muted" />,
  },
);

type OtherFormat = "yaml" | "xml" | "csv";

const FORMAT_LABELS: Record<OtherFormat, string> = {
  yaml: "YAML",
  xml: "XML",
  csv: "CSV",
};

const CONVERTERS: Record<
  OtherFormat,
  {
    toOther: (input: string) => ValidationResult<string>;
    toJson: (input: string) => ValidationResult<string>;
  }
> = {
  yaml: { toOther: jsonToYaml, toJson: yamlToJson },
  xml: { toOther: jsonToXml, toJson: xmlToJson },
  csv: { toOther: jsonToCsv, toJson: csvToJson },
};

const SAMPLES: Record<"json" | OtherFormat, string> = {
  json: '{\n  "name": "FnStack",\n  "version": "0.1.0"\n}',
  yaml: "name: FnStack\nversion: 0.1.0\n",
  xml: "<root>\n  <name>FnStack</name>\n  <version>0.1.0</version>\n</root>",
  csv: "name,version\nFnStack,0.1.0",
};

export function ConvertersTool() {
  const [otherFormat, setOtherFormat] = useState<OtherFormat>("yaml");
  const [jsonIsSource, setJsonIsSource] = useState(true);
  const [input, setInput] = useState(SAMPLES.json);
  const { copied, copy } = useCopyToClipboard();
  const { addEntry } = useHistory();

  const sourceLanguage = jsonIsSource ? "json" : otherFormat;
  const targetLanguage = jsonIsSource ? otherFormat : "json";

  const result = useMemo(() => {
    const converter = CONVERTERS[otherFormat];
    return jsonIsSource ? converter.toOther(input) : converter.toJson(input);
  }, [input, otherFormat, jsonIsSource]);

  function handleOtherFormatChange(next: OtherFormat) {
    setOtherFormat(next);
    // Only the source side needs a fresh sample — changing the target
    // format doesn't invalidate whatever the user already typed as input.
    if (!jsonIsSource) {
      setInput(SAMPLES[next]);
    }
  }

  function handleSwap() {
    const nextJsonIsSource = !jsonIsSource;
    setJsonIsSource(nextJsonIsSource);
    setInput(nextJsonIsSource ? SAMPLES.json : SAMPLES[otherFormat]);
  }

  const formatSelect = (
    <Select
      value={otherFormat}
      onValueChange={(value) => handleOtherFormatChange(value as OtherFormat)}
    >
      <SelectTrigger size="sm">
        <SelectValue>
          {(value: OtherFormat) => FORMAT_LABELS[value]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(FORMAT_LABELS) as OtherFormat[]).map((format) => (
          <SelectItem key={format} value={format}>
            {FORMAT_LABELS[format]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  const jsonBadge = (
    <span className="rounded-md border border-border bg-muted px-2 py-1 text-[12.5px] font-semibold">
      JSON
    </span>
  );

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col px-6 py-7">
      <h1 className="text-2xl font-extrabold tracking-tight">Dönüştürücü</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        JSON, YAML, XML ve CSV arasında anlık dönüşüm
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex h-[480px] flex-col overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border px-3.5 py-2.5">
            <span className="text-[12px] font-bold text-muted-foreground">
              KAYNAK
            </span>
            {jsonIsSource ? jsonBadge : formatSelect}
            <Button
              size="icon-sm"
              variant="outline"
              className="ml-auto"
              onClick={handleSwap}
              aria-label="Kaynak ve hedefi değiştir"
            >
              ⇄
            </Button>
          </div>
          <div className="flex-1">
            <CodeEditor
              value={input}
              onChange={setInput}
              language={sourceLanguage === "csv" ? "plaintext" : sourceLanguage}
              ariaLabel="Dönüştürücü girişi"
            />
          </div>
        </div>

        <div
          className={cn(
            "flex h-[480px] flex-col overflow-hidden rounded-xl border bg-card",
            result.isValid ? "border-border" : "border-destructive/50",
          )}
        >
          <div className="flex items-center justify-between gap-2 border-b border-border px-3.5 py-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-bold text-muted-foreground">
                HEDEF
              </span>
              {jsonIsSource ? formatSelect : jsonBadge}
            </div>
            <Button
              size="sm"
              disabled={!result.isValid}
              onClick={() => {
                if (!result.data) return;
                copy(result.data);
                addEntry("Dönüştürücü", result.data);
              }}
            >
              {copied ? "Kopyalandı! ✓" : "Kopyala"}
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            {result.isValid ? (
              <CodeEditor
                value={result.data ?? ""}
                language={
                  targetLanguage === "csv" ? "plaintext" : targetLanguage
                }
                readOnly
                ariaLabel="Dönüştürücü çıktısı"
              />
            ) : (
              <div className="p-4 font-mono text-[13px] text-destructive">
                {result.error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
