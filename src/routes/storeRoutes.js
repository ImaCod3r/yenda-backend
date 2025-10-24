import express from 'express';
import { createStore, removeManager, addManager, getAllStores, getStoreById, getStoreManagers } from '../controllers/storeController.js';
import IsStoreManager from '../middlewares/storeManagerMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Public routes (still need authentication but no special roles)
router.get('/', getAllStores);
router.get('/:storeId', getStoreById);
router.get('/:storeId/managers', getStoreManagers);

// Admin routes
router.post('/', createStore);
router.post('/:storeId/managers', addManager);
router.delete('/:storeId/managers/:userId', removeManager);

export default router;
