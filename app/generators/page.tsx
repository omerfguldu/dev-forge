import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Üreticiler",
  description: "UUID, hash, QR kod ve Lorem Ipsum üretici araçları.",
};

export default function GeneratorsPage() {
  return (
    <main className="flex flex-1 flex-col px-6 py-16">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-2xl font-extrabold tracking-tight">Üreticiler</h1>
        <p className="mt-2 text-muted-foreground">
          UUID, hash, QR kod ve Lorem Ipsum üretici araçları yakında burada
          olacak.
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
