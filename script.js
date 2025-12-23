/* ==================================================
   FORMULÁRIO DE CONTATO
================================================== */
const formContato = document.querySelector("#formContato");

if (formContato) {
  formContato.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato.");
    formContato.reset();
  });
}

/* ==================================================
   MENU MOBILE (HAMBÚRGUER) — DEFINITIVO
================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".mobile-menu-icon");
  const mobileNav = document.getElementById("mobileNav");
  const overlay = document.getElementById("mobileOverlay");

  if (!menuBtn || !mobileNav || !overlay) return;

  function abrirMenu() {
    mobileNav.classList.add("open");
    overlay.classList.add("active");

    menuBtn.setAttribute("aria-expanded", "true");
    mobileNav.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
  }

  function fecharMenu() {
    mobileNav.classList.remove("open");
    overlay.classList.remove("active");

    menuBtn.setAttribute("aria-expanded", "false");
    mobileNav.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  function toggleMenu() {
    mobileNav.classList.contains("open") ? fecharMenu() : abrirMenu();
  }

  menuBtn.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", fecharMenu);

  mobileNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", fecharMenu);
  });
});

/* ==================================================
   MODAL GLOBAL — PADRÃO DO SITE
================================================== */
const modal = document.getElementById("cardModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModalBtn = modal?.querySelector(".closeModal");

let currentIndex = -1;
let currentGroup = [];

function openModal(index) {
  const card = currentGroup[index];
  if (!card) return;

  currentIndex = index;

  const title = card.dataset.title || card.querySelector("h3")?.innerText;
  const text = card.dataset.full;

  if (!title || !text) return;

  modalTitle.textContent = title;

  modalText.innerHTML = text
    .trim()
    .split("\n")
    .filter(p => p.trim())
    .map(p => `<p>${p.trim()}</p>`)
    .join("");

  modal.classList.add("show");
  document.documentElement.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("show");
  document.documentElement.style.overflow = "";
}

document.querySelectorAll(".modal-trigger, .btn-saiba-mais").forEach(trigger => {
  trigger.addEventListener("click", () => {
    const card = trigger.closest(".card");
    if (!card) return;

    const section = card.closest(".secao");
    if (!section) return;

    currentGroup = Array.from(section.querySelectorAll(".card"));
    openModal(currentGroup.indexOf(card));
  });
});

closeModalBtn?.addEventListener("click", closeModal);

modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal?.classList.contains("show")) return;

  if (e.key === "Escape") closeModal();

  if (e.key === "ArrowRight" && currentIndex < currentGroup.length - 1) {
    openModal(currentIndex + 1);
  }

  if (e.key === "ArrowLeft" && currentIndex > 0) {
    openModal(currentIndex - 1);
  }
});

/* ==================================================
   CENTRAL DE ATENDIMENTO
================================================== */
const btnAtendimento = document.getElementById("btnAtendimento");
const modalAtendimento = document.getElementById("modalAtendimento");
const fecharAtendimento = document.getElementById("fecharAtendimento");

btnAtendimento?.addEventListener("click", () => {
  modalAtendimento.classList.add("show");
  modalAtendimento.setAttribute("aria-hidden", "false");
});

fecharAtendimento?.addEventListener("click", () => {
  modalAtendimento.classList.remove("show");
  modalAtendimento.setAttribute("aria-hidden", "true");
});

modalAtendimento?.addEventListener("click", (e) => {
  if (e.target === modalAtendimento) {
    modalAtendimento.classList.remove("show");
    modalAtendimento.setAttribute("aria-hidden", "true");
  }
});

/* ==================================================
   CHAT FLUTUANTE — KOMANDO GR
================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("kmdChatToggle");
  const chat = document.getElementById("kmdChat");
  const close = document.getElementById("kmdChatClose");

  if (!toggle || !chat || !close) return;

  toggle.addEventListener("click", () => {
    chat.classList.toggle("show");
    chat.setAttribute("aria-hidden", !chat.classList.contains("show"));
  });

  close.addEventListener("click", () => {
    chat.classList.remove("show");
    chat.setAttribute("aria-hidden", "true");
  });
});
