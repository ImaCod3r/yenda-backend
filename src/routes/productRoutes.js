import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import IsStoreManager from "../middlewares/storeManagerMiddleware.js";

const router = express.Router();

router.get("/", productController.getAll);
router.post("/", authMiddleware, productController.create);
router.put("/:id", authMiddleware, productController.update);
router.delete("/:id", authMiddleware, productController.remove);

// Rotas de produtos por loja (já requer authMiddleware)
router.get("/store/:storeId", productController.getStoreProducts);
router.post("/store/:storeId", authMiddleware, IsStoreManager, productController.createStoreProduct);

export default router;