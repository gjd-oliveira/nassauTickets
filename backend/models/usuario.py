# -------------------------------------------------------------------------
# Modelo de usuário do sistema.
#
# Representa os usuários que podem autenticar no sistema.
#
# Informações esperadas:
# - Identificador.
# - Nome.
# - Credenciais de acesso.
# - Perfil/permissões.
#
# O cliente não possui conta de usuário, pois sua interação
# com o sistema ocorre de forma anônima pelo totem.
# -------------------------------------------------------------------------

# -------------------------------------------------------------------------
# Modelo de usuário do sistema.
# -------------------------------------------------------------------------

import enum

from sqlalchemy import (
    Boolean,
    Column,
    Enum,
    Integer,
    String,
    TIMESTAMP,
    UniqueConstraint,
    text,
)
from sqlalchemy.orm import relationship

from backend.database.connection import Base


class PerfilUsuario(enum.Enum):
    AGENTE = "AGENTE"
    GESTOR = "GESTOR"


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    login = Column(String(50), nullable=False)
    senha_hash = Column(String(255), nullable=False)
    perfil = Column(
        Enum(
            PerfilUsuario,
            values_callable=lambda enum_type: [perfil.value for perfil in enum_type],
        ),
        nullable=False,
        default=PerfilUsuario.AGENTE,
        server_default=text("'AGENTE'"),
    )
    ativo = Column(Boolean, nullable=False, default=True, server_default=text("1"))
    criado_em = Column(
        TIMESTAMP,
        server_default=text("CURRENT_TIMESTAMP"),
        nullable=True,
    )

    __table_args__ = (UniqueConstraint("login", name="uq_usuarios_login"),)

    # Relacionamento com Atendimentos
    atendimentos = relationship("Atendimento", back_populates="atendente")

    def __repr__(self):
        return f"<Usuario(nome='{self.nome}', login='{self.login}', perfil='{self.perfil}')>"
