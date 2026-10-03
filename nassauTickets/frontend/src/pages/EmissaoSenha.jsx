// Fazendo a primeira página conceitual

import {useState} from 'react';
import Botao from '../components/Botao.jsx';

function EmissaoSenha() {
   const [tipoSelecionado, setTipoSelecionado] = useState('');
   const [senha, setSenha] = useState('');

   function selecionarTipo(tipo) {
        setTipoSelecionado(tipo);
        setSenha('');
    }
   
   function emitirSenha () {
    setSenha(tipoSelecionado + '001');
   }

   return (
        <div className= "emissão-senha">
            <div className="cartao-emissao">
            <h1 className= "titulo-emissao"> Emissão de Senha </h1>

            <p>Escolha o tipo de atendimento:</p>
        
            <Botao 
            texto= "Senha prioridade" 
            tipo= "SP" 
            aoClicar={selecionarTipo}
            />
           
            <Botao 
            texto= "Senha geral" 
            tipo= "SG" 
            aoClicar={selecionarTipo}
            />
            
            <Botao 
            texto= "Retirada de exames" 
            tipo="SE" 
            aoClicar={selecionarTipo}
            />

            {tipoSelecionado !== '' && (
            <p>Tipo selecionado: {tipoSelecionado}</p>
            )}
           
           {tipoSelecionado !== '' && (
            <Botao
            texto= "Emitir senha"
            aoClicar={emitirSenha}
            />
           )}
           
           {senha !== '' && (
            <p>Sua senha é: {senha}</p>
           )}
           
           
            </div>
            </div>
    );
}

export default EmissaoSenha;