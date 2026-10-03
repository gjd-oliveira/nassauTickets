#Área de teste do banco de dados
#usando para cadastros de funcionarios
import mysql.connector # type: ignore

configuracao = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',                # Ajuste se seu usuário for 'robopython'
    'password': '1412', # ⚠️ COLOQUE SUA SENHA REAL DO MYSQL AQUI
    'database': 'sistema_atendimento'
}

try:
    conexao = mysql.connector.connect(**configuracao)
    cursor = conexao.cursor()

    # Pede para o banco os dados dos funcionários
    cursor.execute("SELECT id, nome, login, perfil FROM usuarios")
    usuarios = cursor.fetchall()

    print("\n👥 --- LISTA DE FUNCIONÁRIOS CADASTRADOS ---")
    if not usuarios:
        print("Nenhum funcionário cadastrado ainda. Rode o 'cadastrar_atendente.py' primeiro!")
    else:
        for u in usuarios:
            print(f"ID: {u[0]} | Nome: {u[1]} | Login: {u[2]} | Perfil: {u[3]}")
    print("---------------------------------------------\n")

    cursor.close()
    conexao.close()

except Exception as erro:
    print(f"❌ Erro ao buscar dados: {erro}")
