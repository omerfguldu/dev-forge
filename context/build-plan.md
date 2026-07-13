# Build Plan: DevForge (Developer Utility Suite)

Uygulamanın aşamalı olarak geliştirilmesi, hata takibini kolaylaştırmak ve erken sürümlerle test yapabilmek adına kritik önem taşır.

---

## 🛠️ Aşama 1: Temel Kurulum ve İskelet (Süre: 1 Gün)
*   **1.1. Projenin Başlatılması:** `npx create-next-app@latest` ile TypeScript ve Tailwind CSS seçilerek Next.js projesinin oluşturulması. `next.config.js` içinde `output: 'export'` ayarının yapılması.
*   **1.2. Shadcn UI Kurulumu:** `npx shadcn@latest init` ile Shadcn UI altyapısının projeye entegre edilmesi.
*   **1.3. Klasör Yapısının Hazırlanması:** Next.js App Router düzenine göre `/app`, `/components`, `/hooks` ve `/utils` klasör yapısının oluşturulması.
*   **1.4. Yönlendirme ve SEO Altyapısı:** `/app` altında her araç için alt klasör ve `page.tsx` rotalarının açılması, her sayfa için `metadata` SEO tanımlarının yapılması.
*   **1.5. Test ve Kod Standartları Altyapısının Kurulması (Playwright, Vitest, Oxlint & Prettier):** 
    *   Test kütüphanelerinin kurulması: `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test`
    *   Playwright tarayıcılarının yüklenmesi: `npx playwright install`
    *   Oxlint ve Prettier'ın kurulması: `npm install -D oxlint prettier`
    *   Oxlint yapılandırma dosyasının oluşturulması: `npx oxlint --init` ile config dosyasının oluşturulması ve Next.js kurallarının aktif edilmesi.
    *   `package.json` içerisine test ve lint scriptlerinin eklenmesi:
        *   `"test": "vitest run"`
        *   `"test:watch": "vitest"`
        *   `"test:e2e": "playwright test"`
        *   `"lint": "oxlint"`
        *   `"lint:fix": "oxlint --fix"`
        *   `"format": "prettier --write ."`
    *   Kök dizindeki `test-preferences.json` dosyasının doğrulanması.

---

## 🎨 Aşama 2: Ana Düzen ve Navigasyon (Süre: 2 Gün)
*   **2.1. Sidebar & Header Layout:** Sol tarafta daraltılabilir (collapsible) araçlar menüsü, üst tarafta hızlı arama ve tema değiştirici.
*   **2.2. Tema Yönetimi:** Karanlık Mod (Dark Mode) desteği ve varsayılan olarak aktif edilmesi.
*   **2.3. Komut Paleti (Command Palette):** `Cmd+K` veya `Ctrl+K` basıldığında açılan, tüm araçları listeleyen ve klavye ok tuşlarıyla yönlendiren arayüzün (`cmdk` kütüphanesiyle) kodlanması.

---

## 🧮 Aşama 3: Çekirdek JSON & Veri Araçları (Süre: 3 Gün)
*   **3.1. Monaco Editor Entegrasyonu:** Kod editörü bileşeninin sayfaya eklenmesi.
*   **3.2. JSON Formatter & Minifier:** Girinti ve tek satır yapma işlevlerinin yazılması.
*   **3.3. JSON Validator (Linter):** Geçersiz JSON girdilerinde hata satırını editör üzerinde kırmızı işaretleme.
*   **3.4. Format Dönüştürücüler:** JSON to YAML/XML/CSV ve tersi dönüşümlerin testleriyle yazılması.

---

## 📝 Aşama 4: Metin ve Güvenlik Araçları (Süre: 3 Gün)
*   **4.1. Base64 & URL Encoder/Decoder:** Metin girişi yapıldıkça anlık (instant rendering) çıktı üreten arayüz.
*   **4.2. JWT Debugger:** Token girildiğinde Header, Payload ve Signature kısımlarını renkli olarak ayrıştıran ekran.
*   **4.3. Text Diff Viewer:** İki metin arasındaki satır ve kelime farklarını görselleştiren araç.
*   **4.4. Hash Generator:** MD5, SHA-256 vb. formatlarda anlık hash üreten ekran.

---

## 🎲 Aşama 5: Üreticiler ve Yardımcı Araçlar (Süre: 2 Gün)
*   **5.1. UUID Generator:** Tek tıkla v4 UUID üreten, adet seçilerek toplu üretim desteği veren araç.
*   **5.2. QR Code Generator:** Metin/URL girdisine göre anlık QR üreten ve PNG/SVG olarak indirmeyi sağlayan araç.
*   **5.3. Lorem Ipsum Generator:** Kelime, paragraf veya liste şeklinde taslak metin üretici.

---

## 💾 Aşama 6: Performans, Geçmiş ve Cila (Süre: 2 Gün)
*   **6.1. Local History:** Kullanıcının son yaptığı 10 işlemi tarayıcı hafızasında (`localStorage`) şifresiz ve güvenli şekilde saklayan sistem.
*   **6.2. Sık Kullanılanlar (Favorites):** En çok kullanılan araçları sidebar'ın en üstüne sabitleme.
*   **6.3. PWA Desteği:** İnternet yokken de sitenin yüklenmesini ve tüm araçların offline çalışmasını sağlayan Service Worker kurulumu.

---

## 🌐 Aşama 7: Dağıtım, Analitik ve Reklam (Süre: 1 Gün)
*   **7.1. Dağıtım:** Vercel veya Cloudflare Pages üzerinde projenin canlıya alınması.
*   **7.2. Analitik Entegrasyonu:** Umami (gizlilik odaklı, çerezsiz ve adblocker'lara takılmayan analitik) kurulumunun tamamlanması.
*   **7.3. Reklam ve Sponsorluk Entegrasyonu:** Carbon Ads veya EthicalAds standartlarında, sol menünün en altında minimalist bir reklam alanı ayrılması. Sitenin ilk aşamalarında (trafik onay alacak seviyeye gelene kadar) bu alanda "Buy Me a Coffee" / GitHub Sponsor butonları veya projenin GitHub reposunun tanıtımının yapılması.
*   **7.4. SEO ve İndekslenme Hazırlığı:** `sitemap.xml` ve `robots.txt` dosyalarının statik build sürecinde otomatik üretilmesi, Google Search Console ve Bing Webmaster Tools doğrulamalarının yapılması.
