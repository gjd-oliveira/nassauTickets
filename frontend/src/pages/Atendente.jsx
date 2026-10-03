import { useEffect, useState } from 'react';
import Login from '../components/Login.jsx';
import * as svc from '../services/ticketService.js';

const NOME_TIPO = { SP: 'prioritária', SG: 'geral', SE: 'exames' };

function falar(t, ultima) {
  if (!('speechSynthesis' in window)) return;
  const txt = `${ultima ? 'Última chamada. ' : ''}Senha ${NOME_TIPO[t.tipo]}, número ${Number(t.numero.slice(-3))}, guichê ${t.guiche}.`;
  const u = new SpeechSynthesisUtterance(txt);
  u.lang = 'pt-BR';
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

export default function Atendente({ user, setUser }) {
  const [guiche, setGuiche] = useState(1);
  const [atual, setAtual] = useState(null);
  const [fila, setFila] = useState(0);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!user) return;
    setAtual(svc.emAtendimento(user.nome) || null);
    const ler = () => setFila(svc.fila().length);
    ler();
    const id = setInterval(ler, 1500);
    return () => clearInterval(id);
  }, [user]);

  if (!user) return <Login titulo="Acesso do atendente" onLogin={setUser} />;

  const chamar = () => {
    const t = svc.chamarProxima(user.nome, guiche);
    if (!t) return setMsg('Não há senhas aguardando.');
    setAtual(t); setMsg(''); falar(t, false);
  };
  const novamente = () => {
    const t = svc.chamarNovamente(atual.numero);
    if (t.estado === 'NÃO_COMPARECEU') { setAtual(null); return setMsg(`${t.numero} não compareceu após duas chamadas.`); }
    setAtual(t); falar(t, true);
  };
  const finalizar = () => { svc.finalizar(atual.numero); setAtual(null); setMsg('Atendimento encerrado.'); };

  return (
    <section>
      <h1>Guichê {guiche}</h1>
      <label className="inline">Número do guichê
        <input type="number" min="1" max="20" value={guiche} disabled={!!atual} onChange={(e) => setGuiche(Number(e.target.value))} />
      </label>
      <p>{fila} {fila === 1 ? 'senha aguardando' : 'senhas aguardando'}</p>
      {msg && <p role="status">{msg}</p>}
      {atual ? (
        <div className="cartao">
          <p className="numero">{atual.numero}</p>
          <p>Estado: <strong>{atual.estado.replace('_', ' ')}</strong></p>
          <div className="acoes">
            {atual.estado !== 'EM_ATENDIMENTO' ? (<>
              <button className="primario" onClick={() => setAtual(svc.iniciar(atual.numero))}>Iniciar atendimento</button>
              <button onClick={novamente}>Chamar novamente</button>
              <button onClick={() => { svc.naoCompareceu(atual.numero); setAtual(null); }}>Cliente não compareceu</button>
            </>) : <button className="primario" onClick={finalizar}>Encerrar atendimento</button>}
          </div>
        </div>
      ) : <button className="primario grande" onClick={chamar}>Chamar próxima senha</button>}
    </section>
  );
}
