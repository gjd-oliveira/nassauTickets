import { useState } from 'react';
import { emitir, expedienteAberto } from '../services/ticketService.js';

const OPCOES = [
  ['SP', 'Atendimento prioritário', 'Idosos, gestantes, pessoas com deficiência'],
  ['SG', 'Atendimento geral', 'Cadastro, informações e coletas'],
  ['SE', 'Retirar exames', 'Resultados já liberados'],
];

export default function Totem() {
  const [senha, setSenha] = useState(null);
  const [erro, setErro] = useState('');
  const pegar = (tipo) => {
    try { setSenha(emitir(tipo)); setErro(''); setTimeout(() => setSenha(null), 8000); }
    catch (e) { setErro(e.message); }
  };
  if (senha) return (
    <section className="totem-ok" role="status">
      <p>Sua senha é</p>
      <p className="numero">{senha.numero}</p>
      <p>Aguarde ser chamado no painel. Não é necessário informar dados pessoais.</p>
      <button onClick={() => setSenha(null)}>Emitir outra senha</button>
    </section>
  );
  return (
    <section>
      <h1>Escolha o tipo de atendimento</h1>
      {!expedienteAberto() && <p role="alert" className="erro">O laboratório atende das 7h às 17h.</p>}
      {erro && <p role="alert" className="erro">{erro}</p>}
      <div className="opcoes">
        {OPCOES.map(([tipo, nome, desc]) => (
          <button key={tipo} className={`opcao ${tipo}`} onClick={() => pegar(tipo)}>
            <span className="sigla">{tipo}</span><strong>{nome}</strong><small>{desc}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
