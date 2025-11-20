import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

let sequelize;

if (process.env.MODE === "development") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_STORAGE || "./database.db",
    logging: false,
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      logging: false,
    }
  );
}

async function connectDB() {
  try {
    await sequelize.authenticate();
    // sequelize.sync() removido - use migrations ao invés disso
    console.log("✅ Banco conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar:", error.message);
  }
}

export { sequelize, connectDB };