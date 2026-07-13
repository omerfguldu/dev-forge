# UI Rules: DevForge (Developer Utility Suite)

Bu doküman, DevForge uygulamasının tasarım prototipinden elde edilen kuralları ve bu kurallar üzerine eklenen UX iyileştirme kararlarını tanımlar. Uygulamadaki tüm ekranlar bu kurallara uymak zorundadır.

---

## 1. Kod Giriş Alanları ve Editör Kuralları (Monaco / CodeMirror)

*   **Düz Textarea Yasağı:** Kod formatı içeren girdilerde (JSON, XML, YAML vb.) düz HTML `<textarea>` kullanılmayacaktır. Yerine dinamik tema desteği olan **Monaco Editor** veya **CodeMirror** kullanılmalıdır.
*   **Hata İşaretleme (Linter):** Kullanıcı hatalı veri girdiğinde (örn: geçersiz JSON), hata satırı ve sütunu anında tespit edilip editör üzerinde kırmızı çizgiyle gösterilmeli ve açıklayıcı hata mesajı çıktı panelinde belirtilmelidir.
*   **Otomatik Kaydırma ve Minimap:** Editörlerde minimap (kod haritası) kapatılacak, taşan kodlar için satır kaydırma (`wordWrap: "on"`) aktif olacaktır.

---

## 2. Sol Menü (Sidebar) Davranış Kuralları

*   **Genişlik Değerleri:** Sidebar açık durumdayken `240px`, kapalı (collapsed) durumdayken `72px` genişliğinde olmalıdır.
*   **Geçiş Süresi:** Sidebar açılıp kapanırken `0.2s` (`200ms`) sürer ve `ease` geçiş efekti kullanılır.
*   **Gizleme Mantığı:** Menü daraltıldığında, menü öğelerinin metin etiketleri (`labelDisplay`) anında `display: none` yapılarak gizlenir, sadece ikonlar/semboller görünür kalır.
*   **Sık Kullanılanlar (Favorites):** En üstteki sık kullanılanlar alanı, kullanıcının en çok tıkladığı 3 aracı dikey bir liste halinde üstte sabit tutar.

---

## 3. Butonlar ve Anlık Geri Bildirim (Copy & Feedback)

*   **Kopyalama Butonu Durumu:** Her aracın çıktı alanında "Kopyala" butonu olmalıdır.
*   **Görsel Geri Bildirim:** Kullanıcı kopyala butonuna bastığında:
    *   Buton rengi geçici olarak yeşile dönebilir veya buton metni "Kopyalandı!" / ikon yeşil onay işareti (`✓`) olarak değişir.
    *   Bu durum tam `1400ms` (`1.4s`) boyunca sürer ve ardından eski haline geri döner.
*   **UUID Satır Kopyalama:** UUID listesindeki her üretilen satırın sağ tarafında, sadece o satırı panoya kopyalayan bireysel bir kopyalama ikonu bulunmalıdır.

---

## 4. Sayfa Tasarım & Düzen Kuralları (Layout Rules)

### A. JSON ve Dönüştürücü Sayfası
*   Yan yana iki eşit panelden (Dual-pane) oluşur.
*   Sol taraf girdi (input), sağ taraf çıktı (output) veya ağaç (tree) görünümüdür.
*   İki panelin üstünde seçeneklerin (Girinti, Sıkıştır, Temizle vb.) yer aldığı ortak bir toolbar bulunur.

### B. Metin ve Şifreleme (Base64 / URL Encoder) Sayfası
*   *İyileştirme kararı:* Prototipteki tek satırlık çıktılar yerine, Base64 ve URL kodlama araçları da büyük veri girişlerine izin verecek şekilde **yan yana iki dikey tam boy panel (input/output)** düzenine geçirilecektir.

### C. JWT Çözücü Sayfası
*   Girdi alanı solda tam dikey (`height: 220px` veya üzeri), çözümlenen alanlar ise sağda 3 farklı renk kodlu kart halinde listelenmelidir:
    *   **Header:** Mor arka plan temalı.
    *   **Payload:** Mavi arka plan temalı.
    *   **Signature:** Yeşil arka plan temalı.

### D. Metin Karşılaştırıcı (Diff Viewer) Sayfası
*   *İyileştirme kararı:* Girdi metin alanları üstte, çıktı altta olan prototip tasarımı yerine; **yan yana iki canlı karşılaştırma paneli (Split Diff View)** veya **satır içi (inline) birleşik görünüm** kullanılacaktır. Eklenen satırlar yeşil (`#22A06B` esintili), silinen satırlar kırmızı (`#DC4C4C` esintili) arka plan vurgusuna sahip olacaktır.

### E. QR Kod Üretici Sayfası
*   Üretilen QR Kod görseli, SVG veya yüksek çözünürlüklü Canvas olarak render edilmeli, altında "PNG İndir" ve "SVG İndir" butonları işlevsel olmalıdır.

---

## 5. Komut Paleti ve Modallar (Backdrop Rules)

*   **Odak Kaybı Kapatma:** Komut Paleti modalı açıkken dışarıdaki boş bir alana tıklandığında modal otomatik kapanmalıdır.
*   **Arka Plan Efekti:** Komut paleti açıldığında arka plan `background: rgba(10,12,16,0.4)` rengine bürünmeli ve **`backdrop-filter: blur(4px)`** uygulanarak arkadaki arayüz yumuşak bir şekilde bulanıklaştırılmalıdır.
