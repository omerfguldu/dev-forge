# Library Docs: DevForge (Developer Utility Suite)

Bu doküman, DevForge projesinde kullanılan temel üçüncü parti kütüphaneleri, bunların ne amaçla kullanıldığını ve proje içi standart entegrasyon yöntemlerini açıklar.

---

## 1. Monaco Editor (veya CodeMirror)

JSON, XML, YAML gibi formatlı verileri renklendirmek, satır numarası göstermek ve hataları işaretlemek amacıyla kullanılır.

*   **Paket:** `@monaco-editor/react` (veya daha hafif bir alternatif için `react-codemirror`)
*   **Proje İçi Kullanım Standartı:**
    *   Editör teması uygulamanın genel temasına (Karanlık/Aydınlık mod) uyumlu şekilde dinamik değişmelidir.
    *   Performans açısından `minimap` (sağdaki kod haritası) kapatılmalıdır.
    *   Büyük dosyalarda otomatik sarma (`wordWrap: "on"`) varsayılan olmalıdır.

---

## 2. Framer Motion

Sayfa geçişleri, Command Palette'in açılıp kapanması ve kart hover efektleri gibi mikro animasyonları akıcı hale getirmek için kullanılır.

*   **Paket:** `framer-motion`
*   **Kullanım Standartı:**
    *   Animasyonlar çok agresif veya yavaş olmamalı, sistem genelinde tutarlı süreler (örn: `duration: 0.15s` veya `0.2s`) kullanılmalıdır.
    *   Kullanıcının tarayıcı tercihinde "Hareketi Azalt" (Reduce Motion) seçeneği aktifse animasyonlar pasif edilmelidir.

---

## 3. Radix UI / Shadcn UI

Modals (Dialogs), Command Palette, Dropdown menüler ve Sekmeli Yapılar (Tabs) gibi erişilebilirlik gerektiren UI elemanları için kullanılır.

*   **Paketler:** `@radix-ui/react-dialog`, `@radix-ui/react-popover`, `@radix-ui/react-tabs`, `cmdk`
*   **Kullanım Standartı:**
    *   Doğrudan Radix ilkel bileşenleri (primitives) veya bunların Shadcn UI şablonları kullanılmalıdır.
    *   Tüm etkileşimli elemanların klavye odağı (focus ring) görsel olarak belirgin olmalıdır.

---

## 4. Yardımcı Hesaplama Kütüphaneleri

Tüm mantığın istemci tarafında dönmesi gerektiği için bazı standart hesaplama kütüphanelerine ihtiyaç duyulur.

*   **Hash Oluşturma (MD5, SHA vb.):** `crypto-js` (veya tarayıcının yerel `Web Crypto API`'si - ek paket gerektirmez ve daha hızlıdır).
*   **QR Kod Üretme:** `qrcode` veya `qrcode.react`.
*   **YAML Dönüşümü:** `js-yaml` (JSON'ı YAML'a veya tersine güvenli çevirmek için).
*   **XML Dönüşümü:** Tarayıcının yerel `DOMParser` ve `XMLSerializer` api'leri kullanılmalı, gerekirse hafif bir parser kütüphanesi (örn: `fast-xml-parser`) eklenmelidir.
