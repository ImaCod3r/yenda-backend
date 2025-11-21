import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);


async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Banco conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar:", error.message);
  }
}

export { sequelize, connectDB };