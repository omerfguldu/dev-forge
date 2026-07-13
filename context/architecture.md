# Architecture: DevForge (Developer Utility Suite)

## Genel Mimari Prensipler

DevForge, **SEO öncelikli ve tamamen istemci taraflı çalışan bir Statik Site (SSG - Static Site Generation)** olarak kurgulanmıştır. Bu mimari karar şu avantajları sağlar:
*   **Sıfır Sunucu Maliyeti:** Site tamamen statik HTML/JS çıktısı verdiği için Vercel veya Cloudflare Pages gibi platformlarda sıfır maliyetle küresel CDN'de dağıtılır.
*   **Maksimum Güvenlik (Privacy-First):** Geliştiricilerin girdikleri hassas veriler hiçbir sunucuya gitmez, tarayıcıda işlenir.
*   **Arama Motoru Uyumluluğu (SEO):** Her araç (örn: `/json-formatter`) statik bir HTML sayfası olarak ön-derlenir (SSG). Böylece Google botları sayfayı JS çalıştırmadan anında tarayabilir ve dizine ekleyebilir.
*   **Performans & Hız:** Sunucu gidiş-dönüşü olmadığı ve kodlar lazy-load (tembel yükleme) ile yüklendiği için Core Web Vitals skorları (LCP, FID) 100/100 olacaktır.

---

## Teknoloji Yığını (Tech Stack)

*   **Çatı (Framework):** **Next.js (React + TypeScript)**
    *   Statik Dağıtım: `next.config.js` içinde `output: 'export'` ayarı kullanılarak tamamen istemci taraflı statik HTML/JS/CSS çıktıları (SSG) üretilecektir.
*   **Yönlendirme & SEO (Routing & Metadata):** Next.js App Router. Her araç için özel sayfa klasör yapısı (örn: `/app/json-formatter/page.tsx`) kurulacak ve her araca özel arama motoru başlığı/açıklaması Next.js `metadata` API ile yönetilecektir.
*   **Stil (Styling):** **Tailwind CSS + Shadcn UI (Radix UI tabanlı)**
    *   Tema geçişlerinde CSS Değişkenleri (Variables) kullanılarak aydınlık ve karanlık mod renk şemaları otomatik ve akıcı şekilde yönetilecektir.
*   **Simge Kütüphanesi:** Lucide React.
*   **Kod Editör Entegrasyonu:** Monaco Editor (`@monaco-editor/react`). Büyük verilerin ilk sayfa yüklenme hızını düşürmesini engellemek için `next/dynamic` ile dinamik olarak (lazy-load) yüklenecektir.

---

## Klasör Yapısı (Folder Structure)

Uygulamanın mantıksal katmanları Next.js App Router yapısına göre ayrılacaktır:

```
/app
  ├── layout.tsx         # Küresel layout (Sidebar + Header + Tema sağlayıcı)
  ├── page.tsx           # Ana Sayfa / Dashboard
  ├── /json-formatter    # JSON Suite sayfası
  ├── /converters        # Dönüştürücü sayfası
  ├── /string-crypto     # String ve Şifreleme sayfası
  ├── /diff-checker      # Metin Karşılaştırıcı sayfası
  └── /generators        # Üreticiler sayfası
/components
  ├── /ui                # Shadcn UI ilkel bileşenleri (Button, Input vb.)
  ├── Sidebar.tsx        # Sol menü bileşeni
  ├── Header.tsx         # Üst bar
  └── CmdPalette.tsx     # Komut Paleti
/hooks                   # Özel React hook'ları (useLocalStorage, useHotkey vb.)
/styles                  # Tailwind küresel stilleri (globals.css)
/utils                   # **Saf (Pure) Algoritmalar** (Formatlama, dönüştürme ve hash işlevleri)
```

---

## Veri Akışı ve Durum Yönetimi (State Management)

*   **Local-first State:** Araçların girdi ve çıktıları her sayfanın kendi yerel bileşen durumunda (`useState`) tutulur. Sayfalar arası geçişlerde veri kaybını önlemek veya geçmişi tutmak için `localStorage` tabanlı özel bir hook (`useLocalStorage`) kullanılır.
*   **Saf Fonksiyonlar (Pure Utilities):** Her aracın çekirdek dönüştürme fonksiyonu (örn: `formatJson`, `decodeBase64`) UI bileşeninden bağımsız, `/utils` klasöründe saf fonksiyonlar olarak yazılır. Bu sayede birim testleri (unit tests) kolayca yazılabilir.
*   **Komut Paleti Durumu (Command Palette State):** Küresel klavye kısayolu dinleyicisi (`useHotkey`) yardımıyla `Cmd+K` tetiklendiğinde komut paleti açılır ve kullanıcıyı yönlendirir.
