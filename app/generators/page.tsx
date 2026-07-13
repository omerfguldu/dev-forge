import type { Metadata } from "next";
import { GeneratorsTool } from "@/components/tools/GeneratorsTool";

export const metadata: Metadata = {
  title: "Üreticiler",
  description: "UUID, QR kod ve Lorem Ipsum üretici araçları.",
};

export default function GeneratorsPage() {
  return (
    <main>
      <GeneratorsTool />
    </main>
  );
}
