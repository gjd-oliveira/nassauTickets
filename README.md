# nassauTickets

Sistema Web de Controle de Atendimento para um Laboratório de Análises Clínicas.

## Descrição

O **nassauTickets** é uma aplicação Web destinada ao gerenciamento do atendimento em um Laboratório de Análises Clínicas. O sistema organiza a emissão de senhas, a fila de atendimento, a chamada de clientes, o registro dos atendimentos e a consulta de informações gerenciais.

O projeto foi estruturado para separar frontend, backend e documentação, facilitando o desenvolvimento, a manutenção e a evolução da aplicação.

## Objetivo

Desenvolver uma solução capaz de:

- emitir senhas de atendimento;
- organizar a fila conforme as prioridades definidas para o serviço;
- permitir a chamada e o atendimento das senhas;
- registrar os dados dos atendimentos;
- disponibilizar um painel com as chamadas realizadas;
- permitir a consulta de relatórios;
- registrar informações necessárias para auditoria;
- tratar situações de ausência e chamadas novamente;
- manter uma organização adequada entre frontend, backend e artefatos de documentação.

## Membros

| Nome | Matrícula | Papel |
|---|---:|---|
| Gilberto José de Oliveira Neto | 01887182 | Scrum Master e Dev Back-end |
| Wilton Ferreira Costa Neto | 01904543 | Dev Back-end |
| Emmanuel Matheus Dias da Silva Freitas | 01893101 | Dev Front-end |
| Guilherme Marques Pereira da Silva | 01893731 | Dev Front-end |
| Eduardo Lucas Dias da Silva | 01530885 | Documentador |
| Higor da Silva Dantas | 01909267 | Tester |


## Tipos de senha

| Sigla | Tipo |
|---|---|
| SP | Senha Prioritária |
| SG | Senha Geral |
| SE | Senha para retirada de Exames |

## Arquitetura

O projeto está organizado em três áreas principais:

```text
nassauTickets/
├── backend/
├── docs/
│   ├── branding/
│   ├── mer/
│   ├── mockups/
│   ├── models/
│   │   └── uml/
│   └── requirements/
├── frontend/
├── .gitignore
├── LICENSE
└── README.md
```

### Frontend

O frontend é desenvolvido com **React** e concentra as telas e componentes responsáveis pela interação com os usuários.

### Backend

O backend é responsável pelas regras de negócio, autenticação, comunicação com o banco de dados, controle das filas, atendimentos, relatórios e auditoria.

### Banco de dados

O projeto utiliza **MySQL** como tecnologia prevista para persistência dos dados.

## Tecnologias utilizadas

- React
- Python
- MySQL
- Dbeaver
- SQLAlchemy
- Git
- GitHub

## Funcionalidades

### Emissão de senha

O cliente poderá emitir uma senha por meio do totem, sem necessidade de cadastro ou login.

### Fila de atendimento

O sistema controla a fila e seleciona a próxima senha de acordo com as regras de prioridade estabelecidas para o atendimento.

### Chamada

O atendente poderá chamar a próxima senha, realizar uma nova chamada quando necessário e iniciar o atendimento.

### Atendimento

O sistema registra o início e o encerramento do atendimento, associando as informações necessárias ao atendente e ao guichê.

### Painel

O painel apresenta as chamadas realizadas e permite que o cliente identifique a senha chamada e o guichê correspondente.

### Relatórios

O sistema contempla informações para relatórios de:

- senhas emitidas;
- senhas atendidas;
- senhas por prioridade;
- atendimentos;
- tempo médio de atendimento;
- auditoria.

### Autenticação

O atendente utiliza login para acessar as funções destinadas ao atendimento. O perfil de gestor corresponde a permissões adicionais do atendente.

## Estados da senha

A senha poderá percorrer os seguintes estados:

```text
EMITIDA
   ↓
AGUARDANDO
   ↓
CHAMADA
   ↓
CHAMADA_NOVAMENTE
   ↓
EM_ATENDIMENTO
   ↓
ATENDIDA
```

Quando o cliente não comparecer após as chamadas previstas, a senha poderá assumir o estado:

```text
NÃO_COMPARECEU
```

## Instalação

### Pré-requisitos

Instale previamente:

- Node.js;
- npm;
- MySQL;
- Git.

### Clonar o projeto

```bash
git clone [URL_DO_REPOSITORIO]
cd nassauTickets
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
[COMANDO_DE_INSTALACAO]
[COMANDO_DE_EXECUCAO]
```

## Branches

O projeto utiliza, no mínimo, as branches:

- `main`: versão principal do projeto;
- `dev`: desenvolvimento e integração das alterações.

## Licença

Este projeto utiliza a licença MIT.

## Instituição

**UNINASSAU – Olinda**

**Professor:** João Ferreira
