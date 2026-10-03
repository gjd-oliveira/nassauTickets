import { useState } from 'react';
import Totem from './pages/Totem.jsx';
import Painel from './pages/Painel.jsx';
import Atendente from './pages/Atendente.jsx';
import Relatorios from './pages/Relatorios.jsx';

const TELAS = { totem: ['Totem', Totem], painel: ['Painel', Painel], atendente: ['Atendente', Atendente], relatorios: ['Relatórios', Relatorios] };

export default function App() {
  const [tela, setTela] = useState(location.hash.slice(1) in TELAS ? location.hash.slice(1) : 'totem');
  const [user, setUser] = useState(null);
  const Tela = TELAS[tela][1];
  const ir = (t) => { location.hash = t; setTela(t); };
  return (
    <>
      <a className="skip" href="#main">Ir para o conteúdo</a>
      <header className="topo">
        <strong className="marca">nassauTickets</strong>
        <nav aria-label="Telas do sistema">
          {Object.entries(TELAS).map(([k, [nome]]) => (
            <button key={k} aria-current={tela === k ? 'page' : undefined} onClick={() => ir(k)}>{nome}</button>
          ))}
        </nav>
        {user && <button className="sair" onClick={() => setUser(null)}>Sair ({user.nome})</button>}
      </header>
      <main id="main"><Tela user={user} setUser={setUser} /></main>
    </>
  );
}