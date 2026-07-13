import type { Metadata } from "next";
import { JsonFormatterTool } from "@/components/tools/JsonFormatterTool";

export const metadata: Metadata = {
  title: "JSON Suite",
  description:
    "JSON formatlama, sıkıştırma, doğrulama ve YAML/XML/CSV dönüşümleri.",
};

export default function JsonFormatterPage() {
  return (
    <main>
      <JsonFormatterTool />
    </main>
  );
}
