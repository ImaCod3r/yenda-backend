import express from 'express';
import { createStore, removeStore, getAllStores, getStoreById } from '../controllers/storeController.js';
import authUser from '../middlewares/authUSer.js';
import IsAdmin from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/', getAllStores);
router.get('/:storeId', getStoreById);
router.post('/', authUser, IsAdmin, createStore);
router.delete('/:id/', authUser, IsAdmin, removeStore);

export default router;