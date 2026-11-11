// Testando a criação de um botão.

function Botao(props) {
   
   function clicar() {
     if (props.tipo) {
        props.aoClicar(props.tipo);
     } else {
        props.aoClicar();
     }
   }
   
    return (
        <button className={props.classe || "botao"} onClick={clicar}>
            {props.texto}
        </button>
    );
}

export default Botao;