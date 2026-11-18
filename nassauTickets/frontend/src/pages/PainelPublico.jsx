// Página do Painel Público de atendimento

import '../styles/PainelPublico.css';
import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';

function PainelPublico () {

    const[ultimaAtualizacao, setUltimaAtualizacao]= useState(
        new Date()
    );

    const [historicoSenhas, setHistoricoSenhas]= useState([
        {
            id:1,
            senha:'P001',
            guiche:'01',
            status:'Atendida'
        },

        {
            id:2,
            senha:'G002',
            guiche:'02',
            status:'Aguardando'
        },

        {
            id:3,
            senha:'E003',
            guiche:'01',
            status:'Em atendimento'
        },

        {
            id: 4,
            senha: 'P004',
            guiche: '03',
            status: 'Atendida'
        }
    ])

    const adicionarSenha = () => {
        setHistoricoSenhas((listaAtual) => [
            ...listaAtual,
            { 
                 id: listaAtual.length + 1,               
                senha: `G00${listaAtual.length + 1}`,
                guiche: '02',
                status:'Aguardando'
            }
        ]);
    };

    const limparHistorico = () => {
        setHistoricoSenhas([]);
    };

    useEffect(()=> {
        const intervalo= setInterval(()=> {
            setUltimaAtualizacao(new Date());
        }, 30000);

        return () => clearInterval(intervalo);
    }, []);

    return(
        <main className="pagina-painel"> 

          <header className="cabecalho-painel">
            <h1>Nassau Tickets</h1>

            <p className="ultima-atualizacao">
              🕒 Última atualização: {ultimaAtualizacao.toLocaleString('pt-BR')}
            </p>

            <p>Painel Público de Atendimento </p>
          </header>

          <section className="conteudo-painel">

            <div className="senha-atual">
                <h2>Senha em Atendimento</h2>

                <span className="status-atendimento">
                    Aguardando Chamada
                </span>

                <p className="numero-senha">
                    Aguardando...
                </p>

                <span className="guiche-atendimento">
                    Guichê: --
                </span>
            </div>

            <div className="historico-senhas">
                <h2>Últimas chamadas</h2>

                <div className="botoes-historico">

                <button onClick={adicionarSenha}>
                    Adicionar senha de teste
                </button>

                <button onClick={limparHistorico}>
                    Limpar histórico
                </button>

                </div>

                <div className="lista-senhas">

                        {historicoSenhas.length === 0 ? (
                            <p className="historico-vazio">
                                Nenhuma senha registrada no momento.
                            </p>
                        ) : (
                            historicoSenhas.map((item) => (
                                <div className="item-senha" key={item.id}>
                                    <span>Senha {item.senha}</span>
                                    <span>Guichê {item.guiche}</span>

                                    <span className={
                                        item.status === 'Atendida'
                                            ? 'status-atendida'
                                            : item.status === 'Aguardando'
                                            ? 'status-aguardando'
                                            : 'status-em-atendimento'
                                    }>
                                        {item.status}
                                    </span>
                                </div>
                            ))
                        )}

                    </div>
            </div>

          </section>

          <div className="voltar-inicio">
            <Link to="/inicio" className="link-navegacao">
                Voltar para a página inicial
            </Link>
          </div>

          <footer className="rodape-painel">
            <p>Nassau Tickets © 2026</p>
            <span>Sistema de Controle de Atendimento</span>
          </footer>

        </main>
    )
}

export default PainelPublico;