// Adicionando função para solicitar emissão de senha.

export async function solicitarEmissaoSenha (tipo) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                numero: `${tipo}001`,
                tipo: tipo,
                status: 'EMITIDA'
            });
        }, 1000);
    });
}