import Product from "../models/Product.js";
import Store from "../models/Store.js";
import IsStoreManager from "../middlewares/storeManagerMiddleware.js";

const productController = {
    async getAll(req, res) {
        try {
            const products = await Product.findAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async create(req, res) {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Product.update(req.body, { where: { id } });
            if (!updated) return res.status(404).json({ error: "Product not found" });
            const product = await Product.findByPk(id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async remove(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Product.destroy({ where: { id } });
            if (!deleted) return res.status(404).json({ error: "Product not found" });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Novos métodos para produtos por loja
    async getStoreProducts(req, res) {
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
    },

    async createStoreProduct(req, res) {
        try {
            const { storeId } = req.params;
            const store = await Store.findByPk(storeId);
            if (!store) return res.status(404).json({ error: "Store not found" });

            // Middleware storeManager já validou permissão
            const product = await Product.create({
                ...req.body,
                store_id: storeId
            });
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default productController;