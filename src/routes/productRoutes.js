import express from "express";
import { getAll, update, remove, getStoreProducts, createStoreProduct } from "../controllers/productController.js";
import authStore from "../middlewares/authStore.js";

const router = express.Router();

router.get("/", getAll);
router.put("/:id", authStore, update);
router.delete("/:id", authStore, remove);
router.get("/stores/:storeId", getStoreProducts);
router.post("/stores/:storeId", authStore, createStoreProduct);

export default router;