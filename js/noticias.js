/* =========================
   IMAGENS
========================= */
const IMAGENS_POR_TIPO = {
  ROUBO_CARGA: 'img/alertas/roubo-carga.jpg',
  BLOQUEIO: 'img/alertas/bloqueio-rodovia.jpg',
  ACIDENTE: 'img/alertas/acidente.jpg',
  CLIMA: 'img/alertas/clima.jpg',
  OPERACIONAL: 'img/alertas/operacao.jpg'
};

const IMAGEM_PADRAO = 'img/alertas/padrao.jpg';
/* =========================
   UTILITÁRIOS
========================= */
function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, s => (
    { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[s]
  ));
}

function nivelScore(score = 0){
  if (score >= 70) return 'alto';
  if (score >= 40) return 'medio';
  return 'baixo';
}

function getImagemPorTipo(noticia) {
  if (!noticia || !noticia.tipo) return IMAGEM_PADRAO;

  const tipo = noticia.tipo.toUpperCase();

  return IMAGENS_POR_TIPO[tipo] || IMAGEM_PADRAO;
}


/* =========================
   ESTADO GLOBAL
========================= */
let EVENTS = [];
let listaAtual = [];
let current = -1;

/* =========================
   LOAD
========================= */
async function loadEvents(){
  try {
    const res = await fetch('data/events.json?ts=' + Date.now());
    EVENTS = await res.json();
    renderList();
  } catch (err) {
    console.error('Erro ao carregar events.json', err);
  }
}

/* =========================
   LISTAGEM
========================= */
const grid = document.getElementById('newsGrid');

function renderList(){
  if (!grid) return;

  listaAtual = Array.isArray(EVENTS) ? EVENTS : [];

  if (!listaAtual.length){
    grid.innerHTML = '<p>Nenhuma notícia disponível.</p>';
    return;
  }

  grid.innerHTML = listaAtual.map((n, idx) => {
    const criticidade = (n?.criticidade || 'BAIXA').toLowerCase();
    const data = n?.timestamp
      ? new Date(n.timestamp).toLocaleDateString('pt-BR')
      : '';

    const score = Number(n?.score_risco || 0);
    const scoreNivel = nivelScore(score);

    return `
      <article class="noticia-card ${criticidade}">
        <div class="badge-criticidade criticidade-${criticidade}">
          ${escapeHtml(n?.criticidade || 'BAIXA')}
        </div>

        <img 
          class="noticia-thumb"
          src="${n?.imagem || 'img/default-news.jpg'}"
          onerror="this.src='img/default-news.jpg'"
          alt=""
        >

        <div class="noticia-data">${data}</div>

        <h3 class="noticia-titulo">
          ${escapeHtml(n?.titulo || '')}
        </h3>

        <p class="noticia-excerpt">
          ${escapeHtml((n?.conteudo || []).join(' ')).slice(0,180)}...
        </p>

        <div class="score-risco">
          <span>Risco</span>
          <div class="score-bar">
            <div class="score-fill score-${scoreNivel}" style="width:${score}%"></div>
          </div>
          <span class="score-num">${score}</span>
        </div>

        <div class="card-actions">
          <button class="btn-ler" data-index="${idx}">Ler mais</button>
        </div>
      </article>
    `;
  }).join('');

  document.querySelectorAll('.btn-ler').forEach(btn => {
    btn.addEventListener('click', e => {
      abrirModal(Number(e.currentTarget.dataset.index));
    });
  });
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

function abrirModal(index){
  const n = listaAtual[index];
  if (!n) return;

  current = index;

  modalThumb.src = n?.imagem || 'img/default-news.jpg';
  modalMeta.textContent = new Date(n.timestamp).toLocaleString('pt-BR');
  modalTitle.textContent = n?.titulo || '';
  modalSubtitle.textContent = n?.subtitulo || '';
  modalContent.innerHTML = (n?.conteudo || []).map(p => `<p>${p}</p>`).join('');

  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === listaAtual.length - 1;

  overlay.classList.add('show');
  document.documentElement.style.overflow = 'hidden';
}

function fecharModal(){
  overlay.classList.remove('show');
  document.documentElement.style.overflow = '';
}

prevBtn.onclick = () => abrirModal(current - 1);
nextBtn.onclick = () => abrirModal(current + 1);
closeBtn.onclick = fecharModal;

overlay.addEventListener('click', e => {
  if (e.target === overlay) fecharModal();
});

/* =========================
   INIT
========================= */
loadEvents();
