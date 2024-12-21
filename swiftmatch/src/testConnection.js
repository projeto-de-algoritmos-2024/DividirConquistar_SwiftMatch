import sequelize from './config/database.js';  // Ajuste o caminho se necessário

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão bem-sucedida!");
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
})();
