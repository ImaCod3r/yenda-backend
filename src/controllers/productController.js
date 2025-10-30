import Product from "../models/Product.js";
import Store from "../models/Store.js";

async function getAll(req, res) {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const [updated] = await Product.update(req.body, { where: { id } });
        if (!updated) return res.status(404).json({ error: "Product not found" });
        const product = await Product.findByPk(id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({ where: { id } });
        if (!deleted) return res.status(404).json({ error: "Product not found" });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Novos métodos para produtos por loja
async function getStoreProducts(req, res) {
    try {
        const { storeId } = req.params;
        const store = await Store.findByPk(storeId);
        if (!store) return res.status(404).json({ error: "Store not found" });

        const products = await Product.findAll({
            where: { store_id: storeId },
            order: [['createdAt', 'DESC']]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createStoreProduct(req, res) {
    try {
        const { storeId } = req.params;
        const store = await Store.findByPk(storeId);
        if (!store) return res.status(404).json({ error: "Store not found" });
        // Delegate to shared create logic (ensures consistent validation)
        req.body.store_id = req.body.store_id || storeId;
        return createProduct(req, res);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Helper used by both create endpoints
async function createProduct(req, res) {
    try {
        const storeId = req.params.storeId || req.body.store_id;
        if (!storeId) return res.status(400).json({ error: 'store_id is required' });

        const store = await Store.findByPk(storeId);
        if (!store) return res.status(404).json({ error: 'Store not found' });

        const productData = { ...req.body, store_id: storeId };
        const product = await Product.create(productData);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { createStoreProduct, getAll, getStoreProducts, remove, update }