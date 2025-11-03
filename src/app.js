import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import './models/index.js';
import routes from "./routes/index.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors({
  origin: "http://localhost:5173", // provisorio para desenvolvimento
  credentials: true
}));
app.use(cookieParser());

// Rotas
app.use("/api", routes);

export default app;