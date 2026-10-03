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


# ============================================================
# ESTADOS DA SENHA
# ============================================================

EMITIDA = "EMITIDA"
AGUARDANDO = "AGUARDANDO"
CHAMADA = "CHAMADA"
CHAMADA_NOVAMENTE = "CHAMADA_NOVAMENTE"
EM_ATENDIMENTO = "EM_ATENDIMENTO"
ATENDIDA = "ATENDIDA"
NAO_COMPARECEU = "NAO_COMPARECEU"


# ============================================================
# CONFIGURAÇÕES DO ATENDIMENTO
# ============================================================

LIMITE_CHAMADAS = 2


# ============================================================
# FUNÇÕES AUXILIARES
# ============================================================

def obter_tipo_senha(senha):
    """
    Retorna o tipo da senha.

    Exemplos:
        SP-001 -> SP
        SG-002 -> SG
        SE-003 -> SE
    """

    return senha[:2]


def encontrar_senha(fila, numero):
    """
    Procura uma senha pelo número dentro da fila.

    Retorna a senha encontrada.
    Retorna None caso não encontre.
    """

    for senha in fila:
        if senha["numero"] == numero:
            return senha

    return None


def validar_estado(senha, estado_esperado):
    """
    Verifica se a senha está no estado esperado.

    Retorna True se estiver.
    Retorna False caso contrário.
    """

    return senha["estado"] == estado_esperado


# ============================================================
# DETERMINAÇÃO DA PRÓXIMA SENHA
# ============================================================

def chamar_proxima(fila, ultima_chamada):
    """
    Determina qual senha deve ser chamada.

    Regra:

        primeira chamada -> SP
        depois de SP    -> SE ou SG
        depois de SE    -> SP
        depois de SG    -> SP

    A função considera somente senhas que estejam
    aguardando atendimento.

    Retorna:
        - a senha escolhida
        - None caso não exista uma senha disponível
    """

    if not fila:
        return None

    if ultima_chamada is None:
        tipos_permitidos = ["SP"]

    elif ultima_chamada == "SP":
        tipos_permitidos = ["SE", "SG"]

    else:
        tipos_permitidos = ["SP"]

    for senha in fila:

        if senha["estado"] != AGUARDANDO:
            continue

        tipo = obter_tipo_senha(senha["numero"])

        if tipo in tipos_permitidos:
            return senha

    return None


# ============================================================
# REALIZAR CHAMADA
# ============================================================

def realizar_chamada(senha):
    """
    Realiza uma chamada para a senha.

    A senha precisa estar em AGUARDANDO.

    A primeira chamada leva a senha para CHAMADA.

    Se a senha já tiver sido chamada anteriormente,
    uma nova chamada leva para CHAMADA_NOVAMENTE.
    """

    if senha is None:
        return False

    if senha["estado"] == AGUARDANDO:
        senha["estado"] = CHAMADA
        senha["quantidade_chamadas"] += 1
        return True

    if senha["estado"] == CHAMADA:
        senha["estado"] = CHAMADA_NOVAMENTE
        senha["quantidade_chamadas"] += 1
        return True

    return False


# ============================================================
# INICIAR ATENDIMENTO
# ============================================================

def iniciar_atendimento(senha):
    """
    Inicia o atendimento da senha.

    A senha precisa estar em CHAMADA ou
    CHAMADA_NOVAMENTE.
    """

    if senha is None:
        return False

    if senha["estado"] not in [CHAMADA, CHAMADA_NOVAMENTE]:
        return False

    senha["estado"] = EM_ATENDIMENTO

    return True


# ============================================================
# FINALIZAR ATENDIMENTO
# ============================================================

def finalizar_atendimento(senha):
    """
    Finaliza o atendimento.

    A senha precisa estar em EM_ATENDIMENTO.
    """

    if senha is None:
        return False

    if senha["estado"] != EM_ATENDIMENTO:
        return False

    senha["estado"] = ATENDIDA

    return True


# ============================================================
# REGISTRAR NÃO COMPARECIMENTO
# ============================================================

def registrar_nao_comparecimento(senha):
    """
    Registra que o cliente não compareceu.

    A senha precisa ter atingido o limite de chamadas.
    """

    if senha is None:
        return False

    if senha["quantidade_chamadas"] < LIMITE_CHAMADAS:
        return False

    if senha["estado"] not in [CHAMADA, CHAMADA_NOVAMENTE]:
        return False

    senha["estado"] = NAO_COMPARECEU

    return True


# ============================================================
# VALIDAÇÃO DE OPERAÇÕES
# ============================================================

def pode_iniciar_atendimento(senha):
    """
    Verifica se a senha pode iniciar atendimento.
    """

    if senha is None:
        return False

    return senha["estado"] in [CHAMADA, CHAMADA_NOVAMENTE]


def pode_finalizar_atendimento(senha):
    """
    Verifica se a senha pode finalizar atendimento.
    """

    if senha is None:
        return False

    return senha["estado"] == EM_ATENDIMENTO


def pode_realizar_chamada(senha):
    """
    Verifica se a senha pode ser chamada novamente.
    """

    if senha is None:
        return False

    if senha["quantidade_chamadas"] >= LIMITE_CHAMADAS:
        return False

    return senha["estado"] in [AGUARDANDO, CHAMADA]