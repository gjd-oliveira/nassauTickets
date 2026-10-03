# Configuração da conexão com o banco de dados.
#
# Responsabilidades:
# - Configurar a conexão com o MySQL.
# - Disponibilizar a conexão para as demais partes da aplicação.
# - Centralizar as configurações relacionadas ao banco.
#
# Credenciais e informações sensíveis NÃO devem ser
# armazenadas diretamente no código-fonte.
import mysql.connector

# Conectamos primeiro sem especificar o banco de dados
configuracao = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '1412'  # COLOQUE SUA SENHA DO MYSQL AQUI
}

try:
    # 1. Abre a conexão geral
    conexao = mysql.connector.connect(**configuracao)
    cursor = conexao.cursor()
    print("🚀 Conectado ao MySQL com sucesso pelo Visual Studio!")

    # 2. CRIA O BANCO DE DADOS AUTOMATICAMENTE SE ELE NÃO EXISTIR
    cursor.execute("CREATE DATABASE IF NOT EXISTS nassautickets")
    print("📂 Banco de dados 'nassautickets' verificado/criado.")
    
    # Diz ao Python para entrar e usar o banco nassautickets daqui para frente
    cursor.execute("USE nassautickets")

    # 3. Cria a tabela de clientes/ingressos lá dentro
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS clientes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100),
            telefone VARCHAR(20)
        )
    """)
    print("📋 Tabela 'clientes' pronta.")

    # 4. Insere um cliente de teste
    comando_sql = "INSERT INTO clientes (nome, telephone) VALUES (%s, %s)" if False else "INSERT INTO clientes (nome, telefone) VALUES (%s, %s)"
    dados_cliente = ("João Souza", "11999999999")
    
    cursor.execute(comando_sql, dados_cliente)
    conexao.commit() 
    print(f"✅ {dados_cliente[0]} cadastrado com sucesso no banco nassautickets!")

    # 5. Fecha as conexões
    cursor.close()
    conexao.close()

except Exception as erro:
    print(f"❌ Opa, aconteceu um erro: {erro}")
