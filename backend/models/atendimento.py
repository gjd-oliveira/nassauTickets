# -------------------------------------------------------------------------
# Modelo de atendimento.
#
# Representa o atendimento realizado para uma senha.
#
# Informações relevantes:
# - Senha atendida.
# - Atendente responsável.
# - Guichê.
# - Horário da primeira chamada.
# - Horário da segunda chamada, quando houver.
# - Horário de início.
# - Horário de finalização.
#
# Essas informações também são utilizadas para o relatório
# de auditoria e para o cálculo do tempo de atendimento.
# -------------------------------------------------------------------------

# -------------------------------------------------------------------------
# Modelo de atendimento.
# -------------------------------------------------------------------------

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.database.connection import Base

class Atendimento(Base):
    __tablename__ = "atendimentos"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    senha_id = Column(Integer, ForeignKey("senhas.id", ondelete="CASCADE"), nullable=False, unique=True)
    atendente_id = Column(Integer, ForeignKey("usuarios.id", ondelete="RESTRICT"), nullable=False)
    guiche = Column(String(10), nullable=False)

    horario_primeira_chamada = Column(DateTime, nullable=True)
    horario_segunda_chamada = Column(DateTime, nullable=True)
    horario_inicio = Column(DateTime, nullable=True)
    horario_finalizacao = Column(DateTime, nullable=True)

    # Mapeamento de relacionamentos do SQLAlchemy
    senha = relationship("Senha", back_populates="atendimento")
    atendente = relationship("Usuario", back_populates="atendimentos")

    @property
    def tempo_atendimento(self):
        if self.horario_inicio and self.horario_finalizacao:
            return self.horario_finalizacao - self.horario_inicio
        return None

    def __repr__(self):
        return f"<Atendimento(senha_id={self.senha_id}, guiche='{self.guiche}')>"
