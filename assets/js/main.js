/* Skrip umum: menu mobile, link WhatsApp, tahun footer, titik slider, animasi scroll,
   dan penanda kategori di halaman Solusi.
   Data kontak diubah di SITE di bawah, bukan di tiap halaman. */

// Bahasa halaman (10 November 2026): "id" di alamat utama, "en" di folder en/. tr(teksIndonesia, teksInggris)
// memilih teks sesuai bahasa halaman; dipakai juga oleh form.js dan kalkulator.js.
const LANG = document.documentElement.lang === "en" ? "en" : "id";
const tr = (id, en) => (LANG === "en" ? en : id);

const SITE = {
  // Nomor WhatsApp klien (dipasang 9 November 2026; ditulis 0877-7771-0002).
  // Format internasional, tanpa + atau 0 di depan.
  whatsapp: "6287777710002",
  waMessage: tr("Halo, saya ingin konsultasi gratis tentang perlindungan asuransi.", "Hello, I’d like a free consultation about insurance protection."),
};

function buildWaUrl(message) {
  return "https://wa.me/" + SITE.whatsapp + "?text=" + encodeURIComponent(message || SITE.waMessage);
}

document.querySelectorAll("[data-wa]").forEach((el) => {
  el.href = buildWaUrl(el.dataset.wa || undefined);
  el.target = "_blank";
  el.rel = "noopener noreferrer";
});

const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

if (navToggle && nav) {
  const setOpen = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? tr("Tutup menu", "Close menu") : tr("Buka menu", "Open menu"));
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open); // menggelapkan halaman di belakang menu
  };
  navToggle.addEventListener("click", () => setOpen(navToggle.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      navToggle.focus();
    }
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
  // Klik di area gelap (di luar menu) menutup menu.
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !nav.contains(e.target) && !navToggle.contains(e.target)) setOpen(false);
  });
  // Menu ditutup bila layar dilebarkan sampai menu lengkap tampil.
  window.matchMedia("(min-width: 1200px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}

document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Header berubah (blur + bayangan) setelah halaman di-scroll, dan garis progres scroll ikut diperbarui.
// Dibuat ringan (15 November 2026, keluhan "scroll nge-lag"): sebelumnya setiap event scroll membaca posisi scroll dan
// tinggi halaman, yang memaksa browser menghitung ulang gaya dan tata letak di tengah frame (sekitar 11% waktu
// prosesor selama scroll di laptop). Sekarang posisi scroll tidak dibaca sama sekali:
// - kelas is-scrolled: penanda tak terlihat setinggi 9 px di puncak halaman diamati IntersectionObserver; begitu
//   penanda itu keluar layar (halaman di-scroll lebih dari 8 px), header berubah;
// - garis progres: di browser yang mendukung animasi berbasis scroll (Chrome, Edge, Safari baru) digerakkan CSS
//   langsung di GPU (tema-premium.css). Hanya di browser lain posisi scroll dibaca, sekali per frame.
const header = document.querySelector(".site-header");
if (header) {
  const progresCss = !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    window.CSS && CSS.supports("animation-timeline: scroll()");
  const pakaiIO = "IntersectionObserver" in window;
  if (pakaiIO) {
    const penanda = document.createElement("div");
    penanda.setAttribute("aria-hidden", "true");
    penanda.style.cssText = "position:absolute;top:0;left:0;width:1px;height:9px;visibility:hidden;pointer-events:none";
    document.body.append(penanda);
    new IntersectionObserver(([e]) => header.classList.toggle("is-scrolled", !e.isIntersecting)).observe(penanda);
  }
  if (!progresCss || !pakaiIO) {
    let maks = 0;
    let terakhir = "";
    let antre = 0;
    const ukur = () => {
      maks = document.documentElement.scrollHeight - window.innerHeight;
    };
    const perbarui = () => {
      antre = 0;
      const y = window.scrollY;
      if (!pakaiIO) header.classList.toggle("is-scrolled", y > 8);
      if (progresCss) return;
      // Garis tipis di tepi atas header memanjang sesuai posisi scroll.
      const nilai = maks > 0 ? Math.min(1, y / maks).toFixed(3) : "0";
      if (nilai !== terakhir) {
        terakhir = nilai;
        header.style.setProperty("--scroll", nilai);
      }
    };
    ukur();
    perbarui();
    window.addEventListener("scroll", () => {
      if (!antre) antre = requestAnimationFrame(perbarui);
    }, { passive: true });
    window.addEventListener("resize", ukur);
    // Tinggi halaman juga berubah tanpa resize (gambar selesai dimuat, FAQ dibuka): diukur ulang hanya saat itu.
    if ("ResizeObserver" in window) new ResizeObserver(ukur).observe(document.body);
  }
}

// Tandai ikon panah agar bisa bergeser saat tombol disorot.
document.querySelectorAll('use[href="#i-arrow"]').forEach((use) => {
  use.closest("svg").classList.add("icon-arrow");
});

// Slider kartu di HP: titik penanda posisi di bawahnya (di layar lebar disembunyikan CSS).
document.querySelectorAll(".grid-4, .grid-3, .feature-grid, .why__list, .journey__gallery").forEach((slider) => {
  const items = slider.children;
  if (items.length < 2) return;
  const dots = document.createElement("div");
  dots.className = "slider-dots";
  dots.setAttribute("aria-hidden", "true");
  for (let i = 0; i < items.length; i++) dots.append(document.createElement("span"));
  slider.after(dots);

  const update = () => {
    // Semua kartu sudah terlihat (tidak perlu digeser): titik tidak ditampilkan.
    dots.style.display = slider.scrollWidth <= slider.clientWidth + 2 ? "none" : "";
    const step = items[0].offsetWidth + (parseFloat(getComputedStyle(slider).columnGap) || 0);
    const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 2;
    const active = atEnd ? items.length - 1 : Math.round(slider.scrollLeft / step);
    Array.from(dots.children).forEach((dot, i) => dot.classList.toggle("is-active", i === active));
  };
  let frame;
  const schedule = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(update);
  };
  slider.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  update();
});

