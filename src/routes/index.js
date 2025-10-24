import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
import storeRoutes from "./storeRoutes.js";

const routes = express.Router();

routes.use("/auth", authRoutes);
routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/stores", storeRoutes);

routes.get("/", (req, res) => {
  res.json({ message: "API Root Endpoint" });
});

export default routes;