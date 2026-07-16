# BuildPixies — Sprint 1 Ayrıntılı Planı ve Kapanış Kaydı

> **Belge türü:** Tarihsel sprint planı, gerçekleşen iş kaydı ve Bootcamp kanıt denetimi
> **Sprint:** 1 / 3
> **Dönem:** 19 Haziran – 5 Temmuz 2026
> **Durum:** Kapandı; eksik kanıtlar yalnız gerçek kaynakla `backfilled` olarak eklenebilir
> **Sprint hedefi:** Fikir, takım, public repo ve web-first ürün kararını netleştirmek; çalışan Next.js temeli ile ilk idea-to-blueprint akışını kurmak
> **Master plan:** [`docs/plan.md`](plan.md)
> **Son tarihsel commit:** `4ee1901 docs: polish sprint 1 readme`

Bu dosya Sprint 1'i sonradan daha başarılı göstermek için yeniden yazılmış bir
anlatı değildir. Sprint kapanışında doğrulanabilen ürün artışını, repo geçmişini,
Bootcamp'in zorunlu altı kanıtını ve açık kalan kanıt boşluklarını tek yerde
tutar. Sprint 2 veya Sprint 3'te eklenen özellikler burada Sprint 1 başarısı
olarak sayılmaz.

---

## 1. Sprint Kimliği ve Başarı Tanımı

### 1.1 Sprint amacı

Sprint 1'in ana amacı final ürünü tamamlamak değil, takımın sonraki iki sprintte
hızlı ve güvenli ilerleyebilmesi için ürün ve teknik temel oluşturmaktı:

1. Bootcamp kılavuzunu ve referans projeleri anlamak,
2. çözülmeye değer kullanıcı problemini seçmek,
3. mobil fikirden web-first BuildPixies ürününe pivot etmek,
4. takım rolleri ile public repository'yi görünür hale getirmek,
5. backlog ve karar kayıtlarını oluşturmak,
6. temel kullanıcı ekranlarını çalıştırmak,
7. yapılandırılmış blueprint üretebilecek AI ve veri temelini kurmak,
8. Sprint 1'in Scrum kanıtlarını repository içinde sunmak.

### 1.2 Sprint sonunda beklenen kullanıcı sonucu

Kullanıcı uygulamayı açabilmeli, BuildPixies'in temel vaadini görebilmeli,
fikrini yeni proje formuna girebilmeli, proje workspace'ine ulaşabilmeli ve
üretilen planın Output Hub içinde nasıl sunulacağını görebilmeliydi.

### 1.3 Sprint başarı göstergeleri

| Gösterge | Hedef | Sprint sonu durumu | Kanıt |
| --- | --- | --- | --- |
| Ürün yönü | Tek problem, isim ve kategori | Gerçekleşti | README + decision log |
| Repository | Public ve commit geçmişi görünür | Gerçekleşti | GitHub repository |
| Temel akış | Landing → wizard → workspace → outputs | Gerçekleşti | Kod + ekran görüntüleri |
| AI temel | Rol bazlı prompt ve strict output şemaları | Gerçekleşti | `lib/ai/` |
| Persistence temel | Project storage ve owner isolation başlangıcı | Gerçekleşti | API/storage/migration |
| Scrum kanıtı | Zorunlu altı başlık | Metin olarak var; bazı görsel kanıtlar eksik | README + bu belge |

---

## 2. Gerçeklik ve Güncelleme Kuralları

### 2.1 Durum sözlüğü

| Durum | Sprint 1 için anlamı |
| --- | --- |
| **Done** | 5 Temmuz sonuna kadar commit edilmiş, kabul sonucu doğrulanabilir iş |
| **Partial** | Değer üreten kısmı var fakat Sprint 1 kabul kriterinin tamamı yok |
| **Backfilled** | Sprint sonrasında, gerçek tarihli kaynak kullanılarak eklenen kanıt |
| **External Confirmation** | Repo ile doğrulanamayan toplantı, form veya iletişim bilgisi |
| **Not in Sprint 1** | Sonraki sprintte yapılmış ve Sprint 1 puanına dahil edilmeyen iş |

### 2.2 Tarihsel bütünlük kuralları

- Olmayan Daily Scrum kaydı oluşturulmaz.
- Eski tarihli board ekran görüntüsü yeniden üretilemez.
- Sonraki sprint commit'i Sprint 1 çıktısı gibi gösterilemez.
- Sonradan eklenen gerçek kanıt, eklenme tarihiyle `backfilled` olarak işaretlenir.
- Katılımcı listesi gerçek toplantı katılımına göre takım tarafından teyit edilir.
- README ile bu belge çelişirse Git geçmişi ve tarihli kanıt esas alınır.

