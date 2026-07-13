import type { Metadata } from "next";
import { StringCryptoTool } from "@/components/tools/StringCryptoTool";

export const metadata: Metadata = {
  title: "String & Şifreleme",
  description:
    "Base64 ve URL kodlayıcılar, JWT çözümleyici ve hash oluşturucu araçları.",
};

export default function StringCryptoPage() {
  return (
    <main>
      <StringCryptoTool />
    </main>
  );
}