// Judul hero muncul kata demi kata: setiap kata dibungkus span (gayanya di file tema).
// Pembaca layar tetap membaca judul utuh lewat aria-label. Dilewati bila pengunjung memilih "kurangi gerakan".
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".hero h1, .edu-hero h1, .about-hero h1").forEach((h1) => {
    let index = 0;
    const wrap = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) {
          wrap(child);
          return;
        }
        if (child.nodeType !== Node.TEXT_NODE) return;
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.append(part);
            return;
          }
          const word = document.createElement("span");
          word.className = "kata";
          word.setAttribute("aria-hidden", "true");
          word.style.setProperty("--i", index++);
          word.textContent = part;
          frag.append(word);
        });
        child.replaceWith(frag);
      });
    };
    h1.setAttribute("aria-label", h1.textContent.replace(/\s+/g, " ").trim());
    wrap(h1);
    h1.classList.add("judul-bertahap");
  });
}

// Efek muncul saat di-scroll. Dilewati bila pengguna memilih "kurangi gerakan"
// atau browser tidak mendukung IntersectionObserver; konten tetap tampil normal.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Testimoni klien berjalan ke kanan tanpa henti seperti eskalator (11 November 2026; gayanya di pages.css).
// Satu set kartu ditulis di HTML; di sini set itu disalin secukupnya supaya putarannya menyambung. Salinan disembunyikan
// dari pembaca layar dan keyboard. Atas permintaan klien (11 November 2026) pita tidak berhenti saat disorot dan tidak
// punya tombol Jeda. Bila "kurangi gerakan" aktif, pita tidak berjalan dan kartunya bisa digeser manual.
if (!reduceMotion) {
  document.querySelectorAll(".testi-marquee").forEach((marquee) => {
    const track = marquee.querySelector(".testi-track");
    const asli = track ? Array.from(track.children) : [];
    if (!asli.length) return;

    let lebarTerakhir = 0;
    const susun = () => {
      if (marquee.clientWidth === lebarTerakhir) return;
      lebarTerakhir = marquee.clientWidth;
      track.querySelectorAll("[data-salinan]").forEach((el) => el.remove());
      const set = track.offsetWidth; // lebar satu set kartu, termasuk jarak antarkartu
      if (!set) return;
      const jumlah = Math.ceil(marquee.clientWidth / set) + 1;
      for (let n = 0; n < jumlah; n++) {
        asli.forEach((kartu) => {
          const salinan = kartu.cloneNode(true);
          salinan.setAttribute("data-salinan", "");
          salinan.setAttribute("aria-hidden", "true");
          salinan.inert = true;
          track.append(salinan);
        });
      }
      track.style.setProperty("--testi-set", set + "px");
      track.style.setProperty("--testi-durasi", Math.round(set / 60) + "s"); // sekitar 60 px per detik (dipercepat 11 November 2026)
    };
    susun();
    marquee.classList.add("is-jalan");
    let tunda;
    window.addEventListener("resize", () => {
      clearTimeout(tunda);
      tunda = setTimeout(susun, 200);
    });

    // Hemat baterai: animasi ditahan saat pita di luar layar (tidak terlihat oleh pengunjung).
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([entry]) => marquee.classList.toggle("is-luar", !entry.isIntersecting)).observe(marquee);
    }
  });
}

