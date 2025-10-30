import Store from './Store.js';
import Product from './Product.js';
import User from './User.js';
import ProductCategory from './productCategory.js';
import StoreCategory from './StoreCategory.js';

// Define associations between models

// Store - Product associations
Store.hasMany(Product, { foreignKey: 'store_id' });
Product.belongsTo(Store, { foreignKey: 'store_id' });

// Define associations for ProductCategory
ProductCategory.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(ProductCategory, { foreignKey: 'category_id' });

// Define associations for StoreCategory
StoreCategory.hasMany(Store, { foreignKey: 'category_id' });
Store.belongsTo(StoreCategory, { foreignKey: 'category_id' });

export { Store, Product, User };
