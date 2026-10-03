# Regras de negócio do processo de atendimento.
#
# Responsabilidades:
# - Determinar a próxima senha a ser chamada.
# - Aplicar a regra de prioridade:
#       SP → SE/SG → SP → SE/SG
# - Verificar a disponibilidade de cada fila.
# - Controlar a máquina de estados da senha.
# - Realizar chamadas e chamadas novamente.
# - Iniciar atendimentos.
# - Finalizar atendimentos.
# - Registrar horários importantes do atendimento.
# - Controlar o limite de chamadas de uma senha.
# - Determinar quando uma senha deve ser considerada não atendida.
# - Validar se uma operação é permitida no estado atual da senha.
#
# Este módulo concentra as principais regras de negócio
# relacionadas ao atendimento.