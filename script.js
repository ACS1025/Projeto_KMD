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
   MENU MOBILE (HAMBÚRGUER) — CORRIGIDO
================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // Ajustado para o ID correto do seu HTML
  const menuBtn = document.getElementById("mobileMenuBtn"); 
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
   CHAT FLUTUANTE — CENTRAL DE ATENDIMENTO (Consolidado)
================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("kmdChatToggle"); // O botão redondo azul
  const chat = document.getElementById("kmdChat");         // A janela do chat
  const close = document.getElementById("kmdChatClose");   // O 'x' de fechar

  if (!toggle || !chat || !close) return;

  // Função para abrir/fechar
  toggle.addEventListener("click", () => {
    chat.classList.toggle("show");
    const isOpen = chat.classList.contains("show");
    chat.setAttribute("aria-hidden", !isOpen);
  });

  // Função para fechar no botão 'X'
  close.addEventListener("click", () => {
    chat.classList.remove("show");
    chat.setAttribute("aria-hidden", "true");
  });

  // Fechar ao clicar fora do chat (opcional, melhora a experiência)
  document.addEventListener("click", (e) => {
    if (!chat.contains(e.target) && !toggle.contains(e.target)) {
      chat.classList.remove("show");
    }
  });
});