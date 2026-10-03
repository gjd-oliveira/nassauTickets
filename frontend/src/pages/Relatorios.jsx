import { useState } from 'react';
import Login from '../components/Login.jsx';
import { relatorio, tipos } from '../services/ticketService.js';

const hora = (iso) => (iso ? new Date(iso).toLocaleString('pt-BR') : '');

export default function Relatorios({ user, setUser }) {
  const [modo, setModo] = useState('dia');
  const [data, setData] = useState(new Date().toISOString().slice(0, 10));
  if (!user) return <Login titulo="Acesso do gestor" onLogin={setUser} />;
  if (!user.gestor) return <p role="alert" className="erro">Apenas o perfil gestor acessa os relatórios.</p>;
  const r = relatorio(modo === 'dia' ? data : data.slice(0, 7));
  return (
    <section>
      <h1>Relatório {modo === 'dia' ? 'diário' : 'mensal'}</h1>
      <div className="acoes">
        <label className="inline">Período
          <select value={modo} onChange={(e) => setModo(e.target.value)}><option value="dia">Diário</option><option value="mes">Mensal</option></select>
        </label>
        <label className="inline">Data<input type="date" value={data} onChange={(e) => setData(e.target.value)} /></label>
        <button onClick={() => window.print()}>Imprimir</button>
      </div>
      <table>
        <caption>Resumo por tipo de senha</caption>
        <thead><tr><th>Tipo</th><th>Emitidas</th><th>Atendidas</th><th>Tempo médio (min)</th></tr></thead>
        <tbody>
          {Object.keys(tipos).map((k) => <tr key={k}><td>{k} – {tipos[k]}</td><td>{r.emitidasPor[k]}</td><td>{r.atendidasPor[k]}</td><td>{r.tm[k]}</td></tr>)}
          <tr><th>Total</th><th>{r.emitidas}</th><th>{r.atendidas}</th><th></th></tr>
        </tbody>
      </table>
      <div className="rolagem">
        <table>
          <caption>Detalhamento e auditoria</caption>
          <thead><tr><th>Senha</th><th>Tipo</th><th>Emissão</th><th>1ª chamada</th><th>2ª chamada</th><th>Início</th><th>Fim</th><th>Guichê</th><th>Atendente</th><th>Estado</th></tr></thead>
          <tbody>
            {r.detalhe.map((t) => (
              <tr key={t.numero}><td>{t.numero}</td><td>{t.tipo}</td><td>{hora(t.emissao)}</td><td>{hora(t.chamadas[0])}</td><td>{hora(t.chamadas[1])}</td>
                <td>{hora(t.inicio)}</td><td>{hora(t.fim)}</td><td>{t.guiche ?? ''}</td><td>{t.atendente ?? ''}</td><td>{t.estado}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