if (!reduceMotion && "IntersectionObserver" in window) {
  const targets = Array.from(document.querySelectorAll(
    ".section-head, .card, .profile, .cta-band, .featured, .ethics, .accordion__item, " +
    ".pyramid__layer, .callout, .claim-band, .channel, .consult-steps li, .consult-alt, .prose > *, " +
    ".why__item, .steps__item, .approach__item, .calc-promo, .timeline li, .journey__photo, .sol__img, .site-footer__grid > *, " +
    ".testi-marquee"
  )).filter((el) => !el.closest(".testi-track")); // kartu di pita testimoni muncul bersama pitanya, tidak satu per satu

  const show = (el) => {
    el.classList.add("is-visible");
    observer.unobserve(el);
    // Lepas kelas setelah animasi selesai agar efek hover kartu tidak ikut tertunda.
    const delay = parseInt(el.style.getPropertyValue("--reveal-delay"), 10) || 0;
    setTimeout(() => {
      el.classList.remove("reveal", "is-visible");
      el.style.removeProperty("--reveal-delay");
    }, 900 + delay);
  };

  const observer = new IntersectionObserver((entries) => {
    // Ukuran dibaca dulu untuk semua elemen, baru kelasnya dipasang (15 November 2026): bila dibaca bergantian dengan
    // memasang kelas, browser terpaksa menghitung ulang gaya dan tata letak sekali per elemen selama scroll.
    const muncul = entries.filter((entry) => entry.isIntersecting).map((entry) => {
      const parent = entry.target.parentElement;
      return [entry.target, parent, parent.scrollWidth > parent.clientWidth];
    });
    muncul.forEach(([el, parent, slider]) => {
      // Di slider mobile, kartu yang masih tersembunyi di samping ikut dimunculkan.
      if (slider) {
        parent.querySelectorAll(":scope > .reveal:not(.is-visible)").forEach(show);
      } else {
        show(el);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });

  targets.forEach((el) => {
    // Elemen yang sudah terlihat saat halaman dibuka tidak dianimasikan, supaya tidak berkedip.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    // Kartu bersebelahan muncul berurutan.
    const index = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty("--reveal-delay", Math.min(index, 4) * 90 + "ms");
    el.classList.add("reveal");
    observer.observe(el);
  });
}

// Langkah konsultasi: garis penghubung tergambar dan nomor muncul bergantian saat bagian ini terlihat
// (gayanya di file tema). Dilewati bila "kurangi gerakan" aktif atau bagian ini sudah terlihat saat dibuka.
if (!reduceMotion && "IntersectionObserver" in window) {
  const drawObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-drawn");
      drawObserver.unobserve(entry.target);
    });
  }, { threshold: 0.35 });
  document.querySelectorAll(".steps").forEach((list) => {
    if (list.getBoundingClientRect().top < window.innerHeight) return;
    list.classList.add("steps--animate");
    drawObserver.observe(list);
  });
}

