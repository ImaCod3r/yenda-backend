import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import bcrypt from "bcryptjs";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("user", "admin"),
    defaultValue: "user",
  },
  street: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "users",
  timestamps: false, 
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});

export default User;