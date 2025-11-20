import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Product = sequelize.define("Product", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  shareable: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  store_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'stores',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: "products",
  timestamps: true,
});

export default Product;