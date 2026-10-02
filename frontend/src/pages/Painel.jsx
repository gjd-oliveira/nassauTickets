import { useEffect, useState } from 'react';
import { ultimasChamadas } from '../services/ticketService.js';

export default function Painel() {
  const [lista, setLista] = useState([]);
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const ler = () => { try { setLista(ultimasChamadas()); setOffline(false); } catch { setOffline(true); } };
    ler();
    const id = setInterval(ler, 1500);
    return () => clearInterval(id);
  }, []);
  const [atual, ...resto] = lista;
  return (
    <section className="painel" aria-live="polite">
      {offline && <p role="alert" className="erro">Sem conexão com o sistema. Mantendo a última informação; procure o balcão.</p>}
      {atual ? (
        <div className="atual">
          <p>Senha</p><p className="numero">{atual.numero}</p>
          <p className="guiche">Guichê {atual.guiche}</p>
        </div>
      ) : <p className="vazio">Aguardando a primeira chamada do dia.</p>}
      {resto.length > 0 && (<>
        <h2>Chamadas anteriores</h2>
        <ol className="anteriores">
          {resto.map((t) => <li key={t.numero}><span>{t.numero}</span><span>Guichê {t.guiche}</span></li>)}
        </ol>
      </>)}
    </section>
  );
}
