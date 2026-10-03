import os
import mysql.connector
from dotenv import load_dotenv

# 1. Carrega as variáveis do arquivo .env para a memória do sistema
load_dotenv()

# 2. Busca os dados de forma escondida e segura
configuracao = {
    'host': os.getenv('DB_HOST'),
    'port': int(os.getenv('DB_PORT')), # O port precisa ser um número inteiro
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASSWORD'),
    'database': os.getenv('DB_NAME')
}

try:
    # 3. Conecta normalmente
    conexao = mysql.connector.connect(**configuracao)
    cursor = conexao.cursor()
    print("🔒 Conectado ao MySQL com sucesso e com total segurança usando .env!")

    # Daqui para baixo o seu código continua igual...
    cursor.close()
    conexao.close()

except Exception as erro:
    print(f"❌ Erro de conexão: {erro}")
