import express from "express";
import authUser from "./authUserRoutes.js";
import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
import storeRoutes from "./storeRoutes.js";
import AuthStoreRoutes from "./authStoreRoutes.js";
import imageRoutes from "./imageUploadRoutes.js";

const routes = express.Router();

routes.use("/auth", authUser);
routes.use("/users", userRoutes);
routes.use("/products", productRoutes);
routes.use("/stores", storeRoutes);
routes.use("/store-auth", AuthStoreRoutes);
routes.use("/image", imageRoutes);

routes.get("/", (_, res) => {
  res.json({ message: "API Root Endpoint" });
});

export default routes;