# Project Overview: DevForge (Developer Utility Suite)

## Hakkında

**DevForge**, geliştiricilerin günlük yazılım süreçlerinde en çok ihtiyaç duyduğu küçük yardımcı araçları (JSON formatlama, kod dönüştürme, metin şifreleme, veri üretimi vb.) tek bir modern ve yüksek performanslı arayüzde toplayan web tabanlı bir geliştirici yardımcı portalıdır.

Geliştiricilerin her gün ziyaret ettiği `jsonlint`, `base64decode`, `jwt.io` gibi onlarca farklı, genellikle yavaş ve reklam dolu web sitesi yerine; tüm ihtiyaçları yerelde, yüksek güvenlikle ve hızlıca çözen tek bir platform sunmayı hedefler.

---

## Çözdüğü Temel Problemler

1. **Güvenlik ve Gizlilik Riskleri:** Çevrimiçi JSON formatlayıcılar veya base64 dönüştürücüler genellikle hassas API anahtarlarını, müşteri verilerini veya token'ları uzak sunuculara gönderir. DevForge, tüm işlemleri **tamamen istemci tarafında (tarayıcıda)** çalıştırarak hiçbir veriyi dışarı sızdırmaz.
2. **Sekme Kirliliği ve Karışıklık:** Farklı araçlar için tarayıcıda onlarca sekme açık tutmak yerine, klavye kısayolları ve komut paleti yardımıyla tek bir sayfada saniyeler içinde araçlar arası geçiş sağlanır.
3. **Kötü UX/UI Arayüzleri:** Mevcut araç sitelerinin çoğu eski, reklamlarla kaplı ve karanlık mod desteği zayıf arayüzlere sahiptir. DevForge, akıcı animasyonlar ve modern bir tasarım sistemi sunar.

---

## Proje Kapsamı (In-Scope)

*   **JSON & Data Araçları:** Formatlayıcı, Minifier, Validator (Satır/Sütun tespitiyle), XML/YAML/CSV dönüştürücüler.
*   **String & Güvenlik Araçları:** Base64 ve URL kodlayıcılar, JWT çözümleyici, Regex test aracı ve metin karşılaştırıcı (Diff Checker).
*   **Üretici Araçları:** Toplu UUID üretici, Hash (MD5, SHA-256 vb.) oluşturucu, QR Kod üreteci ve Lorem Ipsum üretici.
*   **Gelişmiş Navigasyon:** Tüm araçlara fare kullanmadan hızlı erişim sağlayan bir Komut Paleti (`Cmd+K` / `Ctrl+K`).
*   **Kullanıcı Geçmişi ve Favoriler:** Sık kullanılan araçların favorilenmesi ve son işlemlerin yerel tarayıcı hafızasında saklanması.
*   **Offline Destek:** PWA (Progressive Web App) desteğiyle internet olmadan da çalışabilme.

---

## Kapsam Dışı (Out of Scope)

*   **Sunucu Tabanlı İşlemler:** Kullanıcı dosyalarının veya verilerinin herhangi bir sunucu veritabanına kaydedilmesi.
*   **Ekip Paylaşımı:** Ekipler arası ortak canlı oturum açma veya bulut senkronizasyonu.
*   **Üçüncü Parti API Entegrasyonları:** Üçüncü parti servislerin verilerini çeken veya harici API istekleri atan araçlar (tüm mantık yerel çalışmalıdır).
