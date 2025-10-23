import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);

routes.get("/", (req, res) => {
  res.json({ message: "API Root Endpoint" });
});

export default routes;