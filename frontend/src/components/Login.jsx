import { useState } from 'react';

const USUARIOS = { atendente: { senha: 'lab123', gestor: true } };

export default function Login({ onLogin, titulo }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const enviar = (e) => {
    e.preventDefault();
    const u = USUARIOS[nome];
    if (u && u.senha === senha) onLogin({ nome, gestor: u.gestor });
    else setErro('Usuário ou senha incorretos. Use atendente / lab123.');
  };
  return (
    <form className="login" onSubmit={enviar}>
      <h1>{titulo}</h1>
      <label>Usuário<input value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="username" required /></label>
      <label>Senha<input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} autoComplete="current-password" required /></label>
      {erro && <p role="alert" className="erro">{erro}</p>}
      <button className="primario">Entrar</button>
    </form>
  );
}
