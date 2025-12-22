const CATEGORIA_LABEL = {
  SEGURANCA: 'Segurança Rodoviária',
  OPERACIONAL: 'Operação Logística',
  LOGISTICA: 'Fluxo Logístico',
  CLIMA: 'Condições Climáticas'
};

const TIPO_LABEL = {
  ROUBO_CARGA: 'Risco de Roubo de Carga',
  OBRAS: 'Obras na Rodovia',
  BLOQUEIO: 'Bloqueio de Via',
  ACIDENTE: 'Acidente Rodoviário',
  FLUXO: 'Fluxo Normalizado'
};
const novoEvento = {
  ...processarEvento(base),
  evento_id: `AUTO-${agora.getTime()}-${autoCounter++}`,
  isNovo: true
};

function gerarTitulo(evento) {
  const rodovia = evento.localizacao?.rodovia || 'rodovia monitorada';

  if (evento.criticidade === 'ALTA') {
    return `⚠️ Alerta crítico na ${rodovia}`;
  }

  if (evento.criticidade === 'MEDIA') {
    return `Atenção para condições na ${rodovia}`;
  }

  return `Atualização operacional na ${rodovia}`;
}
function gerarSubtitulo(evento) {
  const tipo = TIPO_LABEL[evento.tipo] || 'Evento operacional';
  const categoria = CATEGORIA_LABEL[evento.categoria] || '';

  return `${tipo}${categoria ? ' — ' + categoria : ''}`;
}
function gerarConteudo(evento) {
  const rodovia = evento.localizacao?.rodovia || 'trecho monitorado';
  const ufs = (evento.localizacao?.uf || []).join(', ');
  const score = evento.score_risco ?? 0;

  const blocos = [];

  blocos.push(
    `Foi identificado um evento operacional na ${rodovia}${ufs ? `, envolvendo o(s) estado(s) ${ufs}` : ''}.`
  );

  blocos.push(
    `O nível de criticidade foi classificado como ${evento.criticidade}, com score de risco estimado em ${score} pontos.`
  );

  if (evento.metadata?.horario_critico) {
    blocos.push(
      `O período considerado mais sensível para este evento é o horário ${evento.metadata.horario_critico.toLowerCase()}.`
    );
  }

  if (evento.metadata?.recorrente) {
    blocos.push(
      `Trata-se de uma ocorrência recorrente, exigindo monitoramento contínuo das operações.`
    );
  }

  return blocos;
}
function gerarAcoes(evento) {
  const acoes = [];

  if (evento.criticidade === 'ALTA') {
    acoes.push('Ativar monitoramento ativo');
    acoes.push('Reavaliar janelas de circulação');
  }

  if (evento.tipo === 'ROUBO_CARGA') {
    acoes.push('Reforçar protocolos de escolta e rastreamento');
  }

  if (!acoes.length) {
    acoes.push('Manter operação sob observação');
  }

  return acoes;
}
function processarEvento(eventoBase) {
  return {
    ...eventoBase,

    timestamp: new Date().toISOString(),

    titulo: gerarTitulo(eventoBase),
    subtitulo: gerarSubtitulo(eventoBase),
    conteudo: gerarConteudo(eventoBase),
    acoes: gerarAcoes(eventoBase)
  };
}


