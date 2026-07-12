# UI Tokens: DevForge (Developer Utility Suite)

Bu doküman, DevForge arayüzünde tutarlılığı ve estetiği sağlamak için kullanılan renk paletlerini, tipografi kurallarını, köşe yumuşatmalarını ve animasyon sürelerini tanımlar.

---

## 🎨 1. Renk Paletleri (Color Themes)

Uygulama aydınlık (light) ve karanlık (dark) olmak üzere iki ana tema moduna sahiptir. İki tema modunda kullanıcı deneyimi ve kontrast dengesi için farklı birer birincil (accent) renk atanmıştır.

### A. Karanlık Tema (Dark Mode)
*   **Temel Arka Plan (bg):** `#0B0D12` (Göz yormayan, çok koyu mavi/gri)
*   **Sidebar Arka Plan (sidebarBg):** `#10131A` (Kontrast oluşturan daha koyu ton)
*   **Yüzey Arka Plan (surface):** `#151821` (Kartlar ve veri panelleri için)
*   **Alternatif Yüzey (surfaceAlt):** `#1B1F29` (Buton hover'ları ve pasif alanlar için)
*   **Sınır Çizgileri (border):** `#1F2430`
*   **Metin (text):** `#E7EAF0` (Yüksek görünürlüklü kırık beyaz)
*   **Pasif Metin (textMuted):** `#8B93A7`
*   **Birincil Renk (accent):** `#22D3AA` (Canlı Neon Turkuaz - Güvenlik ve hız hissi)
*   **Yumuşak Birincil (accentSoft):** `rgba(34,211,170,0.14)` (Aktif menü ve vurgulu alanlar için)

### B. Aydınlık Tema (Light Mode)
*   **Temel Arka Plan (bg):** `#F7F8FA` (Hafif griye çalan temiz beyaz)
*   **Sidebar Arka Plan (sidebarBg):** `#FFFFFF` (Net beyaz ayrım)
*   **Yüzey Arka Plan (surface):** `#FFFFFF` (Kartlar ve veri panelleri)
*   **Alternatif Yüzey (surfaceAlt):** `#F3F4F6` (Hover ve pasif kontrol alanları)
*   **Sınır Çizgileri (border):** `#E5E7EB`
*   **Metin (text):** `#1A1D23` (Koyu antrasit)
*   **Pasif Metin (textMuted):** `#6B7280`
*   **Birincil Renk (accent):** `#4F46E5` (Asil İndigo Mavi - Güvenilirlik ve temiz görünüm)
*   **Yumuşak Birincil (accentSoft):** `#EEF2FF` (Aktif menü arka planı)

---

## ✍️ 2. Tipografi (Typography)

*   **Arayüz Yazı Tipi (Sans-Serif):** `'Manrope', sans-serif` (Modern, yuvarlak hatlı ve okunabilirliği yüksek font).
*   **Kod ve Veri Girişleri (Monospace):** `'JetBrains Mono', monospace` (Geliştirici dostu, genişliği sabit yazı tipi).
*   **Yazı Boyutları (Font Sizes):**
    *   Sayfa Başlıkları: `22px` (ExtraBold, `letter-spacing: -0.02em`)
    *   Bölüm / Kart Başlıkları: `14.5px` (Bold)
    *   Menü ve Buton Metinleri: `13.5px` (SemiBold)
    *   Küçük Etiketler (Labels): `11px` (Bold, `letter-spacing: 0.05em`, UPPERCASE)
    *   Kod Editörü Metinleri: `13px` (`line-height: 1.6`)

---

## 📐 3. Yapısal Kurallar (Spacing & Borders)

*   **Köşe Yumuşatma (Border Radius):**
    *   Bileşenler & Butonlar & Sidebar Linkleri: `8px`
    *   Input & Textarea Kontrolleri: `9px`
    *   Kartlar & Editör Panelleri & Modallar: `12px` veya `14px`
*   **Gölge Derinliği (Shadows):**
    *   Normal Kartlar: Hafif sınır çizgisi (`border`), gölgesiz.
    *   Açılır Menüler (Popover) & Modallar: `box-shadow: 0 20px 40px rgba(0,0,0,0.16)` (Karanlıkta), `box-shadow: 0 20px 40px rgba(0,0,0,0.06)` (Aydınlıkta).

---

## ⚡ 4. Animasyonlar ve Geçişler (Animations)

*   **Sidebar Genişleme:** `width 0.2s ease`
*   **Sayfa Yüklenme (Fade-In):** `fadeInPage 0.32s ease` (Aşağıdan yukarıya hafif kayarak yumuşakça belirme)
    ```css
    @keyframes fadeInPage {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    ```
*   **Modal/Popover Açılma (Pop-In):** `popIn 0.15s ease` (Hafif büyüyerek açılma)
    ```css
    @keyframes popIn {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
    ```
