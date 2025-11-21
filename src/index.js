import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import './models/index.js';
import routes from "./routes/index.js";
import { verifyApiKey } from "./middlewares/apiAuth.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors({
  origin: true,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "x-secret-key"]
}));
app.use(cookieParser());

// Routes
app.use("/api", verifyApiKey, routes);
app.get("/", (_, res) => {
  res.json({ "message": "Welcome to Yenda API" });
});

export default app;