// Banner kalkulator: saat terlihat, kartu contoh hasil muncul memantul, angkanya menghitung naik dari Rp 0,
// dan meternya terisi (gayanya di pages.css). Dilewati bila pengunjung memilih "kurangi gerakan".
if (!reduceMotion && "IntersectionObserver" in window) {
  document.querySelectorAll(".calc-promo").forEach((promo) => {
    const value = promo.querySelector(".calc-promo__value");
    if (!value) return;
    const target = Number(value.textContent.replace(/\D/g, "")); // angka diambil dari HTML
    const format = new Intl.NumberFormat("id-ID");
    const show = (n) => (value.textContent = "Rp " + format.format(n));
    promo.classList.add("is-armed");
    show(0);

    const popObserver = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      popObserver.disconnect();
      promo.classList.add("is-popped");
      const start = performance.now() + 450; // mulai setelah kartu muncul
      const tick = (now) => {
        const t = Math.min(1, Math.max(0, (now - start) / 1300));
        const eased = 1 - Math.pow(1 - t, 3);
        show(t < 1 ? Math.round((target * eased) / 1e6) * 1e6 : target); // naik per juta agar rapi
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.35 });
    popObserver.observe(promo);
  });
}

// Solusi: kategori yang sedang dibaca ditandai di bilah kategori (dan digeser ke tengah di HP).
const catNav = document.querySelector(".cat-nav");
if (catNav && "IntersectionObserver" in window) {
  const list = catNav.querySelector("ul");
  const links = catNav.querySelectorAll('a[href^="#"]');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => {
        if (a.hash !== "#" + entry.target.id) {
          a.removeAttribute("aria-current");
          return;
        }
        a.setAttribute("aria-current", "true");
        const offset = a.getBoundingClientRect().left + a.offsetWidth / 2 - (list.getBoundingClientRect().left + list.clientWidth / 2);
        list.scrollBy({ left: offset, behavior: reduceMotion ? "auto" : "smooth" });
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  links.forEach((a) => {
    const section = document.getElementById(a.hash.slice(1));
    if (section) spy.observe(section);
  });
}

// Latar sirkuit AI/cyber (9 November 2026), versi ringan (15 November 2026; gayanya di tema-premium.css, bagian
// "Nuansa AI/cyber"). Dulu hanya gambar latar body::after (assets/img/latar-sirkuit.svg). Denyut cahayanya digambar
// ulang prosesor setiap frame, juga selama scroll, dan gambar latar tidak bisa dijeda dari luar. Sekarang SVG yang sama
// dipasang langsung di halaman, dan denyutnya dijeda selama halaman di-scroll (kelas sedang-scroll di <html>), lalu
// lanjut lagi 0,2 detik setelah scroll berhenti. Denyutnya pelan (8 sampai 13 detik per putaran), jadi jeda sebentar
// tidak terlihat. Gambar latar tetap dipakai bila JavaScript mati atau "kurangi gerakan" aktif.
// Hanya dipasang bila tema yang aktif memakai latar sirkuit. Jalur, warna, dan waktunya sama dengan file SVG itu:
// bila salah satu diubah, ubah juga yang lain.
if (!reduceMotion && getComputedStyle(document.body, "::after").backgroundImage.includes("latar-sirkuit")) {
  const JALUR = {
    a: "M0 118 H62 V206 H128 V292", b: "M0 262 H38 V418 H104 V470 H152", c: "M0 606 H74 V540 H138",
    d: "M0 758 H54 V858 H118 V942", e: "M92 0 V58 H162 V96", // kiri
    f: "M1000 176 H930 V278 H862 V332", g: "M1000 402 H956 V520 H880", h: "M1000 688 H922 V760 H852 V820 H818",
    i: "M912 1000 V930 H850 V880", k: "M1000 878 H962 V818", // kanan
  };
  // Denyut: [jalur, mulai (detik, negatif = sudah berjalan sejak awal), lama satu putaran (detik)]
  const DENYUT = [["a", 0, 8], ["c", -4.6, 11], ["d", -7.4, 13], ["f", -2.2, 11], ["h", -1.3, 8], ["g", -5.4, 13]];
  const garis = (d, kelas, gaya) => `<path class="${kelas}" pathLength="100" d="${d}"${gaya ? ` style="${gaya}"` : ""}/>`;
  let isi = Object.values(JALUR).map((d) => garis(d, "sirkuit-jalur")).join("");
  DENYUT.forEach(([j, mulai, lama]) => {
    const gaya = `animation-delay:${mulai}s;animation-duration:${lama}s`;
    // garis lebar redup (cahaya) + garis tipis terang, berjalan bersama
    isi += garis(JALUR[j], "sirkuit-denyut sirkuit-cahaya", gaya) + garis(JALUR[j], "sirkuit-denyut sirkuit-inti", gaya);
  });
  document.body.insertAdjacentHTML("beforeend",
    `<svg class="latar-sirkuit" aria-hidden="true" focusable="false" viewBox="0 0 1000 1000" preserveAspectRatio="none">${isi}</svg>`);
  const html = document.documentElement;
  html.classList.add("sirkuit-js");
  let jeda = 0;
  window.addEventListener("scroll", () => {
    if (!jeda) html.classList.add("sedang-scroll");
    clearTimeout(jeda);
    jeda = setTimeout(() => {
      jeda = 0;
      html.classList.remove("sedang-scroll");
    }, 200);
  }, { passive: true });
}

// Kilau emas dan cincin tombol versi ringan (15 November 2026; gayanya di tema-premium.css, bagian "Animasi ringan").
// Dulu kilau menggeser gambar latar tombol dan cincin memperbesar bayangan (box-shadow). Keduanya harus digambar
// ulang prosesor setiap frame, terus-menerus, termasuk saat scroll. Sekarang keduanya hanya digeser/diperbesar
// (transform), yang dikerjakan GPU tanpa menggambar ulang. Tampilannya sama.
if (!reduceMotion) {
  // Kilau: wadah tipis di dalam tombol yang memotong pita cahaya, supaya pita bisa digeser tanpa keluar dari tombol.
  document.querySelectorAll(".site-header__cta, :is(.hero, .edu-hero, .about-hero) :is(.btn--wa, .btn--primary), .cta-band .btn--wa")
    .forEach((btn) => {
      const wadah = document.createElement("span");
      wadah.className = "kilau-wadah";
      wadah.setAttribute("aria-hidden", "true");
      btn.append(wadah);
    });
  // Cincin: ukuran tombol (lebar dan tinggi, px) dicatat untuk CSS, supaya cincin mulai tepat di tepi tombol dan
  // melebar sama tebal di keempat sisinya. Diukur ulang otomatis bila ukuran tombol berubah (font dimuat, layar diputar).
  const bercincin = document.querySelectorAll(".hero__actions > .btn:first-child, .calc-promo .btn--light, .wa-float");
  const catatUkuran = (el) => {
    el.style.setProperty("--lebar", el.offsetWidth);
    el.style.setProperty("--tinggi", el.offsetHeight);
  };
  if ("ResizeObserver" in window) {
    const pengamat = new ResizeObserver((entries) => entries.forEach((e) => catatUkuran(e.target)));
    bercincin.forEach((el) => pengamat.observe(el));
  } else {
    bercincin.forEach(catatUkuran);
  }
  // Denyut ikon di label hero (.badge): ikonnya SVG, dan Chrome tidak bisa menjalankan animasi elemen SVG di GPU,
  // jadi ikon dibungkus span dan span itu yang berdenyut (tema-asuransi.css, .badge__ikon).
  document.querySelectorAll(".badge > .icon").forEach((ikon) => {
    const bungkus = document.createElement("span");
    bungkus.className = "badge__ikon";
    ikon.replaceWith(bungkus);
    bungkus.append(ikon);
  });
}

// Tombol dan kartu lebih interaktif (8 November 2026; gayanya di tema-premium.css, bagian "Tombol lebih interaktif").
// Semua dilewati bila pengunjung memilih "kurangi gerakan".
if (!reduceMotion) {
  // Riak cahaya saat tombol diklik atau disentuh (laptop dan HP): lingkaran mengembang dari titik sentuh,
  // di dalam wadah yang memotongnya sesuai bentuk tombol, lalu dihapus sendiri.
  document.addEventListener("pointerdown", (e) => {
    const btn = e.target.closest && e.target.closest(".btn, .wa-float");
    if (!btn || e.button > 0) return;
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2.2;
    let wadah = btn.querySelector(":scope > .riak-wadah");
    if (!wadah) {
      wadah = document.createElement("span");
      wadah.className = "riak-wadah";
      wadah.setAttribute("aria-hidden", "true");
      btn.append(wadah);
    }
    const riak = document.createElement("span");
    riak.className = "riak";
    riak.style.width = riak.style.height = size + "px";
    riak.style.left = (e.clientX - r.left - size / 2).toFixed(0) + "px";
    riak.style.top = (e.clientY - r.top - size / 2).toFixed(0) + "px";
    wadah.append(riak);
    setTimeout(() => riak.remove(), 700);
  });

  // Hanya untuk mouse (laptop): tombol tertarik sedikit ke arah kursor seperti magnet, dan cahaya lembut
  // mengikuti kursor di atas kartu.
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".btn").forEach((btn) => {
      let pusat = null; // titik tengah tombol sebelum bergeser, supaya gerakannya tidak saling memantul
      btn.addEventListener("pointerenter", () => {
        const r = btn.getBoundingClientRect();
        pusat = { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width / 2, h: r.height / 2 };
        btn.classList.add("is-magnet");
      });
      btn.addEventListener("pointermove", (e) => {
        if (!pusat) return;
        const x = Math.max(-1, Math.min(1, (e.clientX - pusat.x) / pusat.w));
        const y = Math.max(-1, Math.min(1, (e.clientY - pusat.y) / pusat.h));
        btn.style.setProperty("--mx", (x * 6).toFixed(1) + "px");
        btn.style.setProperty("--my", (y * 4).toFixed(1) + "px");
      });
      btn.addEventListener("pointerleave", () => {
        pusat = null;
        btn.classList.remove("is-magnet");
        btn.style.removeProperty("--mx");
        btn.style.removeProperty("--my");
      });
    });

    let sorotFrame = 0;
    let sorotEvent = null;
    document.addEventListener("pointermove", (e) => {
      sorotEvent = e;
      if (sorotFrame) return;
      sorotFrame = requestAnimationFrame(() => {
        sorotFrame = 0;
        const card = sorotEvent.target.closest && sorotEvent.target.closest(".card, .why__item");
        if (!card) return;
        const r = card.getBoundingClientRect();
        card.style.setProperty("--sx", (sorotEvent.clientX - r.left).toFixed(0) + "px");
        card.style.setProperty("--sy", (sorotEvent.clientY - r.top).toFixed(0) + "px");
      });
    }, { passive: true });
  }
}
