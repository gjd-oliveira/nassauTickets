from backend.database.connection import SessionLocal
from backend.models.usuario import Usuario
from backend.models.senha import Senha, TipoSenha, EstadoSenha

# Cria a sessão com o MySQL para manipulação tranquila dos dados
db = SessionLocal()
