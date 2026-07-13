import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Metin Karşılaştırıcı",
  description:
    "İki metin arasındaki satır ve kelime farklarını görselleştirir.",
};

export default function DiffCheckerPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl font-extrabold tracking-tight">
          Metin Karşılaştırıcı
        </h1>
        <p className="mt-2 text-muted-foreground">
          Diff görüntüleme aracı yakında burada olacak.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-primary hover:underline"
        >
          ← Ana sayfaya dön
        </Link>
      </div>
    </main>
  );
}