---

## 3. Takım ve Çalışma Modeli

### 3.1 Sprint kapanışındaki takım görünümü

| Kişi | Rol | Sprint 1 ana sorumluluğu | Doğrulama durumu |
| --- | --- | --- | --- |
| Muhammed Köseoğlu | Product Owner | Ürün problemi, vizyon, kapsam ve kabul | Repo/README üzerinde görünüyor |
| Alperen Avan | Scrum Master | Sprint düzeni, repository, kanıt ve iletişim | Repo/README üzerinde görünüyor |
| Kemal Ersin Özkan | Developer | Web temel, AI pipeline, API ve storage | README üzerinde görünüyor; profil bağlantısı eksik |

Selin Akkaş 9 Temmuz commit'iyle takım listesine eklenmiştir; bu nedenle mevcut
dört kişilik takımın üyesidir fakat Sprint 1 kapanış katılımcısı olarak otomatik
biçimde yazılmaz.

### 3.2 Sprint çalışma ritmi

- İlk bölüm problem keşfi ve takım oluşumu ağırlıklı ilerledi.
- Kısa günlük iletişim Slack/WhatsApp üzerinden yürütüldü.
- Teknik uygulama ve dokümantasyon 4–5 Temmuz'da yoğunlaştı.
- Kod değişiklikleri doğrudan repo geçmişi üzerinden doğrulanabilir.
- İletişim katılımı repo dışı olduğu için ayrıca takım teyidi gerektirir.

---

## 4. Sprint Capacity ve Puanlama

### 4.1 Tarihsel puan yaklaşımı

Sprint 1'de takım 100 puanlık kategori bazlı bir plan kullanmıştır. Bu değer
Fibonacci story point değildir; kapsam yüzdesini temsil eden tarihsel ölçüdür.
Geriye dönük değiştirilmez. Sprint 2 kapanışından itibaren `1, 2, 3, 5, 8`
Fibonacci standardı kullanılacaktır.

| Kategori | Tarihsel puan | Sonuç |
| --- | ---: | --- |
| Ürün fikri, hedef kitle ve web pivot kararı | 15 | Done |
| README ve Bootcamp şablon düzeni | 15 | Done |
| Product backlog ve sprint planı | 15 | Done |
| Next.js, Tailwind ve UI temel kurulumu | 15 | Done |
| Landing, dashboard, wizard ve workspace | 20 | Done |
| AI prompt pipeline ve output şemaları | 10 | Done |
| Storage, owner/RLS ve generation job temeli | 10 | Done |
| **Toplam** | **100** | **100 olarak raporlandı** |

### 4.2 Puan yorumlama notu

100 puanın raporlanması final ürünün yüzde 100 tamamlandığı anlamına gelmez.
Yalnız Sprint 1 için tanımlanan temel kapsamın tamamlandığını ifade eder.
Gerçek per-pixie event, production deploy, sample blueprint, final kanıtlar ve
ürün deneyimi iyileştirmeleri sonraki sprintlere aittir.

---

## 5. Sprint Backlog ve Kabul Durumu

### 5.1 Seçim mantığı

Backlog, önce risk azaltacak ve sonraki geliştirmelerin önünü açacak dikey
dilimlere göre seçildi. Öncelik sırası:

1. ürün ve repository gerçekliği,
2. kullanıcıdan fikir alma,
3. proje oluşturma ve saklama,
4. blueprint üretme sözleşmesi,
5. çıktıyı görünür kılma,
6. güvenlik ve uzun iş temeli,
7. Bootcamp kanıtı.

### 5.2 Story tablosu

