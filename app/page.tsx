import Link from "next/link";

const toolGroups = [
  {
    href: "/json-formatter",
    badge: "{ }",
    label: "JSON Suite",
    description: "Formatlayıcı, minifier ve doğrulayıcı",
  },
  {
    href: "/converters",
    badge: "⇄",
    label: "Dönüştürücü",
    description: "JSON, YAML, XML ve CSV dönüşümleri",
  },
  {
    href: "/string-crypto",
    badge: "Aa",
    label: "String & Şifreleme",
    description: "Base64, URL kodlama ve JWT çözümleyici",
  },
  {
    href: "/diff-checker",
    badge: "±",
    label: "Metin Karşılaştırıcı",
    description: "İki metin arasındaki farkları görselleştirir",
  },
  {
    href: "/generators",
    badge: "✧",
    label: "Üreticiler",
    description: "UUID, hash, QR kod ve Lorem Ipsum",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-extrabold tracking-tight">DevForge</h1>
        <p className="mt-2 text-muted-foreground">
          Geliştirici araçlarını tek, hızlı ve tamamen istemci taraflı bir
          arayüzde toplayan yardımcı araç seti.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {toolGroups.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
                {tool.badge}
              </span>
              <span>
                <span className="block text-sm font-semibold">
                  {tool.label}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {tool.description}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
