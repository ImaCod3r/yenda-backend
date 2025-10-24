import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const StoreManager = sequelize.define('StoreManager', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  store_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'store_managers',
  timestamps: false,
});

export default StoreManager;