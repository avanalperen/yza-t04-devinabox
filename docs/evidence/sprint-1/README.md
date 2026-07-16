# Sprint 1 Kanıt Manifestosu

> **Tarihsel sprint:** 19 Haziran – 5 Temmuz 2026
>
> **Paket normalizasyonu:** 16 Temmuz 2026
>
> **Durum:** Bootcamp minimum altı kanıt başlığı repository içinde tamamlandı
>
> **Gerçeklik kuralı:** Sonradan eklenen hiçbir kayıt tarihsel sprint anında
> üretilmiş gibi gösterilmez.

Bu klasör, Sprint 1 kapanışını tek yerden incelenebilir hale getirir. Tarihsel
ürün görselleri ve yazılı Scrum kayıtları korunur; 16 Temmuz'da alınan board
görseli açıkça `backfilled` olarak işaretlenir. Elde olmayan özel mesaj veya eski
board görüntüleri üretilmez.

## Zorunlu Kanıt Matrisi

| Bootcamp başlığı | Repository kanıtı | Kabul durumu | Kaynak sınırlaması |
| --- | --- | --- | --- |
| Backlog dağıtma mantığı | [`docs/sprint-1.md` §5](../../sprint-1.md#5-sprint-backlog-ve-kabul-durumu) | Tamam | Tarihsel 100 puan ölçeği korunur |
| Daily Scrum | [`daily/written-summary.md`](daily/written-summary.md) | Minimum tamam | Yazılı kayıt var; özel kanal görseli yok |
| Sprint Board Updates | [`board/2026-07-16-board-closeout-backfilled.png`](board/2026-07-16-board-closeout-backfilled.png) | Minimum tamam / Backfilled | Tarihsel baş-orta-son görüntüsü değildir |
| Ürün Durumu | [`product/README.md`](product/README.md) | Tamam | Beş tarihsel ekran görüntüsü korunur |
| Sprint Review | [`review/summary.md`](review/summary.md) | Tamam | Katılımcılar repo kaydıdır; haricî teyit eklenmemiştir |
| Sprint Retrospective | [`retrospective/summary.md`](retrospective/summary.md) | Tamam | Aksiyon owner ve hedefleri kaydedilmiştir |

## 16 Temmuz Teknik Yeniden Doğrulaması

- Güvenlik/veri sınırları: `7702f44 Harden project boundaries`
- Sprint 1 UX ve hata durumları: `93d2a66 Refine Sprint 1 UX`
- GitHub `sprint-1` issue'ları: `#1–#10`, doğrulama yorumlarıyla kapatıldı
- `npm run lint`: geçti
- `npm run typecheck`: geçti
- `npm run build`: geçti; 13 route üretildi
- `npm run test:e2e`: 6/6 geçti
- `npm audit --omit=dev`: 0 vulnerability

Bu doğrulama Sprint 1'in tarihsel puanına yeni iş eklemez. Mevcut temel kapsamın
bugünkü kod üzerinde hâlâ çalıştığını ve güvenli biçimde teslim edilebildiğini
kanıtlar.

## Açık Kaynak Sınırlamaları

- 19 Haziran–5 Temmuz dönemine ait baş/orta/son board ekran görüntüleri yoktur.
- Slack/WhatsApp mesaj görselleri repository içinde yoktur.
- Review katılımcılarının repo dışı toplantı katılım teyidi eklenmemiştir.

Bu sınırlamalar Bootcamp minimum yazılı kanıt paketini geçersiz kılmaz; daha
yüksek kanıt standardı için yalnız gerçek kaynak bulunursa redakte edilerek
`backfilled` biçiminde eklenebilir.
