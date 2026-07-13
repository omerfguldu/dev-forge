# Code Standards: DevForge (Developer Utility Suite)

## 1. TypeScript & Tip Güvenliği

*   **Strict Mode:** TypeScript `strict` modu açık olmalıdır. `any` türünden olabildiğince kaçınılmalı, tip tanımlamaları eksiksiz yapılmalıdır.
*   **Props ve State Tanımlamaları:** Her React bileşeninin props yapısı açıkça `interface` olarak tanımlanmalıdır.
*   **Dönüş Tipleri:** Kritik hesaplama ve dönüştürme fonksiyonlarının (özellikle `/utils` altındakiler) dönüş tipleri (Return Types) açıkça belirtilmelidir.

---

## 2. Bileşen Standartları (Component Standards)

*   **Fonksiyonel Bileşenler:** Tüm React bileşenleri functional component ve hook tabanlı olmalıdır.
*   **Tek Sorumluluk İlkesi (Single Responsibility):** Bir bileşen yalnızca tek bir işi yapmalıdır. Örneğin, JSON formatlama sayfası yalnızca UI ve state yönetimini üstlenmeli; asıl formatlama algoritması `/utils/json.ts` içerisindeki saf fonksiyona devredilmelidir.
*   **Erişilebilirlik (a11y):** Form elemanlarında doğru `label` tanımlamaları yapılmalı, klavye ile sekmeler arası gezinme (`tabIndex`) ve ekran okuyucu uyumluluğu (Aria rolleri) gözetilmelidir (Shadcn UI bu konuda yardımcı olacaktır).

---

## 3. Algoritma ve Yardımcı Fonksiyonlar (Utilities)

*   **Saf Fonksiyonlar (Pure Functions):** `/utils` klasöründeki fonksiyonlar yan etkisi olmayan (no side effects) saf fonksiyonlar olmalıdır. Dışarıdaki bir değişkene erişmemeli veya değiştirmemelidir.
*   **Hata Yönetimi (Error Handling):** Kullanıcının hatalı girdiler vermesi durumunda (örn: geçersiz JSON girdisi), uygulama çökmek yerine hata mesajını yakalayıp (try-catch) arayüzde kırmızı renkli açıklayıcı bir uyarı olarak göstermelidir.
    ```typescript
    // Örnek yaklaşım:
    export interface ValidationResult<T> {
      isValid: boolean;
      data?: T;
      error?: string;
      line?: number;
      column?: number;
    }
    ```

---

## 4. Performans ve Bellek Yönetimi

*   **Büyük Verilerle Çalışma (Large Datasets):** Geliştiriciler çok büyük JSON dosyalarını formatlamak isteyebilir. Arayüzün donmaması için:
    *   Büyük kod editörlerinde satır numarası ve renklendirme işlemleri için performans dostu bileşenler (Monaco/CodeMirror) tercih edilmelidir.
    *   Gerekirse çok büyük metin işlemlerinde `Web Workers` kullanılarak hesaplamalar arka plana (background thread) aktarılmalıdır.
*   **Gereksiz Yeniden Çizimler (Re-renders):** `useMemo` ve `useCallback` hook'ları özellikle veri dönüştürme ve formatlama fonksiyonlarında doğru şekilde kullanılmalıdır.

---

## 5. Test Standartları (Testing Standards)

*   **Varsayılan Test Araçları:**
    *   **Birim ve Bileşen Testleri:** [Vitest](https://vitest.dev/) ve [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
    *   **Uçtan Uca (E2E) Testler:** [Playwright](https://playwright.dev/).
*   **Playwright Test Kuralları:**
    *   Tüm sayfa geçişleri, komut paleti kullanımı, offline mod (PWA) simülasyonları ve kritik kullanıcı akışları (örn: bir veriyi girip dönüştürülmüş çıktıyı kopyalama) Playwright ile test edilmelidir.
    *   E2E test senaryoları projenin `/e2e` klasöründe yer almalı ve `.spec.ts` uzantısını taşımalıdır.
    *   Testler yazılırken erişilebilirlik (ARIA) seçicileri (role, label, placeholder vb.) tercih edilerek hem test kararlılığı hem de a11y standartları güvenceye alınmalıdır.
    *   Playwright testlerinin çalıştırılması için paket kurulumu sonrasında `npx playwright install` komutuyla tarayıcı motorları kurulmuş olmalıdır.

---

## 6. Kod Kalitesi ve Formatlama (Linting & Formatting)

*   **Kod Denetleyici (Linter):** Projede yüksek performans ve hız için Rust tabanlı **Oxlint** kullanılacaktır.
    *   Tüm TypeScript, React ve Next.js kodları Oxlint kurallarına uygun olmalıdır.
    *   Oxlint, Next.js kurallarını (`nextjs/*`) ve React kurallarını (`react/*`) yerleşik olarak destekler.
    *   Yerel geliştirmede ve commit öncesinde `npm run lint` (`oxlint`) çalıştırılmalıdır.
*   **Kod Formatlayıcı (Formatter):** Kod stili tutarlılığı için **Prettier** kullanılacaktır.
    *   Geliştirme aşamasında ve CI adımlarında kodun Prettier kurallarına göre biçimlendirilmesi zorunludur.
    *   Editör üzerinde kaydetme sırasında otomatik formatlama ("Format on Save") etkinleştirilmelidir.
