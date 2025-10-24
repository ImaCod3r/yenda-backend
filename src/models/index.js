import Store from './Store.js';
import Product from './Product.js';
import User from './User.js';
import StoreManager from './StoreManager.js';

// Define associations between models
// Store - Product associations
Store.hasMany(Product, { foreignKey: 'store_id' });
Product.belongsTo(Store, { foreignKey: 'store_id' });

// Store - StoreManager - User associations
Store.hasMany(StoreManager, { foreignKey: 'store_id' });
StoreManager.belongsTo(Store, { foreignKey: 'store_id' });

User.hasMany(StoreManager, { foreignKey: 'user_id' });
StoreManager.belongsTo(User, { foreignKey: 'user_id' });

export { Store, Product, User, StoreManager };
