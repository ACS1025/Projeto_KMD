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

/** Abre e fecha menu mobile */
function toggleMenu() {
  mobileNav?.classList.toggle("open");
  menuIcon?.classList.toggle("active");
  mobileOverlay?.classList.toggle("active");
}

/** Fecha menu quando clicar no overlay */
mobileOverlay?.addEventListener("click", toggleMenu);

/** Fecha menu quando clicar em algum link do menu */
document.querySelectorAll("#mobileNav a").forEach(link => {
  link.addEventListener("click", toggleMenu);
});

/** Evento do botão do menu mobile (hambúrguer) */
menuIcon?.addEventListener("click", toggleMenu);
