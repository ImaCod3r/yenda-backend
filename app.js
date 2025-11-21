import { connectDB } from "./src/config/database.js";
import app from "./src/index.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

connectDB();

if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));
}

export default app;