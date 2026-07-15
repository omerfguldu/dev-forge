"use client";

import { decodeBase64, encodeBase64 } from "@/lib/base64";
import { EncodeDecodePanel } from "./EncodeDecodePanel";

export function Base64Tool() {
  return (
    <EncodeDecodePanel
      title="Base64"
      description="Metni Base64'e kodlayın veya Base64'ten çözün"
      encode={encodeBase64}
      decode={decodeBase64}
      sample="FnStack geliştirici araç seti"
      ariaLabelPrefix="Base64"
    />
  );
}
