// Simula o backend em localStorage para a aplicação funcionar sem API.
const KEY = 'nassauTickets:v1';
export const tipos = { SP: 'Prioritária', SG: 'Geral', SE: 'Exames' };

const load = () => JSON.parse(localStorage.getItem(KEY) || '{"tickets":[],"last":null,"day":""}');
const save = (db) => { localStorage.setItem(KEY, JSON.stringify(db)); return db; };
const hoje = () => new Date().toISOString().slice(0, 10);

function fresh() {
  const db = load();
  if (db.day !== hoje()) {
    db.tickets.forEach((t) => { if (t.estado === 'AGUARDANDO') t.estado = 'NÃO_COMPARECEU'; });
    db.day = hoje();
    save(db);
  }
  return db;
}

export function expedienteAberto() {
  if (import.meta.env.VITE_IGNORE_HOURS === 'true') return true;
  const h = new Date().getHours();
  return h >= 7 && h < 17;
}

export function emitir(tipo) {
  if (!expedienteAberto()) throw new Error('Fora do expediente (7h às 17h).');
  const db = fresh();
  const d = new Date();
  const ymd = d.toISOString().slice(2, 10).replaceAll('-', '');
  const sq = db.tickets.filter((t) => t.tipo === tipo && t.dia === hoje()).length + 1;
  const t = { numero: `${ymd}-${tipo}${String(sq).padStart(3, '0')}`, tipo, dia: hoje(), estado: 'AGUARDANDO', emissao: d.toISOString(), chamadas: [], guiche: null, atendente: null };
  db.tickets.push(t);
  save(db);
  return t;
}

function proximoTipo(db) {
  const tem = (x) => db.tickets.some((t) => t.tipo === x && t.estado === 'AGUARDANDO');
  const ordem = db.last === 'SP' ? ['SE', 'SG', 'SP'] : ['SP', 'SE', 'SG'];
  return ordem.find(tem);
}

export function chamarProxima(atendente, guiche) {
  const db = fresh();
  const tipo = proximoTipo(db);
  if (!tipo) return null;
  const t = db.tickets.find((x) => x.tipo === tipo && x.estado === 'AGUARDANDO');
  t.estado = 'CHAMADA'; t.guiche = guiche; t.atendente = atendente; t.chamadas.push(new Date().toISOString());
  db.last = tipo;
  save(db);
  return t;
}

const mut = (numero, fn) => { const db = fresh(); const t = db.tickets.find((x) => x.numero === numero); fn(t); save(db); return t; };

export const chamarNovamente = (n) => mut(n, (t) => {
  if (t.chamadas.length >= 2) { t.estado = 'NÃO_COMPARECEU'; return; }
  t.estado = 'CHAMADA_NOVAMENTE'; t.chamadas.push(new Date().toISOString());
});
export const naoCompareceu = (n) => mut(n, (t) => { t.estado = 'NÃO_COMPARECEU'; });
export const iniciar = (n) => mut(n, (t) => { t.estado = 'EM_ATENDIMENTO'; t.inicio = new Date().toISOString(); });
export const finalizar = (n) => mut(n, (t) => { t.estado = 'ATENDIDA'; t.fim = new Date().toISOString(); });

export const listar = () => fresh().tickets;
export const fila = () => listar().filter((t) => t.estado === 'AGUARDANDO');
export const ultimasChamadas = () =>
  listar().filter((t) => t.chamadas.length).sort((a, b) => b.chamadas.at(-1).localeCompare(a.chamadas.at(-1))).slice(0, 5);
export const emAtendimento = (atendente) =>
  listar().find((t) => t.atendente === atendente && ['CHAMADA', 'CHAMADA_NOVAMENTE', 'EM_ATENDIMENTO'].includes(t.estado));

export function relatorio(prefixo) {
  const ts = listar().filter((t) => t.emissao.startsWith(prefixo));
  const ate = ts.filter((t) => t.estado === 'ATENDIDA');
  const por = (arr) => Object.fromEntries(Object.keys(tipos).map((k) => [k, arr.filter((t) => t.tipo === k).length]));
  const tm = Object.fromEntries(Object.keys(tipos).map((k) => {
    const a = ate.filter((t) => t.tipo === k);
    return [k, a.length ? (a.reduce((s, t) => s + (new Date(t.fim) - new Date(t.inicio)) / 60000, 0) / a.length).toFixed(1) : '-'];
  }));
  return { emitidas: ts.length, atendidas: ate.length, emitidasPor: por(ts), atendidasPor: por(ate), tm, detalhe: ts };
}
