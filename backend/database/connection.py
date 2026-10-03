import os
from pathlib import Path

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import declarative_base, sessionmaker

# Carrega as variáveis do arquivo .env da raiz do projeto
load_dotenv(dotenv_path=Path(__file__).resolve().parents[2] / ".env")


def _get_env(name: str) -> str:
    value = os.getenv(name)
    if value is None or value == "":
        raise RuntimeError(f"Variável de ambiente ausente: {name}")
    return value


DB_USER = _get_env("DB_USER")
DB_PASSWORD = _get_env("DB_PASSWORD")
DB_HOST = _get_env("DB_HOST")
try:
    DB_PORT = int(_get_env("DB_PORT"))
except ValueError as error:
    raise RuntimeError("A variável de ambiente DB_PORT deve ser numérica") from error
DB_NAME = _get_env("DB_NAME")

# Monta a URL de conexão para o MySQL
DATABASE_URL = URL.create(
    drivername="mysql+pymysql",
    username=DB_USER,
    password=DB_PASSWORD,
    host=DB_HOST,
    port=DB_PORT,
    database=DB_NAME,
)

# Cria o mecanismo do SQLAlchemy
engine = create_engine(
    DATABASE_URL,
    echo=os.getenv("APP_ENV", "").lower() == "development",
    pool_pre_ping=True,
)

# Cria a fábrica de sessões para o CRUD
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Base essencial para os models herdarem
Base = declarative_base()
