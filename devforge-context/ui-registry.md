# UI Registry: DevForge (Developer Utility Suite)

Bu doküman, DevForge prototipinde doğrulanmış ve geliştirme aşamasında aynen korunması gereken görsel kalıpları (visual patterns) ve CSS stil şablonlarını kaydeder.

---

## 1. Menü Öğesi Aktif/Pasif Kalıbı (Sidebar Navigation)

*   **Temel Yapı:** Sol tarafta küçük bir badge/ikon ve sağda etiket metni.
*   **CSS Şablonu:**
    ```typescript
    const navBaseStyle = {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '9px 8px',
      borderRadius: '8px',
      cursor: 'pointer',
      marginBottom: '2px',
      transition: 'background-color 0.15s, color 0.15s'
    };

    // Aktif Durum (Seçili menü)
    const navActiveStyle = {
      ...navBaseStyle,
      background: 'var(--accent-soft)',
      color: 'var(--accent)',
      fontWeight: 700
    };

    // Pasif Durum (Seçili olmayan menü)
    const navInactiveStyle = {
      ...navBaseStyle,
      background: 'transparent',
      color: 'var(--text)',
      fontWeight: 600,
      hover: 'background: var(--surface-alt)'
    };
    ```

---

## 2. JWT Çözücü Kart Şablonları

JWT çözümlendiğinde Header, Payload ve Signature alanlarının birbirinden renk kodlarıyla ayrışması için kullanılan CSS şablonlarıdır.

*   **Header Panel (Mor Vurgu):**
    *   Arka Plan: `rgba(147, 51, 234, 0.10)`
    *   Sınır Çizgisi: `1px solid rgba(147, 51, 234, 0.35)`
    *   Başlık Yazısı Rengi: `#9333EA` (Purple)
*   **Payload Panel (Mavi Vurgu):**
    *   Arka Plan: `rgba(59, 130, 246, 0.10)`
    *   Sınır Çizgisi: `1px solid rgba(59, 130, 246, 0.35)`
    *   Başlık Yazısı Rengi: `#3B82F6` (Blue)
*   **Signature Panel (Yeşil Vurgu):**
    *   Arka Plan: `rgba(16, 185, 129, 0.10)`
    *   Sınır Çizgisi: `1px solid rgba(16, 185, 129, 0.35)`
    *   Başlık Yazısı Rengi: `#10B981` (Green)

---

## 3. Popover ve Bildirim Kutuları (Geçmiş / History)

Üst barda yer alan "Geçmiş" butonu tıklandığında açılan popup pencerenin yerleşim stilidir.

*   **CSS Şablonu:**
    ```css
    .history-popover {
      position: absolute;
      top: 44px;
      right: 0;
      width: 340px;
      max-height: 420px;
      overflow-y: auto;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.16);
      z-index: 40;
      animation: popIn 0.15s ease;
    }
    ```
