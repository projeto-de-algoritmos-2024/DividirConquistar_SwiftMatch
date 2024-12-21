// src/models/Usuario.js
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Ajuste o caminho se necessário

const Usuario = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Outros campos que você precisar, como email, etc.
}, {
  tableName: 'usuario', // Nome da tabela no banco
  timestamps: true,      // Se quiser que o Sequelize crie automaticamente as colunas 'createdAt' e 'updatedAt'
});

export default Usuario;
