/* Skrip umum: menu mobile, link WhatsApp, tahun footer, titik slider, animasi scroll,
   dan penanda kategori di halaman Solusi.
   Data kontak diubah di SITE di bawah, bukan di tiap halaman. */

const SITE = {
  // Nomor WhatsApp klien (dipasang 9 November 2026; ditulis 0877-7771-0002).
  // Format internasional, tanpa + atau 0 di depan.
  whatsapp: "6287777710002",
  waMessage: "Hello, I’d like a free consultation about insurance protection.",
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
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
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
const header = document.querySelector(".site-header");
if (header) {
  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    // Garis tipis di tepi atas header memanjang sesuai posisi scroll
    // (biru di tema-asuransi.css, emas di tema-gabungan.css dan tema.css).
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.style.setProperty("--scroll", max > 0 ? Math.min(1, window.scrollY / max).toFixed(3) : "0");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
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

if (!reduceMotion && "IntersectionObserver" in window) {
  const targets = document.querySelectorAll(
    ".section-head, .card, .profile, .cta-band, .featured, .ethics, .accordion__item, " +
    ".pyramid__layer, .callout, .claim-band, .channel, .consult-steps li, .consult-alt, .prose > *, " +
    ".why__item, .steps__item, .approach__item, .calc-promo, .timeline li, .journey__photo, .sol__img, .site-footer__grid > *"
  );

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
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const parent = entry.target.parentElement;
      // Di slider mobile, kartu yang masih tersembunyi di samping ikut dimunculkan.
      if (parent.scrollWidth > parent.clientWidth) {
        parent.querySelectorAll(":scope > .reveal:not(.is-visible)").forEach(show);
      } else {
        show(entry.target);
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
