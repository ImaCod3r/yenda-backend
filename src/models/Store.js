import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import bcrypt from 'bcrypt';

const Store = sequelize.define(
  "Store",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nif: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    whatsapp: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "stores",
    timestamps: false,
    hooks: {
      beforeCreate: async (store) => {
        if (store.password) {
          store.password = await bcrypt.hash(store.password, 10);
        }
      },
      beforeUpdate: async (store) => {
        if (store.changed('password')) {
          store.password = await bcrypt.hash(store.password, 10);
        }
      },
      beforeUpdate: async (store) => {
        if (store.nif) {
          // Implement a function to validate nif
          store.isVerified = true;
        }
      }
    }
  }
);

export default Store;