# -------------------------------------------------------------------------
# Modelo de senha.
#
# Representa uma senha emitida pelo sistema.
#
# Informações relevantes:
# - Identificador.
# - Número da senha.
# - Tipo (SP, SG ou SE).
# - Estado atual.
# - Data/hora de emissão.
# - Informações relacionadas às chamadas.
# - Informações relacionadas ao atendimento.
# -------------------------------------------------------------------------

# -------------------------------------------------------------------------
# Modelo de senha.
# -------------------------------------------------------------------------

from sqlalchemy import Column, Integer, String, DateTime, Enum, text
from sqlalchemy.orm import relationship
import enum
from backend.database.connection import Base

class TipoSenha(enum.Enum):
    SP = "SP"
    SG = "SG"
    SE = "SE"

class EstadoSenha(enum.Enum):
    EMITIDA = "Emitida"
    CHAMADA = "Chamada"
    EM_ATENDIMENTO = "Em Atendimento"
    CONCLUIDA = "Concluída"
    CANCELADA = "Cancelada"

class Senha(Base):
    __tablename__ = "senhas"

    id = Column(Integer, primary_key=True, autoincrement=True)
    numero_senha = Column(String(20), nullable=False, unique=True)
    tipo = Column(Enum(TipoSenha), nullable=False)
    estado_atual = Column(
        Enum(
            EstadoSenha,
            values_callable=lambda enum_type: [estado.value for estado in enum_type],
        ),
        default=EstadoSenha.EMITIDA,
        server_default=text("'Emitida'"),
        nullable=False,
    )
    data_hora_emissao = Column(
        DateTime,
        server_default=text("CURRENT_TIMESTAMP"),
        nullable=False,
    )

    # Relacionamento 1:1 com Atendimento
    atendimento = relationship("Atendimento", back_populates="senha", uselist=False, cascade="all, delete-orphan")

    def __repr__(self):
        return f"<Senha(numero='{self.numero_senha}', tipo='{self.tipo.value}', estado='{self.estado_atual.value}')>"
