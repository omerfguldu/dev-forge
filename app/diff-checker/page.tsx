import type { Metadata } from "next";
import { DiffCheckerTool } from "@/components/tools/DiffCheckerTool";

export const metadata: Metadata = {
  title: "Metin Karşılaştırıcı",
  description:
    "İki metin arasındaki satır ve kelime farklarını görselleştirir.",
};

export default function DiffCheckerPage() {
  return (
    <main>
      <DiffCheckerTool />
    </main>
  );
}
