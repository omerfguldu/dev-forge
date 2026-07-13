"use client";

import { LoremGenerator } from "./LoremGenerator";
import { QrGenerator } from "./QrGenerator";
import { UuidGenerator } from "./UuidGenerator";

export function GeneratorsTool() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-7">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Üreticiler</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          UUID, QR Kod ve Lorem Ipsum üretimi
        </p>
      </div>

      <UuidGenerator />
      <QrGenerator />
      <LoremGenerator />
    </div>
  );
}
