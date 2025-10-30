import express from "express";
import { getAll, update, remove, getStoreProducts, createStoreProduct } from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAll);
router.put("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);
router.get("/stores/:storeId", getStoreProducts);
router.post("/stores/:storeId", authMiddleware, createStoreProduct);

export default router;