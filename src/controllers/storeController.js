import StoreManager from '../models/StoreManager.js';
import Store from '../models/Store.js';
import User from '../models/User.js';

// Only general admin can create store
async function createStore(req, res) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admin can create store' });
  }
  try {
    const { name, description, photo, category, latitude, longitude, address, password } = req.body;
    const store = await Store.create({ name, description, photo, latitude, longitude, address, password, category });
    return res.status(201).json(store);
  } catch (err) {
    return res.status(500).json({ error: 'Error creating store', details: err.message });
  }
}

// Only general admin can add manager
async function addManager(req, res) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admin can add manager' });
  }
  try {
    const { user_id } = req.body;
    const store_id = req.params.storeId;
    // Check if user exists
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Check if already manager
    const exists = await StoreManager.findOne({ where: { user_id, store_id } });
    if (exists) return res.status(400).json({ error: 'User is already manager of this store' });
    await StoreManager.create({ user_id, store_id });
    return res.status(201).json({ message: 'Manager added successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Error adding manager', details: err.message });
  }
}

// Only general admin can remove manager
async function removeManager(req, res) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Only admin can remove manager' });
  }
  try {
    const { userId } = req.params;
    const store_id = req.params.storeId;

    // If query param deleteStore=true, delete the whole store (admin only)
    if (req.query.deleteStore === 'true' || req.query.deleteStore === '1') {
      const store = await Store.findByPk(store_id);
      if (!store) return res.status(404).json({ error: 'Store not found' });
      await store.destroy();
      return res.json({ message: 'Store deleted successfully' });
    }

    // Otherwise remove a manager from the store
    const manager = await StoreManager.findOne({ where: { user_id: userId, store_id } });
    if (!manager) return res.status(404).json({ error: 'Manager not found in this store' });
    await manager.destroy();
    return res.json({ message: 'Manager removed successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Error removing manager', details: err.message });
  }
}

// Get all stores
async function getAllStores(req, res) {
  try {
    const stores = await Store.findAll({
      attributes: { exclude: ['password'] }, // Don't send password in response
      order: [['created_at', 'DESC']]
    });
    return res.json(stores);
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching stores', details: err.message });
  }
}

// Get store by id
async function getStoreById(req, res) {
  try {
    const { storeId } = req.params;
    const store = await Store.findByPk(storeId, {
      attributes: { exclude: ['password'] } // Don't send password in response
    });

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    return res.json(store);
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching store', details: err.message });
  }
}

// Lista todos os managers de uma loja
async function getStoreManagers(req, res) {
  try {
    const { storeId } = req.params;
    
    // Verifica se a loja existe
    const store = await Store.findByPk(storeId);
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    // Busca os managers com informações do usuário
    const managers = await StoreManager.findAll({
      where: { store_id: storeId },
      include: [{
        model: User,
        attributes: ['id', 'name', 'email'] // Excluindo dados sensíveis do usuário
      }],
      order: [['created_at', 'DESC']]
    });

    return res.json(managers);
  } catch (err) {
    return res.status(500).json({ error: 'Error fetching store managers', details: err.message });
  }
}

export { createStore, addManager, removeManager, getAllStores, getStoreById, getStoreManagers };