| ID | Kullanıcı sonucu | P | Sprint 1 durumu | Kabul kanıtı | Sonraki aksiyon |
| --- | --- | ---: | --- | --- | --- |
| BP-001 | Landing ürünün temel vaadini anlatır | P0 | Done | Landing kodu + screenshot | 5-second test S2 |
| BP-003 | Kullanıcı fikrini hızlı girer | P0 | Done | New project form | UX polish S2 |
| BP-004 | Kullanıcı proje oluşturur | P0 | Done | Projects API/storage | Production smoke S3 |
| BP-005 | Hedef kitle ve platform seçilir | P0 | Done | Wizard alanları | Form sürtünme testi S3 |
| BP-007 | Kullanıcı pixie takımını görür | P0 | Done | Workspace/pixie cards | Gerçek status S3 |
| BP-008 | Aktif pixie gerçek çalışma durumunu gösterir | P0 | Partial | Görsel state var, gerçek event yok | BP-008R/BP-031 |
| BP-009 | Tamamlanan çıktılar açılır | P0 | Done | Output Hub | IA reset S3 |
| BP-010 | Product Brief üretilebilir | P0 | Done | Prompt/schema/pipeline | Canlı smoke S2 |
| BP-011 | MVP Scope üretilebilir | P0 | Done | Prompt/schema/pipeline | Command Center S3 |
| BP-012 | UX Flow üretilebilir | P0 | Done | Prompt/schema/pipeline | Output grouping S3 |
| BP-013 | Tech Plan üretilebilir | P0 | Done | Prompt/schema/pipeline | Architecture evidence S3 |
| BP-014 | Backlog üretilebilir | P0 | Done | Prompt/schema/pipeline | First sprint overview S3 |
| BP-015 | Test Plan üretilebilir | P1 | Done | Prompt/schema/pipeline | Demo kanıtı S3 |
| BP-017 | README taslağı dışa aktarılabilir | P1 | Done | Export route/library | Final content S3 |
| BP-022 | Projeler owner bazlı ayrılır | P0 | Done temel | Auth/RLS migration | Production isolation S3 |
| BP-023 | Uzun üretim job/polling ile takip edilir | P0 | Done temel | Job API + workspace polling | Partial progress S3 |

### 5.3 Sprint 1 kapsamı dışında kalanlar

- gerçek sample blueprint rotası,
- Output Hub copy/JSON/regenerate kontrolleri,
- durable Vercel Queue ve distributed rate limit,
- Bootcamp Mode,
- OpenRouter Free entegrasyonu,
- design reference rebuild,
- GitHub Actions + Playwright kalite hattı,
- progressive section events,
- Command Center,
- production deploy ve final video.

Bu işlerin bir kısmı Sprint 2'de tamamlandı; Sprint 1 puanına eklenmez.

---

## 6. Uygulama Zaman Çizelgesi

### 6.1 Doğrulanabilen Daily Scrum özeti

| Tarih | Gerçekleşen odak | Durum / kanıt |
| --- | --- | --- |
| 19–26 Haziran | Başlangıç, takım ve fikir keşfi | Ayrıntılı tarihli repo/daily kanıtı yok; External Confirmation |
| 27 Haziran | Takım iletişim kanalları ve fikir arayışı | README metin kaydı |
| 28 Haziran | Alternatif ürün fikirleri ve mobil yaklaşım | README metin kaydı |
| 29 Haziran | Hedef kitle ve Bootcamp kriterleri | README metin kaydı |
| 30 Haziran | Problem alanını daraltma | README metin kaydı |
| 1 Temmuz | BuildPixies fikri ve web-first yön | README metin kaydı |
| 2 Temmuz | Plan ve referans README incelemesi | README metin kaydı; commit tarihi 4 Temmuz |
| 3 Temmuz | Rol dağılımı | README metin kaydı; commit tarihi 4 Temmuz |
| 4 Temmuz | Repo, pivot, Next.js temel, ekranlar, AI ve screenshot | Git commit zinciri |
| 5 Temmuz | Validation, persistence, auth/RLS ve job/polling | `b3b43e2`, `4ee1901` |

### 6.2 Git geçmişiyle doğrulanan ana kilometre taşları

| Commit | Sonuç |
| --- | --- |
| `4b95227` | Bootcamp kılavuzu ve referans repository başlangıcı |
| `7146481` | BuildPixies web-first planına pivot |
| `aa4e6af` | Next.js uygulama iskeleti ve pixie workspace |
| `26b3981` | Sprint 1 board, screenshot ve daily belgeleri |
| `24d5516` | Pixie pipeline output hizalama |
| `cd84d0b` | API validation ve blueprint persistence hardening |
| `b3b43e2` | Auth, RLS ve generation jobs |
| `4ee1901` | Sprint 1 README kapanışı |

---

## 7. Bootcamp Zorunlu Altı Kanıt

### 7.1 Kanıt matrisi

| Zorunlu alan | Sprint 1 içeriği | Durum | Kapanış standardı |
| --- | --- | --- | --- |
| Backlog dağıtma mantığı | Temel riskleri önceleyen seçim ve 100 puan tablosu | Mevcut | Tarihsel puan yaklaşımı açıklanmalı |
| Daily Scrum | 27 Haziran–5 Temmuz metin özeti | Partial | Gerçek kaynak varsa redakte görsel `backfilled` eklenebilir |
| Sprint Board Updates | GitHub Issues linki ve kolon özeti | Partial | Tarihli Sprint 1 screenshot'ı eksik; yeniden üretilmez |
| Ürün Durumu | Beş local screenshot | Mevcut | Caption ve tarih korunmalı |
| Sprint Review | Kararlar ve sonraki odak | Mevcut | Katılımcılar takımca teyit edilmeli |
| Sprint Retrospective | İyi giden, sorun, aksiyon | Mevcut | Aksiyonlara owner/tarih eklenmeli |

