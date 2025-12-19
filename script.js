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
   MENU MOBILE
================================================== */
const mobileNav = document.getElementById("mobileNav");
const menuIcon = document.querySelector(".mobile-menu-icon");
const mobileOverlay = document.getElementById("mobileOverlay");

function toggleMenu() {
  mobileNav?.classList.toggle("open");
  menuIcon?.classList.toggle("active");
  mobileOverlay?.classList.toggle("active");
}

menuIcon?.addEventListener("click", toggleMenu);
mobileOverlay?.addEventListener("click", toggleMenu);

document.querySelectorAll("#mobileNav a").forEach(link => {
  link.addEventListener("click", toggleMenu);
});

/* ==================================================
   MODAL GLOBAL — PADRÃO DO SITE INTEIRO
================================================== */
const modal = document.getElementById("cardModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModalBtn = modal?.querySelector(".closeModal");

let currentIndex = -1;
let currentGroup = [];

/* ---------- ABRIR MODAL ---------- */
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

/* ---------- FECHAR MODAL ---------- */
function closeModal() {
  modal.classList.remove("show");
  document.documentElement.style.overflow = "";
}

/* ---------- TRIGGERS (CARDS) ---------- */
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

/* ---------- BOTÃO FECHAR ---------- */
closeModalBtn?.addEventListener("click", closeModal);

/* ---------- FECHAR CLICANDO FORA ---------- */
modal?.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

/* ---------- TECLADO ---------- */
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

// ============================================================
// Chat flutuante Komando GR
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('kmdChatToggle');
  const chat = document.getElementById('kmdChat');
  const close = document.getElementById('kmdChatClose');

  // Proteção: só executa se os elementos existirem
  if (!toggle || !chat || !close) return;

  toggle.addEventListener('click', () => {
    chat.classList.toggle('show');
    chat.setAttribute('aria-hidden', !chat.classList.contains('show'));
  });

  close.addEventListener('click', () => {
    chat.classList.remove('show');
    chat.setAttribute('aria-hidden', 'true');
  });
});