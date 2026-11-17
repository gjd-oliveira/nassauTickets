// Página inicial do sistema

import {Link} from 'react-router-dom';
import '../styles/PaginaInicial.css';

function PaginaInicial() {
    return (
        <main className="pagina-inicial">

            <header className="cabecalho-inicial">
            <h1>Nassau Tickets</h1>
            <p>Sistema Web de Controle de Atendimento</p>
            </header>

            <section className="conteudo-inicial">

                <div className="mensagem-inicial">
                    <h2>Bem-vindo ao Nassau Tickets!</h2>
                    <p>
                        Organizando o atendimento do laboratório
                        de análises clínicas de forma simples e eficiente.
                    </p>
                </div>

                <div className="opcoes-iniciais">
                    
                    
                    <div className="cartao-opcao">

                        <div className="icone-opcao">
                       🎫
                        </div>
                       
                        <h3>Emitir senha</h3>

                        <p>
                        Gere uma nova senha para iniciar
                        o atendimento.
                        </p>

                        <Link to="/" className="link-navegacao">
                            Acessar Emissão
                        </Link>
                    </div>

                    
                      <div className="cartao-opcao">

                        <div className="icone-opcao">
                         📺
                        </div>
                        
                        <h3>Painel Público</h3>

                        <p>
                            Visualize as senhas chamadas
                            para atendimento.
                        </p>

                        <Link to= "/painel" className="link-navegacao">
                            Acessar Painel
                        </Link>
                    </div>
                
                
                </div>
            </section>

            <footer classname="rodapé-inicial">
                <p>Nassau Tickets © 2026</p>
                <span>Sistema de Controle de Atendimento</span>
            </footer>

        </main>
    );
}
 
export default PaginaInicial;