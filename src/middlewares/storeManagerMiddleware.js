import StoreManager from '../models/StoreManager.js';
import Product from '../models/Product.js';

async function IsStoreManager(req, res, next) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    // Prefer explicit storeId from params (e.g. /store/:storeId), then body, then resolve from product id
    let storeId = req.params.storeId || req.body.store_id;

    // If routes use :id for product operations (PUT/DELETE), resolve the product's store_id
    if (!storeId && req.params.id) {
      const product = await Product.findByPk(req.params.id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      storeId = product.store_id;
    }

    if (!storeId) return res.status(400).json({ error: 'Store not specified' });

    const manager = await StoreManager.findOne({ where: { user_id: userId, store_id: storeId } });
    if (!manager) return res.status(403).json({ error: 'Access restricted to store managers' });

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export default IsStoreManager;