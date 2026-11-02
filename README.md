# Website Konsultan Asuransi – [Nama Usaha]

Website profil untuk konsultan asuransi. Isinya memperkenalkan konsultan, menjelaskan jenis perlindungan, memberi edukasi dasar, dan mengarahkan calon nasabah untuk berkonsultasi lewat WhatsApp.

Website ini **statis**: HTML, CSS, dan JavaScript biasa. Tidak ada server, database, framework, atau proses build. Cukup buka file-nya di browser, atau unggah foldernya ke hosting statis gratis.

## Daftar isi

1. [Status proyek](#1-status-proyek)
2. [Menjalankan di komputer](#2-menjalankan-di-komputer)
3. [Struktur folder](#3-struktur-folder)
4. [Cara kerja fitur utama](#4-cara-kerja-fitur-utama)
5. [Panduan mengubah konten](#5-panduan-mengubah-konten)
6. [Deployment](#6-deployment)
7. [Checklist sebelum serah terima](#7-checklist-sebelum-serah-terima)
8. [Ketentuan konten asuransi](#8-ketentuan-konten-asuransi)
9. [Teknologi dan lisensi](#9-teknologi-dan-lisensi)

---

## 1. Status proyek

Per 1 November 2026:

| Bagian | Status |
|---|---|
| 9 halaman utama: Beranda, Tentang Saya, Solusi, Kalkulator Protection Gap, Edukasi, Tanya Jawab, Kontak, Konsultasi Gratis, Kebijakan Privasi | Selesai dibuat, isi masih placeholder |
| Halaman artikel `edukasi/artikel-1.html` sampai `artikel-3.html` | **Belum dibuat.** File masih kosong, jadi tautannya menampilkan halaman putih. |
| `robots.txt` dan `sitemap.xml` | **Kosong.** Diisi setelah domain ada (contoh isinya di [bagian 6](#6-deployment)). |
| `docs/checklist-qa.md` | Terisi: checklist dan hasil pengujian per 31 Oktober 2026 |
| `docs/konten-dari-klien.md` | Kosong |
| Konten asli dari klien (nama, foto, kontak, profil) | Belum ada. Semua ditandai `[...]`. |
| Ilustrasi | 17 ilustrasi SVG terpasang di hero, halaman Solusi, dan gambar artikel (1 November 2026, ditambah ilustrasi Kendaraan, Properti & Usaha, keluarga, dan konsultan pada 2 November 2026). Hero Beranda dan Solusi memakai ilustrasi manusia (keluarga dan konsultan) yang bergerak pelan. Foto konsultan masih menunggu klien. |
| Kepatuhan pedoman Manulife Agency ([bagian 8](#8-ketentuan-konten-asuransi)) | Isi website sudah diaudit: tidak ada logo atau nama Manulife selain di disclaimer afiliasi, dan tidak ada klaim berlebihan. Disclaimer afiliasi terpasang di footer semua halaman. **Kalimat disclaimer perlu dikonfirmasi klien.** |

**Sudah diuji:**
- Validasi formulir: 15 kasus uji lolos (nomor valid dan tidak valid, field wajib, batas panjang pesan).
- Tampilan kedelapan halaman di desktop (1366 px) dan mobile (390 px), lewat screenshot.
- Struktur HTML dengan `docs/qa-check.js`: 198 tautan internal, id, atribut ARIA, judul, dan deskripsi halaman. Satu-satunya masalah: tautan ke 3 halaman artikel yang masih kosong.
- Kalkulator protection gap (1 November 2026, Edge headless): angka contoh klien (pengeluaran 5 juta, perlindungan 100 juta, 11 tahun) menghasilkan kebutuhan Rp 660.000.000 dan kesenjangan Rp 560.000.000, sama dengan contoh. Juga dicek: rincian tambahan, bagian hasil yang tersembunyi saat isiannya kosong, format ribuan, dan isi pesan WhatsApp. Tampilan dicek di 390 px dan 1366 px. Setelah halaman ini ditambahkan, `qa-check.js` memeriksa 240 tautan dan hanya menemukan masalah lama yang sama.
- Upgrade tampilan (1 November 2026, Edge sungguhan lewat Playwright): tidak ada error JavaScript di 9 halaman, baik di lebar 1366 px maupun 390 px. Menu HP, titik slider, kartu kategori yang bisa diklik, dan penanda kategori di Solusi berfungsi. Kalkulator tetap menghasilkan angka contoh klien. `qa-check.js` memeriksa 246 tautan, dan masalahnya tetap hanya 3 halaman artikel yang kosong.
- Penempatan foto asli di kotak placeholder, lewat halaman uji dengan foto contoh.
- Tampilan HP "laptop mini" (2 November 2026, Edge headless di 390 px): Beranda turun dari 9,8 menjadi 6,7 tinggi layar, Solusi dari 12,8 menjadi 9,0, dan Tentang Saya dari 7,0 menjadi 5,0. Halaman lain turun 9 sampai 29 persen. Tidak ada halaman yang melebar ke samping dan tidak ada error JavaScript. Tinggi halaman di 768 px dan 1366 px sama persis dengan sebelumnya.
- Upgrade elemen kepercayaan (2 November 2026, Edge headless): tidak ada halaman yang melebar ke samping di 390, 768, 1024, dan 1366 px, dan tidak ada error JavaScript di 9 halaman. `qa-check.js` memeriksa 288 tautan, dan masalahnya tetap hanya 3 halaman artikel yang kosong. Beranda di HP menjadi 7,2 tinggi layar (sebelumnya 6,7) karena ada kartu komitmen dan kredensial baru.
- Ilustrasi Kendaraan dan Properti & Usaha (2 November 2026, Edge headless): halaman Solusi tidak melebar ke samping di 390, 640, 768, 860, 1024, dan 1366 px, dan tidak ada error JavaScript. Karena ilustrasi kategori di tablet kini berada di samping judul, halaman Solusi di tablet justru 600 sampai 930 px lebih pendek dari sebelumnya. Di HP bertambah sekitar 120 px, dan di laptop sekitar 260 px (termasuk bilah info atas).
- Lapisan tampilan modern (2 November 2026, Edge headless): tidak ada halaman yang melebar ke samping di 390, 768, 1024, dan 1366 px, dan tidak ada error JavaScript di 9 halaman. Panjang halaman di HP praktis tidak berubah (paling banyak 38 px di Beranda). Header mengambang, menu HP, dan bilah kategori Solusi dicek dalam keadaan di-scroll dan saat menu dibuka.
- Kartu komitmen layanan di bawah hero Beranda dihapus (2 November 2026). Hero kembali ke jarak bawah normal. Halaman diperiksa ulang di 390, 768, dan 1366 px.
- Kartu "Konsultasi langsung bersama" di hero Beranda dihapus (2 November 2026). Diperiksa ulang di 390, 768, dan 1366 px.
- Tema gabungan (2 November 2026, Edge headless): tidak ada halaman yang melebar ke samping di 390, 768, dan 1366 px, dan tidak ada error JavaScript di 9 halaman. Dibanding tampilan modern sebelumnya, halaman di HP bertambah 49 sampai 88 px (Beranda 6,9 menjadi 7,0 tinggi layar), terutama karena kartu kontak dan tombol "Kembali ke atas" di footer. Menu laptop tetap satu baris di 1200 px. `qa-check.js` tetap hanya menemukan 3 halaman artikel yang kosong.
- Tema asuransi (2 November 2026, Edge headless): tidak ada halaman yang melebar ke samping di 390, 768, dan 1366 px, dan tidak ada error JavaScript di 9 halaman. Dibanding tampilan modern sebelumnya, halaman di HP berubah antara -43 dan +2 px. Menu laptop tetap satu baris di 1200 px (sisa 13 px di Beranda). `qa-check.js` tetap hanya menemukan 3 halaman artikel yang kosong.
- Sentuhan modern tema asuransi (2 November 2026, Edge headless): tidak ada halaman yang melebar ke samping di 390, 768, dan 1366 px, dan tidak ada error JavaScript. Panjang halaman di HP berubah antara -18 dan +46 px. Menu laptop muat satu baris di 1200 px (sisa 23 px di Beranda).
- Animasi tema asuransi (2 November 2026, Edge headless dengan animasi aktif): frame demi frame diperiksa untuk garis sorot judul dan garis langkah konsultasi. Dalam mode "kurangi gerakan", garis sorot tampil penuh dan langkah konsultasi tampil utuh tanpa animasi. Tidak ada error JavaScript di 9 halaman, tidak ada halaman yang melebar ke samping, dan panjang halaman di HP tidak berubah.
- Animasi tambahan (2 November 2026, Edge headless dengan animasi aktif): frame demi frame diperiksa untuk judul hero kata demi kata, ilustrasi hero yang bergerak, isi judul section, ikon kartu, profil konsultan, band ajakan, dan kolom footer. Dalam mode "kurangi gerakan", yang dimuat adalah ilustrasi versi `-diam`, judul tidak dipecah per kata, dan semua animasi mati. Tidak ada error JavaScript di 9 halaman dan tidak ada halaman yang melebar ke samping di 390, 768, 1200, dan 1366 px. Panjang halaman di HP tidak berubah, dan menu laptop tetap satu baris di 1200 px.
- Lambaian ayah dan ibu serta ilustrasi kalkulator (2 November 2026, Edge headless dengan animasi aktif): frame demi frame diperiksa. Tangan yang melambai tidak menabrak kepala atau kartu, tombol kalkulator tertekan bergantian, hasilnya muncul, dan grafiknya naik turun. Dalam mode "kurangi gerakan", versi diamnya yang dimuat. Ukuran ilustrasi dan panjang halaman Kalkulator sama seperti sebelumnya di 390, 768, 1200, dan 1366 px, tanpa halaman yang melebar ke samping dan tanpa error JavaScript.
- Ilustrasi Edukasi (2 November 2026, Edge headless dengan animasi aktif): frame demi frame diperiksa. Kedua buku jatuh tanpa melewati lampu, lampunya berkedip lalu menyala, dan posisi akhirnya sama piksel demi piksel dengan versi diam. Ukuran ilustrasi dan panjang halaman Edukasi tidak berubah di 390, 768, 1200, dan 1366 px, tanpa halaman yang melebar dan tanpa error JavaScript.
- Ilustrasi Tanya Jawab (2 November 2026, Edge headless dengan animasi aktif): frame demi frame diperiksa di halaman aslinya, karena gelembung putihnya tidak terlihat di latar putih. Gelembung muncul "pop", membesar-mengecil bergantian, dan tanda tanya tetap di dalam gelembung. Ukuran ilustrasi dan panjang halaman Tanya Jawab tidak berubah di 390, 768, 1200, dan 1366 px, tanpa halaman yang melebar dan tanpa error JavaScript. Dalam mode "kurangi gerakan", versi diamnya yang dimuat.
- Ilustrasi Hubungi Kami (2 November 2026, Edge headless dengan animasi aktif): frame demi frame diperiksa di halaman aslinya. Pin, amplop, dan keempat pesan muncul sesuai urutan, pin dan amplop membesar-mengecil bergantian, dan ponsel tetap tampil di akhir putaran. Ukuran ilustrasi dan panjang halaman Hubungi Kami tidak berubah di 390, 768, 1200, dan 1366 px, tanpa halaman yang melebar dan tanpa error JavaScript. Dalam mode "kurangi gerakan", versi diamnya yang dimuat.

**Belum diuji:** animasi dan klik di browser sungguhan, tampilan di HP asli, Firefox dan Safari, alur formulir ke WhatsApp dengan nomor klien, dan skor Lighthouse.

Rincian 62 item uji beserta hasilnya ada di `docs/checklist-qa.md`.

---

## 2. Menjalankan di komputer

Yang dibutuhkan: browser modern (Chrome, Edge, Firefox, atau Safari) dan koneksi internet, karena font dimuat dari Google Fonts.

**Cara cepat:** klik dua kali `index.html`.

**Cara yang disarankan saat mengedit** (halaman otomatis refresh setiap file disimpan):

1. Install [VS Code](https://code.visualstudio.com/).
2. Install ekstensi **Live Server** (pembuat: Ritwick Dey).
3. Buka folder proyek di VS Code, klik kanan `index.html`, lalu pilih **Open with Live Server**.

---

## 3. Struktur folder

```
Web Assurance/
├── index.html               Beranda
├── tentang.html             Tentang Saya
├── solusi.html              Solusi Perlindungan
├── kalkulator.html          Kalkulator Protection Gap (jiwa + penyakit kritis)
├── konsultasi.html          Konsultasi Gratis (formulir → WhatsApp)
├── faq.html                 Tanya Jawab
├── kontak.html              Hubungi Kami (kanal kontak + formulir)
├── kebijakan-privasi.html   Kebijakan Privasi
├── edukasi/
│   ├── index.html           Daftar artikel
│   └── artikel-1..3.html    Halaman artikel (belum dibuat)
├── assets/
│   ├── css/
│   │   ├── base.css         Warna, font, dan ukuran dasar (ganti brand di sini)
│   │   ├── components.css   Komponen bersama: tombol, header, kartu, formulir, footer, animasi
│   │   ├── pages.css        Gaya khusus tiap halaman
│   │   ├── tema-asuransi.css  Tema yang aktif: terang, tenang, ramah, dimuat paling akhir
│   │   ├── tema-gabungan.css  Alternatif: konsep modern + navy-emas (tidak dipasang)
│   │   ├── tema.css         Alternatif: navy-emas murni sesuai referensi klien (tidak dipasang)
│   │   └── modern.css       Alternatif: tampilan modern sebelumnya (tidak dipasang)
│   ├── js/
│   │   ├── main.js          Nomor WhatsApp, menu HP, header, judul hero kata demi kata, animasi scroll, titik slider, penanda kategori Solusi
│   │   ├── form.js          Validasi formulir dan penyusunan pesan WhatsApp
│   │   ├── kalkulator.js    Hitungan kalkulator protection gap dan pesan WhatsApp hasilnya
│   │   └── faq.js           Accordion tanya jawab (Beranda, Solusi, Tanya Jawab)
│   ├── img/                 Foto dan logo usaha dari klien, favicon sementara (favicon.svg, favicon-32.png, apple-touch-icon.png)
│   │   └── ilustrasi/       17 ilustrasi SVG buatan sendiri + 8 versi diam (hero, Solusi, gambar artikel)
│   └── fonts/               Kosong (font dimuat dari Google Fonts)
├── docs/                    Catatan internal (jangan diunggah ke hosting)
│   ├── checklist-qa.md      Checklist dan hasil pengujian
│   ├── qa-check.js          Skrip pemeriksa tautan dan struktur HTML
│   └── konten-dari-klien.md Daftar bahan dari klien (belum diisi)
├── robots.txt               Aturan untuk mesin pencari (diisi saat deploy)
├── sitemap.xml              Daftar halaman untuk Google (diisi saat deploy)
└── README.md                Dokumen ini
```

---

## 4. Cara kerja fitur utama

### Formulir konsultasi

Formulir ada di halaman **Konsultasi Gratis** dan **Hubungi Kami**. Formulir ini **tidak mengirim data ke server dan tidak menyimpan apa pun**:

1. Pengunjung mengisi nama, nomor WhatsApp, keperluan, dan pesan (opsional).
2. `form.js` memeriksa isian di browser. Jika ada yang salah, pesan error tampil di bawah field.
3. Jika semua benar, WhatsApp terbuka di tab baru dengan pesan berisi data tersebut.
4. Data baru sampai ke konsultan setelah pengunjung menekan **kirim** di WhatsApp.

| Field | Aturan |
|---|---|
| Nama | Wajib, minimal 2 karakter |
| Nomor WhatsApp | Wajib, nomor HP Indonesia diawali `08`, `62`, atau `+62`. Spasi, titik, dan strip boleh. |
| Keperluan | Wajib dipilih |
| Pesan | Opsional, maksimal 1000 karakter |

Kalau kelak data juga ingin dikirim ke email, dibutuhkan layanan formulir pihak ketiga. Dalam hal itu, **Kebijakan Privasi wajib diperbarui**, karena isinya sekarang menyatakan website tidak menyimpan data.

### Kalkulator protection gap

Halaman `kalkulator.html` memperkirakan kesenjangan perlindungan (*protection gap*) asuransi jiwa dan penyakit kritis. Tampilan dan alurnya mengikuti contoh dari klien (1 November 2026): 4 isian utama dan hasil yang langsung berubah tanpa tombol. Periode kebutuhan diketik, tidak memakai slider seperti di contoh. Menu **Kalkulator** ada di semua halaman, dan kotak ajakan ke kalkulator ada di Beranda (di bawah kartu kategori solusi) dan di Solusi (di bawah panduan prioritas).

Rumus yang dipakai `kalkulator.js` (fungsi `hitungGap`). Rumus yang sama juga dijelaskan kepada pengunjung di bagian "Cara Kalkulator Menghitung":

| | Kebutuhan | Dikurangi |
|---|---|---|
| Jiwa | pengeluaran bulanan keluarga × 12 × periode kebutuhan + sisa utang + dana pendidikan anak + dana darurat & biaya lain | perlindungan jiwa yang dimiliki + tabungan & investasi |
| Penyakit kritis | penghasilan bulanan × 12 × 3, 4, atau 5 tahun (awalnya 3) | santunan penyakit kritis yang dimiliki |

Tanpa rincian tambahan, rumus jiwa sama dengan contoh klien: pengeluaran × 12 × periode, dikurangi perlindungan yang dimiliki. Kesenjangan tidak pernah di bawah Rp 0. Inflasi dan hasil pengembangan dana tidak dihitung, dan hal ini tertulis di catatan hasil.

- **Isian utama:** penghasilan bulanan, pengeluaran bulanan keluarga, perlindungan jiwa yang dimiliki, dan periode kebutuhan (diketik, 1–40 tahun, awalnya terisi 10). Hasil asuransi jiwa muncul begitu pengeluaran diisi dan periodenya valid. Hasil penyakit kritis muncul begitu penghasilan diisi. Bila periode di luar 1–40, pesan error tampil setelah kolom ditinggalkan.
- **Rincian tambahan (opsional):** utang, dana pendidikan, dana darurat, tabungan, santunan penyakit kritis, dan pilihan 3–5 tahun penghasilan. Semuanya ada di bagian yang bisa dibuka (`<details class="calc__more">`). Isian yang kosong dihitung Rp 0.
- **Privasi:** semua hitungan dilakukan di browser. Tombol **Diskusikan Hasil via WhatsApp** membuka WhatsApp dengan ringkasan hasil saja (kebutuhan, yang dimiliki, dan kesenjangan per jenis), bukan isian satu per satu. Data baru terkirim bila pengunjung menekan kirim di WhatsApp. Hal ini juga dijelaskan di Kebijakan Privasi bagian 2 dan 3.

Kalau rumus diubah, ubah juga penjelasan di bagian "Cara Kalkulator Menghitung" di `kalkulator.html`, supaya yang ditampilkan ke pengunjung tetap sesuai.

### Tombol WhatsApp

Semua tautan WhatsApp memakai atribut `data-wa`. Saat halaman dibuka, `main.js` mengisi alamat tautan itu dengan nomor dari `SITE.whatsapp`. Alamat yang tertulis langsung di HTML (`https://wa.me/6281200000000`) hanya cadangan bila JavaScript gagal dimuat.

Satu tombol bisa diberi pesan awal sendiri dengan mengisi atributnya:

```html
<a data-wa="Halo, saya ingin bertanya tentang asuransi kesehatan." href="https://wa.me/6281200000000">Tanya via WhatsApp</a>
```

### Animasi

- Isi hero tampil bertahap saat halaman dibuka. Diatur di `components.css`, bagian "Animasi".
- Konten di bawah layar muncul saat di-scroll. `main.js` memasang kelas `reveal` pada kartu dan section.
- Animasi tema asuransi (2 November 2026, gayanya di `tema-asuransi.css`):
  - **Saat halaman dibuka:** judul hero muncul kata demi kata. `main.js` membungkus setiap kata dengan `span.kata`, dan judul tetap dibaca utuh oleh pembaca layar lewat `aria-label`. Sesudah itu kata yang disorot mendapat garis sorot biru muda. Ikon lencana berdenyut pelan, tombol pertama di hero punya cincin denyut berkala, dan lambang di header berputar masuk.
  - **Ilustrasi hero:** gambarnya bergerak sendiri (lihat poin Ilustrasi), melayang lembut dengan cincin garis putus-putus yang berputar sangat pelan, dan di browser yang mendukung animasi berbasis scroll ikut bergeser sedikit saat halaman digulir. Ilustrasi kalkulator di hero halaman Kalkulator juga bergerak: tombolnya diketik, hasilnya muncul, lalu grafiknya naik turun. Di halaman Edukasi, dua buku jatuh ke tumpukan, lalu lampunya berkedip dan menyala. Di halaman Tanya Jawab, gelembung tanya dan jawab muncul "pop" lalu membesar-mengecil bergantian. Di halaman Hubungi Kami, pin lokasi dan amplop muncul "pop", pesan chat muncul satu per satu, lalu pin dan amplop membesar-mengecil bergantian.
  - **Saat di-scroll:** konten muncul dengan gerakan halus, isi judul section muncul bergantian, dan ikon kartu "meletup" masuk. Foto profil masuk dari kiri dan teksnya dari kanan, lalu kapsul kredensial muncul satu per satu. Band ajakan membesar pelan, dan kolom footer muncul bergantian. Garis penghubung langkah konsultasi tergambar dan nomornya muncul bergantian (kelas `steps--animate` dan `is-drawn` dipasang `main.js`).
  - **Sepanjang halaman:** garis progres scroll biru di tepi atas layar, gambar artikel sedikit membesar saat kartunya disorot, gambar kategori di Solusi "bernapas" pelan, lingkaran datar samar melayang di band ajakan, tombol WhatsApp mengambang berdenyut setiap 5 detik, dan ikon kartu sedikit berputar saat disorot.
  - Animasi yang mengikuti kelas `reveal` selesai dalam 0,9 detik, karena `main.js` melepas kelas itu setelahnya. Kalau durasinya diperpanjang, ubah juga angka 900 di `main.js`.
  - Tanya jawab membuka dan menutup dengan animasi tinggi (`faq.js`).
- Semua animasi otomatis mati bila pengunjung mengaktifkan pengaturan "kurangi gerakan" (*reduce motion*) di perangkatnya. Konten tetap tampil normal walaupun JavaScript gagal dimuat.

### Tampilan dan interaksi

- **Warna kategori.** Tiap jenis perlindungan punya warna sendiri lewat kelas `tone-*` di `components.css`: `tone-rose` (kesehatan), `tone-blue` (jiwa), `tone-amber` (kendaraan), dan `tone-teal` (properti & usaha). Ikon, eyebrow, tag, kotak catatan, dan meter di dalam elemen bertanda itu ikut berwarna. Warna ini dipakai di kartu kategori Beranda, di bilah kategori dan tiap bagian halaman Solusi, dan di hasil kalkulator. Kalau menambah warna baru, pastikan kontras teksnya minimal 4,5:1. Di tema asuransi keempat warna ini dipakai seperti aslinya. Di tema gabungan dan tema navy-emas, keempat warna ini diseragamkan menjadi emas lewat blok `.tone-rose, .tone-blue, ...` di file tema. Hapus blok itu kalau ingin warna per kategori kembali.
- **Kartu kategori di Beranda** bisa diklik di seluruh permukaannya. Tautannya ada di judul (`card__link`) dan mengarah ke bagian yang sesuai di Solusi.
- **Slider kartu di HP** diberi titik penanda posisi di bawahnya. Titik dibuat oleh `main.js`, hanya tampil di layar di bawah 600 px, dan disembunyikan bila semua kartu sudah terlihat tanpa digeser.
- **Tampilan HP "laptop mini"** (2 November 2026). Di layar di bawah 600 px tata letaknya meniru versi laptop, dengan huruf dan jarak yang lebih kecil supaya halaman tetap pendek. Hero memakai judul di kiri dan ilustrasi atau foto di kanan. Banner kalkulator menampilkan contoh hasil di kanan, profil konsultan memakai foto di kiri, langkah konsultasi tampil tiga kolom, dan footer memakai kolom Navigasi dan Kontak berdampingan. Ilustrasi kategori Solusi tampil di samping judul, kotak perbandingan berdampingan, dan piramida prioritas di samping daftarnya. Kumpulan kartu tetap digeser ke samping, dengan dua kartu terlihat sekaligus. Formulir, kalkulator, dan teks panjang tetap satu kolom. Tidak ada teks yang dihapus, dan disclaimer afiliasi tetap utuh. Aturannya ada di akhir `pages.css`, bagian "Mobile: tampilan laptop mini". Tampilan tablet dan desktop tidak berubah.
- **Tema tampilan** (2 November 2026). Ada empat lapisan tema di `assets/css/`, dan setiap halaman memasang **satu** di antaranya paling akhir, setelah `pages.css`:
  - `tema-asuransi.css` (**aktif**): mengikuti saran desain website asuransi agar terasa aman dan bersahabat. Hero terang (biru sangat muda ke putih) dengan ilustrasi manusia: keluarga di Beranda (`keluarga.svg`) dan konsultan di Solusi (`konsultasi.svg`); perisai dan ikon hanya pelengkap kecil. Satu warna aksen biru `#1d5fd0` untuk tombol dan tautan (tombol WhatsApp di halaman ikut biru; tombol WhatsApp mengambang tetap hijau). Satu keluarga huruf, Plus Jakarta Sans. Kartu datar tanpa kaca, cahaya, atau bayangan tebal; kartu kategori Beranda berisi ikon, judul, satu kalimat, dan "Pelajari". Tanpa teks bergradasi, serif miring, atau partikel berkilau. Navy hanya di band ajakan dan footer. Judul hero Beranda dan Solusi diganti agar bicara situasi nyata (penghasilan keluarga terhenti, biaya rumah sakit mendadak) tanpa janji manfaat. Sentuhan modern yang tetap datar: header kapsul putih yang mengambang (tanpa efek kaca), section abu-abu sebagai panel bersudut besar, footer bersudut atas, bingkai dalam untuk foto profil dan gambar artikel, panah tombol dalam lingkaran kecil, bilah kategori Solusi berbentuk kapsul, "Mengapa Berkonsultasi" bergaya bento (judul menjadi kotak biru muda) dan Tanya Jawab dua kolom di laptop, judul hero lebih besar, serta teks isi 17 px di layar lebar. Kesan elegan: judul semibold (600), tombol lebih ringan, jarak baris 1,75 dan jarak section sedikit lebih lapang di laptop (di HP tetap ringkas). Animasinya lebih ramai tetapi tetap tenang; daftarnya ada di bagian Animasi.
  - `tema-gabungan.css`: konsep modern dipadukan dengan gaya referensi klien. Dari konsep modern: header kapsul kaca yang mengambang, cahaya hero yang bergeser pelan, section abu-abu sebagai panel bersudut besar, footer bersudut atas, bingkai dalam untuk foto, bilah kategori Solusi berbentuk kapsul, dan tombol berhuruf biasa. Dari gaya referensi (samudrasatriabarokah.com, juga lasains.com): judul serif Fraunces dengan kata kunci miring emas (`<span class="text-gradient">`), teks Manrope, tombol emas dengan panah dalam lingkaran navy, label berawalan garis emas, ikon dalam lingkaran navy bercincin emas, kartu bernomor besar bergaris luar (dibuat CSS counter), section "Mengapa Berkonsultasi" yang gelap, garis emas tipis di hero, garis progres scroll, serta footer dengan kartu kontak, tulisan besar samar "Perlindungan", dan tombol "Kembali ke atas".
  - `tema.css`: navy-emas murni, paling mirip referensi (header bilah putih, tombol huruf kapital).
  - `modern.css`: tampilan modern sebelumnya (judul sans dengan gradasi biru, font Inter + Plus Jakarta Sans).
  Isi teks dan tata letak HP sama di keempatnya. Cara berpindah ada di [5.4](#54-warna-dan-font).
- **Bilah kategori di Solusi** menandai kategori yang sedang dibaca saat halaman di-scroll. Di HP, kategori aktif digeser ke tengah bilah.
- **Menu HP** menggelapkan halaman di belakangnya. Menu tertutup bila area gelap diklik, tombol Esc ditekan, atau salah satu tautan dipilih.
- **Banner kalkulator** di Beranda dan Solusi menampilkan "Contoh hasil simulasi" dengan angka dari contoh klien (Rp 560.000.000). Bagian ini hanya hiasan dan disembunyikan dari pembaca layar. Kalau angkanya diganti, ubah di kedua halaman. Saat banner terlihat, kartu contoh muncul memantul, angkanya menghitung naik dari Rp 0 sampai angka di HTML, meternya terisi, lalu kartu melayang pelan. Di tema asuransi, kartu tidak melayang. Sebagai gantinya, banner membesar pelan saat muncul, judul, teks, dan tombolnya menyusul, lalu setiap 6 detik bergantian: ikon kalkulator "pop", kartu contoh bergoyang (shake) sambil meternya terisi ulang, dan tombol "Coba Kalkulator" memancarkan cincin biru (gayanya di `tema-asuransi.css`). Animasinya diatur di `main.js` dan `pages.css` (bagian "Animasi pop banner kalkulator").
- **Ilustrasi** ada di `assets/img/ilustrasi/`: 17 ilustrasi SVG bergaya flat dengan warna website, ditambah delapan versi diam. Semuanya dibuat khusus untuk proyek ini dan tidak mengandung logo apa pun. Hero Beranda dan Solusi memakai ilustrasi manusia tanpa latar (`hero__art`) yang bergerak pelan. Di Beranda, keluarga bergandengan tangan (`keluarga.svg`): ayah dan ibu melambaikan tangan bergantian, kartu hati berdenyut, kartu perisai melayang, anak sedikit melompat, dan lingkaran latarnya "bernapas". Di Solusi, konsultan dengan empat ikon jenis perlindungan (`konsultasi.svg`): konsultan melambai, kartu ikon melayang bergantian, dan grafik di tabletnya tumbuh. Ganti dengan foto asli klien bila sudah ada. Pengunjung yang memilih "kurangi gerakan" mendapat versi `-diam.svg` lewat `<picture>`, karena animasi di dalam file SVG tidak bisa dimatikan dari CSS halaman. Sebagai cadangan, kedua file SVG itu juga mematikan animasinya sendiri bila "kurangi gerakan" aktif. Ilustrasi perisai sebelumnya tidak dipakai lagi tetapi masih disimpan: `perlindungan.svg` (perisai dengan delapan ikon pada cincin yang berputar), `solusi.svg` (perisai yang terhubung ke empat ikon kategori lewat garis yang mengalir), dan versi `-diam`-nya. Ilustrasi di hero halaman teks (`edu-hero__art`) tampil di kanan teks, di HP dalam ukuran kecil, lalu melayang pelan (animasi `float-soft`). Di halaman Kalkulator, ilustrasinya juga bergerak sendiri (`hero-kalkulator.svg`): tombol kalkulator tertekan satu per satu seperti sedang diketik, hasilnya muncul di layar, lalu grafik di sampingnya naik turun. Di halaman Edukasi (`hero-edukasi.svg`), buku oranye lalu buku hijau jatuh menyerong ke tumpukan dengan sedikit pantulan, lalu lampunya berkedip hidup-mati sebelum menyala terus. Di halaman Tanya Jawab (`hero-faq.svg`), gelembung pertanyaan muncul "pop" dari ujung ekornya, disusul gelembung jawaban. Keduanya lalu membesar-mengecil bergantian sementara tiga titiknya berdenyut, sebelum mengecil hilang dan diulang. Di halaman Hubungi Kami (`hero-kontak.svg`), pin lokasi muncul "pop" dari ujungnya dan amplop keluar dari sisi ponsel. Empat pesan chat di ponsel muncul satu per satu, pesan masuk dari kiri dan pesan keluar dari kanan. Pin dan amplop lalu membesar-mengecil bergantian, sebelum semuanya kecuali ponsel mengecil hilang dan diulang. Keempat ilustrasi ini dipasang lewat `<picture>` bersama versi diamnya (`hero-kalkulator-diam.svg`, `hero-edukasi-diam.svg`, `hero-faq-diam.svg`, dan `hero-kontak-diam.svg`), sehingga di keempat halaman itu kelas `edu-hero__art` ada di `<picture>`, bukan di `<img>`. Kotak gambar berisi ilustrasi diberi kelas `ph--art`, supaya gambarnya dipusatkan dan tokohnya tidak terpotong. Keempat kategori di Solusi punya ilustrasi sendiri (`sol__img`): `kesehatan.svg`, `jiwa.svg`, `kendaraan.svg`, dan `properti.svg`. Di laptop ilustrasi ada di bawah teks pembuka, dan posisi kolom berselang kiri-kanan antarkategori. Di tablet dan HP ilustrasi tampil di samping judul, juga bergantian kiri dan kanan.
- **Kredensial di profil konsultan** (Beranda, 2 November 2026). Profil konsultan memuat kapsul kredensial (`profile__facts`) dan tombol WhatsApp. Tampilkan tiap kapsul **hanya** bila datanya dari klien dan terverifikasi, dan hapus yang tidak ada datanya. Kartu "Konsultasi langsung bersama" yang sempat ada di hero sudah dihapus, karena profil konsultan sudah ada di halaman Tentang Saya.
- **Langkah konsultasi** di Beranda dan Tentang Saya memakai komponen garis waktu `.steps`. Di HP dan layar lebar tampil tiga kolom. Di tablet (600 sampai 759 px) tersusun ke bawah.

### Header dan footer

Header berbentuk kapsul yang mengambang (tema asuransi, gabungan, dan modern). Di tema asuransi kapsulnya putih padat tanpa efek kaca; di puncak halaman latar header sewarna bagian atas hero (`#edf4fe`), dan setelah di-scroll latarnya transparan sehingga hanya kapsul yang terlihat. Bilah kategori Solusi menempel tepat di bawahnya. Tinggi header diatur `--header-h` di file tema. Kalau tinggi kapsul diubah, nilai ini ikut diubah. Garis progres scroll (`--scroll` dari `main.js`) tampil biru di tema asuransi dan emas di tema gabungan serta tema navy-emas. Tema modern tidak menampilkannya.

Di atas header setiap halaman ada bilah info (`topbar`) berisi jam layanan, WhatsApp, dan email. Bilah ini ikut tergulung, sedangkan header tetap menempel. Di HP hanya jam dan WhatsApp yang tampil. Kolom Kontak di footer juga memuat jam layanan. Ganti `[Jam operasional]`, `[nomor]`, dan `[email]` di kedua tempat.

Karena website ini statis, header dan footer **ditulis ulang di setiap file HTML**: 9 file saat ini, ditambah halaman artikel nanti. Perubahan menu atau footer harus dilakukan di semua file (lihat [5.6](#56-menu-navigasi-dan-footer)).

---

## 5. Panduan mengubah konten

> **Tips VS Code:** `Ctrl+Shift+F` mencari teks di semua file. `Ctrl+Shift+H` mencari dan mengganti di semua file sekaligus. Setelah menyimpan perubahan, refresh browser.

### 5.1 Nomor WhatsApp

Wajib diganti sebelum website online.

1. Buka `assets/js/main.js` dan ubah baris ini:

   ```js
   whatsapp: "6281200000000",
   ```

   Isi dengan nomor klien dalam format internasional, **tanpa `+`, spasi, atau angka 0 di depan**. Contoh: `0812-3456-7890` ditulis `6281234567890`.

2. Ganti juga nomor cadangan di semua file HTML: tekan `Ctrl+Shift+H`, cari `6281200000000`, ganti dengan nomor yang sama, lalu pilih *Replace All*. Langkah ini juga mengganti tautan telepon (`tel:+62...`) di `kontak.html`. Kalau nomor telepon berbeda dengan nomor WhatsApp, ubah tautan telepon itu secara terpisah.

3. Ganti teks yang tampil untuk pengunjung, yaitu `[nomor]`, `[nomor WhatsApp]`, dan `[nomor telepon]`, misalnya dengan `0812-3456-7890`.

4. Uji: klik tombol WhatsApp dan kirim formulir. Pastikan chat terbuka ke nomor yang benar.

Pesan awal untuk tombol WhatsApp umum diatur di `waMessage`, tepat di bawah `whatsapp` dalam `main.js`.

### 5.2 Nama usaha dan teks placeholder

Semua teks yang menunggu data klien ditulis dalam kurung siku, misalnya `[Nama Usaha]`. Cari karakter `[` dengan `Ctrl+Shift+F` untuk menemukan semuanya.

| Placeholder | Tempat | Diisi dengan |
|---|---|---|
| `[Nama Usaha]` | Semua halaman: judul tab, serta deskripsi halaman Kebijakan Privasi. Header dan footer sudah memakai nama "Arits Irham" | Nama usaha atau brand, **tanpa kata "Manulife"** (lihat [bagian 8](#8-ketentuan-konten-asuransi)). Ganti sekaligus dengan `Ctrl+Shift+H`. |
| `[Jabatan]` | Beranda | Jabatan konsultan. Nama konsultan sudah diisi "Arits Irham" di Beranda, Tentang Saya, disclaimer afiliasi di footer semua halaman, dan Kebijakan Privasi, karena website ini untuk usaha pribadi |
| `[nomor]`, `[email]`, `[alamat kantor]` | Footer semua halaman, Kontak | Kontak klien |
| `[Jam operasional]`, `[jam]` | Band ajakan konsultasi, Konsultasi, Kontak | Jam layanan |
| `[Deskripsi singkat usaha, ...]` | Footer | Satu atau dua kalimat tentang usaha |
| `[Sertifikasi]`, `[Asosiasi / izin]`, `[Nomor izin / kredensial]` | Tentang Saya | **Hanya jika benar dan terverifikasi.** Jika tidak ada, hapus kotaknya. |
| `[Jawaban dikonfirmasi klien.]` | FAQ singkat di Beranda | Jawaban dari klien |
| `[Judul artikel ...]`, `[Ringkasan ...]` | Beranda, Edukasi | Judul dan ringkasan artikel |
| `[tanggal]`, `[nama penyedia]` | Kebijakan Privasi | Tanggal terbit dan nama hosting |

Bagian yang datanya tidak tersedia **dihapus**. Jangan dibiarkan berisi `[...]`, dan jangan diisi karangan. Komentar `<!-- GANTI: ... -->` di HTML menunjukkan bagian yang perlu diperiksa.

### 5.3 Foto

Sebagian tempat gambar sekarang berisi **ilustrasi**: hero Beranda, hero Solusi, dua gambar di bagian Kesehatan dan Jiwa (Solusi), gambar artikel (Beranda dan Edukasi), dan ilustrasi kecil di hero halaman Kalkulator, Edukasi, Tanya Jawab, Kontak, Konsultasi, dan Kebijakan Privasi. Ilustrasi itu boleh tetap dipakai. Kalau ingin diganti foto, ganti alamat `src` pada `<img>` dan hapus kelas `ph--art` dari kotaknya, supaya fokus foto kembali agak ke atas. Khusus hero Beranda dan Solusi, ilustrasinya tidak berada di dalam kotak. Untuk memakai foto di sana, ganti seluruh `<picture>` dengan kotak `<div class="ph hero__photo">` berisi `<img>` seperti contoh di bawah. Tempat foto konsultan (profil di Beranda dan hero Tentang Saya) masih menunggu foto asli dari klien.

1. **Siapkan foto.** Gunakan format WebP atau JPG. Lebar sekitar 1600 px untuk foto besar (hero, profil) dan 800 px untuk gambar kartu artikel. Kompres dulu, misalnya di [squoosh.app](https://squoosh.app), sampai ukurannya kira-kira di bawah 300 KB.
2. **Simpan** di `assets/img/`, dengan nama file huruf kecil tanpa spasi, misalnya `foto-konsultan.webp`.
3. **Pasang di HTML.** Cari kotak placeholder (`class="ph ..."`). Contoh di Beranda:

   ```html
   <div class="ph hero__photo" role="img" aria-label="Tempat foto utama dari klien">Foto utama (dari klien)</div>
   ```

   Ubah menjadi:

   ```html
   <div class="ph hero__photo">
     <img src="assets/img/foto-utama.webp" alt="Konsultan berdiskusi dengan sebuah keluarga">
   </div>
   ```

   - Hapus `role`, `aria-label`, dan teks placeholder. Deskripsi foto pindah ke `alt`.
   - Ikon gambar (atau ikon orang di tempat foto konsultan) di tengah kotak placeholder otomatis tertutup foto, jadi tidak perlu dihapus.
   - Foto otomatis memenuhi kotak dan dipotong rapi, dengan fokus agak ke atas agar wajah tidak terpotong. Kalau bagian penting foto tetap terpotong, atur titik fokusnya, misalnya `<img ... style="object-position: 50% 10%">`.
   - Kalau di dalam kotak ada label kategori (`article-card__chip`, di halaman Edukasi), biarkan label itu. Cukup hapus teks placeholder dan tambahkan `<img>`.
   - Di file dalam folder `edukasi/`, alamat foto diawali `../`, contoh `../assets/img/artikel-1.webp`.
   - Untuk foto yang tidak terlihat di layar pertama (semua selain foto hero), tambahkan `loading="lazy"` agar halaman lebih cepat dibuka.
   - Jangan memakai foto yang memperlihatkan logo Manulife. Pakai hanya foto milik sendiri atau yang berlisensi (lihat [bagian 8](#8-ketentuan-konten-asuransi)).

### 5.4 Warna dan font

Warna utama ada di `assets/css/base.css`, blok `:root`:

```css
--color-ink: #0a1a2f;      /* teks utama + tombol utama */
--color-accent: #2447c4;   /* aksen biru */
--color-dark: #07142a;     /* hero, band ajakan konsultasi, footer */
```

Blok di bawahnya (`.theme-dark, .hero, ...`) mengatur warna di area gelap, yaitu hero dan footer. Kalau warna brand diganti, sesuaikan kedua blok.

Warna khas tiap kategori perlindungan ada di `assets/css/components.css`, bagian "Warna kategori" (lihat [Tampilan dan interaksi](#tampilan-dan-interaksi)). Warna tombol WhatsApp diatur lewat `--color-wa` di `base.css`.

Font diatur lewat `--font-heading` dan `--font-body`, dan dimuat oleh tag `<link href="https://fonts.googleapis.com/...">` di `<head>` setiap halaman. Kalau font diganti, ubah keduanya.

File tema menimpa token di atas. Di `tema-asuransi.css`: satu keluarga huruf **Plus Jakarta Sans** untuk judul dan teks, warna aksen biru `#1d5fd0` (kontras 5,8:1). Di `tema-gabungan.css` dan `tema.css`: font judul **Fraunces** (serif), font teks **Manrope**, warna judul `#0b2147`, dan aksen emas tua `#9a6b14` untuk teks di latar terang (kontras 4,7:1). Di area gelap aksennya emas terang `#e6b964`.

**Berpindah tema.** Ubah di **semua halaman** (`Ctrl+Shift+H` membantu; di `edukasi/` path diawali `../`):

1. Baris link tema: `assets/css/tema-asuransi.css`, `assets/css/tema-gabungan.css`, `assets/css/tema.css`, atau `assets/css/modern.css`.
2. Baris font. Untuk `tema-asuransi.css`:

   ```html
   <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
   ```

   Untuk `tema-gabungan.css` dan `tema.css`:

   ```html
   <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,500&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
   ```

   Untuk `modern.css`:

   ```html
   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap" rel="stylesheet">
   ```

Markup footer (tulisan besar samar dan tombol "Kembali ke atas") tidak perlu diubah: tulisan besar hanya ditampilkan tema gabungan dan tema navy-emas. Favicon saat ini biru, sesuai tema asuransi dan modern. Untuk tema gabungan dan navy-emas, favicon navy-emas perlu dibuat ulang bila diinginkan. Ilustrasi hero Beranda dan Solusi (keluarga dan konsultan) dipakai di semua tema.

### 5.5 Logo dan favicon

Saat ini header dan footer menampilkan lambang sementara (perisai biru, `<span class="brand__mark">`) diikuti nama usaha dalam bentuk teks. Untuk memakai logo, ganti **seluruh** isi tautan `brand` di header setiap halaman, termasuk span lambang itu:

```html
<a class="brand" href="index.html"><img src="assets/img/logo.svg" alt="[Nama Usaha]" height="36"></a>
```

Footer berlatar gelap, jadi siapkan versi logo berwarna terang jika logo juga dipasang di sana. Kalau logo belum ada, lambang sementara boleh tetap dipakai.

Header semua halaman memakai **logo teks** "Arits Irham" (2 November 2026): nama dua warna, dengan tempat tagline kecil di bawahnya yang saat ini dikosongkan. Di tema asuransi, bagian `brand__accent` memakai warna aksen biru polos. Di tema gabungan, nama memakai Fraunces dan bagian itu tampil miring berwarna emas. Bagian nama yang bergradasi biru dibungkus `brand__accent`, dan tagline ada di `brand__tagline`:

```html
<span class="brand__text"><span class="brand__name">Arits <span class="brand__accent">Irham</span></span><span class="brand__tagline">Konsultan Perlindungan</span></span>
```

Gayanya ada di `components.css`, bagian Header. Tagline sedang dikosongkan di semua halaman. Span `brand__tagline` yang kosong tidak memakan tempat (aturan `.brand__tagline:empty` di `components.css`), jadi nama tetap di tengah lambang. Isi span itu, misalnya dengan contoh di atas, bila tagline ingin ditampilkan. Logo ini ditulis di header dan footer kesembilan halaman, jadi perubahan nama atau tagline harus dilakukan di semua tempat itu (cari `brand__name`). Nama yang sama juga tertulis di baris hak cipta footer. Footer memakai logo teks yang sama. Di tema asuransi, bagian `brand__accent` di footer navy tampil biru muda polos supaya terbaca. Kapsul header di laptop disiapkan untuk logo teks selebar sekitar 210 px. Kalau nama atau tagline jauh lebih panjang, cek lagi di lebar 1200 px.

Ikon kecil di tab browser (favicon) sudah terpasang di setiap halaman, memakai lambang perisai sementara yang sama dengan header (bukan logo Manulife): kotak biru dengan perisai putih. Filenya ada di `assets/img/`:

| File | Dipakai untuk |
|---|---|
| `favicon.svg` | Tab browser modern |
| `favicon-32.png` | Browser yang belum mendukung SVG |
| `apple-touch-icon.png` (180 × 180 px, tanpa transparansi) | Ikon saat website disimpan ke layar utama iPhone |

Bila logo klien sudah ada, timpa ketiga file itu dengan versi logo klien memakai nama file yang sama. Tag di `<head>` tidak perlu diubah. Warna bilah browser di HP diatur oleh `<meta name="theme-color" content="#07142a">`, yaitu navy situs.

### 5.6 Menu navigasi dan footer

- Menu ada di dalam `<nav class="nav" id="site-nav">`, footer di dalam `<footer class="site-footer">`.
- Ubah di **semua file HTML**. Kalau perubahannya sama persis, `Ctrl+Shift+H` membantu.
- Di folder `edukasi/`, semua tautan diawali `../`, misalnya `../kontak.html`.
- Atribut `aria-current="page"` menandai halaman yang sedang dibuka (garis biru di menu). Di setiap file, atribut itu harus ada pada tautan halaman file tersebut.

### 5.7 Menambah pertanyaan FAQ

Salin satu blok `accordion__item`, lalu ganti id-nya agar unik di halaman itu. Contoh untuk pertanyaan kedelapan di `faq.html`:

```html
<div class="accordion__item">
  <h3><button class="accordion__trigger" type="button" aria-expanded="false" aria-controls="q8" id="q8-btn">
    Pertanyaan baru?
    <svg class="icon" aria-hidden="true"><use href="#i-chevron"/></svg>
  </button></h3>
  <div class="accordion__panel" id="q8" role="region" aria-labelledby="q8-btn" hidden>
    <p>Jawaban.</p>
  </div>
</div>
```

`aria-controls` pada tombol harus sama dengan `id` panel, dan `aria-labelledby` pada panel harus sama dengan `id` tombol. Kalau tidak cocok, pertanyaan tidak bisa dibuka.

### 5.8 Judul halaman dan deskripsi untuk Google

Setiap halaman punya `<title>` dan `<meta name="description">` di `<head>`. Keduanya yang tampil di hasil pencarian Google. Ganti `[Nama Usaha]`, dan buat deskripsi sekitar 150–160 karakter yang menjelaskan isi halaman. Tag `og:title` dan `og:description` di bawahnya dipakai saat tautan dibagikan di WhatsApp atau media sosial.

### 5.9 Artikel

Template halaman artikel belum dibuat. Bagian ini dilengkapi setelah template tersedia.

---

## 6. Deployment

### Rekomendasi: Netlify (gratis)

Website ini bisa dihosting di layanan hosting statis mana pun. Netlify paling mudah karena cukup seret dan lepas (*drag and drop*) folder.

1. **Siapkan folder unggahan.** Salin folder proyek, lalu hapus `docs/` dan `README.md` dari salinan itu. Semua file yang diunggah bisa dibuka siapa pun lewat browser.
2. **Buat akun** di [netlify.com](https://www.netlify.com/). Sebaiknya memakai email milik klien, supaya akunnya bisa diserahkan.
3. Di dashboard Netlify, buat situs baru dengan opsi **deploy manual** (drag and drop), lalu seret folder salinan ke area unggah.
4. Netlify memberi alamat sementara berakhiran `.netlify.app`. Namanya bisa diganti di pengaturan situs.
5. Buka alamat itu dan uji semua halaman, termasuk dari HP.

**Memperbarui website:** siapkan ulang folder unggahan (langkah 1), lalu unggah lewat menu deploy di dashboard situs.

### Memasang domain sendiri

1. Beli domain (misalnya `.com` atau `.id`) di registrar domain, **atas nama klien**. Nama domain tidak boleh memakai kata "Manulife" (lihat [bagian 8](#8-ketentuan-konten-asuransi)).
2. Di pengaturan domain Netlify, tambahkan domain tersebut, lalu atur DNS di panel registrar sesuai petunjuk dari Netlify.
3. HTTPS (ikon gembok) dipasang otomatis oleh Netlify setelah DNS aktif. Perubahan DNS bisa memakan waktu hingga 24–48 jam.

### Alternatif hosting gratis

| Layanan | Catatan |
|---|---|
| Cloudflare Pages | Cepat dan mendukung unggah folder langsung |
| GitHub Pages | Perlu akun GitHub. Di akun gratis, repository harus publik, sehingga semua file termasuk `docs/` bisa dilihat orang lain. |

### Setelah domain ada: isi `robots.txt` dan `sitemap.xml`

Ganti `https://domainanda.com` dengan domain asli.

`robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://domainanda.com/sitemap.xml
```

`sitemap.xml` (tambahkan halaman artikel setelah terbit):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://domainanda.com/</loc></url>
  <url><loc>https://domainanda.com/tentang.html</loc></url>
  <url><loc>https://domainanda.com/solusi.html</loc></url>
  <url><loc>https://domainanda.com/kalkulator.html</loc></url>
  <url><loc>https://domainanda.com/konsultasi.html</loc></url>
  <url><loc>https://domainanda.com/edukasi/</loc></url>
  <url><loc>https://domainanda.com/faq.html</loc></url>
  <url><loc>https://domainanda.com/kontak.html</loc></url>
  <url><loc>https://domainanda.com/kebijakan-privasi.html</loc></url>
</urlset>
```

Opsional: daftarkan domain di [Google Search Console](https://search.google.com/search-console) (gratis) dan kirim alamat sitemap agar Google lebih cepat menemukan website.

### Daftar akun untuk diserahkan

| Akun | Dipakai untuk | Email pemilik akun |
|---|---|---|
| Hosting (Netlify atau lainnya) | Menyimpan dan menayangkan website | [email] |
| Registrar domain | Domain website | [email] |

> **Jangan menulis password di README atau di file mana pun dalam proyek.** Serahkan password langsung kepada klien, lalu minta klien menggantinya.

---

## 7. Checklist sebelum serah terima

Checklist pengujian yang lebih rinci, beserta hasilnya, ada di `docs/checklist-qa.md`. Pemeriksaan tautan dan struktur HTML bisa dijalankan ulang kapan saja dengan perintah `node docs/qa-check.js` dari folder proyek (butuh Node.js).

- [ ] Tidak ada lagi teks `[...]` di halaman (cari `[` di semua file).
- [ ] Nomor WhatsApp asli sudah dipasang di `main.js` dan di semua HTML. Tombol WhatsApp dan formulir sudah dicoba, dan chat terbuka ke nomor yang benar.
- [ ] Bagian yang tidak punya data (sertifikasi, media sosial, tonggak karier, dan sebagainya) sudah dihapus.
- [ ] Semua tautan berfungsi dan tidak ada halaman putih (halaman artikel sudah dibuat).
- [ ] Foto asli terpasang, sudah dikompres, dan punya teks `alt`.
- [ ] Diuji di HP asli (Android, dan iPhone bila ada), serta di Chrome dan minimal satu browser lain.
- [ ] Skor Lighthouse sudah dicek (Chrome: `F12` → tab Lighthouse) untuk Performance, Accessibility, Best Practices, dan SEO.
- [ ] Kebijakan Privasi: tanggal dan nama hosting terisi, dan kalimat yang menunggu konfirmasi klien sudah diputuskan.
- [ ] `robots.txt` dan `sitemap.xml` terisi dengan domain asli.
- [ ] Klien sudah menyetujui seluruh teks, terutama FAQ dan penjelasan produk.
- [ ] Website sudah dicek terhadap pedoman Manulife Agency ([bagian 8](#8-ketentuan-konten-asuransi)): tidak ada logo Manulife (termasuk di foto), nama Manulife hanya muncul di disclaimer afiliasi, disclaimer ada di footer semua halaman, dan tidak ada klaim berlebihan. Hal yang meragukan sudah dikonfirmasi klien ke BDM atau TH-nya.
- [ ] Akun hosting dan domain atas nama klien, dan source code sudah diserahkan.

---

## 8. Ketentuan konten asuransi

Berlaku untuk siapa pun yang mengubah isi website. Klien adalah Tenaga Pemasar Manulife Indonesia. Karena itu, website ini termasuk "materi komunikasi yang dibuat sendiri" dan wajib mengikuti pedoman Manulife Agency, yaitu "Penting: Dilarang Menggunakan Logo Manulife" dan "Social Media Guideline" (diterima dari klien pada 1 November 2026). Pelanggaran pedoman itu dapat berujung tindakan disiplin bagi klien, hingga pemutusan kontrak.

### Logo dan nama Manulife

- **Logo Manulife dilarang dalam bentuk apa pun.** Logo tidak boleh dipasang, dimodifikasi, dibuat ulang, atau ditempatkan seolah-olah website ini materi resmi perusahaan. Larangan ini juga berlaku untuk logo yang terlihat di foto (misalnya latar acara, banner kantor, atau seragam berlogo), gambar artikel, favicon, dan gambar pratinjau tautan.
- **Nama "Manulife" hanya dipakai untuk menyebut afiliasi** di disclaimer. Jangan memakainya sebagai nama usaha, nama domain, nama akun media sosial, atau di judul halaman. Kalau klien ingin menyebut Manulife di bagian lain, tanyakan dulu ke BDM atau TH-nya.
- Jangan membuat tampilan website menyerupai website resmi Manulife.
- **Disclaimer afiliasi di footer semua halaman wajib ada dan tidak boleh dihapus.** Isinya mengikuti contoh disclaimer di pedoman: website dikelola pribadi oleh Tenaga Pemasar, bukan website resmi Manulife, isinya pandangan pribadi, dan Manulife tidak bertanggung jawab atas isinya. Halaman baru, termasuk halaman artikel, harus memakai footer yang sama.

### Isi dan klaim

- Jangan menjanjikan manfaat, premi, hasil investasi, keuntungan, atau persetujuan klaim. Jangan menyampaikan informasi pendapatan atau promosi yang tidak dapat dipertanggungjawabkan.
- Jangan membuat pernyataan atas nama perusahaan, termasuk opini atau klaim yang bisa dianggap mewakili Manulife.
- Jangan menjelekkan pihak lain, baik perusahaan asuransi lain, industri, maupun perorangan.
- Materi produk hanya diambil dari materi resmi Manulife Indonesia, tanpa diubah, dipotong, atau dijadikan meme. Informasi harus akurat dan bersumber dari kanal resmi. Jangan memakai konten dari sumber yang tidak jelas.
- Penjelasan produk bersifat umum, dan ketentuan lengkap mengikuti polis resmi. Jangan menghapus disclaimer umum di footer.
- Jangan mencantumkan sertifikasi, lisensi, nomor izin, lama pengalaman, angka statistik, atau testimoni yang tidak dapat dibuktikan.

### Data, hak cipta, dan interaksi

- Jangan menampilkan data nasabah, kebijakan internal, atau informasi rahasia lain. Testimoni hanya boleh dimuat dengan izin dari orang yang bersangkutan.
- Formulir tidak boleh meminta data sensitif seperti NIK, data kesehatan, nomor polis, atau rekening. Diskusi pribadi diarahkan ke WhatsApp, bukan ke kolom publik.
- Foto, ikon, musik, dan video hanya yang milik sendiri atau berlisensi, dengan kredit bila diwajibkan.

Kalau ragu apakah suatu isi boleh dimuat, klien perlu menanyakannya dulu ke BDM atau TH-nya sebelum website diubah. Klien tetap bertanggung jawab atas kebenaran informasi dan kepatuhan terhadap ketentuan yang berlaku bagi bisnisnya.

---

## 9. Teknologi dan lisensi

- **Teknologi:** HTML, CSS, dan JavaScript tanpa library. Total JavaScript sekitar 16 KB.
- **Browser:** versi terbaru Chrome, Edge, Firefox, dan Safari, baik desktop maupun HP. Beberapa efek, seperti blur pada header dan sorotan pertanyaan yang sedang terbuka, memakai fitur CSS yang baru. Di browser lama efek itu tidak tampil, tetapi website tetap berfungsi.
- **Font:** [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) untuk judul dan [Inter](https://fonts.google.com/specimen/Inter) untuk teks isi, dari Google Fonts, dengan lisensi SIL Open Font License 1.1 yang mengizinkan penggunaan komersial.
- **Ilustrasi** di `assets/img/ilustrasi/` dibuat khusus untuk proyek ini (bukan aset pihak ketiga), sehingga bebas dipakai dan diubah oleh klien.
- **Ikon:** berasal dari set ikon [Lucide](https://lucide.dev), lisensi ISC. Copyright © Lucide Contributors; sebagian © Cole Bemis (Feather, lisensi MIT). Teks lisensi lengkap: <https://lucide.dev/license>.
- **Foto, logo, dan teks dari klien** menjadi tanggung jawab klien, termasuk hak ciptanya.

---

Dikembangkan oleh [Nama Pengembang] – [kontak pengembang].
