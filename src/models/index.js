import Store from './Store.js';
import Product from './Product.js';
import User from './User.js';
import StoreManager from './StoreManager.js';
import ProductCategory from './productCategory.js';
import StoreCategory from './storeCategory.js';

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

// Store - StoreManager - User associations
Store.hasMany(StoreManager, { foreignKey: 'store_id' });
StoreManager.belongsTo(Store, { foreignKey: 'store_id' });

User.hasMany(StoreManager, { foreignKey: 'user_id' });
StoreManager.belongsTo(User, { foreignKey: 'user_id' });

export { Store, Product, User, StoreManager };
