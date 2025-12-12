document.querySelector("#formContato").addEventListener("submit", function(e){
  e.preventDefault();
  alert("Mensagem enviada com sucesso! Em breve nossa equipe entrará em contato.");
});

function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  const icon = document.querySelector('.mobile-menu-icon');

  nav.classList.toggle('open');
  icon.classList.toggle('active');
}

function toggleMenu() {
  const nav = document.getElementById('mobileNav');
  const icon = document.querySelector('.mobile-menu-icon');
  const overlay = document.getElementById('mobileOverlay');

  nav.classList.toggle('open');
  icon.classList.toggle('active');
  overlay.classList.toggle('active');
}
