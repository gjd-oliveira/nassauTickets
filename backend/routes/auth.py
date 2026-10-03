# Rotas relacionadas à autenticação.
#
# Responsabilidades:
# - Receber as credenciais enviadas pelo frontend.
# - Solicitar ao serviço de autenticação a validação do usuário.
# - Retornar a resposta apropriada para o frontend.
#
# A lógica de autenticação e validação das credenciais
# deve ficar em uma camada de serviço, não diretamente aqui.