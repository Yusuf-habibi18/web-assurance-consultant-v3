# Website Konsultan Asuransi – Arits Fauzi Irham

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
| 7 halaman utama: Beranda, Tentang Saya, Solusi, Kalkulator Protection Gap, Edukasi, Kontak, Kebijakan Privasi | Selesai dibuat, isi masih placeholder. Halaman Tanya Jawab dan Konsultasi Gratis dihapus atas permintaan klien (7 November 2026); keduanya masih ada di riwayat git. |
| Beranda versi klien: awalnya 9 bagian sesuai urutan klien; sejak 8 November 2026 tujuh bagian (Home, About Me + Why Work With Me, Area of Expertise, My Approach, Professional Journey + Client Testimonials, Financial Insight, Contact Me), judul dan menu berbahasa Inggris | Dibuat 7 November 2026, digabung 8 November 2026 (lihat [Susunan Beranda dan menu](#susunan-beranda-dan-menu)). Testimoni dan tonggak karier masih placeholder. |
| Edukasi: 7 rangkuman sumber dalam 3 kategori (Dasar asuransi, Panduan polis, Tips klaim) | Terisi (4 November 2026). Formatnya kutip singkat + tautan ke artikel asli, jadi halaman artikel terpisah tidak dibuat (lihat [5.9](#59-artikel)). |
| `robots.txt` dan `sitemap.xml` | **Kosong.** Diisi setelah domain ada (contoh isinya di [bagian 6](#6-deployment)). |
| `docs/checklist-qa.md` | Terisi: checklist dan hasil pengujian per 31 Oktober 2026 |
| `docs/konten-dari-klien.md` | Berisi brief awal klien dan salinan dokumen kebutuhan "Isi Website" (PDF dari klien, 7 November 2026), dengan catatan tempat tiap teks dipakai dan hal yang perlu dikonfirmasi. Folder `docs/` tidak ikut ke repository. |
| Konten asli dari klien (nama, foto, kontak, profil) | Nama dan foto konsultan sudah terpasang (foto: 4 November 2026, foto formal berjas: 7 November 2026), begitu juga tujuh foto kegiatan di Professional Journey (empat pada 7 November, tiga pada 8 November 2026). Teks "Why Work With Me" dari klien (7 November 2026). Sertifikasi dan nomor lisensi AAJI dari kartu lisensi klien (8 November 2026). Sisanya masih ditandai `[...]`. |
| Ilustrasi | 17 ilustrasi SVG terpasang di hero, halaman Solusi, dan gambar artikel (1 November 2026, ditambah ilustrasi Kendaraan, Properti & Usaha, keluarga, dan konsultan pada 2 November 2026). Hero Beranda dan Solusi dulu memakai ilustrasi manusia (keluarga dan konsultan) yang bergerak pelan; sekarang keduanya memakai foto asli (Beranda sejak 7 November, Solusi sejak 8 November 2026). **Sejak 8 November 2026 tidak ada ilustrasi yang tampil lagi:** atas permintaan klien, semua gambar diganti foto asli (foto stok CC0, lihat [bagian 9](#9-teknologi-dan-lisensi)). Yang diganti: kotak ikon topik di kartu, empat gambar kategori Solusi, tiga gambar artikel (Beranda dan Edukasi), dan hero halaman Kalkulator, Kontak, Edukasi, dan Kebijakan Privasi. File SVG-nya masih disimpan di `assets/img/ilustrasi/`. |
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
- Pemeriksaan ulang tampilan HP (3 November 2026, Edge headless dengan emulasi HP di 320, 360, 390, dan 412 px): kesembilan halaman tidak melebar ke samping, dan tidak ada teks yang keluar dari kotaknya, kecuali label "Investasi" di piramida Solusi yang 2 px lebih lebar dari kotaknya di 320 px. Perbaikan yang dicek: profil konsultan Beranda tersusun ke bawah, kata panjang di kotak langkah tidak lagi menabrak garis kotak, ikon jam di band ajakan Tentang Saya menempel di depan teksnya, dan tombol klaim darurat di Kontak pindah ke bawah teks. Dibanding sebelumnya, Beranda bertambah 177 px di 360 px dan 227 px di 390 px (karena profil), Tentang Saya berkurang 24 px di 360 px, dan Kontak berkurang 33 px di 360 px tetapi bertambah 29 px di 390 px. Di 1366 px, tinggi band ajakan, kotak klaim, dan langkah konsultasi sama persis dengan sebelumnya. Setelah itu ikon di HP diperbesar: kotak ikon kartu dari 38 menjadi 44 px, kanal Kontak 44 px, daftar Solusi 40 px, daftar di samping piramida 30 px, gambar ikon di dalam kotak dari 20 menjadi 22 px, serta ikon di kapsul profil dan label kotak data Tentang Saya sekitar 25 persen lebih besar. Halaman di HP bertambah 6 sampai 18 px, dan tinggi daftar piramida tidak berubah.
- Ilustrasi Konsultasi (3 November 2026, Edge headless dengan animasi aktif): frame demi frame diperiksa. Gelembung chat, kartu pesan, dan centang muncul sesuai urutan, centang bergoyang dua kali tanpa menabrak kotak tanggal di sebelahnya, dan kalender tetap tampil di akhir putaran. Saat semua elemen tampil, gambarnya sama piksel demi piksel dengan versi diam. Ukuran ilustrasi dan panjang halaman Konsultasi tidak berubah di 360, 390, 768, dan 1366 px, tanpa halaman yang melebar dan tanpa error JavaScript. Dalam mode "kurangi gerakan", versi diamnya yang dimuat.
- Ilustrasi bergerak di HP diperbesar (3 November 2026, Edge headless dengan emulasi HP di 320, 360, 390, dan 412 px): ilustrasi hero halaman teks dari 108 px menjadi sampai 165 px, hero Beranda dan Solusi dari 37 menjadi 46 persen lebar, dan gambar kategori Solusi dari 40 menjadi 45 persen, semuanya tetap di samping judul. Tidak ada halaman yang melebar ke samping dan tidak ada teks yang keluar dari kotaknya (kecuali catatan 2 px di piramida Solusi di atas). Panjang halaman di HP berubah antara -24 dan +81 px (Solusi paling banyak, karena empat gambar kategori). Tinggi kesembilan halaman di 768 px dan 1366 px sama persis dengan sebelumnya.
- Alur WhatsApp (3 November 2026, Edge headless di 390 dan 1366 px), memakai nomor uji coba yang dipasang sementara di `main.js` dan tidak ikut disimpan di repository (lihat [5.1](#51-nomor-whatsapp) langkah 4): ke-36 tautan WhatsApp di 9 halaman mengarah ke nomor itu, terbuka di tab baru, dan membawa pesan awal umum. Formulir Konsultasi dan Kontak membuka WhatsApp ke nomor itu dengan nama, nomor, keperluan, dan pesan yang diisi, dan tautan "WhatsApp tidak terbuka?" berisi alamat yang sama. Tombol hasil Kalkulator membawa ringkasan contoh klien (kebutuhan Rp 660.000.000, kesenjangan Rp 560.000.000). Tidak ada error JavaScript. Pengiriman pesan di aplikasi WhatsApp belum dicoba.

- Rangkuman sumber Edukasi (4 November 2026, Edge headless di 390, 768, dan 1366 px): tidak ada error JavaScript dan tidak ada halaman yang melebar ke samping. Tujuh tautan sumber dicek isinya sebelum dirangkum: kedua PDF OJK, kedua artikel Hukumonline, dan artikel Kompas TV terbuka. Kedua artikel Bisnis.com menolak pembaca otomatis, jadi judul dan tanggalnya diambil dari hasil pencarian dan isinya belum dibaca langsung. Halaman Edukasi di HP menjadi 5,5 tinggi layar (sebelumnya 2,9, waktu isinya masih contoh); di laptop 4,8 (sebelumnya 3,3). Kartu artikel di Beranda kini menuju ketiga kategori itu. `qa-check.js` memeriksa 293 tautan internal tanpa masalah, karena tautan ke tiga halaman artikel kosong sudah tidak ada.

- Foto konsultan (4 November 2026, Edge headless di 390, 768, dan 1366 px): wajah dan rambut tidak terpotong di profil Beranda maupun hero Tentang Saya, tidak ada halaman yang melebar ke samping, dan tidak ada error JavaScript. Tinggi halaman tidak berubah, karena kotak fotonya sudah berukuran tetap sebelum foto dipasang. `qa-check.js` memeriksa 295 tautan tanpa masalah.

- Animasi foto konsultan (4 November 2026, Edge headless, direkam frame demi frame): di Tentang Saya tirai terbuka dari bawah antara sekitar 0,4 dan 1,5 detik, lalu foto melayang. Di Beranda, foto selesai mengecil sebelum kelas reveal dilepas. Tidak ada halaman yang melebar ke samping, tidak ada error JavaScript, dan tinggi halaman tetap sama di 390 dan 1366 px.

- Beranda versi klien (7 November 2026, Edge headless di 390, 768, 1200, dan 1366 px): kesembilan bagian tampil berurutan, tidak ada halaman yang melebar ke samping, dan tidak ada error JavaScript. Menu laptop muat satu baris di 1200 px. Saat di-scroll ke About, Why Me, Testimonials, dan Contact, item menu yang sesuai ikut ditandai, dan judul bagiannya tidak tertutup header. Beranda menjadi 6.897 px di HP (sebelumnya 6.185) dan 7.292 px di laptop (sebelumnya 6.479), karena ada dua bagian baru (Professional Journey dan Client Testimonials) sementara FAQ singkat dihapus. Setelah My Approach diganti empat langkah dan tagline jabatan dipasang di logo, Beranda menjadi 7.111 px di HP dan 7.286 px di laptop; menu tetap satu baris di 1200 px, dan logo dengan tagline muat di header HP 390 px. Setelah lima bidang Area of Expertise serta hero dan pembuka Area of Expertise dari klien dipasang, Beranda menjadi 7.322 px di HP dan 7.699 px di laptop. Logo dengan tagline dicek di 320, 360, 390, dan 1200 px: tidak ada yang keluar dari header. Setelah hero disusun ulang sesuai dokumen "Isi Website" (identitas singkat, judul tentang risiko, foto berjas), Beranda menjadi 7.477 px di HP 390 px dan 7.657 px di laptop; tidak ada halaman yang melebar ke samping di 320, 360, 390, 768, 1200, dan 1366 px, dan tidak ada error JavaScript. `qa-check.js` memeriksa 219 tautan internal di 7 halaman tanpa masalah.

- Terjemahan bahasa Inggris (7 November 2026, Edge headless di 320, 360, 390, 768, 1200, dan 1366 px): ketujuh halaman tanpa error JavaScript dan tanpa halaman yang melebar ke samping. Teks yang keluar dari kotaknya dicek per elemen. Yang diperbaiki: label piramida "Investment" di Solusi (lapisan atas dilebarkan di HP), label kotak data Tentang Saya (diberi titik pemenggalan `&shy;`), serta judul "My Commitment to You" dan "Understanding Your Policy" yang diperkecil di HP di bawah 360 px. Yang tersisa hanya tempat isian `[...]` di kotak data Tentang Saya pada 320 sampai 360 px. Kalkulator diuji dengan contoh klien (kebutuhan Rp 660.000.000, kesenjangan Rp 560.000.000), dan keterangan hasil serta pesan WhatsApp-nya berbahasa Inggris. Formulir Kontak menampilkan pesan error, ucapan terima kasih, dan pesan WhatsApp berbahasa Inggris. `qa-check.js` (kini memeriksa `lang="en"`) memeriksa 221 tautan internal tanpa masalah.
- Foto kegiatan tambahan dan data lisensi (8 November 2026, screenshot Edge headless di 1366 dan 768 px, serta 390 px lewat iframe): di laptop dan tablet Professional Journey tampil dua baris (4 + 3 foto) dengan tinggi foto sebaris sama; di HP ketujuh foto tetap satu deret yang digeser ke samping. Kotak Certification dan License di hero Tentang Saya serta kapsul kredensial di About Me Beranda muat tanpa teks terpotong. Bekas hapusan logo dan tulisan di ketiga foto dicek dengan diperbesar. Pengujian ini memakai mode screenshot bawaan Edge, jadi error JavaScript tidak ikut diperiksa. `qa-check.js` memeriksa 224 tautan internal tanpa masalah.
- Menu baru (8 November 2026, screenshot Edge headless): sembilan item muat satu baris di 1200 dan 1366 px, item halaman yang dibuka tertanda, dan di bawah 1200 px tetap memakai tombol menu. Tautan `index.html#why`, `#journey`, dan `#testimonials` dibuka di iframe dengan mode "kurangi gerakan": judul bagiannya tampil tepat di bawah header. Tanpa mode itu, screenshot headless berhenti di tengah scroll halus, jadi hasilnya tidak bisa dipakai. `qa-check.js` memeriksa 229 tautan internal tanpa masalah.
- Gabungan bagian Beranda (8 November 2026, screenshot Edge headless dengan mode "kurangi gerakan" di 1366 px, dan 390 px lewat iframe): Why Work With Me tampil di bawah kartu profil (di laptop bergaya bento, di HP slider), Client Testimonials di bawah foto kegiatan dengan judulnya sendiri, latar tetap selang-seling, dan halaman Tentang Saya menampilkan empat kartu Why Work With Me. Menu tujuh item muat satu baris di 1200 px. `qa-check.js` memeriksa 217 tautan internal tanpa masalah.
- Halaman Professional Journey (8 November 2026, screenshot Edge headless dengan mode "kurangi gerakan" di 1366 px, dan 390 px lewat iframe): hero dengan foto, tonggak karier, tujuh foto (dua baris di laptop, slider di HP), testimoni, band ajakan, dan footer tampil lengkap; menu Journey tertanda aktif, dan Professional Journey ada di kolom Pages footer semua halaman. `qa-check.js` memeriksa 259 tautan internal di 8 halaman tanpa masalah.
- Foto pengganti ikon topik (8 November 2026, screenshot Edge headless dengan mode "kurangi gerakan" di 1366 px, dan 390 px lewat iframe): 26 kotak ikon di Beranda, Tentang Saya, dan Solusi tampil sebagai foto. Di laptop foto ada di atas isi kartu, termasuk bento Why Work With Me. Di daftar kendaraan Solusi foto menjadi gambar kecil di kiri. Di HP kartu tetap slider dan nomor 01 sampai 05 tetap terbaca di atas foto. Ke-21 foto dicek di lembar pilihan, dan bagian yang rawan (laptop, setir mobil, kalkulator) dicek diperbesar: tidak ada logo atau merek yang terbaca. Foto dimuat `loading="lazy"`, jadi screenshot headless butuh waktu tunggu lebih lama (`--virtual-time-budget=15000`) supaya semua foto muncul. `qa-check.js` memeriksa 276 tautan internal tanpa masalah.
- Foto pengganti semua ilustrasi (8 November 2026, screenshot Edge headless dengan mode "kurangi gerakan" di 1366 px, dan 390 px lewat iframe): hero Kalkulator, Kontak, Kebijakan Privasi, dan Edukasi memakai foto (kotak 4:3 seperti hero Professional Journey; di HP di samping judul). Empat gambar kategori Solusi dan tiga gambar artikel (Beranda dan Edukasi) tampil penuh di kotaknya. Tidak ada lagi gambar dari `assets/img/ilustrasi/` yang dipakai di halaman. `qa-check.js` memeriksa 276 tautan internal tanpa masalah.
- Tema premium navy-champagne (8 November 2026, screenshot Edge headless dengan mode "kurangi gerakan" di 1366 px untuk kedelapan halaman, dan 390 px lewat iframe untuk Beranda, Solusi, dan Kontak): semua bagian gelap, tanpa sisa kotak putih. Lapisan dasar piramida Solusi sempat putih di atas putih (warnanya dari `--color-ink`), lalu diberi warna sendiri. Formulir Kontak dan kalkulator terbaca, dan di HP lingkaran hiasan hero dipindah ke pojok supaya tidak memotong judul. Huruf akhirnya Fraunces lembut + Inter (sesudah Cinzel + Inter dan Plus Jakarta Sans dicoba). Teks yang lebih lebar dari kotaknya diperiksa otomatis di 320, 360, 375, 390, dan 414 px untuk kedelapan halaman: halaman pembungkus berisi iframe membuka tiap halaman, lalu memeriksa judul, tombol, label, dan menu, dan hasilnya dibaca lewat `--dump-dom`. Temuan awalnya, di bawah 380 px: kata panjang di judul kartu slider, "Conversation" di judul Kontak, "Understanding" di judul Edukasi, dan halaman Edukasi yang melebar 13 px di 320 px. Semuanya diperbaiki dengan `&shy;` dan ukuran judul sedikit lebih kecil di bawah 380 px, sampai tidak ada temuan. Menu tetap muat satu baris di 1200 px. `qa-check.js` memeriksa 284 tautan internal tanpa masalah.
- Bagian Vehicle Insurance dihapus dari Solusi atas permintaan klien (8 November 2026). Yang dihapus: section `#kendaraan`, tombolnya di bilah kategori, kata "a damaged vehicle" di teks pembuka hero, dan kata "vehicle" di deskripsi halaman untuk Google. Supaya latar dan posisi teks tetap selang-seling, Property & Business kini bernomor 03 dengan latar biasa dan teks di kiri, General guide menjadi panel, dan FAQ berlatar biasa. Contoh "vehicle installments" di Kalkulator dibiarkan, karena itu contoh jenis utang, bukan produk asuransi. Empat foto kendaraan (`sol-img-kendaraan`, `sol-bengkel`, `sol-perluasan`, `sol-pihak-ketiga`) tidak dipakai lagi, tetapi file-nya masih disimpan. Dicek dengan screenshot di 1366 dan 390 px. `qa-check.js` memeriksa 280 tautan internal tanpa masalah.
- Tonggak karier ("Career milestones", isinya masih placeholder) dihapus dari halaman Professional Journey (8 November 2026), karena konsultan baru merintis. Halaman itu kini berisi hero, foto kegiatan (panel), testimoni, dan band ajakan. Label "First step" di band ajakan Journey dan Tentang Saya sebelumnya diberi warna hijau toska langsung di HTML (sisa tema lama), sehingga tidak ikut emas. Warna itu dihapus supaya label mengikuti tema. Dicek dengan screenshot di 1366 dan 390 px. `qa-check.js` memeriksa 280 tautan internal tanpa masalah.
- Kolom pembuka Edukasi yang ikut turun (8 November 2026): di 1366 px, kolom kiri Insurance Basics sekitar 440 px sedangkan tiga kartu sumbernya sekitar 850 px, sehingga di bawah gambar ada ruang kosong. Sumbernya tidak dikurangi; kolom kiri dibuat `sticky`. Diuji di iframe 1366 × 720 px yang di-scroll otomatis ke tengah dan ke akhir bagian itu: saat menempel, kolom kiri berhenti 92 px dari atas layar, tepat di bawah header, dengan judul utuh; di akhir bagian, bawah gambar sejajar dengan bawah kartu ketiga. Tinggi kolom kiri diukur di 900 sampai 1920 px (paling tinggi 485 px), jadi syaratnya tinggi layar minimal 620 px. `qa-check.js` memeriksa 280 tautan internal tanpa masalah.
- Latar bergerak (8 November 2026): tiga varian (kisi garis, titik, titik + cincin orbit) dibandingkan berdampingan di Beranda 1366 px. Klien memilih cahaya aurora, digabung dengan titik dan cincin; titik-titiknya kemudian dihapus karena terasa mengganggu, jadi yang tersisa aurora dan cincin. Lighting masuk-keluar (sorot cahaya latar dan kilau emas tombol) diperiksa dengan membekukan animasi di tengah gerakan (`animation-play-state: paused` dengan `animation-delay` negatif, disuntikkan ke iframe), karena screenshot headless tidak menangkap animasi yang sedang berjalan: pita cahaya terlihat melintas di hero, kilau terlihat di tombol header dan tombol hero, dan tulisan tombol tetap terbaca. Kilatan kelap-kelip dicek dengan cara yang sama di Beranda dan Kalkulator (1366 px) serta Beranda (390 px): 11 dan 6 kilatan terbentuk di hero, berbentuk bintang kecil, dan tidak ada halaman yang melebar. Judul hero yang tampak samar di salah satu screenshot ternyata hanya momen pengambilan gambar: opacity kedelapan kata judul terbaca 1 enam detik setelah halaman dibuka. `node --check` untuk `main.js` lolos.
- Tombol dan animasi scroll yang lebih interaktif (8 November 2026). Uji dengan waktu virtual (`--virtual-time-budget`) ternyata tidak bisa dipercaya untuk efek muncul saat scroll: transisi CSS dan IntersectionObserver di dalam iframe tidak berjalan normal, sehingga konten tampak "tertinggal" padahal tidak. Karena itu pengujian memakai Edge headless yang dikendalikan lewat DevTools Protocol dengan waktu nyata (skrip Node 24 dengan WebSocket bawaan). Hasilnya: (1) kedelapan halaman di 1366 dan 390 px di-scroll pelan sampai bawah, dan semua elemen yang dianimasikan berakhir tampil penuh (opacity 1, tanpa buram, foto tidak terpotong, kelas `reveal` terlepas semua), tanpa halaman yang melebar; (2) dengan mouse sungguhan di Beranda, tombol bergeser 5,8 px ke arah kursor lalu kembali ke 0, riak muncul saat ditekan dan hilang sendiri, dan sorotan kartu mencatat posisi kursor; (3) panel Expertise membesar 98,9% lalu 100% saat masuk layar; (4) kolom Edukasi tetap menempel 92 px dari atas di dalam panel, sama dengan atau tanpa animasi panel; (5) kartu hasil kalkulator kembali menempel 96 px dari atas setelah aturan kartu dibungkus `:where()`. `qa-check.js` memeriksa 280 tautan internal tanpa masalah dan `node --check` lolos.
- Kilatan kelap-kelip di hero dihapus (8 November 2026, terasa seperti luar angkasa). Diperiksa di browser: Beranda dan Kalkulator tidak lagi berisi elemen `.kilap`, dan tombol hero tetap interaktif (magnet 5,8 px, riak muncul saat ditekan). `qa-check.js` lolos dan `node --check` untuk `main.js` lolos.
- Header lebih mewah (8 November 2026): screenshot sungguhan lewat DevTools Protocol (`Page.captureScreenshot`) di 390 px (menu tertutup dan terbuka), 1366 px, dan 1200 px. Menu laptop tetap satu baris di 1366 dan 1200 px. Di HP, blok nama dan jabatan sempat menempel ke tepi atas dan bawah header, lalu diberi ruang 0,45 rem; tinggi header jadi 70 px di HP dan laptop.
- Header lebih lega (8 November 2026), diukur lewat DevTools Protocol: tinggi 77 px di 390 px dan 88 px di 768, 1200, 1366, dan 1920 px, dan menu tetap satu baris di 1200 px ke atas. Semua yang menempel tetap di bawah header (bawah header 89 px di 1366 px): kartu hasil kalkulator mulai 108 px, kolom Edukasi 104 px, dan bagian `#why` 97 px. Klik "Life Insurance" di bilah kategori Solusi: label bagian sempat 11 px di bawah atas bilah kategori, sehingga jarak lompatan dinaikkan dari header + 4 rem menjadi header + 5,5 rem; label kemudian muncul di 175 px, di bawah bilah kategori (164 px). Pemeriksaan otomatis di 320 sampai 414 px: tidak ada teks yang luber. `qa-check.js` lolos.
- Catatan "Examples: cancer, stroke, heart attack…" di kartu Critical Illness Protection (Area of Expertise, Beranda) dihapus (8 November 2026) supaya kartunya tidak lebih panjang dari kartu lain. Diukur lewat DevTools Protocol: di 1366 px kartu Health dan Critical Illness sama-sama 523 px dan tiga kartu bawah 407 px; di 390 px kelima kartu slider 379 px. Sekalian `&shy;` di kata "Protection" dicabut, karena judul banner kalkulator terpenggal tanpa perlu ("Protec- tion") di 390 px. Sekarang judul itu tampil dua baris utuh, dan pemeriksaan di 320 sampai 414 px tidak menemukan teks yang luber.
- Foto konsultan tanpa latar di hero Home dan About (8 November 2026). Hasil potongan diperiksa di atas latar navy dan putih, termasuk diperbesar di rambut, telinga, bahu, dan tangan. Dua masalah ditemukan dan diperbaiki: kemeja putih sempat ikut terhapus, dan tepi rambut sempat bergaris terang. Screenshot lewat DevTools Protocol di 1366 px (kotak foto 391 x 563 dan 400 x 576 px), 390 px, dan 360 px. Di HP, foto awalnya tampak kecil, lalu dibuat memenuhi lebar kotak. `qa-check.js` lolos, dan pemeriksaan di 320 sampai 414 px tidak menemukan teks yang luber.
- Lambang website dihapus (8 November 2026, permintaan klien). Header dan footer di 8 halaman diperiksa lewat DevTools Protocol. Header 91 px di laptop dan 79 px di HP, dengan ruang 14 dan 11 px di atas dan bawah nama. Menu tetap satu baris di 1200 dan 1366 px. Jarak nama ke tombol menu 164 px di 390 px dan 94 px di 320 px, dan tidak ada halaman yang melebar. Saat memeriksa footer ditemukan bug lama: "Irham" di footer tidak terlihat sejak nama belakang dibuat emas bergradasi, karena `tema-asuransi.css` melepas gradasinya sementara warna hurufnya transparan. Gradasi untuk footer dipasang lagi di `tema-premium.css`.
- Nama lengkap dan tanpa tulisan jabatan (8 November 2026, permintaan klien): logo teks di header dan footer 8 halaman menjadi "Arits Fauzi Irham", dan "Insurance & Financial Protection Consultant" di bawahnya dihapus. Semua "Arits Irham" (47 tempat: judul tab, disclaimer, kebijakan privasi, teks foto, dan lain-lain) menjadi "Arits Fauzi Irham", dan 13 isian `[Nama Usaha]` diisi dengan nama yang sama. Hero Tentang Saya sudah diubah sendiri oleh pengguna sebelumnya (judul = nama lengkap, paragraf = jabatan) dan dibiarkan. Diukur lewat DevTools Protocol: menu tetap satu baris di 1200 dan 1366 px, jarak nama ke tombol menu 80 px di 320 px, dan tidak ada halaman yang melebar. Setelah `--header-h` diturunkan (86/76 px), semua yang menempel tetap di bawah header (bawah header 70 px): bilah kategori Solusi 94 px, kartu hasil kalkulator 98 px, kolom Edukasi 94 px, `#why` 87 px, dan label bagian setelah klik kategori 165 px. `qa-check.js` lolos.
- Halaman Tentang Saya dirapikan (9 November 2026). (1) Label kecil "I'm Arits Fauzi Irham" di atas judul hero dihapus karena judulnya sudah nama lengkap; aturan `about-hero__name` dibuang, judul diberi jarak 1,2 rem dari label "Consultant profile", dan di HP jabatan dipindah ke kolom kiri tepat di bawah nama, di samping foto. Sebelumnya ada ruang kosong 64–110 px di samping foto. (2) Seluruh bagian "Journey & Perspective" (judul cerita, tiga paragraf isian, kutipan, dan Career Milestones) dihapus atas permintaan. Bagian itu sempat dikembalikan dan ditukar posisinya karena permintaan "tukar posisi" disalahpahami, lalu dihapus lagi. Maksudnya, Why Work With Me naik menggantikan posisinya. Markup lamanya ada di riwayat git (commit `6643187`). (3) Atas permintaan klien, How it Works ("Three Consultation Steps") dipindah ke atas Why Work With Me ("A Different Approach to Financial Protection"). Latarnya ikut ditukar supaya tetap selang-seling: How it Works kini polos dan Why Work With Me jadi panel. Urutannya sekarang hero, How it Works, Why Work With Me (panel), My Commitment, lalu band ajakan. Dicek lewat screenshot di 1366 dan 390 px: semua animasi scroll selesai dan tidak ada yang melebar. (4) Di laptop 1366 px, judul kartu "Long-Term Relationship" di Tentang Saya terpotong di tanda hubung menjadi "Long-" / "Term Relationship". Browser memilih titik potong itu karena judul memakai `text-wrap: balance`. Kata "Long-Term" kini dibungkus `<span style="white-space:nowrap">` di Tentang Saya dan Beranda (kartunya sama), sehingga terpotong menjadi "Long-Term" / "Relationship". Diukur di 14 lebar dari 320 sampai 1920 px tanpa teks yang luber. (5) Kotak Experience (`[Lama pengalaman]`, `[Bidang pengalaman]`) di hero Tentang Saya dan baris `[Lama pengalaman]` di kartu About Me Beranda dihapus atas permintaan, karena konsultan baru merintis. Hero Tentang Saya kini punya dua kotak, Certification dan License. Di HP barisnya diubah dari tiga kolom menjadi dua (`pages.css`); di laptop lebarnya sudah menyesuaikan sendiri (`auto-fit`). Dicek lewat screenshot di 1366, 390, dan 320 px: kedua kotak sama besar (291 px di laptop, 175 px di 390 px, 140 px di 320 px), tidak ada teks yang luber, dan halaman tidak melebar. Diperiksa lewat DevTools Protocol di 1366, 390, dan 320 px; `qa-check.js` lolos.
- Kartu About Me di Beranda dirapikan (9 November 2026, atas permintaan). (1) Dua paragraf isian (`[Ringkasan singkat profil ...]` dan `[Pendekatan pelayanan ...]`) dihapus karena datanya belum ada. (2) Latar fotonya dihapus: `foto-konsultan-potong.webp` (798 x 1180, transparan, 67 KB, tanpa EXIF) dibuat dari `foto-konsultan.webp` dengan skrip numpy/scipy/scikit-learn, tanpa memasang alat besar. Latar foto itu gelap dan ramai (kaca hitam, lampu, panel kayu, pegangan tangga emas), jadi caranya: model warna dari area pasti-badan dan pasti-latar, tepi badan disempurnakan dari warna setempat, dan tepi rambut memakai kecerahan setempat. Hasilnya dicek di atas navy dan putih, termasuk diperbesar di rambut, lengan kaus, dan pegangan tangga. Garis tipis di atas rambut dan bintik emas di samping kedua lengan sempat muncul, lalu dibuang. Orangnya berdiri di dasar kolom foto dengan cahaya lembut di belakang dan bagian bawah memudar. Paralaks dimatikan supaya kepala tidak terpotong. (3) Susunannya seperti laptop di semua layar (permintaan "seperti website"). Mulai 600 px foto di kiri dan teks di kanan (sebelumnya mulai 820 px). Di HP, foto ada di kiri label/judul/nama/jabatan (pembungkus baru `profile__head`), lalu kapsul kredensial dan tombol selebar kartu di bawahnya. Tinggi kartu di HP 390 px turun dari 705 px menjadi 384 px. (4) Di laptop foto memakai rasio 4:5 supaya tidak terpotong hampir persegi. Lebarnya dikunci ke kolomnya (`width: 100%` dan kolom `minmax(0, …)`), karena kotak berasio sempat meluber 15–80 px ke kolom teks di 820–1024 px. Diukur di 9 lebar (320–1366 px): tidak ada teks yang luber, dan tombol WhatsApp serta "More about me" sebaris di 360 px ke atas (kecuali tablet 600 px). Animasi scroll di Beranda dan Tentang Saya selesai semua di 6 lebar, dan `qa-check.js` lolos.
- Logo teks di header kembali menjadi "Arits Irham" (9 November 2026, permintaan klien), seperti sebelum 8 November. Hanya header di kedelapan halaman yang diubah. Footer, judul halaman, kartu profil, dan hero Tentang Saya tetap memakai nama lengkap "Arits Fauzi Irham". Dicek lewat DevTools Protocol di 1366 dan 390 px (Beranda dan Edukasi), dan `qa-check.js` lolos.
- Nuansa AI/cyber di latar (9 November 2026): kisi garis tipis dan jalur sirkuit dengan denyut cahaya di tepi layar (lihat bagian tema di bawah). Screenshot lewat DevTools Protocol di 1366 dan 390 px: lapisannya hanya terlihat di pinggir dan di sela bagian, area teks tetap bersih. Dua screenshot berjarak 1,5 detik membuktikan denyutnya bergerak (169–5928 piksel berubah di tepi layar). `qa-check.js` lolos.
- Nomor WhatsApp klien dipasang (9 November 2026): 0877-7771-0002 (`6287777710002`) di `main.js`, di 52 tautan WhatsApp, di tautan telepon Kontak, dan sebagai teks `+62 877-7771-0002` menggantikan `[nomor]`, `[nomor WhatsApp]`, dan `[nomor telepon]`. Nomor uji coba pengembang di `main.js` ikut diganti. Dicek lewat DevTools Protocol di 1366, 390, dan 320 px di kedelapan halaman: semua tautan WhatsApp dan telepon mengarah ke nomor baru (lengkap dengan pesan pembuka), nomor di bilah info atas muat sampai 320 px, dan tidak ada halaman yang melebar. `qa-check.js` lolos.
- Tombol WhatsApp sempat dibuat hijau (9 November 2026): pertama zamrud terang, lalu kode warna dari gambar referensi klien (mint `#8be8c3` ke zamrud `#1b7853`). Atas permintaan klien, hari itu juga semua tombol dikembalikan ke champagne seperti sebelumnya: `tema-premium.css` dan `solusi.html` dipulihkan dari commit `f43e20c`, dan tombol WhatsApp mengambang kembali hijau WhatsApp. Dicek lewat DevTools Protocol di 1366 px, dan `qa-check.js` lolos.
- Penanda versi CSS dan JS (9 November 2026): setelah tombol dikembalikan ke emas, HP klien masih menampilkan hijau karena file CSS lama tersimpan di browser (GitHub Pages: `Cache-Control: max-age=600`). Browser baru di 1366 dan 390 px sudah menampilkan emas. Semua tautan CSS dan JS di kedelapan halaman kini memakai `?v=20261109` (lihat [5.10](#510-penanda-versi-css-dan-js)), dan `qa-check.js` mengabaikan penanda itu. Animasinya dicek berjalan dengan membaca posisi lapisan di detik 0, 5, dan 12 lewat `--dump-dom`: kedua aurora bergeser dan cincin berputar sekitar 24° dalam 12 detik (satu putaran 3 menit), dan "kurangi gerakan" tidak aktif di browser uji. Screenshot mode "kurangi gerakan" di 1366 px dan 390 px menampilkan versi diamnya dengan utuh (pita aurora tetap miring). Pemeriksaan otomatis di 320, 360, 375, 390, dan 414 px untuk kedelapan halaman: tidak ada halaman yang melebar ke samping dan tidak ada teks yang luber. `qa-check.js` memeriksa 280 tautan internal tanpa masalah.

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
├── perjalanan.html          Professional Journey (foto kegiatan, testimoni)
├── kalkulator.html          Kalkulator Protection Gap (jiwa + penyakit kritis)
├── kontak.html              Hubungi Kami (kanal kontak + formulir)
├── kebijakan-privasi.html   Kebijakan Privasi
├── edukasi/
│   └── index.html           Rangkuman sumber edukasi (kutip singkat + tautan)
├── assets/
│   ├── css/
│   │   ├── base.css         Warna, font, dan ukuran dasar (ganti brand di sini)
│   │   ├── components.css   Komponen bersama: tombol, header, kartu, formulir, footer, animasi
│   │   ├── pages.css        Gaya khusus tiap halaman
│   │   ├── tema-asuransi.css  Dasar tata letak dan animasi; tema terang yang aktif sampai 8 November 2026
│   │   ├── tema-premium.css   Tema yang aktif: navy gelap + champagne, judul Fraunces lembut + teks Inter, dimuat paling akhir
│   │   ├── tema-gabungan.css  Alternatif: konsep modern + navy-emas (tidak dipasang)
│   │   ├── tema.css         Alternatif: navy-emas murni sesuai referensi klien (tidak dipasang)
│   │   └── modern.css       Alternatif: tampilan modern sebelumnya (tidak dipasang)
│   ├── js/
│   │   ├── main.js          Nomor WhatsApp, menu HP, header, judul hero kata demi kata, animasi scroll, titik slider, penanda kategori Solusi, magnet dan riak tombol, sorotan kartu
│   │   ├── form.js          Validasi formulir dan penyusunan pesan WhatsApp
│   │   ├── kalkulator.js    Hitungan kalkulator protection gap dan pesan WhatsApp hasilnya
│   │   └── faq.js           Accordion tanya jawab (Solusi)
│   ├── img/                 Foto dari klien (foto-konsultan.webp, foto-konsultan-jas.webp, kegiatan-*.webp) dan versi tanpa latarnya (foto-konsultan-potong.webp, foto-konsultan-jas-potong.webp), favicon sementara (favicon.svg, favicon-32.png, apple-touch-icon.png)
│   │   ├── foto/            32 foto stok CC0: kartu topik (exp-*, why-*, sol-*, kalkulator), gambar Solusi (sol-img-*), artikel (artikel-*), hero halaman (hero-*)
│   │   └── ilustrasi/       17 ilustrasi SVG buatan sendiri + 9 versi diam; sejak 8 November 2026 tidak dipakai, hanya disimpan
│   └── fonts/               Kosong (font dimuat dari Google Fonts)
├── docs/                    Catatan internal (jangan diunggah ke hosting)
│   ├── checklist-qa.md      Checklist dan hasil pengujian
│   ├── qa-check.js          Skrip pemeriksa tautan dan struktur HTML
│   └── konten-dari-klien.md Bahan dari klien: brief awal dan dokumen "Isi Website"
├── robots.txt               Aturan untuk mesin pencari (diisi saat deploy)
├── sitemap.xml              Daftar halaman untuk Google (diisi saat deploy)
└── README.md                Dokumen ini
```

---

## 4. Cara kerja fitur utama

### Formulir konsultasi

Formulir ada di halaman **Hubungi Kami** (`kontak.html#formulir`). Formulir ini **tidak mengirim data ke server dan tidak menyimpan apa pun**:

1. Pengunjung mengisi nama, nomor WhatsApp, keperluan, dan pesan (opsional).
2. `form.js` memeriksa isian di browser. Jika ada yang salah, pesan error tampil di bawah field.
3. Jika semua benar, WhatsApp terbuka di tab baru dengan pesan berisi data tersebut.
4. Data baru sampai ke konsultan setelah pengunjung menekan **kirim** di WhatsApp.

Label formulir di halaman tampil dalam bahasa Inggris (Name, WhatsApp number, Topic, Message), begitu juga pesan error dan isi pesan WhatsApp-nya.

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

Semua tautan WhatsApp memakai atribut `data-wa`. Saat halaman dibuka, `main.js` mengisi alamat tautan itu dengan nomor dari `SITE.whatsapp`. Alamat yang tertulis langsung di HTML (`https://wa.me/6287777710002`) hanya cadangan bila JavaScript gagal dimuat.

Satu tombol bisa diberi pesan awal sendiri dengan mengisi atributnya:

```html
<a data-wa="Halo, saya ingin bertanya tentang asuransi kesehatan." href="https://wa.me/6287777710002">Tanya via WhatsApp</a>
```

### Animasi

- Isi hero tampil bertahap saat halaman dibuka. Diatur di `components.css`, bagian "Animasi".
- **Tombol dan scroll yang lebih interaktif** (8 November 2026, tema premium; gaya di `tema-premium.css` bagian "Tombol lebih interaktif", perilaku di bagian terakhir `main.js`):
  - Tombol: efek magnet di laptop (tombol tertarik maks. 6 px ke arah kursor dan memantul kembali; memakai properti `translate`, jadi tidak bentrok dengan efek angkat dan kilau emas), riak cahaya dari titik klik/sentuh (laptop dan HP, dihapus sendiri setelah 0,7 detik), tombol mengecil sedikit saat ditekan, dan ikon selain panah bergoyang kecil saat disorot.
  - Saat scroll: kartu dan judul muncul dari bawah sambil membesar (di laptop juga dari buram ke tajam), label kecil di atas judul masuk dari kiri sambil merapatkan spasi hurufnya, foto kartu terbuka seperti tirai, dan gambar kategori, gambar artikel, serta foto kegiatan terbuka seperti tirai sambil zoom-out. Gambar kategori, gambar artikel, dan foto profil bergeser pelan di dalam bingkainya (paralaks), dan panel membesar dari 95% ke ukuran penuh saat masuk layar. Paralaks dan panel memakai `animation-timeline: view()`; di browser yang belum mendukungnya, keduanya diam.
  - Sorotan kursor di laptop: cahaya champagne lembut mengikuti kursor di atas kartu (`.card::before`, posisinya diisi `main.js`). Aturan `position: relative` untuk kartu ditulis di dalam `:where()`, supaya kartu yang punya posisi sendiri tidak berubah. Contohnya hasil kalkulator (`.calc__result`) yang menempel di laptop: efek menempelnya sempat hilang lalu diperbaiki dengan cara ini.
  - Semuanya berhenti bila pengunjung memilih "kurangi gerakan". Animasi yang terikat kelas `reveal` selesai dalam 0,85 detik, karena `main.js` melepas kelas itu setelah 0,9 detik.
- Konten di bawah layar muncul saat di-scroll. `main.js` memasang kelas `reveal` pada kartu dan section.
- Animasi tema asuransi (2 November 2026, gayanya di `tema-asuransi.css`):
  - **Saat halaman dibuka:** judul hero muncul kata demi kata. `main.js` membungkus setiap kata dengan `span.kata`, dan judul tetap dibaca utuh oleh pembaca layar lewat `aria-label`. Sesudah itu kata yang disorot mendapat garis sorot biru muda. Ikon lencana berdenyut pelan, tombol pertama di hero punya cincin denyut berkala, dan lambang di header berputar masuk.
  - **Ilustrasi hero:** gambarnya bergerak sendiri (lihat poin Ilustrasi), melayang lembut dengan cincin garis putus-putus yang berputar sangat pelan, dan di browser yang mendukung animasi berbasis scroll ikut bergeser sedikit saat halaman digulir. Ilustrasi kalkulator di hero halaman Kalkulator juga bergerak: tombolnya diketik, hasilnya muncul, lalu grafiknya naik turun. Di halaman Edukasi, dua buku jatuh ke tumpukan, lalu lampunya berkedip dan menyala. Di halaman Hubungi Kami, pin lokasi dan amplop muncul "pop", pesan chat muncul satu per satu, lalu pin dan amplop membesar-mengecil bergantian.
  - **Foto konsultan di Tentang Saya:** saat halaman dibuka, kotak fotonya terbuka seperti tirai dari bawah sambil fotonya sedikit mengecil ke ukuran normal. Setelah itu kotaknya melayang pelan, fotonya "bernapas", dan pola titik di belakangnya bergeser pelan (`tirai-foto`, `foto-masuk`, dan `titik-geser` di `tema-asuransi.css`).
  - **Saat di-scroll:** konten muncul dengan gerakan halus, isi judul section muncul bergantian, dan ikon kartu "meletup" masuk. Foto profil masuk dari kiri sambil sedikit mengecil ke ukuran normal, dan teksnya dari kanan, lalu kapsul kredensial muncul satu per satu. Band ajakan membesar pelan, dan kolom footer muncul bergantian. Garis penghubung langkah konsultasi tergambar dan nomornya muncul bergantian (kelas `steps--animate` dan `is-drawn` dipasang `main.js`).
  - **Sepanjang halaman:** garis progres scroll biru di tepi atas layar, gambar artikel sedikit membesar saat kartunya disorot, gambar kategori di Solusi dan foto konsultan "bernapas" pelan, lingkaran datar samar melayang di band ajakan, tombol WhatsApp mengambang berdenyut setiap 5 detik, dan ikon kartu sedikit berputar saat disorot.
  - Animasi yang mengikuti kelas `reveal` selesai dalam 0,9 detik, karena `main.js` melepas kelas itu setelahnya. Kalau durasinya diperpanjang, ubah juga angka 900 di `main.js`.
  - Tanya jawab di halaman Solusi membuka dan menutup dengan animasi tinggi (`faq.js`).
- Semua animasi otomatis mati bila pengunjung mengaktifkan pengaturan "kurangi gerakan" (*reduce motion*) di perangkatnya. Konten tetap tampil normal walaupun JavaScript gagal dimuat.

### Tampilan dan interaksi

- **Warna kategori.** Tiap jenis perlindungan punya warna sendiri lewat kelas `tone-*` di `components.css`: `tone-rose` (kesehatan), `tone-blue` (jiwa), `tone-amber` (kendaraan; sejak bagian Vehicle Insurance dihapus pada 8 November 2026 hanya dipakai kartu Financial & Wealth Planning di Beranda), dan `tone-teal` (properti & usaha), dan `tone-violet` (penyakit kritis, ditambahkan 7 November 2026 untuk kartu Critical Illness di Beranda). Di Beranda, `tone-amber` dipakai untuk Financial & Wealth Planning. Ikon, eyebrow, tag, kotak catatan, dan meter di dalam elemen bertanda itu ikut berwarna. Warna ini dipakai di kartu kategori Beranda, di bilah kategori dan tiap bagian halaman Solusi, dan di hasil kalkulator. Kalau menambah warna baru, pastikan kontras teksnya minimal 4,5:1. Di tema asuransi keempat warna ini dipakai seperti aslinya. Di tema gabungan dan tema navy-emas, keempat warna ini diseragamkan menjadi emas lewat blok `.tone-rose, .tone-blue, ...` di file tema. Hapus blok itu kalau ingin warna per kategori kembali.
- **Kartu kategori di Beranda** bisa diklik di seluruh permukaannya. Tautannya ada di judul (`card__link`) dan mengarah ke bagian yang sesuai di Solusi.
- **Slider kartu di HP** diberi titik penanda posisi di bawahnya. Titik dibuat oleh `main.js`, hanya tampil di layar di bawah 600 px, dan disembunyikan bila semua kartu sudah terlihat tanpa digeser.
- **Tampilan HP "laptop mini"** (2 November 2026). Di layar di bawah 600 px tata letaknya meniru versi laptop, dengan huruf dan jarak yang lebih kecil supaya halaman tetap pendek. Hero memakai judul di kiri dan ilustrasi atau foto di kanan. Ilustrasi yang bergerak dibuat besar tetapi tetap di samping judul (3 November 2026): 46 persen lebar di hero Beranda dan Solusi, 45 persen untuk gambar kategori Solusi, dan sampai 165 px di halaman teks. Di halaman teks, label tampil selebar layar di atas, judul dan ilustrasi berdampingan di bawahnya, lalu paragraf selebar layar. Banner kalkulator menampilkan contoh hasil di kanan, langkah konsultasi tampil tiga kolom, dan footer memakai kolom Pages dan Contact berdampingan. Ketujuh foto Professional Journey di Beranda digeser ke samping dalam satu deret dengan tinggi sama (180 px). Ilustrasi kategori Solusi tampil di samping judul, kotak perbandingan berdampingan, dan piramida prioritas di samping daftarnya. Kumpulan kartu tetap digeser ke samping, dengan dua kartu terlihat sekaligus. Formulir, kalkulator, dan teks panjang tetap satu kolom. Ada dua pengecualian (3 November 2026): profil konsultan di Beranda tersusun ke bawah (label dan judul, lalu foto, lalu nama dan isi profil) dengan ukuran huruf normal, dan kotak klaim darurat di Kontak menaruh tombolnya di bawah teks. Tidak ada teks yang dihapus, dan disclaimer afiliasi tetap utuh. Aturannya ada di akhir `pages.css`, bagian "Mobile: tampilan laptop mini". Tampilan tablet dan desktop tidak berubah.
- **Tema tampilan** (2 November 2026). Ada empat lapisan tema di `assets/css/`, dan setiap halaman memasang **satu** di antaranya paling akhir, setelah `pages.css`:
  - `tema-asuransi.css` (**aktif**): mengikuti saran desain website asuransi agar terasa aman dan bersahabat. Hero terang (biru sangat muda ke putih) dengan ilustrasi manusia: keluarga di Beranda (`keluarga.svg`, sejak 7 November 2026 diganti foto formal konsultan) dan konsultan di Solusi (`konsultasi.svg`, sejak 8 November 2026 diganti foto asli Arits di depan banner, versi tanpa logo); perisai dan ikon hanya pelengkap kecil. Satu warna aksen biru `#1d5fd0` untuk tombol dan tautan (tombol WhatsApp di halaman ikut biru; tombol WhatsApp mengambang tetap hijau). Satu keluarga huruf, Plus Jakarta Sans. Kartu datar tanpa kaca, cahaya, atau bayangan tebal; kartu kategori Beranda berisi ikon, judul, satu kalimat, dan "Pelajari". Tanpa teks bergradasi, serif miring, atau partikel berkilau. Navy hanya di band ajakan dan footer. Judul hero Beranda dan Solusi diganti agar bicara situasi nyata (penghasilan keluarga terhenti, biaya rumah sakit mendadak) tanpa janji manfaat. Sentuhan modern yang tetap datar: header kapsul putih yang mengambang (tanpa efek kaca), section abu-abu sebagai panel bersudut besar, footer bersudut atas, bingkai dalam untuk foto profil dan gambar artikel, panah tombol dalam lingkaran kecil, bilah kategori Solusi berbentuk kapsul, "Why Work With Me" bergaya bento (judul menjadi kotak biru muda) dan Tanya Jawab dua kolom di laptop, judul hero lebih besar, serta teks isi 17 px di layar lebar. Kesan elegan: judul semibold (600), tombol lebih ringan, jarak baris 1,75 dan jarak section sedikit lebih lapang di laptop (di HP tetap ringkas). Animasinya lebih ramai tetapi tetap tenang; daftarnya ada di bagian Animasi.
  - `tema-gabungan.css`: konsep modern dipadukan dengan gaya referensi klien. Dari konsep modern: header kapsul kaca yang mengambang, cahaya hero yang bergeser pelan, section abu-abu sebagai panel bersudut besar, footer bersudut atas, bingkai dalam untuk foto, bilah kategori Solusi berbentuk kapsul, dan tombol berhuruf biasa. Dari gaya referensi (samudrasatriabarokah.com, juga lasains.com): judul serif Fraunces dengan kata kunci miring emas (`<span class="text-gradient">`), teks Manrope, tombol emas dengan panah dalam lingkaran navy, label berawalan garis emas, ikon dalam lingkaran navy bercincin emas, kartu bernomor besar bergaris luar (dibuat CSS counter), section "Mengapa Berkonsultasi" yang gelap, garis emas tipis di hero, garis progres scroll, serta footer dengan kartu kontak, tulisan besar samar "Perlindungan", dan tombol "Kembali ke atas".
  - `tema.css`: navy-emas murni, paling mirip referensi (header bilah putih, tombol huruf kapital).
  - `modern.css`: tampilan modern sebelumnya (judul sans dengan gradasi biru, font Inter + Plus Jakarta Sans).
  Isi teks dan tata letak HP sama di keempatnya. Cara berpindah ada di [5.4](#54-warna-dan-font).
- **Bilah kategori di Solusi** menandai kategori yang sedang dibaca saat halaman di-scroll. Di HP, kategori aktif digeser ke tengah bilah.
- **Menu HP** menggelapkan halaman di belakangnya. Menu tertutup bila area gelap diklik, tombol Esc ditekan, atau salah satu tautan dipilih.
- **Banner kalkulator** di Beranda dan Solusi menampilkan "Contoh hasil simulasi" dengan angka dari contoh klien (Rp 560.000.000). Bagian ini hanya hiasan dan disembunyikan dari pembaca layar. Kalau angkanya diganti, ubah di kedua halaman. Saat banner terlihat, kartu contoh muncul memantul, angkanya menghitung naik dari Rp 0 sampai angka di HTML, meternya terisi, lalu kartu melayang pelan. Di tema asuransi, kartu tidak melayang. Sebagai gantinya, banner membesar pelan saat muncul, judul, teks, dan tombolnya menyusul, lalu setiap 6 detik bergantian: ikon kalkulator "pop", kartu contoh bergoyang (shake) sambil meternya terisi ulang, dan tombol "Coba Kalkulator" memancarkan cincin biru (gayanya di `tema-asuransi.css`). Animasinya diatur di `main.js` dan `pages.css` (bagian "Animasi pop banner kalkulator").
- **Ilustrasi** ada di `assets/img/ilustrasi/`: 17 ilustrasi SVG bergaya flat dengan warna website, ditambah sembilan versi diam. Semuanya dibuat khusus untuk proyek ini dan tidak mengandung logo apa pun. Hero Solusi memakai ilustrasi manusia tanpa latar (`hero__art`) yang bergerak pelan sampai 8 November 2026, lalu diganti foto asli; hero Beranda memakainya sampai 7 November 2026, lalu diganti foto konsultan. Di Beranda, keluarga bergandengan tangan (`keluarga.svg`): ayah dan ibu melambaikan tangan bergantian, kartu hati berdenyut, kartu perisai melayang, anak sedikit melompat, dan lingkaran latarnya "bernapas". Di Solusi, konsultan dengan empat ikon jenis perlindungan (`konsultasi.svg`): konsultan melambai, kartu ikon melayang bergantian, dan grafik di tabletnya tumbuh. Ganti dengan foto asli klien bila sudah ada. Pengunjung yang memilih "kurangi gerakan" mendapat versi `-diam.svg` lewat `<picture>`, karena animasi di dalam file SVG tidak bisa dimatikan dari CSS halaman. Sebagai cadangan, kedua file SVG itu juga mematikan animasinya sendiri bila "kurangi gerakan" aktif. Ilustrasi perisai sebelumnya tidak dipakai lagi tetapi masih disimpan: `perlindungan.svg` (perisai dengan delapan ikon pada cincin yang berputar), `solusi.svg` (perisai yang terhubung ke empat ikon kategori lewat garis yang mengalir), dan versi `-diam`-nya. Ilustrasi di hero halaman teks (`edu-hero__art`) tampil di kanan teks, di HP di samping judul dengan lebar sampai 165 px, lalu melayang pelan (animasi `float-soft`). Di halaman Kalkulator, ilustrasinya juga bergerak sendiri (`hero-kalkulator.svg`): tombol kalkulator tertekan satu per satu seperti sedang diketik, hasilnya muncul di layar, lalu grafik di sampingnya naik turun. Di halaman Edukasi (`hero-edukasi.svg`), buku oranye lalu buku hijau jatuh menyerong ke tumpukan dengan sedikit pantulan, lalu lampunya berkedip hidup-mati sebelum menyala terus. Di halaman Tanya Jawab (`hero-faq.svg`), gelembung pertanyaan muncul "pop" dari ujung ekornya, disusul gelembung jawaban. Keduanya lalu membesar-mengecil bergantian sementara tiga titiknya berdenyut, sebelum mengecil hilang dan diulang. Di halaman Hubungi Kami (`hero-kontak.svg`), pin lokasi muncul "pop" dari ujungnya dan amplop keluar dari sisi ponsel. Empat pesan chat di ponsel muncul satu per satu, pesan masuk dari kiri dan pesan keluar dari kanan. Pin dan amplop lalu membesar-mengecil bergantian, sebelum semuanya kecuali ponsel mengecil hilang dan diulang. Di halaman Konsultasi (`hero-konsultasi.svg`), gelembung chat muncul "pop" dari ujung ekornya, disusul kartu pesan dari bawah. Lalu tanda centang hijau muncul "pop" di salah satu tanggal kalender dan bergoyang (shake) dua kali sambil sedikit membesar, supaya tetap terlihat di HP. Gelembung dan kartu membesar-mengecil bergantian, sebelum semuanya kecuali kalender mengecil hilang dan diulang. Kelima ilustrasi ini dipasang lewat `<picture>` bersama versi diamnya (`hero-kalkulator-diam.svg`, `hero-edukasi-diam.svg`, `hero-faq-diam.svg`, `hero-kontak-diam.svg`, dan `hero-konsultasi-diam.svg`), sehingga di kelima halaman itu kelas `edu-hero__art` ada di `<picture>`, bukan di `<img>`. Kotak gambar berisi ilustrasi diberi kelas `ph--art`, supaya gambarnya dipusatkan dan tokohnya tidak terpotong. Keempat kategori di Solusi punya ilustrasi sendiri (`sol__img`): `kesehatan.svg`, `jiwa.svg`, `kendaraan.svg`, dan `properti.svg`. Di laptop ilustrasi ada di bawah teks pembuka, dan posisi kolom berselang kiri-kanan antarkategori. Di tablet dan HP ilustrasi tampil di samping judul, juga bergantian kiri dan kanan. Ilustrasi halaman Tanya Jawab dan Konsultasi (`hero-faq.svg`, `hero-konsultasi.svg`, dan versi diamnya) tidak dipakai lagi sejak kedua halaman itu dihapus (7 November 2026), tetapi masih disimpan.
- **Kredensial di profil konsultan** (Beranda, 2 November 2026). Profil konsultan memuat kapsul kredensial (`profile__facts`) dan tombol WhatsApp. Tampilkan tiap kapsul **hanya** bila datanya dari klien dan terverifikasi, dan hapus yang tidak ada datanya. Kartu "Konsultasi langsung bersama" yang sempat ada di hero sudah dihapus, karena profil konsultan sudah ada di halaman Tentang Saya.
- **Langkah konsultasi** di Tentang Saya memakai komponen garis waktu `.steps` (Beranda memakai daftar `approach__list`, lihat [Susunan Beranda dan menu](#susunan-beranda-dan-menu)). Di HP dan layar lebar tampil tiga kolom. Di tablet (600 sampai 759 px) tersusun ke bawah. Di HP di bawah 390 px kotaknya sedikit dirapatkan supaya kata terpanjang tetap muat. Kata yang sangat panjang diberi tanda `&shy;` di HTML (contoh: `membanding&shy;kan`), supaya bisa dipenggal di HP di bawah 360 px; di layar lain tanda itu tidak berpengaruh. Kalau teks langkah diganti dan ada kata sepanjang itu, beri tanda yang sama.

### Susunan Beranda dan menu

Pada 7 November 2026 Beranda disusun mengikuti urutan sembilan bagian dari klien. Pada 8 November 2026 dua pasang bagian digabung atas permintaan: Why Work With Me masuk ke About Me, dan Client Testimonials masuk ke Professional Journey. Sekarang Beranda punya tujuh bagian:

| Urutan | Bagian | `id` | Halaman lengkapnya |
|---|---|---|---|
| 1 | Home (hero: judul tentang risiko dan foto; identitas singkat dipindah ke About Me sejak 8 November 2026) | `#home` | – |
| 2 | About Me (kartu profil), lalu Client Testimonials (`#testimonials`), lalu Why Work With Me (empat alasan, `#why`) | `#about` | Tentang Saya |
| 3 | Area of Expertise (lima bidang dari klien + banner kalkulator) | `#expertise` | Solusi, Kalkulator |
| 4 | My Approach (empat langkah dari klien) | `#approach` | – |
| 5 | Financial Insight (kartu artikel) | `#insight` | Edukasi |
| 6 | Contact Me (band ajakan) | `#contact` | Kontak |

- **Beranda tanpa tonggak dan foto** (8 November 2026, atas permintaan): bagian Professional Journey di Beranda dihapus dan hanya Client Testimonials yang tersisa. Testimoni lalu dipindah ke dalam bagian About Me, tepat di bawah kartu profil dan sebelum Why Work With Me (blok `about-testi`, `id="testimonials"`); Financial Insight kembali berlatar abu-abu supaya tetap selang-seling. Tonggak karier dan foto kegiatan sekarang hanya ada di halaman Professional Journey (`perjalanan.html`). Catatan di bawah tentang gabungan Journey + Testimonials di Beranda dan galeri tujuh foto di Beranda sudah tidak berlaku.
- **Gabungan bagian.** Why Work With Me (`about-why`, tetap ber-`id="why"`) berada di dalam section `#about`, di bawah kartu profil, dengan judul dan tampilan bento yang sama seperti sebelumnya. Client Testimonials (`journey__testi`, tetap ber-`id="testimonials"`) berada di dalam section `#journey`, di bawah foto kegiatan, dengan label dan judulnya sendiri ("Client Testimonials", "What My Clients Say"), supaya orang di foto kegiatan tidak terbaca sebagai nasabah. Karena dua section hilang, latar diatur ulang supaya tetap selang-seling: Professional Journey kini panel abu-abu (`section--tint`) dan Financial Insight putih. Tautan lama `index.html#why` dan `index.html#testimonials` tetap berfungsi, dan keduanya diberi jarak sebesar tinggi header seperti section lain. Halaman Tentang Saya ikut menampilkan Why Work With Me (teks klien yang sama, dalam empat kartu), menggantikan "Four Values in Every Consultation" yang dulu usulan awal dan belum dikonfirmasi klien.
- **Menu atas** (8 November 2026). Tujuh item, sama di semua halaman: Home, About, Expertise, Journey, Calculator, Insight, Contact (Journey sebelum Calculator atas permintaan). Setiap item langsung membuka halamannya: Home (`index.html`; di Beranda sendiri `#home`), About (`tentang.html`), Expertise (`solusi.html`), Journey (`perjalanan.html`), Calculator (`kalkulator.html`), Insight (`edukasi/index.html`), dan Contact (`kontak.html`). Kolom Pages di footer berisi halaman yang sama dengan urutan yang sama (Professional Journey sesudah Area of Expertise). Why Me dan Testimonials tidak menjadi item sendiri karena sudah tergabung di About dan Journey. Item halaman yang sedang dibuka diberi `aria-current="page"` langsung di HTML-nya. Kebijakan Privasi tidak menandai item apa pun. Sebelumnya (7 November 2026) semua item loncat ke bagian Beranda, sehingga misalnya About harus diklik dua kali (menu, lalu "More about me") untuk sampai ke halaman Tentang Saya; sekarang satu klik. Kode penanda bagian saat scroll di `main.js` sudah dihapus. Tautan di dalam halaman ke bagian Beranda (misalnya `#expertise`, `#why`, `#testimonials`) tetap diberi jarak sebesar tinggi header (`main > section[id]`, `#why`, dan `#testimonials` dengan `scroll-margin-top` di `pages.css`), supaya awal bagiannya tidak tertutup header.
- **Tombol "Free Consultation"** di header langsung membuka WhatsApp (`data-wa`), karena halaman Konsultasi Gratis sudah dihapus.
- **Bahasa.** Sejak 7 November 2026, atas permintaan klien, **seluruh website berbahasa Inggris**: judul, isi, tombol, menu, footer, formulir, pesan error, kalkulator, pesan WhatsApp yang terisi otomatis, teks `alt` gambar, judul halaman, dan deskripsi untuk Google. Atribut halaman `<html lang="en">`. Pengecualian: (1) tempat isian `[...]` yang menunggu data klien tetap seperti semula; (2) judul artikel sumber di Edukasi tetap judul aslinya (ditandai `lang="id"`), sedangkan ringkasannya diterjemahkan; (3) disclaimer afiliasi Manulife tampil dalam bahasa Inggris, dan teks asli bahasa Indonesia sesuai contoh pedoman tetap dicantumkan di bawahnya (`lang="id"`), sampai BDM/TH klien menyatakan versi Inggris saja sudah cukup. Angka rupiah tetap berformat Indonesia (Rp 560.000.000). Nama lembaga seperti BPJS Kesehatan, OJK, dan UMKM tidak diterjemahkan. Teks Why Work With Me dan isi dokumen klien lainnya tersimpan dalam bahasa aslinya di `docs/konten-dari-klien.md`.
- **Professional Journey.** Tonggak karier memakai komponen `.timeline` yang sama dengan Tentang Saya, ditambah garis putus-putus antarnomor. Tujuh foto kegiatan (`journey__gallery`) tampil dua baris di tablet dan laptop: foto 1 sampai 4 di atas, foto 5 sampai 7 di bawah (pemisah barisnya `::after` dengan `order`). Lebar tiap foto sebanding rasionya lewat `flex-grow` (`journey__photo--wide` 4:3, `--tall` 4:5, `--pano` 16:9), sehingga foto sebaris tingginya sama; baris bawah sedikit lebih tinggi karena isinya tiga foto. Kalau foto diganti, pakai salah satu dari tiga rasio itu dan kelas yang sesuai. Nama dan jabatan orang di foto sengaja tidak ditulis (lihat [bagian 8](#8-ketentuan-konten-asuransi)).
- **Halaman Professional Journey** (`perjalanan.html`, 8 November 2026). Halaman sendiri seperti About dan Expertise, dibuka dari menu Journey, footer, dan tautan "See my full journey" di bagian Journey Beranda. Isinya: hero dengan foto bersama tim (`kegiatan-pelatihan.webp`, 4:3, kelas `edu-hero__photo`) sebagai pengganti ilustrasi; fotonya lebih lebar dari ilustrasi halaman lain supaya wajah tetap terlihat (laptop 320 sampai 440 px di kanan judul, tablet di bawah teks, HP di samping judul), enam foto kegiatan di panel (foto bersama tim tidak diulang karena sudah jadi gambar hero; dua baris 3 + 3 lewat kelas `journey__gallery--3-3`, di HP tetap slider), Client Testimonials, lalu band ajakan. Testimoninya sama persis dengan blok Client Testimonials di Beranda; kalau salah satu diubah, samakan keduanya. **Tonggak karier dihapus dari halaman ini** (8 November 2026), karena konsultan baru merintis dan belum punya tonggak yang bisa ditulis tanpa mengarang. Untuk memasangnya lagi saat datanya sudah ada, ambil markup bagian tonggak karier dari riwayat git (commit `6643187`: section "Career milestones" di `perjalanan.html`, atau kotak "Career Milestones" di `tentang.html`), pasang sebagai section baru di antara hero dan foto kegiatan, lalu tukar latar section foto kegiatan menjadi biasa dan testimoni menjadi panel supaya tetap selang-seling.
- **Area of Expertise** (7 November 2026) memuat lima bidang dari klien, bernomor 01 sampai 05: Health Protection, Critical Illness Protection, Life Protection, Financial & Wealth Planning, dan Business & Employee Protection. Judulnya bahasa Inggris dan penjelasannya bahasa Indonesia, persis teks klien. Contoh penyakit kritis dari klien ("Examples: cancer, stroke, heart attack…") sempat tampil sebagai catatan kecil (`card__note`), lalu dihapus pada 8 November 2026 atas permintaan, supaya kartu Critical Illness tidak lebih panjang dari kartu lain. Gaya `card__note` masih ada di `pages.css` kalau suatu saat dipakai lagi. Pembuka section-nya "Protection for What Matters Most" dengan paragraf umum (dokumen klien tidak memberi teks pembuka untuk bagian ini). Tiap kartu menuju bagian yang sesuai di Solusi: `#kesehatan` (Health dan Critical Illness), `#jiwa`, `#panduan` (Menentukan Prioritas Perlindungan), dan `#usaha`. Di laptop dua kartu lebar di atas dan tiga di bawah (`expertise-grid`, grid 6 kolom), di tablet dua kolom dengan kartu terakhir selebar baris, dan di HP tetap slider. Asuransi Kendaraan, yang tidak ada di daftar klien, sudah dihapus dari halaman Solusi pada 8 November 2026.
- **My Approach** (7 November 2026) memuat empat langkah dari klien sebagai daftar bernomor di dalam satu kartu (`approach__list`): nomor besar biru di kiri, judul bahasa Inggris dan penjelasan bahasa Indonesia di kanan, dipisah garis tipis. Di laptop judul section dan tombol WhatsApp ada di kiri, daftar di kanan; di layar di bawah 900 px urutannya judul, daftar, lalu tombol. Saat di-scroll, baris muncul bergantian dan nomornya "meletup". Komponen `.steps` tiga kolom kini hanya dipakai di Tentang Saya.
- **Hero Beranda** (7 November 2026) mengikuti dokumen kebutuhan klien "Isi Website" (salinannya di `docs/konten-dari-klien.md`). Bagian atas berisi identitas singkat (`hero__id`): label "Personal Insurance Consultant" (badge berhuruf kapital, `badge--caps`), nama "Arits Fauzi Irham" (`hero__name`), dan kalimat pengantar "...yang personal dan transparan" (`hero__intro`), dipisah garis tipis dari judul utama. Judul utama (`h1`) adalah "Risiko Bisa Datang Tanpa Rencana. Sudahkah Anda Terlindungi?" (kalimat kedua biru dengan garis sorot, dipisah baris di tablet dan laptop lewat `br-lebar`), lalu subjudul tebal (`hero__sub`), paragraf, dan dua tombol. Di kanan ada foto formal berjas milik klien (`hero__portrait`), dengan animasi yang sama seperti foto di hero Tentang Saya. Di HP susunannya: label selebar layar, lalu nama dan kalimat pengantar di kiri dengan foto di kanan (38 persen), lalu garis tipis dan sisanya selebar layar. Di tablet (mulai 700 px) dan laptop teks di kiri dan foto di kanan. Contoh tampilan dari klien memakai foto konsultan bersama keluarga yang bertanda "myoona" (dari internet, berhak cipta), jadi tidak dipakai. Ilustrasi keluarga sebelumnya (`keluarga.svg`) masih disimpan. **Sejak 8 November 2026 blok identitas tidak ada lagi di hero** (atas permintaan). Label "Personal Insurance Consultant", nama, dan jabatan dipindah ke kartu About Me di bawahnya. Hero sekarang dibuka langsung dengan judul utama (`h1`, sedikit lebih besar: `clamp(2.3rem, 4.1vw, 3.25rem)`). Di HP judul ada di kiri dengan foto di kanan (40 persen), lalu subjudul, paragraf, dan tombol selebar layar. Aturan CSS `hero__id`, `hero__name`, dan `hero__intro` sudah dibuang. Di kartu About Me, nama tampil sebagai `profile__name` (Fraunces 1,35 rem, putih) dan jabatan "Insurance & Financial Protection Consultant" sebagai `profile__role` (huruf kapital kecil), menggantikan "Arits Fauzi Irham, [Jabatan]". Label "Personal Insurance Consultant" menjadi kapsul pertama di deretan kredensial (`profile__facts`, ikon perisai).
- **Jabatan di logo.** Di bawah nama "Arits Fauzi Irham" di header dan footer semua halaman ada tagline "Insurance & Financial Protection Consultant" (permintaan klien lewat chat: "taruh di paling atas"), dalam dua baris (dipisah `<br>`). Di layar yang sangat sempit tagline boleh turun baris lagi (`white-space: normal` pada `.brand__tagline`). Dicek di 320, 360, 390, 1200, dan 1366 px: tidak ada yang keluar dari header, dan menu laptop tetap satu baris. Label di hero memakai "Personal Insurance Consultant" sesuai dokumen klien, jadi saat ini ada dua sebutan jabatan; klien perlu memilih bila ingin seragam. Nama di header, footer, About Me, dan disclaimer masih "Arits Fauzi Irham"; hanya hero yang memakai nama lengkap.
- **Client Testimonials** (blok `about-testi` di bagian About Me Beranda, dan di halaman Professional Journey) masih berisi placeholder. Isi hanya dengan testimoni asli dan izin dari orang yang bersangkutan, tanpa menyebut nominal klaim atau manfaat. Kalau belum ada testimoni sama sekali, hapus blok `about-testi` di Beranda dan section testimoni di `perjalanan.html`; halaman Journey tetap.

### Header dan footer

Header berbentuk kapsul yang mengambang (tema asuransi, gabungan, dan modern). Di tema asuransi kapsulnya putih padat tanpa efek kaca; di puncak halaman latar header sewarna bagian atas hero (`#edf4fe`), dan setelah di-scroll latarnya transparan sehingga hanya kapsul yang terlihat. Bilah kategori Solusi menempel tepat di bawahnya. Tinggi header diatur `--header-h` di file tema. Kalau tinggi kapsul diubah, nilai ini ikut diubah. Garis progres scroll (`--scroll` dari `main.js`) tampil biru di tema asuransi dan emas di tema gabungan serta tema navy-emas. Tema modern tidak menampilkannya.

Di atas header setiap halaman ada bilah info (`topbar`) berisi jam layanan, WhatsApp, dan email. Bilah ini ikut tergulung, sedangkan header tetap menempel. Di HP hanya jam dan WhatsApp yang tampil. Kolom Kontak di footer juga memuat jam layanan. Jam layanan, nomor WhatsApp, dan email sudah diisi dari klien (8–9 November 2026); kalau berubah, ganti di kedua tempat.

Karena website ini statis, header dan footer **ditulis ulang di setiap file HTML**: 7 file saat ini. Perubahan menu atau footer harus dilakukan di semua file (lihat [5.6](#56-menu-navigasi-dan-footer)).

---

## 5. Panduan mengubah konten

> **Tips VS Code:** `Ctrl+Shift+F` mencari teks di semua file. `Ctrl+Shift+H` mencari dan mengganti di semua file sekaligus. Setelah menyimpan perubahan, refresh browser.

### 5.1 Nomor WhatsApp

**Sudah diisi (9 November 2026): nomor klien 0877-7771-0002** (format internasional `6287777710002`). Nomor ini dipakai di `main.js`, di semua tautan WhatsApp sebagai cadangan, di tautan telepon `tel:+6287777710002` di Kontak (sama dengan nomor WhatsApp), dan ditampilkan sebagai `+62 877-7771-0002` di bilah info atas, footer, Kontak, dan Kebijakan Privasi. Di HP, bilah info atas hanya menampilkan ikon dan nomornya (kata "WhatsApp" memakai kelas `topbar__label` yang disembunyikan di HP). Nomor uji coba pengembang yang sebelumnya dipasang sementara sudah diganti, jadi `main.js` kini boleh ikut diunggah ke GitHub.

Kalau nomornya berubah:

1. Buka `assets/js/main.js` dan ubah baris ini:

   ```js
   whatsapp: "6287777710002",
   ```

   Isi dengan nomor baru dalam format internasional, **tanpa `+`, spasi, atau angka 0 di depan**. Contoh: `0812-3456-7890` ditulis `6281234567890`.

2. Ganti juga nomor cadangan di semua file HTML: tekan `Ctrl+Shift+H`, cari `6287777710002`, ganti dengan nomor yang sama, lalu pilih *Replace All*. Langkah ini juga mengganti tautan telepon (`tel:+62...`) di `kontak.html`. Kalau nomor telepon berbeda dengan nomor WhatsApp, ubah tautan telepon itu secara terpisah.

3. Ganti teks yang tampil untuk pengunjung: cari `+62 877-7771-0002` dan ganti dengan nomor baru.

4. Uji: klik tombol WhatsApp dan kirim formulir. Pastikan chat terbuka ke nomor yang benar.

Pesan awal untuk tombol WhatsApp umum diatur di `waMessage`, tepat di bawah `whatsapp` dalam `main.js`.

### 5.2 Nama usaha dan teks placeholder

Semua teks yang menunggu data klien ditulis dalam kurung siku, misalnya `[Nama Usaha]`. Cari karakter `[` dengan `Ctrl+Shift+F` untuk menemukan semuanya.

| Placeholder | Tempat | Diisi dengan |
|---|---|---|
| ~~`[Nama Usaha]`~~ | Sudah diisi (8 November 2026): judul tab, judul untuk media sosial (`og:title`), dan deskripsi Kebijakan Privasi di semua halaman kini memakai nama lengkap **"Arits Fauzi Irham"**, sama dengan header dan footer. | Nama, **tanpa kata "Manulife"** (lihat [bagian 8](#8-ketentuan-konten-asuransi)). |
| ~~`[Jabatan]`~~ | Beranda (kartu About Me) | Sudah diisi (8 November 2026): "Insurance & Financial Protection Consultant". Nama konsultan "Arits Fauzi Irham" dipakai di seluruh website, karena website ini untuk usaha pribadi. Pengecualian: logo teks di header memakai "Arits Irham" (9 November 2026, permintaan klien). |
| ~~`[nomor]`~~ | Topbar dan footer semua halaman, Kontak, Kebijakan Privasi | Sudah diisi (9 November 2026): nomor WhatsApp klien 0877-7771-0002, juga dipakai untuk tautan telepon di Kontak (lihat [5.1](#51-nomor-whatsapp)). Email (aritsfauzii@gmail.com, tautan `mailto:`) dan alamat kantor (Jl. Jenderal Sudirman No. 45–46, Karet Semanggi, Setiabudi, Jakarta Selatan 12930; versi lengkap di Kontak) sudah diisi dari klien pada 8 November 2026. |
| (jam layanan) | Topbar, footer, band ajakan, Kontak | Sudah diisi 08:00–17:00 WIB (8 November 2026). Klien belum menyebut hari; tabel jam di Kontak tinggal satu baris "Service hours". Tambahkan baris per hari bila klien memberi rinciannya. |
| `[Deskripsi singkat usaha, ...]` | Footer | Satu atau dua kalimat tentang usaha |
| ~~`[Lama pengalaman]`~~, ~~`[Bidang pengalaman]`~~ | – | Tidak ada lagi (9 November 2026). Kotak Experience di hero Tentang Saya dan baris lama pengalaman di kartu About Me Beranda dihapus atas permintaan, karena konsultan baru merintis. Pasang lagi **hanya jika datanya benar dan terverifikasi** (markup lamanya ada di riwayat git, commit `6643187`). Sertifikasi dan nomor lisensi sudah diisi dari kartu lisensi AAJI klien (8 November 2026): agen asuransi jiwa dengan sertifikasi khusus produk unit link, lisensi no. 16429501, berlaku sampai 1 Juli 2028. Perbarui di Beranda dan Tentang Saya bila nomornya berubah saat perpanjangan. Gambar kartu lisensinya tidak dipasang karena memuat nama dan kode agen perusahaan serta logo AAJI. |
| ~~`[Ringkasan singkat profil ...]`~~, ~~`[Pendekatan pelayanan ...]`~~ | – | Tidak ada lagi (9 November 2026). Dua paragraf isian di kartu About Me Beranda dihapus atas permintaan, karena datanya belum ada. Tambahkan lagi **hanya** bila teksnya dari klien dan terverifikasi (markup lamanya ada di riwayat git, commit `6643187`). |
| ~~`[Judul cerita perjalanan konsultan]`~~, ~~`[Paragraf ...]`~~, ~~`[Prinsip pelayanan ...]`~~, ~~`[Tahun] – [Tonggak ...]`~~ | – | Tidak ada lagi (8–9 November 2026). Tonggak karier dihapus dari Professional Journey, lalu seluruh bagian "Journey & Perspective" di Tentang Saya (judul cerita, tiga paragraf, kutipan prinsip pelayanan, dan kotak Career Milestones) dihapus atas permintaan, karena isinya belum ada. Markupnya masih ada di riwayat git (commit `6643187`). |
| `[Testimoni klien ...]`, `[Nama klien]`, `[Pekerjaan / kota]`, `[A]` | Beranda (Client Testimonials), halaman Professional Journey | **Hanya testimoni asli dengan izin.** `[A]` diganti inisial nama. Samakan di kedua tempat. Jika belum ada, hapus blok `about-testi` di Beranda dan section testimoni di `perjalanan.html`. |
| `[Jawaban dikonfirmasi klien.]` | Tanya jawab di halaman Solusi | Jawaban dari klien |
| `[tanggal]`, `[nama penyedia]` | Kebijakan Privasi | Tanggal terbit dan nama hosting |

Bagian yang datanya tidak tersedia **dihapus**. Jangan dibiarkan berisi `[...]`, dan jangan diisi karangan. Komentar `<!-- GANTI: ... -->` di HTML menunjukkan bagian yang perlu diperiksa.

### 5.3 Foto

**Sejak 8 November 2026 semua ilustrasi di halaman sudah diganti foto stok CC0** (gambar kategori Solusi, gambar artikel, hero Kalkulator, Kontak, Edukasi, dan Kebijakan Privasi; daftar dan sumbernya di [bagian 9](#9-teknologi-dan-lisensi)). Kalau klien mengirim foto sendiri, cukup timpa file di `assets/img/foto/` dengan nama yang sama. Catatan di bawah tentang cara mengganti ilustrasi tetap berlaku untuk foto. Kalau ingin diganti foto, ganti alamat `src` pada `<img>` dan hapus kelas `ph--art` dari kotaknya, supaya fokus foto kembali agak ke atas. Khusus hero Beranda dan Solusi, ilustrasinya tidak berada di dalam kotak. Untuk memakai foto di sana, ganti seluruh `<picture>` dengan kotak `<div class="ph hero__photo">` berisi `<img>` seperti contoh di bawah. Tempat foto konsultan (profil di Beranda dan hero Tentang Saya) sudah berisi foto klien, `assets/img/foto-konsultan.webp`. File ini berukuran 1080 x 1350 px (4:5, 50 KB), dipotong rapat dari foto asli 3072 x 4096 px supaya wajah lebih besar, dan tanpa data kamera atau lokasi. Sekarang foto ini hanya dipakai di profil About Me Beranda, dengan titik fokus `object-position: 50% 12%` supaya rambut tidak terpotong saat kotaknya melebar di tablet. Pada 7 November 2026 klien mengirim foto formal berjas (`assets/img/foto-konsultan-jas.webp`, 1080 x 1350 px, 28 KB, dipotong 4:5 dari foto asli 2365 x 3056 px, tanpa data kamera). Foto ini dipakai di hero Beranda (`hero__portrait`) dan, atas permintaan klien, juga di hero halaman Tentang Saya, keduanya dengan titik fokus `object-position: 50% 8%` supaya rambut tidak terpotong. **Sejak 8 November 2026 kedua hero memakai foto tanpa latar** (`foto-konsultan-jas-potong.webp`, 902 x 1300 px, WebP transparan, 65 KB, tanpa data kamera), mengikuti contoh dari klien: orangnya tampil langsung di atas latar hero, tanpa kotak dan bingkai (kelas `foto-potong`). Foto ini dibuat dari foto asli IMG_8787.JPG dengan skrip numpy/scipy, tanpa layanan online. Warna dinding polos (termasuk bayangannya di kiri belakang bahu) dipelajari dari tepi foto, lalu latar dihapus mulai dari tepi foto, sehingga kemeja putih, wajah, dan tangan yang dikelilingi rambut atau jas tidak ikut terhapus. Piksel yang lebih terang dari dinding tidak boleh dianggap latar, karena kerah kemeja bersentuhan dengan dinding. Transparansi tepi dihitung dari warna objek dan dinding terdekat, dan warna dinding di tepi dibuang, sehingga tidak ada garis terang di latar navy. Badan dipotong tepat di bawah tangan yang bersilang dan bagian bawahnya memudar ke latar (`mask-image`). Di belakangnya ada cahaya lembut champagne-biru sebagai pengganti pola titik. Di HP foto memenuhi lebar kotaknya supaya wajah tidak terlalu kecil. `foto-konsultan-jas.webp` tidak dipakai lagi, tetapi masih disimpan. Kalau klien mengirim foto baru dengan latar polos, cara yang sama bisa diulang. Empat foto kegiatan untuk Professional Journey juga dari klien: `kegiatan-rapat.webp` (1280 x 960, dipotong rapat ke meja dan orang), `kegiatan-kunjungan.webp` (640 x 800, dipotong supaya papan nama PLN dan Danantara di pintu kaca tidak terlihat), `kegiatan-diskusi.webp` (1280 x 960), dan `kegiatan-rekan.webp` (640 x 800). Foto asli `kegiatan-rekan` diambil di depan banner kantor Manulife (logo Manulife dan slogan "Decision made easier, Lives made better") dan menyimpan data lokasi GPS. Fotonya dipotong 4:5 supaya logo dan poster di dinding tidak masuk, sisa tulisan slogan di sekitar kepala diganti warna latar biru tua di sekitarnya (hanya piksel tulisan; rambut, kulit, dan baju tidak diubah), dan data GPS dibuang. Pada 8 November 2026 klien mengirim tiga foto lagi. `kegiatan-pelatihan.webp` (1280 x 960) adalah foto bersama tim setelah sesi pelatihan di ruang rapat: dipotong 4:3 rapat ke orang dan meja, logo Manulife di dua kaos hijau dan di kepala kertas di meja dihapus (hanya kain atau kertasnya yang dihaluskan; kulit, tangan, dan tali ID tidak diubah), dan judul slide di layar (nama acara, nama produk, dan nama trainer) serta pantulannya di dinding dihapus. Catatan di papan tulis (PBI, Non PBI, dan sejenisnya) dibiarkan karena hanya istilah umum BPJS. `kegiatan-kunjungan-2.webp` (640 x 800) adalah foto bertiga di depan meja layanan sebuah rumah sakit: fotonya aslinya tercermin (tulisan terbaca terbalik) sehingga dibalik kembali, dipotong 4:5 supaya spanduk berdiri, papan informasi, dan TV antrean tidak masuk, lalu nama dan logo rumah sakit di dinding serta alamat website di dua tas dihapus. `kegiatan-swafoto.webp` (1280 x 720, 16:9) adalah swafoto bertiga di ruang rapat, juga dibalik kembali karena tercermin; logo tas pribadi di meja dibiarkan karena bukan logo perusahaan terkait. Ketujuh file tanpa data kamera atau lokasi. Pada 8 November 2026 hero halaman Solusi (Expertise) diganti foto asli atas permintaan: `kegiatan-rekan-potret.webp` (1080 x 1350, 4:5), versi besar dari `kegiatan-rekan.webp` yang dibuat ulang dari foto asli IMG_9042 dengan suntingan yang sama (logo dan poster dibuang lewat pemotongan, sisa slogan diganti warna latar, tanpa data GPS). Dipasang dengan kotak yang sama seperti foto hero Beranda (`hero__photo hero__portrait`; di HP tetap 4:5 di samping judul). Sempat dicoba foto kafe (Arits bersama klien), lalu diganti atas permintaan. Foto kafe aslinya ternyata tercermin (tulisan menu, banner, dan merek tisu terbaca terbalik), jadi `kegiatan-diskusi.webp` di galeri dibalik ke arah sebenarnya. Foto baru dengan latar kantor atau acara Manulife perlu diperlakukan sama, atau tidak dipakai (lihat [bagian 8](#8-ketentuan-konten-asuransi)). Foto berkuda hitam-putih yang juga dikirim klien tidak dipakai, karena wajahnya tidak terlihat.

**Foto konsultan tanpa latar.** Tiga tempat memakai foto yang latarnya sudah dihapus (kelas `foto-potong`): hero Beranda dan hero Tentang Saya (`foto-konsultan-jas-potong.webp`, dari foto berjas), serta kartu About Me di Beranda (`foto-konsultan-potong.webp`, dari `foto-konsultan.webp`, 9 November 2026). File aslinya tetap disimpan. Kalau klien mengirim foto baru untuk tempat itu, latarnya perlu dihapus dulu, misalnya dengan tombol *Remove background* di aplikasi Paint Windows 11 (berjalan di komputer sendiri, jadi foto tidak diunggah ke mana pun). Simpan hasilnya sebagai PNG atau WebP transparan, lalu ganti `src`, `width`, dan `height` di HTML. Kelas `foto-potong` sudah mengatur tampilannya: tanpa kotak, bagian bawah badan memudar, dan cahaya lembut di belakang.

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

**Tema aktif sejak 8 November 2026: `tema-premium.css`** (atas permintaan klien: lebih profesional, modern, dan "business", mengikuti referensi bergaya luxury & elegant). Hampir semua bagian navy gelap (latar `#0b1b3a`, panel `#0f2147`, kartu `#13295a`, band ajakan dan footer tetap `#07142a`), dan satu aksen emas champagne `#e9c98b` untuk tombol utama, kata sorotan, label, dan garis tipis. Hurufnya **serif lembut + sans** atas permintaan: judul **Fraunces** (Google Fonts menyebutnya "soft-serif") dengan sumbu `SOFT` dikunci 100 supaya ujung hurufnya membulat, ketebalan 500 untuk judul besar dan 600 untuk judul kartu, dan teks isi, menu, tombol, serta label **Inter** seperti referensi. Ukuran judul tetap dari `base.css` dan tema asuransi; hanya spasi hurufnya dilonggarkan. Riwayat font pada hari yang sama: Cinzel + Inter (huruf kapital seperti referensi), kembali ke Plus Jakarta Sans, Cinzel + Inter lagi, lalu Fraunces lembut + Inter. Header selebar layar berwarna navy dengan garis bawah emas tipis, hero bergradasi navy dengan lingkaran garis tipis sebagai hiasan, dan tombol WhatsApp ikut champagne. Hanya tombol WhatsApp mengambang yang tetap hijau. (Tombol WhatsApp sempat dibuat hijau pada 9 November 2026, lalu dikembalikan ke champagne hari itu juga atas permintaan klien.) Kelima warna kategori disatukan menjadi emas. **Latar bergerak** (8 November 2026, supaya navy tidak terlihat polos): klien memilih "cahaya aurora" dan minta digabung dengan cincin orbit. Hasilnya tiga lapisan tipis yang menempel di layar, di belakang semua isi: dua lapisan aurora yang bergeser pelan ke arah berlawanan (`body::before` 40 detik dan `html::before` 28 detik, bolak-balik), dan cincin garis putus-putus keemasan yang berputar sekali tiap 3 menit (`main::after`; di HP digeser ke tepi kanan supaya tidak berada di belakang teks). Panel dibuat sedikit tembus pandang (78%) supaya cahaya aurora terlihat di sana; kartu tetap padat supaya teks mudah dibaca. Bagian paling atas setiap halaman juga dibuat tembus pandang supaya latar bergerak terlihat sampai ke atas layar: hero bergradasi navy 42% sampai 24% (sebelumnya 86%, sehingga aurora baru terlihat setelah di-scroll), bilah info 55%, dan header kaca buram 50% (78% setelah halaman di-scroll, supaya foto dan kartu yang lewat di belakangnya tidak mengganggu menu). Animasinya hanya `transform` (ringan untuk HP) dan berhenti bila pengunjung memilih "kurangi gerakan". Untuk melemahkan atau menguatkan efeknya, ubah angka transparansi (`rgba(..., 0.3)` dan seterusnya) di bagian "Latar bergerak" `tema-premium.css`. **Lighting masuk-keluar** (8 November 2026, atas usulan klien), bagian "Lighting masuk-keluar" di `tema-premium.css`: (1) sorot cahaya di latar (`main::before`), yaitu pita cahaya lembut miring yang masuk dari kiri, menyapu ke kanan dalam sekitar 3,5 detik, lalu keluar dan menghilang, berulang tiap 5 detik di belakang isi halaman (atas permintaan klien; awalnya tiap 12 detik). Waktunya dicek di browser: sapuan pertama mulai 1 detik setelah halaman dibuka dan sapuan berikutnya tepat 5 detik kemudian; (2) kilau emas yang melintas di tombol utama (tombol header, tombol di hero, dan tombol band ajakan) tiap 7 detik, dibuat lewat lapisan gambar latar tombol supaya tidak bentrok dengan cincin yang sudah ada; (3) cincin yang mengembang di tombol pertama hero dan tombol banner kalkulator diubah dari biru (sisa tema asuransi) menjadi champagne. Saat tombol disorot kursor, kilaunya berhenti dan tombol menjadi champagne terang polos. **Header lebih mewah** (8 November 2026, karena header terasa datar dibanding bagian lain; bagian "Header lebih mewah" di `tema-premium.css`): lambang menjadi lencana emas bergradasi dengan perisai navy, bingkai tipis di luarnya, dan kilau yang lewat tiap 7 detik. "Irham" emas bergradasi, dan garis emas tipis memisahkan nama dan jabatan seperti kop surat. Header diberi cahaya halus di atas, bayangan di bawah, dan garis bawah emas yang memudar ke tepi dengan kilatan cahaya yang berjalan di sepanjang garis tiap 6 detik. Tombol menu HP bergaya kaca dengan ikon emas, berubah emas saat menu dibuka, dan ikon X-nya berputar masuk. Bilah info atas bergradasi navy dengan garis emas tipis, dan garis progres scroll bergradasi emas. Header lalu dibuat lebih lega karena masih terasa sempit (bagian "Header lebih lega"): tingginya 88 px di laptop dan 77 px di HP, dengan ruang 14 px dan 11 px di atas dan bawah lambang. Jarak antarmenu menyesuaikan lebar layar (`clamp(1rem, 1.6vw, 1.6rem)`), lambang 44 px (HP 40 px), nama 1,32 rem (HP 1,12 rem), bilah info atas lebih tinggi, dan di HP jarak huruf jabatan dirapatkan supaya ada ruang kosong sebelum tombol menu. `--header-h` dinaikkan menjadi 96 px di laptop dan 84 px di HP. Angka 96 px dan 140 px yang dulu ditulis langsung (kartu hasil kalkulator dan daftar FAQ yang menempel, lompatan ke kategori Solusi dan `#panduan`) sekarang dihitung dari `--header-h`, sehingga kalau tinggi header diubah lagi cukup ubah variabel itu. **Kilatan cahaya kelap-kelip** (bintang kecil champagne di hero) sempat dipasang pada 8 November 2026, lalu dihapus pada hari yang sama atas permintaan, karena terasa seperti luar angkasa dan tidak cocok untuk website asuransi. Kode di `main.js` dan gayanya di `tema-premium.css` sudah dibuang seluruhnya. File ini dimuat **sesudah** `tema-asuransi.css`: tata letak, animasi, dan versi HP tetap dari tema asuransi, sedangkan tema premium mengganti warna, huruf, dan hiasan. Baris fontnya (`SOFT@...,100` mengunci versi lembut, sehingga file font lebih kecil): **Nuansa AI/cyber** (9 November 2026, permintaan klien: "sedikit modern ala AI cyber"): dua lapisan tambahan yang sangat tipis, tanpa titik atau kelap-kelip. `html::after` berisi kisi garis biru tipis (64 px, di HP 40 px) yang memudar ke tengah layar dan tidak bergerak. `body::after` berisi jalur sirkuit di tepi kiri dan kanan layar (`assets/img/latar-sirkuit.svg`) dengan denyut cahaya biru yang sesekali mengalir di sepanjang jalurnya. Animasinya ada di dalam file SVG itu dan berhenti sendiri bila pengunjung memilih "kurangi gerakan". Untuk menghapusnya, hapus kedua aturan itu di `tema-premium.css` (bagian "Nuansa AI/cyber").

```html
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT@9..144,500..700,100&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Kata panjang di judul kartu.** Fraunces sedikit lebih lebar daripada Plus Jakarta Sans, sehingga di HP di bawah 380 px kata seperti "Understanding" bisa lebih lebar dari kartu slider. Karena itu kata panjang di judul kartu (`h3`) diberi titik pemenggalan tersembunyi `&shy;`, misalnya `Under&shy;standing`, `Trans&shy;parency`, dan `Inter&shy;ruption`. Titik ini tidak terlihat dan baru menjadi tanda hubung bila kolomnya terlalu sempit. `hyphens: auto` tidak dipakai, karena di Edge Windows kata malah terpotong tanpa tanda hubung. Kalau menambah atau mengganti judul kartu dengan kata **12 huruf atau lebih**, beri juga `&shy;`. Jangan pasang `&shy;` di kata yang lebih pendek: browser memakai titik pemenggalan begitu bagian depan kata muat di baris yang sedang diisi, walaupun kata utuhnya muat di baris berikutnya. Contohnya "Is Your Protec- tion Enough?" di HP 390 px, sehingga `&shy;` di kata "Protection" dicabut (8 November 2026). Satu-satunya tempat kata itu kepanjangan, yaitu judul banner kalkulator di layar 320 px, kini memakai huruf 0,95 rem. Di bawah 380 px judul hero halaman teks dan judul section kolom sempit juga sedikit dikecilkan (bagian terakhir `tema-premium.css`).

Untuk kembali ke tema terang, hapus baris `tema-premium.css` di semua halaman dan ganti baris font dengan baris Plus Jakarta Sans milik `tema-asuransi.css` di bawah. Titik pemenggalan `&shy;` boleh dibiarkan. Catatan: pada 2 November 2026 tema navy-emas (`tema.css`) pernah dinilai terlalu mirip website properti mewah. Pada 8 November 2026 klien sendiri meminta tampilan gelap seperti referensi, dan memilih versi "full gelap".

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

Markup footer (tulisan besar samar dan tombol "Kembali ke atas") tidak perlu diubah: tulisan besar hanya ditampilkan tema gabungan dan tema navy-emas. Favicon saat ini inisial "AI" emas di atas navy, sesuai tema premium (lihat 5.5). Untuk kembali ke tema terang, favicon biru lama ada di riwayat git (commit `6643187` dan sebelumnya). Ilustrasi hero Beranda dan Solusi (keluarga dan konsultan) dipakai di semua tema.

### 5.5 Logo dan favicon

**Sejak 8 November 2026 website tidak memakai lambang** atas permintaan klien. Lambang sementara (perisai, `<span class="brand__mark">`, terakhir berupa lencana emas) dihapus dari header dan footer kedelapan halaman, dan gayanya dibuang dari `tema-premium.css`. Identitas cukup nama lengkap **"Arits Fauzi Irham"** (nama belakang emas bergradasi), 1,45 rem di laptop dan 1,22 rem di HP. Tulisan jabatan "Insurance & Financial Protection Consultant" di bawah nama juga dihapus atas permintaan (8 November 2026), sehingga header lebih pendek (sekitar 70 px di laptop, 68 px di HP) dan `--header-h` diturunkan menjadi 86 px di laptop dan 76 px di HP. Favicon (ikon di tab browser, `assets/img/favicon.svg`, `favicon-32.png`, dan `apple-touch-icon.png`) juga diganti atas permintaan (8 November 2026): dari perisai biru menjadi **inisial "AI"** (Arits Fauzi Irham). Hurufnya Fraunces, font judul website (SIL Open Font License 1.1, diunduh dari repositori Google Fonts), versi lembut `SOFT 100`, `wght 640`, `opsz 72`, `WONK 0`, berwarna emas bergradasi (`#f8e3b5` → `#e9c98b` → `#c69b5c`). Latarnya kotak navy bergradasi (`#1b336d` → `#07142a`, sudut 14 dari 64) dengan bingkai emas tipis. Di `favicon.svg` hurufnya berupa garis vektor (diambil dengan fontTools), jadi tampil sama di semua perangkat walaupun font Fraunces tidak terpasang. `favicon-32.png` dan `apple-touch-icon.png` (180 px, sudut tidak dibulatkan karena iPhone membulatkannya sendiri) digambar dengan font yang sama. Di tab browser gelap maupun terang, ikon terbaca sampai ukuran 16 px. Warna bilah alamat browser HP (`theme-color`) di kedelapan halaman juga diganti dari biru muda `#edf4fe` (sisa tema terang) menjadi navy `#07142a`. Browser menyimpan favicon cukup lama, jadi ikon baru mungkin baru muncul setelah *hard refresh* (Ctrl+F5) atau tab dibuka ulang. Bagian di bawah ini berlaku bila klien nanti punya logo resmi. Untuk memakai logo, ganti **seluruh** isi tautan `brand` di header setiap halaman, termasuk span lambang itu:

```html
<a class="brand" href="index.html"><img src="assets/img/logo.svg" alt="[Nama Usaha]" height="36"></a>
```

Footer berlatar gelap, jadi siapkan versi logo berwarna terang jika logo juga dipasang di sana. Kalau logo belum ada, cukup nama dalam bentuk teks seperti sekarang.

Header semua halaman memakai **logo teks** "Arits Irham" (sejak 9 November 2026, permintaan klien; 8 November sempat "Arits Fauzi Irham"), sedangkan footer memakai nama lengkap "Arits Fauzi Irham". Logonya berupa nama dua warna, dengan tempat tagline kecil di bawahnya yang saat ini dikosongkan. Di tema asuransi, bagian `brand__accent` memakai warna aksen biru polos. Di tema gabungan, nama memakai Fraunces dan bagian itu tampil miring berwarna emas. Bagian nama yang bergradasi biru dibungkus `brand__accent`, dan tagline ada di `brand__tagline`:

```html
<span class="brand__text"><span class="brand__name">Arits <span class="brand__accent">Irham</span></span><span class="brand__tagline">Konsultan Perlindungan</span></span>
```

Gayanya ada di `components.css`, bagian Header. Tagline sedang dikosongkan di semua halaman. Span `brand__tagline` yang kosong tidak memakan tempat (aturan `.brand__tagline:empty` di `components.css`), jadi nama tetap di tengah lambang. Isi span itu, misalnya dengan contoh di atas, bila tagline ingin ditampilkan. Logo ini ditulis di header dan footer kedelapan halaman, jadi perubahan nama atau tagline harus dilakukan di semua tempat itu (cari `brand__name`; header dan footer sekarang berbeda isinya). Nama yang sama juga tertulis di baris hak cipta footer. Footer memakai logo teks yang sama. Di tema asuransi, bagian `brand__accent` di footer navy tampil biru muda polos supaya terbaca. Kapsul header di laptop disiapkan untuk logo teks selebar sekitar 210 px. Kalau nama atau tagline jauh lebih panjang, cek lagi di lebar 1200 px.

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

Halaman Edukasi tidak memakai halaman artikel sendiri. Isinya rangkuman singkat dari sumber luar dengan format **kutip singkat + tautan**: satu atau dua kalimat, sumber lengkap, lalu tautan ke artikel aslinya yang terbuka di tab baru. Rangkuman dibagi tiga kategori yang memakai tata letak kategori halaman Solusi (`sol`, ditambah kelas `edu-cat`): `#dasar-asuransi`, `#panduan-polis`, dan `#tips-klaim`. Ketiga kartu artikel di Beranda menautkan ke kategori itu, dan jumlah sumbernya tertulis di kartu (misalnya "3 sumber").

**Kategori dengan banyak sumber.** Di laptop (lebar minimal 900 px dan tinggi layar minimal 620 px), kolom pembuka dan gambar setiap kategori ikut turun (`position: sticky`) selama kartu sumber di sebelahnya dibaca. Jadi kategori yang sumbernya lebih banyak, seperti Insurance Basics dengan 3 sumber, tidak menyisakan ruang kosong di bawah gambar, dan sumbernya tidak perlu dikurangi (8 November 2026, `pages.css` bagian Edukasi). Kalau menambah sumber, tidak ada yang perlu diubah. Kalau kolom pembuka dibuat jauh lebih tinggi (teks pembuka panjang atau gambar lebih tinggi), naikkan juga syarat `min-height: 620px`, supaya gambar tidak terpotong di laptop pendek.

**Menambah sumber.** Salin satu `<article class="card source-card">` di `edukasi/index.html` ke kategori yang sesuai, lalu ganti isinya:

```html
<article class="card source-card">
  <span class="tag">Media</span>                         <!-- Regulator, Media, atau Hukum -->
  <p class="source-card__summary">Satu atau dua kalimat rangkuman.</p>
  <p class="source-card__note">Catatan bila perlu, misalnya aturan yang sudah diganti.</p>  <!-- boleh dihapus -->
  <p class="source-card__src">Sumber: <strong>Nama Penerbit</strong> &middot; <cite>&ldquo;Judul Artikel&rdquo;</cite> &middot; 1 Januari 2026</p>
  <a class="link-arrow" href="https://alamat-artikel" target="_blank" rel="noopener">Buka sumber asli<span class="visually-hidden"> (tab baru)</span>
    <svg class="icon" aria-hidden="true"><use href="#i-external"/></svg></a>
</article>
```

Kalau jumlah sumber berubah, perbarui juga angka "... sumber" di kartu Beranda.

Ketentuan isi (lihat juga [bagian 8](#8-ketentuan-konten-asuransi)):

- **Tulis rangkuman dengan kata-kata sendiri.** Jangan menyalin paragraf dari artikelnya. Isinya harus sesuai artikel, tanpa menambah janji manfaat atau klaim.
- **Sumber lengkap:** nama penerbit, judul persis, dan tanggal terbit. Tanggal penting karena aturan asuransi bisa berubah.
- **Utamakan sumber resmi:** OJK (ojk.go.id, sikapiuangmu.ojk.go.id), media berita, dan portal hukum. Website perusahaan asuransi lain dan situs pembanding atau penjual asuransi (misalnya Chubb dan Cermati) tidak dipakai. Selain mengarahkan pengunjung ke pesaing, sumbernya juga tidak netral. Kalau klien tetap ingin memakainya, tanyakan dulu ke BDM atau TH-nya.
- **Cek aturan yang dikutip.** Bila artikel menyebut POJK lama, beri catatan (`source-card__note`). Contohnya artikel Klinik Hukumonline tahun 2020 yang mengacu POJK 23/2015, yang sudah dicabut dan diganti POJK 8 Tahun 2024. Nomor aturan baru hanya ditulis setelah dicek langsung di [ojk.go.id](https://ojk.go.id/id/regulasi/).
- Artikel yang mungkin hanya terbuka sebagian untuk pelanggan (misalnya Bisnis.com) diberi catatan.
- Buka setiap tautan sesekali. Bila artikelnya hilang atau pindah alamat, ganti atau hapus kartunya.

---

### 5.10 Penanda versi CSS dan JS

Sejak 9 November 2026 setiap halaman memuat CSS dan JS dengan penanda versi, misalnya `assets/css/tema-premium.css?v=20261109`. GitHub Pages mengizinkan browser menyimpan file itu sampai 10 menit, dan browser HP sering lebih lama, sehingga setelah website diperbarui tampilan lama (misalnya tombol yang warnanya sudah diganti) masih bisa terlihat. Dengan penanda versi, browser langsung mengambil file baru begitu halamannya dimuat ulang.

**Setiap kali mengubah file CSS atau JS**, naikkan angkanya di kedelapan halaman: tekan `Ctrl+Shift+H`, cari `?v=20261109`, ganti dengan tanggal baru (misalnya `?v=20261110`, atau `?v=20261109b` bila di hari yang sama), lalu pilih *Replace All*. `qa-check.js` mengabaikan penanda ini saat memeriksa tautan.

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

`sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://domainanda.com/</loc></url>
  <url><loc>https://domainanda.com/tentang.html</loc></url>
  <url><loc>https://domainanda.com/solusi.html</loc></url>
  <url><loc>https://domainanda.com/perjalanan.html</loc></url>
  <url><loc>https://domainanda.com/kalkulator.html</loc></url>
  <url><loc>https://domainanda.com/edukasi/</loc></url>
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
- [ ] Semua tautan berfungsi dan tidak ada halaman putih, termasuk tautan sumber di Edukasi (dibuka satu per satu).
- [ ] Foto asli terpasang, sudah dikompres, dan punya teks `alt`.
- [ ] Diuji di HP asli (Android, dan iPhone bila ada), serta di Chrome dan minimal satu browser lain.
- [ ] Skor Lighthouse sudah dicek (Chrome: `F12` → tab Lighthouse) untuk Performance, Accessibility, Best Practices, dan SEO.
- [ ] Kebijakan Privasi: tanggal dan nama hosting terisi, dan kalimat yang menunggu konfirmasi klien sudah diputuskan.
- [ ] `robots.txt` dan `sitemap.xml` terisi dengan domain asli.
- [ ] Klien sudah menyetujui seluruh teks, terutama terjemahan bahasa Inggris (termasuk teks dokumen klien yang diterjemahkan), testimoni, tanya jawab di Solusi, dan penjelasan produk.
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

### Bahasa

- Website ini berbahasa Inggris atas permintaan klien (7 November 2026). Di Indonesia, informasi tentang produk atau jasa yang beredar umumnya wajib memakai bahasa Indonesia dan boleh dilengkapi bahasa asing (UU Nomor 24 Tahun 2009, Pasal 37), dan OJK juga mengatur bahasa informasi untuk konsumen jasa keuangan. Klien perlu menanyakan ke BDM atau TH-nya apakah website berbahasa Inggris saja diperbolehkan, atau perlu versi bahasa Indonesia.
- Disclaimer afiliasi Manulife tetap dicantumkan dalam bahasa Indonesia (sesuai contoh pedoman) di samping versi Inggrisnya.

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
- **Logo WhatsApp** (8 November 2026): simbol `i-wa` di sprite ikon setiap halaman, bentuknya dari [Simple Icons](https://simpleicons.org) (lisensi CC0). Merek dan logo WhatsApp milik WhatsApp LLC (Meta) dan hanya dipakai sebagai penanda tautan ke WhatsApp: topbar, tombol WhatsApp, kartu WhatsApp dan tombol "Continue to WhatsApp" di Kontak, baris WhatsApp di footer, dan tombol WhatsApp mengambang. Bentuk logonya jangan diubah. Ikon gelembung chat (`i-chat`) tetap dipakai untuk hal lain, misalnya badge "Get in touch" di Kontak.
- **Foto di kartu topik** (8 November 2026): atas permintaan klien, kotak ikon di kartu topik diganti foto asli. Yang diganti: lima kartu Area of Expertise dan banner kalkulator di Beranda, empat kartu Why Work With Me di Beranda dan Tentang Saya, sebelas kartu fitur dan banner kalkulator di Solusi. Ikon yang berfungsi sebagai tanda tetap ikon: kartu kontak, centang, panah, tanda kutip testimoni, dan lencana lisensi AAJI. Fotonya dari [StockSnap](https://stocksnap.io) (dicari lewat [Openverse](https://openverse.org)) dengan lisensi [CC0](https://creativecommons.org/publicdomain/zero/1.0/): boleh dipakai untuk usaha, diubah, dan tanpa wajib mencantumkan nama pembuat. Unsplash dan Pexels tidak dipakai karena menolak akses otomatis. Semua file berukuran 720 px lebar dan WebP 11 sampai 32 KB, tanpa data kamera atau lokasi. Foto dipilih yang tanpa logo atau merek. Foto stok tidak menjamin izin model untuk iklan, jadi jangan dipakai untuk menyiratkan bahwa orang di foto adalah nasabah atau memberi testimoni. Kalau klien punya foto sendiri, ganti file di `assets/img/foto/` dengan nama yang sama (rasio 3:2). Sumber per file:

  | File | Dipakai di | Sumber |
  |---|---|---|
  | `exp-kesehatan` | Health Protection | [hospital-medical-GZWA3OWENX](https://stocksnap.io/photo/hospital-medical-GZWA3OWENX) |
  | `exp-kritis` | Critical Illness Protection | [caregiver-nurse-QQEQNVMB0I](https://stocksnap.io/photo/caregiver-nurse-QQEQNVMB0I) |
  | `exp-jiwa` | Life Protection | [family-playing-CKT87YHJH0](https://stocksnap.io/photo/family-playing-CKT87YHJH0) |
  | `exp-keuangan` | Financial & Wealth Planning | [happy-couple-FBD5YZNVUM](https://stocksnap.io/photo/happy-couple-FBD5YZNVUM) |
  | `exp-usaha` | Business & Employee Protection | [business-team-V8NHXQVQ70](https://stocksnap.io/photo/business-team-V8NHXQVQ70) |
  | `kalkulator` | Banner kalkulator (Beranda, Solusi) | [calculator-calendar-RFVHCUGML3](https://stocksnap.io/photo/calculator-calendar-RFVHCUGML3) |
  | `why-personal` | Personalized Consultation | [business-meeting-SKBXLJOILI](https://stocksnap.io/photo/business-meeting-SKBXLJOILI) |
  | `why-santai` | No Pressure, Just Understanding | [business-women-BOWOZQBREK](https://stocksnap.io/photo/business-women-BOWOZQBREK) |
  | `why-jangka-panjang` | Long-Term Relationship | [shaking-hands-GEKK2UOHCY](https://stocksnap.io/photo/shaking-hands-GEKK2UOHCY) |
  | `why-transparan` | Transparency & Trust | [women-working-2VU3XNN1MA](https://stocksnap.io/photo/women-working-2VU3XNN1MA) |
  | `sol-rawat-inap` | Inpatient Care | [wheelchair-hospital-M38DGA9LK7](https://stocksnap.io/photo/wheelchair-hospital-M38DGA9LK7) |
  | `sol-rawat-jalan` | Outpatient Care | [doctor-patient-7NQJS4WWQW](https://stocksnap.io/photo/doctor-patient-7NQJS4WWQW) |
  | `sol-cashless` | Cashless Service | [female-nurse-XYNYITNTU1](https://stocksnap.io/photo/female-nurse-XYNYITNTU1) |
  | `sol-kritis` | Critical Illness (Solusi) | [caregiver-nurse-PMZZ7WLOAJ](https://stocksnap.io/photo/caregiver-nurse-PMZZ7WLOAJ) |
  | `sol-bengkel` | Partner Workshops (tidak dipakai sejak Vehicle Insurance dihapus, 8 November 2026) | [car-garage-D3AFE4D6F8](https://stocksnap.io/photo/car-garage-D3AFE4D6F8) |
  | `sol-perluasan` | Extended Cover (tidak dipakai sejak Vehicle Insurance dihapus) | [person-people-TVUSUD00B6](https://stocksnap.io/photo/person-people-TVUSUD00B6) |
  | `sol-pihak-ketiga` | Third-Party Liability (tidak dipakai sejak Vehicle Insurance dihapus) | [woman-driving-G8GSBPQZUB](https://stocksnap.io/photo/woman-driving-G8GSBPQZUB) |
  | `sol-properti` | Property Insurance | [house-home-LJ515CPAKI](https://stocksnap.io/photo/house-home-LJ515CPAKI) |
  | `sol-gangguan-usaha` | Business Interruption | [closed-sign-QH3MQFUVJY](https://stocksnap.io/photo/closed-sign-QH3MQFUVJY) |
  | `sol-orang-kunci` | Key Person | [older-businessman-5BRQF1DZ8W](https://stocksnap.io/photo/older-businessman-5BRQF1DZ8W) |
  | `sol-karyawan` | Employee Health | [business-woman-2NK9HRLBCC](https://stocksnap.io/photo/business-woman-2NK9HRLBCC) |
  | `sol-img-kesehatan` | Gambar kategori Health Insurance (Solusi) | [health-care-LGAOALQUVQ](https://stocksnap.io/photo/health-care-LGAOALQUVQ) |
  | `sol-img-jiwa` | Gambar kategori Life Insurance (Solusi) | [family-portrait-KPAKLGPS7E](https://stocksnap.io/photo/family-portrait-KPAKLGPS7E) |
  | `sol-img-kendaraan` | Gambar kategori Vehicle Insurance (Solusi; tidak dipakai sejak bagian itu dihapus, 8 November 2026) | [man-bear-VR4IPSLIOI](https://stocksnap.io/photo/man-bear-VR4IPSLIOI) |
  | `sol-img-properti` | Gambar kategori Property & Business (Solusi) | [barista-pouring-MD4L58LL1E](https://stocksnap.io/photo/barista-pouring-MD4L58LL1E) |
  | `artikel-dasar` | Artikel Insurance Basics (Beranda, Edukasi) | [woman-reading-XRJEVMSPZJ](https://stocksnap.io/photo/woman-reading-XRJEVMSPZJ) |
  | `artikel-polis` | Artikel Understanding Your Policy (Beranda, Edukasi) | [paperwork-desk-A5DG6YREVH](https://stocksnap.io/photo/paperwork-desk-A5DG6YREVH) |
  | `artikel-klaim` | Artikel Preparing to File a Claim (Beranda, Edukasi) | [doctor-working-WTWX4BZ4FD](https://stocksnap.io/photo/doctor-working-WTWX4BZ4FD) |
  | `hero-kalkulator` | Hero Kalkulator | [analytics-charts-RCFX768X06](https://stocksnap.io/photo/analytics-charts-RCFX768X06) |
  | `hero-kontak` | Hero Kontak | [businessman-call-0MQJHREWOL](https://stocksnap.io/photo/businessman-call-0MQJHREWOL) |
  | `hero-edukasi` | Hero Edukasi | [woman-reading-FMJOIWUH4F](https://stocksnap.io/photo/woman-reading-FMJOIWUH4F) |
  | `hero-privasi` | Hero Kebijakan Privasi | [working-typing-0E0M5W9O3V](https://stocksnap.io/photo/working-typing-0E0M5W9O3V) |

  Gambar Solusi dan artikel berukuran 800 px lebar, hero 960 px lebar. Hero memakai kelas `edu-hero__art edu-hero__photo` (kotak 4:3, sama dengan hero Professional Journey). Gambar Solusi dan artikel tetap di kotak `.ph`, tanpa kelas `ph--art`.

  Di HTML fotonya berupa `<img class="card__photo" ... alt="">` sebagai elemen pertama kartu. `alt` sengaja kosong karena foto hanya hiasan dan topiknya sudah disebut di judul kartu. Gayanya ada di `pages.css` (bagian "Foto di kartu").
- **Foto, logo, dan teks dari klien** menjadi tanggung jawab klien, termasuk hak ciptanya.

---

Dikembangkan oleh [Nama Pengembang] – [kontak pengembang].
