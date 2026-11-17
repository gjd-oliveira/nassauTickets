// Página do Painel Público de atendimento

import '../styles/PainelPublico.css';

function PainelPublico () {
    return(
        <main className="pagina-painel"> 

          <header className="cabecalho-painel">
            <h1>Nassau Tickets</h1>

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

                <p>Nenhuma senha chamada ainda.</p>
            </div>

          </section>

        </main>
    )
}

export default PainelPublico;