import express from 'express';
import { createStore, removeStore, getAllStores, getStoreById } from '../controllers/storeController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import IsAdmin from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', getAllStores);
router.get('/:storeId', getStoreById);
router.post('/', authMiddleware, IsAdmin, createStore);
router.delete('/:id/', authMiddleware, IsAdmin, removeStore);

export default router;