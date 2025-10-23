import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors({
  origin: "*",
  credentials: "include"
}));
app.use(cookieParser());

// Rotas
app.use("/api", routes);

export default app;