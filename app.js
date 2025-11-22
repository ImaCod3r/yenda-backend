import app from "./src/index.js";
import { connectDB } from "./src/config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
})