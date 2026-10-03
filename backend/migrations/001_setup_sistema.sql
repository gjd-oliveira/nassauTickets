-- Script de migração gerado no DBeaver para o Banco de Dados MySQL
-- Criação das tabelas de Usuários, Senhas e Atendimentos de forma segura

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    login VARCHAR(50) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil VARCHAR(30) NOT NULL DEFAULT 'Atendente',
    INDEX idx_usuarios_login (login)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS senhas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_senha VARCHAR(20) NOT NULL UNIQUE,
    tipo ENUM('SP', 'SG', 'SE') NOT NULL,
    estado_atual ENUM('Emitida', 'Chamada', 'Em Atendimento', 'Concluída', 'Cancelada') NOT NULL DEFAULT 'Emitida',
    data_hora_emissao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS atendimentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senha_id INT NOT NULL UNIQUE,
    atendente_id INT NOT NULL,
    guiche VARCHAR(10) NOT NULL,
    horario_primeira_chamada DATETIME NULL,
    horario_segunda_chamada DATETIME NULL,
    horario_inicio DATETIME NULL,
    horario_finalizacao DATETIME NULL,
    CONSTRAINT fk_atendimentos_senha
        FOREIGN KEY (senha_id) 
        REFERENCES senhas(id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_atendimentos_usuario
        FOREIGN KEY (atendente_id) 
        REFERENCES usuarios(id) 
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;