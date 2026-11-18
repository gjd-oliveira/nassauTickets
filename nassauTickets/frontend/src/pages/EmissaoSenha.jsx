// Fazendo a parte de emissão de senha.

import {useState} from 'react';
import Botao from '../components/Botao.jsx';
import {solicitarEmissaoSenha} from '../services/senhasService.js';
import {Link} from 'react-router-dom';

function EmissaoSenha() {
   const [tipoSelecionado, setTipoSelecionado] = useState('');
   const [senha, setSenha] = useState('');
   const [carregando, setCarregando] = useState(false);

   function selecionarTipo(tipo) {
        setTipoSelecionado(tipo);
        setSenha('');
    }
   
   async function emitirSenha () {

        if (tipoSelecionado === '') {
            alert('Por favor, selecione um tipo de atendimento.');
            return;
        }

        setCarregando(true);

        setSenha('');

        try {
        const resultado= await solicitarEmissaoSenha(tipoSelecionado);

        setSenha(resultado.numero);

        } catch (erro) {
            console.error('Erro ao emitir a senha:', erro);
            alert('Não foi possível emitir a sua senha. Por favor, tente novamente.');
        
        } finally {

        setCarregando(false);
    }

   }

   return (
        <main className= "pagina-emissao">
            
            <header className="cabecalho">
                <h1>Nassau Tickets</h1>
                <p>Sistema de Controle de Atendimento</p>
            </header>
            
            <div className="cartao-emissao">
            <h1 className= "titulo-emissao"> Emissão de Senha </h1>

            <p className="texto-orientacao" >Escolha o tipo de atendimento:</p>
        
            <Botao 
            texto= "Senha prioridade" 
            tipo= "SP" 
            aoClicar={selecionarTipo}
            classe= "botao-atendimento"
            desabilitado={carregando}
            />
           
            <Botao 
            texto= "Senha geral" 
            tipo= "SG" 
            aoClicar={selecionarTipo}
            classe= "botao-atendimento"
            desabilitado={carregando}
            />
            
            <Botao 
            texto= "Retirada de exames" 
            tipo="SE" 
            aoClicar={selecionarTipo}
            classe= "botao-atendimento"
            desabilitado={carregando}
            />

            {tipoSelecionado !== '' && (
            <p>Tipo selecionado: {tipoSelecionado}</p>
            )}
           
           {tipoSelecionado !== '' && (
            <Botao
            texto= {carregando ? "Emitindo..." : "Emitir senha"}
            aoClicar={emitirSenha}
            classe= "botao-emitir"
            desabilitado={carregando}
            />
           )}

           {carregando && (
            <p className="mensagem-carregamento">
                Emitindo sua senha, aguarde um instante...
            </p>
           )}
           
           {senha !== '' && (
            <div className="senha-gerada">
            <p>Senha emitida com sucesso! </p>
            <h2>{senha}</h2>
            <span className="tipo-atendimento">
                Tipo de Atendimento: {tipoSelecionado}
            </span>
            </div>
           )}
           
           
            </div>
            <Link to="/inicio" className="link-navegacao">
                Voltar para a página inicial
            </Link>
        </main>
    );
}

export default EmissaoSenha;