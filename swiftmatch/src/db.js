import { Sequelize } from 'sequelize';

// Configurar a conexão com o banco de dados
const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'postgres', // ou outro dialeto, como 'mysql'
});

// Função para testar a conexão
export const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
};

export default sequelize;
