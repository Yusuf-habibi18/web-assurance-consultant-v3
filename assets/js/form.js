/* Formulir konsultasi: validasi input, lalu membuka WhatsApp dengan pesan terisi.
   Data TIDAK dikirim atau disimpan di server. Butuh main.js (buildWaUrl) dimuat lebih dulu. */

const RULES = {
  nama: (v) => {
    if (!v) return "Please enter your name.";
    if (v.length < 2) return "Your name must be at least 2 characters.";
    return "";
  },
  whatsapp: (v) => {
    if (!v) return "Please enter your WhatsApp number.";
    const digits = v.replace(/[\s.-]/g, "");
    if (!/^(\+62|62|0)8\d{7,11}$/.test(digits)) return "Please use a valid Indonesian number, e.g. 0812 3456 7890.";
    return "";
  },
  keperluan: (v) => (v ? "" : "Please choose a topic."),
  pesan: (v) => (v.length > 1000 ? "Your message can be up to 1,000 characters." : ""),
};

function setError(field, message) {
  const error = document.getElementById(field.id + "-error");
  field.setAttribute("aria-invalid", message ? "true" : "false");
  if (error) {
    error.textContent = message;
    error.hidden = !message;
  }
}

function validateField(field) {
  const rule = RULES[field.name];
  if (!rule) return true;
  const message = rule(field.value.trim());
  setError(field, message);
  return !message;
}

document.querySelectorAll("[data-wa-form]").forEach((form) => {
  const status = form.querySelector(".form-status");
  const fields = Array.from(form.querySelectorAll("input, select, textarea")).filter((f) => RULES[f.name]);

  // Hapus pesan error begitu pengguna memperbaiki isian.
  fields.forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    status.hidden = true;

    const invalid = fields.filter((field) => !validateField(field));
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    const data = new FormData(form);
    const keperluan = form.querySelector("[name=keperluan]");
    const lines = [
      "Hello, I’d like to arrange a consultation.",
      "",
      "Name: " + data.get("nama").trim(),
      "WhatsApp number: " + data.get("whatsapp").trim(),
      "Topic: " + keperluan.options[keperluan.selectedIndex].text,
    ];
    const pesan = (data.get("pesan") || "").trim();
    if (pesan) lines.push("Message: " + pesan);

    const url = buildWaUrl(lines.join("\n"));
    window.open(url, "_blank", "noopener");

    status.innerHTML = "";
    const text = document.createElement("p");
    text.innerHTML = "<strong>Thank you.</strong> WhatsApp has opened in a new tab with your message. Press send in WhatsApp to finish.";
    const fallback = document.createElement("a");
    fallback.href = url;
    fallback.target = "_blank";
    fallback.rel = "noopener noreferrer";
    fallback.textContent = "WhatsApp didn’t open? Click here.";
    status.append(text, fallback);
    status.hidden = false;
    form.reset();
  });
});
