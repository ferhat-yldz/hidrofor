# Admin Panel Kalici Kurulum (Supabase)

Admin panelin kalici (deploy sonrasi veri kaybetmeyen) calismasi icin Supabase baglantisi gerekir.

## 1) Supabase SQL

Supabase SQL Editor icinde su dosyayi calistir:

- `supabase/admin_schema.sql`

Ve Storage tarafinda `admin-media` adli bir bucket olustur (public).

## 2) Environment Variables

Deploy ortaminda asagidaki degiskenleri tanimla:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `ADMIN_SESSION_TTL_MINUTES` (opsiyonel, varsayilan 30)

Not: Ilk login `ADMIN_PASSWORD` ile olur. Sonra panelden sifre degistirince hash hali DB'de `admin_auth_state` tablosuna kaydedilir.

## 3) Ne kalici oldu?

- Icerik draft/yayin: `admin_content`
- Yedekler: `admin_backups`
- Sifre hash + session version: `admin_auth_state`
- Medya dosyalari: `admin-media` storage bucket
 kc$jBX8S6/bTU?a