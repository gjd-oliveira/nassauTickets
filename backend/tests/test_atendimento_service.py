from services.atendimento_service import (
    AGUARDANDO,
    chamar_proxima
)


def criar_senha(numero):
    return {
        "numero": numero,
        "estado": AGUARDANDO,
        "quantidade_chamadas": 0
    }


def test_primeira_chamada_deve_ser_sp():
    fila = [
        criar_senha("SP-001"),
        criar_senha("SG-002"),
        criar_senha("SE-003")
    ]

    resultado = chamar_proxima(fila, None)

    assert resultado["numero"] == "SP-001"


def test_depois_de_sp_deve_chamar_sg_ou_se():
    fila = [
        criar_senha("SP-001"),
        criar_senha("SG-002"),
        criar_senha("SE-003")
    ]

    resultado = chamar_proxima(fila, "SP")

    assert resultado["numero"] in ["SG-002", "SE-003"]


def test_depois_de_sg_deve_chamar_sp():
    fila = [
        criar_senha("SG-001"),
        criar_senha("SP-002"),
        criar_senha("SP-003")
    ]

    resultado = chamar_proxima(fila, "SG")

    assert resultado["numero"] == "SP-002"


def test_depois_de_se_deve_chamar_sp():
    fila = [
        criar_senha("SE-001"),
        criar_senha("SP-002"),
        criar_senha("SP-003")
    ]

    resultado = chamar_proxima(fila, "SE")

    assert resultado["numero"] == "SP-002"


def test_se_houver_sg_e_se_deve_aceitar_qualquer_um_deles():
    fila = [
        criar_senha("SP-001"),
        criar_senha("SE-002"),
        criar_senha("SG-003")
    ]

    resultado = chamar_proxima(fila, "SP")

    assert resultado["numero"] in ["SE-002", "SG-003"]


def test_deve_retornar_none_se_a_fila_estiver_vazia():
    fila = []

    resultado = chamar_proxima(fila, None)

    assert resultado is None


def test_deve_ignorar_senha_que_nao_esta_aguardando():
    fila = [
        {
            "numero": "SP-001",
            "estado": "CHAMADA",
            "quantidade_chamadas": 1
        },
        criar_senha("SP-002")
    ]

    resultado = chamar_proxima(fila, None)

    assert resultado["numero"] == "SP-002"