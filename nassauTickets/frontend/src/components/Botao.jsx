// Testando a criação de um botão.

function Botao(props) {
   
   function clicar() {
     props.aoClicar(props.tipo);
   }
   
    return (
        <button onClick={clicar}>
            {props.texto}
        </button>
    );
}

export default Botao;