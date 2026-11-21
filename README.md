# gas2rent-panduan

Panduan admin gas2rent untuk pemilik rental. Satu halaman, teks saja, tanpa
login dan tanpa database.

https://gas2rent-panduan.xyenrae.dev

## Mengubah isi

Semua tulisan ada di `src/content/panduan.md`. Sunting langsung, lalu:

```bash
pnpm dev      # lihat di http://localhost:4321
pnpm build    # periksa anchor, hasil di dist/
```

Daftar isi diambil dari heading `##` di file itu, jadi menambah atau mengganti
nama bagian tidak perlu mengubah kode. Satu bagian satu topik, 2–3 paragraf,
ditulis dari sudut pandang pemilik rental — bukan penjelasan teknis.

Kalau menambah bagian, letakkan di antara bagian yang berhubungan supaya
alurnya tetap menyambung: satu bagian ditutup dengan hal yang membuat pembaca
butuh bagian berikutnya.

## Deploy

```bash
vercel deploy --prod
```

Project `gas2rent-panduan`, domain `gas2rent-panduan.xyenrae.dev` (satu CNAME ke
`cname.vercel-dns.com`, jangan wildcard). Situs ini selalu `noindex, nofollow`:
robots.txt, meta tag, dan header di `vercel.json`. Jangan tambahkan sitemap.

## Berkas

```
src/content/panduan.md   isi panduan
src/pages/index.astro    satu halaman: markup, gaya, dan penanda bagian aktif
scripts/check-anchors.mjs memastikan setiap tautan daftar isi punya target
public/                  favicon dan robots.txt
```