### 7.2 Evidence dosya standardı

Gerçek kaynak bulunursa aşağıdaki yapıya eklenir:

```text
docs/evidence/sprint-1/
  daily/
  board/
  product/
  review/
  retrospective/
```

Örnek adlandırma:

```text
2026-07-04-daily-whatsapp-01-redacted-backfilled.png
2026-07-05-board-sprint-close-backfilled.png
```

Telefon, e-posta, özel mesaj, kullanıcı ID ve tüm secret değerler görünmez hale
getirilmelidir.

---

## 8. Ürün Durumu ve Görsel Kanıt

Sprint 1 sonunda alınan görseller:

| Ekran | Kanıt | Ne gösterir |
| --- | --- | --- |
| Landing hero | [`landing-hero.png`](../public/screenshots/landing-hero.png) | İlk ürün vaadi |
| Landing full | [`landing.png`](../public/screenshots/landing.png) | İlk landing bilgi mimarisi |
| Dashboard | [`dashboard.png`](../public/screenshots/dashboard.png) | Empty state ve proje alanı |
| New Project | [`new-project.png`](../public/screenshots/new-project.png) | Fikir giriş akışı |
| Workspace | [`workspace.png`](../public/screenshots/workspace.png) | Pixie ve output deneyiminin ilk hali |

Bu screenshotlar sonraki tasarım rebuild'inden önceki tarihsel ürünü gösterir.
Üzerlerine yeni tasarım yazılmaz; Sprint 2/3 screenshotları ayrı tutulur.

---

## 9. Teknik Artış ve Kabul Kontrolü

### 9.1 Ürün katmanları

| Katman | Sprint 1 artışı | Kabul kontrolü |
| --- | --- | --- |
| UI | Landing, dashboard, wizard, workspace, Output Hub | Route açılır ve screenshot mevcut |
| Domain | Project, output ve pixie tipleri | TypeScript derlenebilir |
| AI | Role-based prompts, strict schemas, orchestrator | Structured blueprint sözleşmesi var |
| API | Project, generation, regenerate/export temelleri | Valid/invalid request davranışı |
| Storage | Local fallback ve Supabase adapter | Proje kaydı okunabilir |
| Auth | Anonymous owner ve RLS temeli | Owner alanı/migration mevcut |
| Long jobs | Generation job ve polling temeli | Request dışında status takip edilebilir |
| Docs | README, master plan, decision log, sprint kaydı | Repo-relative bağlantılar çalışır |

### 9.2 Sprint 1 kalite standardı

- Uygulama local ortamda ayağa kalkmalı.
- Temel route'lar 200 dönmeli.
- TypeScript kritik hata vermemeli.
- Form validation geçersiz girdiyi reddetmeli.
- Project ve blueprint kaydı request sonrasında korunmalı.
- Secret repository'ye girmemeli.
- README ekran görüntüleri relative path ile açılmalı.

### 9.3 Sonraki sprintte eklenen kalite kapıları

Playwright demo E2E, GitHub Actions, Vercel Queue, distributed rate limit ve
OpenRouter hardening Sprint 2 çıktılarıdır. Bugün projeyi koruyor olsalar da
Sprint 1 kalite kanıtı olarak raporlanmazlar.

---

## 10. Sprint Review

### 10.1 Gösterilen ürün artışı

- BuildPixies ürün anlatısı,
- web-first landing,
- yeni proje formu,
- proje workspace'i,
- pixie takım görünümü,
- yapılandırılmış blueprint bölümleri,
- Output Hub,
- project persistence ve owner/RLS temeli.

### 10.2 Alınan kararlar

1. Mobil uygulama yerine web uygulamasına pivot edildi.
2. Ürün adı BuildPixies olarak kesinleştirildi.
3. Ürün, “AI code generator” değil “AI product planning workspace” olarak konumlandı.
4. Next.js App Router, TypeScript, Supabase ve OpenAI-compatible AI hattı seçildi.
5. Yapılandırılmış ve doğrulanabilir çıktı, serbest metin cevabın önüne alındı.
6. Sprint 2'nin odağı gerçek MVP, output kontrolleri, UX polish ve production hazırlığı oldu.

### 10.3 Katılımcılar

README tarihsel kaydı Muhammed Köseoğlu, Alperen Avan ve Kemal Ersin Özkan'ı
listeler. Gerçek review katılımı ekip tarafından teyit edilmeli; teyitsiz kişi
eklenmemelidir.

