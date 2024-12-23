import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Usuario from './User.js';

const Ranking = sequelize.define('Ranking', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  ranking: {
    type: DataTypes.JSON, // Armazena a ordem dos IDs dos álbuns como um array
    allowNull: false,
  },
}, {
  tableName: 'rankings',
  timestamps: true,
});

export default Ranking;
