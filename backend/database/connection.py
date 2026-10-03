import mysql.connector # type: ignore

# 1. Configuração de acesso (Conecta direto ao MySQL do seu computador)
configuracao = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'password': '1412'  # ⚠️ COLOQUE SUA SENHA DO MYSQL AQUI
}

try:
    # 2. Abre a conexão com o servidor
    conexao = mysql.connector.connect(**configuracao)
    cursor = conexao.cursor()
    print("🚀 Conectado ao MySQL com sucesso!")

    # 3. Cria o banco de dados se ele não existir
    cursor.execute("CREATE DATABASE IF NOT EXISTS sistema_atendimento")
    print("📂 Banco de dados 'sistema_atendimento' verificado/criado.")
    
    # Entra no banco de dados recém-criado
    cursor.execute("USE sistema_atendimento")

    # ============================================================================
    # 4. EXECUTANDO OS COMANDOS SQL (Criando as tabelas e índices)
    # ============================================================================

    # Tabela 1: Usuários
    print("⏳ Criando tabela 'usuarios'...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT,
            nome VARCHAR(100) NOT NULL,
            login VARCHAR(50) NOT NULL,
            senha_hash VARCHAR(255) NOT NULL,
            perfil ENUM('AGENTE', 'GESTOR') NOT NULL DEFAULT 'AGENTE',
            ativo BOOLEAN NOT NULL DEFAULT TRUE,
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            CONSTRAINT pk_usuarios PRIMARY KEY (id),
            CONSTRAINT uq_usuarios_login UNIQUE (login)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    """)

    # Tabela 2: Tickets
    print("⏳ Criando tabela 'tickets'...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS tickets (
            codigo VARCHAR(15),
            tipo ENUM('SP', 'SG', 'SE') NOT NULL,
            estado ENUM('EMITIDO', 'CHAMADO', 'EM_ATENDIMENTO', 'FINALIZADO', 'CANCELADO', 'AUSENTE') NOT NULL DEFAULT 'EMITIDO',
            criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            
            CONSTRAINT pk_tickets PRIMARY KEY (codigo)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    """)

    # Tabela 3: Atendimentos & Auditoria
    print("⏳ Criando tabela 'atendimentos_auditoria'...")
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS atendimentos_auditoria (
            id INT AUTO_INCREMENT,
            ticket_codigo VARCHAR(15) NOT NULL,
            usuario_id INT DEFAULT NULL,
            guiche INT DEFAULT NULL,
            data_emissao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            data_primeira_chamada TIMESTAMP NULL DEFAULT NULL,
            data_segunda_chamada TIMESTAMP NULL DEFAULT NULL,
            data_inicio_atendimento TIMESTAMP NULL DEFAULT NULL,
            data_finalizacao TIMESTAMP NULL DEFAULT NULL,
            
            CONSTRAINT pk_atendimentos PRIMARY KEY (id),
            CONSTRAINT uq_atendimentos_ticket UNIQUE (ticket_codigo),
            CONSTRAINT fk_atendimentos_tickets FOREIGN KEY (ticket_codigo) 
                REFERENCES tickets (codigo) ON DELETE CASCADE,
            CONSTRAINT fk_atendimentos_usuarios FOREIGN KEY (usuario_id) 
                REFERENCES usuarios (id) ON UPDATE CASCADE,
            CONSTRAINT chk_guiche_positivo CHECK (guiche > 0)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
    """)

    # Índices de Performance (Se já existirem, o MySQL avisa, então usamos try/except rápido)
    print("⏳ Criando índices de otimização...")
    try:
        cursor.execute("CREATE INDEX idx_tickets_estado ON tickets(estado);")
        cursor.execute("CREATE INDEX idx_auditoria_datas ON atendimentos_auditoria(data_emissao);")
    except mysql.connector.Error as e:
        # Se o índice já existir, ignora o erro e continua
        if e.errno != 1061: 
            raise e

    print("🎯 Todas as tabelas e índices foram estruturados com sucesso!")

    # 5. Fecha as conexões com segurança
    cursor.close()
    conexao.close()
    print("🔌 Conexão fechada. Seu banco está pronto no DBeaver!")

except Exception as erro:
    print(f"❌ Opa, aconteceu um erro na criação: {erro}")
