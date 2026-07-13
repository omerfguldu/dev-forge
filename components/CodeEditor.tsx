"use client";

import {
  Editor,
  loader,
  type Monaco,
  type OnMount,
} from "@monaco-editor/react";
import * as monacoEditor from "monaco-editor";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

// Bundle Monaco locally instead of letting @monaco-editor/react fetch it
// from a CDN at runtime — DevForge processes everything client-side and
// shouldn't depend on a third-party host to load its editor.
loader.config({ monaco: monacoEditor });

if (typeof window !== "undefined") {
  window.MonacoEnvironment = {
    getWorker(_moduleId: string, label: string) {
      if (label === "json") {
        return new Worker(
          new URL(
            "monaco-editor/esm/vs/language/json/json.worker",
            import.meta.url,
          ),
        );
      }
      return new Worker(
        new URL("monaco-editor/esm/vs/editor/editor.worker", import.meta.url),
      );
    },
  };
}

export interface CodeEditorMarker {
  startLineNumber: number;
  startColumn: number;
  endLineNumber: number;
  endColumn: number;
  message: string;
}

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: "json" | "yaml" | "xml" | "plaintext";
  readOnly?: boolean;
  markers?: CodeEditorMarker[];
  height?: string;
  ariaLabel?: string;
}

const NO_MARKERS: CodeEditorMarker[] = [];

export function CodeEditor({
  value,
  onChange,
  language = "plaintext",
  readOnly = false,
  markers = NO_MARKERS,
  height = "100%",
  ariaLabel,
}: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(
    null,
  );
  const monacoRef = useRef<Monaco | null>(null);

  const handleMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
  };

  useEffect(() => {
    const editor = editorRef.current;
    const monaco = monacoRef.current;
    const model = editor?.getModel();
    if (!monaco || !model) return;

    monaco.editor.setModelMarkers(
      model,
      "devforge",
      markers.map((marker) => ({
        ...marker,
        severity: monaco.MarkerSeverity.Error,
      })),
    );
  }, [markers]);

  return (
    <Editor
      height={height}
      value={value}
      onChange={(next) => onChange?.(next ?? "")}
      language={language}
      theme={resolvedTheme === "light" ? "light" : "vs-dark"}
      onMount={handleMount}
      loading={
        <div className="size-full animate-pulse bg-muted" aria-hidden="true" />
      }
      options={{
        readOnly,
        minimap: { enabled: false },
        wordWrap: "on",
        fontSize: 13,
        lineHeight: 1.6,
        fontFamily: "var(--font-mono)",
        scrollBeyondLastLine: false,
        automaticLayout: true,
        ariaLabel,
      }}
    />
  );
}
