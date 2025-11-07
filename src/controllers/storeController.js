import Store from '../models/Store.js';

// Only general admin can create store
async function createStore(req, res) {
  try {
    const { name, description, email, photo, category, latitude, longitude, address, password } = req.body;
    const store = await Store.create({ name, description, email, photo, latitude, longitude, address, password, category });
    return res.status(201).json(store);
  } catch (err) {
    return res.status(500).json({ error: 'Error creating store', details: err.message });
  }
}

// Get all stores
async function getAllStores(_, res) {
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

async function removeStore(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Store.destroy({ where: { id } });
    if(!deleted) return res.status(404).json({ error: "Store not found."})
    res.status(204).json({ message: "Loja removida com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export { createStore, getAllStores, getStoreById, removeStore };