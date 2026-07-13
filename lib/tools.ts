export interface Tool {
  href: string;
  badge: string;
  label: string;
  description: string;
  group: string;
}

export const tools: Tool[] = [
  {
    href: "/json-formatter",
    badge: "{ }",
    label: "JSON Suite",
    description: "Formatlayıcı, minifier ve doğrulayıcı",
    group: "JSON & VERİ",
  },
  {
    href: "/converters",
    badge: "⇄",
    label: "Dönüştürücü",
    description: "JSON, YAML, XML ve CSV dönüşümleri",
    group: "JSON & VERİ",
  },
  {
    href: "/string-crypto",
    badge: "Aa",
    label: "String & Şifreleme",
    description: "Base64, URL kodlama ve JWT çözümleyici",
    group: "METİN & GÜVENLİK",
  },
  {
    href: "/diff-checker",
    badge: "±",
    label: "Metin Karşılaştırıcı",
    description: "İki metin arasındaki farkları görselleştirir",
    group: "METİN & GÜVENLİK",
  },
  {
    href: "/generators",
    badge: "✧",
    label: "Üreticiler",
    description: "UUID, hash, QR kod ve Lorem Ipsum",
    group: "ÜRETİCİLER",
  },
];

export const toolGroups: { title: string; items: Tool[] }[] = [
  "JSON & VERİ",
  "METİN & GÜVENLİK",
  "ÜRETİCİLER",
].map((title) => ({
  title,
  items: tools.filter((tool) => tool.group === title),
}));
