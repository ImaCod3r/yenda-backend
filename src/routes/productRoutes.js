import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import IsStoreManager from "../middlewares/storeManagerMiddleware.js";

const router = express.Router();

router.get("/", productController.getAll);
// router.post("/", authMiddleware, IsStoreManager, productController.create);
router.put("/:id", authMiddleware, IsStoreManager, productController.update);
router.delete("/:id", authMiddleware, IsStoreManager, productController.remove);

// Rotas de produtos por loja (já requer authMiddleware)
router.get("/stores/:storeId", productController.getStoreProducts);
router.post("/stores/:storeId", authMiddleware, IsStoreManager, productController.createStoreProduct);

export default router;