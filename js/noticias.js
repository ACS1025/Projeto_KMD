/* ==================================================
   CONFIGURAÇÃO
================================================== */
const SIMULACAO_ATIVA = true;
const INTERVALO_SIMULACAO = 8000; // 8s
const MAX_EVENTOS_ATIVOS = 6;

/* ==================================================
   ESTADO
================================================== */
let baseEventos = [];
let eventosAtivos = [];
let contador = 1;

/* ==================================================
   UTILITÁRIOS
================================================== */
const agoraISO = () => new Date().toISOString();

function gerarId() {
  return `SIM-${Date.now()}-${contador++}`;
}

function nivelScore(score) {
  if (score >= 70) return 'ALTO';
  if (score >= 40) return 'MEDIO';
  return 'BAIXO';
}

/* ==================================================
   GERADOR DE EVENTO
================================================== */
function gerarEvento(base) {
  const variacao = Math.floor(Math.random() * 12) - 6;
  const score = Math.min(100, Math.max(10, base.severidade.score + variacao));

  return {
    id: gerarId(),
    tipo: base.tipo,
    subtipo: base.subtipo,

    severidade: {
      nivel: nivelScore(score),
      score
    },

    abrangencia: base.abrangencia,
    contexto: base.contexto,
    fonte: base.fonte,
    recomendacoes: base.recomendacoes,

    timestamps: {
      detectado_em: agoraISO()
    }
  };
}

/* ==================================================
   SIMULAÇÃO
================================================== */
function simularEvento() {
  if (!SIMULACAO_ATIVA) return;
  if (!baseEventos.length) return;
  if (eventosAtivos.length >= MAX_EVENTOS_ATIVOS) return;

  const base = baseEventos[Math.floor(Math.random() * baseEventos.length)];
  const evento = gerarEvento(base);

  eventosAtivos.unshift(evento);
  render();
}

/* ==================================================
   RENDER
================================================== */
function render() {
  const grid = document.getElementById('newsGrid');
  if (!grid) return;

  grid.innerHTML = eventosAtivos.map(ev => `
    <article class="noticia-card ${ev.severidade.nivel.toLowerCase()}">

      <div class="badge-criticidade criticidade-${ev.severidade.nivel.toLowerCase()}">
        ${ev.severidade.nivel}
      </div>

      <h3 class="noticia-titulo">
        ${ev.tipo.replace('_', ' ')} — ${ev.subtipo.replace('_', ' ')}
      </h3>

      <p class="noticia-excerpt">
        Região: <strong>${ev.abrangencia.regiao}</strong><br>
        UFs: ${ev.abrangencia.ufs.join(', ')}<br>
        Score de risco: <strong>${ev.severidade.score}</strong>
      </p>

      <div class="card-actions">
        <small>Fonte: ${ev.fonte.sigla}</small>
      </div>
    </article>
  `).join('');
}

/* ==================================================
   INIT
================================================== */
async function init() {
  try {
    const res = await fetch('data/events.json');
    baseEventos = await res.json();
    console.log('Base carregada:', baseEventos);

    simularEvento();
    setInterval(simularEvento, INTERVALO_SIMULACAO);

  } catch (e) {
    console.error('Erro ao carregar events.json', e);
  }
}

init();
