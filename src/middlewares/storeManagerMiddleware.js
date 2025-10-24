import StoreManager from '../models/StoreManager.js';

async function IsStoreManager(req, res, next) {
  const userId = req.user.id;
  const storeId = req.params.storeId || req.body.store_id;
  if (!storeId) return res.status(400).json({ error: 'Store not specified' });
  const manager = await StoreManager.findOne({ where: { user_id: userId, store_id: storeId } });
  if (!manager) return res.status(403).json({ error: 'Access restricted to store managers' });
  next();
}

export default IsStoreManager;