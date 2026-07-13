"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { decodeJwt } from "@/lib/jwt";

const CodeEditor = dynamic(
  () => import("@/components/CodeEditor").then((m) => m.CodeEditor),
  {
    ssr: false,
    loading: () => <div className="size-full animate-pulse bg-muted" />,
  },
);

const SAMPLE_JWT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const CARD_STYLES = {
  header: {
    background: "rgba(147, 51, 234, 0.10)",
    borderColor: "rgba(147, 51, 234, 0.35)",
    color: "#9333EA",
  },
  payload: {
    background: "rgba(59, 130, 246, 0.10)",
    borderColor: "rgba(59, 130, 246, 0.35)",
    color: "#3B82F6",
  },
  signature: {
    background: "rgba(16, 185, 129, 0.10)",
    borderColor: "rgba(16, 185, 129, 0.35)",
    color: "#10B981",
  },
} as const;

function JwtCard({
  label,
  accent,
  children,
}: {
  label: string;
  accent: keyof typeof CARD_STYLES;
  children: React.ReactNode;
}) {
  const style = CARD_STYLES[accent];
  return (
    <div
      className="rounded-[10px] border p-3.5"
      style={{ background: style.background, borderColor: style.borderColor }}
    >
      <div
        className="text-[11px] font-extrabold tracking-wider"
        style={{ color: style.color }}
      >
        {label}
      </div>
      <pre className="mt-1.5 overflow-x-auto font-mono text-[12.5px] whitespace-pre-wrap text-foreground">
        {children}
      </pre>
    </div>
  );
}

export function JwtDecoder() {
  const [token, setToken] = useState(SAMPLE_JWT);
  const decoded = useMemo(() => decodeJwt(token), [token]);

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <h2 className="text-sm font-bold">JWT Çözücü</h2>
      <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="h-[220px] overflow-hidden rounded-lg border border-border">
          <CodeEditor
            value={token}
            onChange={setToken}
            language="plaintext"
            ariaLabel="JWT girişi"
          />
        </div>
        <div className="flex flex-col gap-2.5">
          {decoded.isValid ? (
            <>
              <JwtCard label="HEADER" accent="header">
                {decoded.data!.header}
              </JwtCard>
              <JwtCard label="PAYLOAD" accent="payload">
                {decoded.data!.payload}
              </JwtCard>
              <JwtCard label="SIGNATURE" accent="signature">
                {decoded.data!.signature}
              </JwtCard>
            </>
          ) : (
            <div className="rounded-[10px] border border-destructive/50 bg-destructive/10 p-3.5 text-[13px] text-destructive">
              {decoded.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
