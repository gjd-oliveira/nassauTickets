// Página inicial do sistema

import {Link} from 'react-router-dom';

function PaginaInicial() {
    return (
        <main className="pagina-inicial">

            <header className="cabecalho-inicial">
            <h1>Nassau Tickets</h1>
            <p>Sistema Web de Controle de Atendimento</p>
            </header>

            <section className="cartao-inicial">
                <h2>Bem-vindo ao Nassau Tickets!</h2>

                <p>
                    Organizando o atendimento do laboratório
                    de análises clínicas de forma simples e eficiente.
                </p>
            
            
            <Link to="/" className="link-navegacao">
                Emitir uma senha
            </Link>
            </section>

        </main>
    );
}
 
export default PaginaInicial;