# Decision Log — BuildPixies

## ADR-001: Mobil uygulamadan web uygulamasına pivot

**Tarih:** 4 Temmuz 2026
**Durum:** Kabul edildi

### Bağlam

BuildPixies başlangıçta mobil uygulama (tatlı AI yazılım geliştirme takımı)
olarak planlanıyordu. Bootcamp teslim süreci (2 Ağustos, 3 dakikalık video,
canlı demo, top 10 sunumu) ve takım gerçeği göz önüne alındığında
mobil yerine web-first gitmek değerlendirildi.

### Karar

Mobil yerine web uygulaması (Next.js) olarak ilerlenecek. Tatlı pixie karakter
estetiği korunacak ama ürün "satılabilir SaaS" gibi görünecek.

### Gerekçe

| Alan | Mobilde zordu | Web'de avantaj |
| --- | --- | --- |
| Demo | Telefon ekranı kısıtlı | Büyük ekran, net anlatım |
| Output görüntüleme | Uzun metinler yorucu | Doküman paneli rahat |
| Backlog board | Dar alan | Kanban board kolay |
| Kod iskeleti | Mobilde kötü deneyim | Code block / file tree güzel |
| Export | Sınırlı | Markdown, JSON, kopyala, indir |
| Deploy | App store gerekebilir | Vercel linki yeterli |
| Bootcamp teslim | APK/TestFlight karmaşık | Canlı link + video kolay |

### Sonuçlar

- Bootcamp teslimine daha uygun (canlı link + video).
- AI agent ve output deneyimi daha rahat gösterilir.
- Üç kişilik takımla MVP çıkarmak daha mümkün.
- "Cute but useful" marka dili daha güçlü görünür.
- AI agent + hafıza + orkestrasyon puanlarına direkt oynar.

### Mobile roadmap'te

> "Future roadmap: mobile companion app for reviewing and refining MVP
> blueprints on the go."

---

## ADR-002: Takım MVP scope'u

**Tarih:** 4 Temmuz 2026
**Durum:** Kabul edildi

### Bağlam

Takım 3 kişidir (Product Owner, Scrum Master, Developer). Bootcamp zorunlu
etkinlik olduğu için net rol dağılımıyla ilerleniyor.

### Karar

Plan bölüm 22'deki görev dağılımı uygulanacak:
landing, new project form, pixie workspace, tek endpoint ile blueprint
generation, output hub, README export, Bootcamp Mode (basic), Vercel deploy.
Takım gelirse görev dağılımı plana göre entegre edilecek. Durum asistana
bildirilecek.

---

## ADR-003: Sprint 2'de role-based pipeline, Sprint 3'te Agents SDK

**Tarih:** 4 Temmuz 2026
**Durum:** Kabul edildi

### Karar

Sprint 2'de hız için role-based prompt pipeline (her pixie ayrı prompt ile
ardışık çağrılıyor). Sprint 3'te gerçek OpenAI Agents SDK handoff + project
memory (pgvector) + structured outputs (Zod) + guardrails.

### Gerekçe

Çalışan MVP'yi Sprint 2 sonunda göstermek; AI derinliğini Sprint 3'te jüri
demo'suna hazırlamak. OpenAI anahtarı yoksa sample blueprint ile çalışan demo
(fallback) — demo güvenliği için kritik.
