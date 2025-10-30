import { DataTypes } from "sequelize";
import { sequelize }from "../config/database.js";

const ProductCategory = sequelize.define("ProductCategory", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "product_categories",
    timestamps: true,
}); 

export default ProductCategory;