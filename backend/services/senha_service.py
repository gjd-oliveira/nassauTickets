# Regras de negócio relacionadas às senhas.
#
# Responsabilidades:
# - Emitir novas senhas.
# - Gerar a numeração no formato YYMMDD-PPSQ.
# - Controlar a sequência diária das senhas.
# - Definir o tipo da senha (SP, SG ou SE).
# - Controlar alterações de estado relacionadas à senha.
# - Validar operações permitidas sobre uma senha.
#
# Este módulo NÃO deve depender diretamente de requisições HTTP.
# As rotas devem chamar as funções deste serviço.