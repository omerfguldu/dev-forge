import type { Metadata } from "next";
import { ConvertersTool } from "@/components/tools/ConvertersTool";

export const metadata: Metadata = {
  title: "Dönüştürücü",
  description: "JSON, YAML, XML ve CSV formatları arasında dönüşüm araçları.",
};

export default function ConvertersPage() {
  return (
    <main>
      <ConvertersTool />
    </main>
  );
}
