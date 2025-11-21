import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import './models/index.js';
import routes from "./routes/index.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(cookieParser());

// Routes
app.use("/api", routes);
app.get("/", (_, res) => {
  res.json({ "message": "Welcome to Yenda API" });
});

export default app;