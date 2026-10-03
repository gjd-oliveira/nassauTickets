// Fazendo a primeira página conceitual

import {useState} from 'react';
import Botao from '../components/Botao.jsx';

function EmissaoSenha() {
   const [tipoSelecionado, setTipoSelecionado] = useState('');
    
   function selecionarTipo(tipo) {
        setTipoSelecionado(tipo);
   }
   
   return (
        <div>
            <h1>Emissão de Senha</h1>

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

            <p>Tipo selecionado: {tipoSelecionado}</p>
        </div>
    );
}

export default EmissaoSenha;