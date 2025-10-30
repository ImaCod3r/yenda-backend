import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const StoreCategory = sequelize.define("StoreCategory", {
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
    tableName: "store_categories",
    timestamps: true,
});

export default StoreCategory;