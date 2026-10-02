# nassauTickets - frontend

## Executar com Vite

1. Instale o [Node.js](https://nodejs.org/) se ainda não estiver instalado.
2. Abra um terminal nesta pasta (`frontend`) e execute:

   ```sh
   npm install
   npm run dev
   ```

3. Abra no navegador o endereço local mostrado pelo Vite (normalmente `http://localhost:5173`).

## Executar com a extensão Live Server

O Live Server serve arquivos estáticos e não compila React/JSX. Gere a versão estática e abra `dist/index.html` com a extensão:

```sh
npm run build
```

Para recompilar automaticamente ao editar os arquivos, deixe este comando rodando no terminal:

```sh
npm run build:watch
```

Depois, no VS Code, clique com o botão direito em `dist/index.html` e escolha **Open with Live Server**. Deixe o terminal do build aberto enquanto trabalha. Para desenvolvimento React com recarga automática, prefira `npm run dev`.

O modo de atendente e os relatórios usam um login demonstrativo: `atendente` / `lab123`. Os dados de senhas ficam salvos no `localStorage` do navegador. A emissão está habilitada das 7h às 17h.
