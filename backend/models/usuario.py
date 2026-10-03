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

from sqlalchemy import Column, Integer, String, text
from sqlalchemy.orm import relationship
# Importa subindo para a raiz 'backend' e entrando em 'database'
from backend.database.connection import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, autoincrement=True)
    nome = Column(String(100), nullable=False)
    login = Column(String(50), unique=True, nullable=False, index=True)
    senha_hash = Column(String(255), nullable=False)
    perfil = Column(
        String(30),
        nullable=False,
        default="Atendente",
        server_default=text("'Atendente'"),
    )

    # Relacionamento com Atendimentos
    atendimentos = relationship("Atendimento", back_populates="atendente")

    def __repr__(self):
        return f"<Usuario(nome='{self.nome}', login='{self.login}', perfil='{self.perfil}')>"
