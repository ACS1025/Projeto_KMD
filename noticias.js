let EVENTS = [];

async function loadEvents(){
  try {
    const res = await fetch('data/events.json');
    EVENTS = await res.json();
      ();
  } catch (e) {
    console.error('Erro ao carregar events.json', e);
  }
}

loadEvents();

/* =========================
   UTILITÁRIOS
========================= */
function escapeHtml(s=''){
  return String(s).replace(/[&<>"']/g, m =>
    ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])
  );
}

function stripTags(html=''){
  return String(html).replace(/<[^>]*>/g,'');
}

/* =========================
   LISTAGEM
========================= */
const grid = document.getElementById('newsGrid');

function renderList(){
  if (!grid) return;

  grid.innerHTML = EVENTS.map((n, idx) => `
    <article class="noticia-card">
      <img class="noticia-thumb" src="${n.imagem}" alt="">
      <div>
        <div class="noticia-data">
          <span>${escapeHtml(n.local)}</span> • <span>${escapeHtml(n.data)}</span>
        </div>
        <h3 class="noticia-titulo">${escapeHtml(n.titulo)}</h3>
        <p class="noticia-excerpt">
          ${escapeHtml(stripTags(n.conteudo.join(' '))).slice(0,190)}...
        </p>
        <div class="card-actions">
          <button class="btn-ler" data-index="${idx}">Ler mais</button>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.btn-ler').forEach(b =>
    b.addEventListener('click', e =>
      abrirModal(Number(e.currentTarget.dataset.index))
    )
  );
}

/* =========================
   MODAL
========================= */
const overlay = document.getElementById('modalOverlay');
const modalThumb = document.getElementById('modalThumb');
const modalMeta = document.getElementById('modalMeta');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalContent = document.getElementById('modalContent');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.getElementById('modalClose');
const waShare = document.getElementById('waShare');
const liShare = document.getElementById('liShare');

let current = -1;

function abrirModal(index){
  if (!EVENTS[index]) return;

  const n = EVENTS[index];
  current = index;

  modalThumb.src = n.imagem;
  modalMeta.textContent = `${n.local} • ${n.data}`;
  modalTitle.textContent = n.titulo;
  modalSubtitle.textContent = n.subtitulo;
  modalContent.innerHTML = n.conteudo.map(p => `<p>${p}</p>`).join('');

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === EVENTS.length - 1;

  const shareUrl = location.origin + location.pathname + `#EVENTS-${n.id}`;
  waShare.href = `https://wa.me/?text=${encodeURIComponent(n.titulo + " — " + shareUrl)}`;
  liShare.href = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}`;

  overlay.classList.add('show');
  document.documentElement.style.overflow = 'hidden';
  history.replaceState(null,'',`#EVENTS-${n.id}`);
}

function fecharModal(){
  overlay.classList.remove('show');
  document.documentElement.style.overflow = '';
  history.replaceState(null,'',location.pathname);
}

prevBtn.addEventListener('click',()=> abrirModal(current-1));
nextBtn.addEventListener('click',()=> abrirModal(current+1));
closeBtn.addEventListener('click', fecharModal);

overlay.addEventListener('click', e => {
  if(e.target === overlay) fecharModal();
});

/* =========================
   TECLADO
========================= */
document.addEventListener('keydown', (e) => {
  if(!overlay.classList.contains('show')) return;

  if(e.key === 'Escape') fecharModal();
  if(e.key === 'ArrowLeft' && current > 0) abrirModal(current - 1);
  if(e.key === 'ArrowRight' && current < EVENTS.length - 1) abrirModal(current + 1);
});

/* =========================
   DEEP LINK
========================= */
window.addEventListener('load', () => {
  const h = location.hash.replace('#EVENTS-', '');
  if(!h) return;

  const idx = EVENTS.findIndex(n => n.id === h);
  if(idx >= 0){
    setTimeout(()=> abrirModal(idx), 150);
  }
});
