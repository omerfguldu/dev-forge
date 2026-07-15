"use client";

import { decodeUrlText, encodeUrlText } from "@/lib/url-text";
import { EncodeDecodePanel } from "./EncodeDecodePanel";

export function UrlEncoderTool() {
  return (
    <EncodeDecodePanel
      title="URL Kodlama"
      description="Metni URL için kodlayın veya çözün"
      encode={encodeUrlText}
      decode={decodeUrlText}
      sample="https://fnstack.vercel.app/search?q=merhaba dünya"
      ariaLabelPrefix="URL kodlama"
    />
  );
}