### 10.4 Tamamlanmayan veya taşınan işler

- gerçek per-pixie event bağlantısı,
- production deploy ve canlı Supabase smoke,
- curated sample blueprint,
- yeni tasarıma göre ürün anlaşılırlığı,
- görsel Daily/Board kanıtları.

---

## 11. Sprint Retrospective

### 11.1 İyi gidenler

- Web-first pivot ürün yönünü erken netleştirdi.
- README, master plan ve decision log birlikte ilerledi.
- Temel kullanıcı yolculuğu kısa sürede ayağa kalktı.
- AI output schema ve validation erken tasarlandı.
- Owner/RLS ve long-running job riskleri final sprintine bırakılmadan görünür oldu.

### 11.2 Zorlayanlar

- Takım oluşumu sprintin ilk bölümünde kapasiteyi belirsiz bıraktı.
- Günlük iletişim kanıtları repository'ye düzenli aktarılmadı.
- GitHub Issues linki tarihli board screenshot'ının yerini tutmadı.
- Görsel pixie status'ları gerçek backend event'lerine bağlı değildi.
- Kısa sürede çok katman kurulması ürün anlatısının önüne geçti.

### 11.3 Öğrenimler

- “Dosya var” ile “story tamam” aynı değildir.
- Scrum kanıtı sprint sonuna bırakılmamalıdır.
- Tarihsel screenshotlar ürün evrimini göstermek için korunmalıdır.
- AI ürününde bekleme ve progress, model çıktısı kadar ürün deneyimidir.
- Production riskleri erken tasarlanmalı ama doğrulanmadan Done denmemelidir.

### 11.4 Retro aksiyonları

| Aksiyon | Owner | Hedef | Sonraki durum |
| --- | --- | --- | --- |
| Output copy/JSON/regenerate kontrolleri | Dev ekip | Sprint 2 | 16 Temmuz'da tamamlandı |
| Bootcamp evidence standardı | Scrum Master + herkes | Sprint 2 kapanışı | Açık |
| Curated sample blueprint | PO + frontend | 19 Temmuz | Açık |
| Gerçek per-pixie event contract | Backend/AI | S2 tasarım, S3 uygulama | Açık |
| Production deploy ve RLS smoke | SM + backend | 28 Temmuz | Sprint 3 |

---

## 12. Sprint 1 Definition of Done Denetimi

- [x] Public repository ve görünür commit geçmişi var.
- [x] Ürün adı, problem, hedef kitle ve web pivot kararı belgeli.
- [x] README, backlog, master plan ve decision log var.
- [x] Landing, dashboard, wizard, workspace ve output temel ekranları var.
- [x] AI prompt/schema/orchestrator temeli var.
- [x] Project storage ve generation job temeli var.
- [x] Sprint 1 ürün screenshotları repository içinde.
- [x] Review ve retrospective metni var.
- [ ] Tarihli board screenshot'ı var.
- [ ] Daily iletişim görselleri redakte edilerek repository içinde.
- [ ] Review katılımcıları ve aksiyon owner/tarihleri haricî olarak teyit edildi.

Sprint hedefi ürün/teknik temel açısından kapandı. Son üç eksik madde tarihsel
kanıt kalitesi açığıdır; gerçek kaynak yoksa açık kalır ve uydurulmaz.

---

## 13. Sprint 2'ye Devir Paketi

### 13.1 Korunacak temel

- web-first ürün kararı,
- strict structured outputs,
- role-based pixie pipeline,
- project/storage abstraction,
- owner isolation yaklaşımı,
- generation job/polling,
- tarihsel Sprint 1 screenshotları.

### 13.2 Sprint 2'nin çözmesi gerekenler

1. Gerçek provider ile blueprint üretimini doğrulamak,
2. export ve bölüm bazlı regenerate deneyimini tamamlamak,
3. landing ile workspace'i ürünün değerini açık anlatacak biçimde yenilemek,
4. curated sample ile vaadi AI beklemeden kanıtlamak,
5. evidence klasörü ve Sprint 2'nin altı zorunlu kanıtını kapatmak,
6. gerçek pixie event contract'ını Sprint 3 uygulamasına hazır hale getirmek.

### 13.3 İlgili belgeler

- [`Sprint 2 ayrıntılı planı`](sprint-2.md)
- [`Sprint 3 ayrıntılı planı`](sprint-3.md)
- [`Bootcamp master planı`](plan.md)
- [`Karar kaydı`](decision-log.md)
- [GitHub Issues](https://github.com/avanalperen/BuildPixies/issues)
