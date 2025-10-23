import { connectDB } from "./config/database.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
});