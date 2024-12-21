import { Sequelize } from 'sequelize';  // Usando import ao invés de require
import config from './config.json' assert { type: 'json' };

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
  }
);

// Exportando o sequelize e a função authenticate
export const authenticate = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar com o banco de dados:', error);
  }
};

export default sequelize;
