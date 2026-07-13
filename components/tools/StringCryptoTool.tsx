"use client";

import { Base64Tool } from "./Base64Tool";
import { HashGenerator } from "./HashGenerator";
import { JwtDecoder } from "./JwtDecoder";
import { UrlEncoderTool } from "./UrlEncoderTool";

export function StringCryptoTool() {
  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-6 py-7">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">
          String &amp; Şifreleme
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Base64, URL kodlama, JWT çözümleme ve hash üretimi
        </p>
      </div>

      <JwtDecoder />
      <Base64Tool />
      <UrlEncoderTool />
      <HashGenerator />
    </div>
  );
}
