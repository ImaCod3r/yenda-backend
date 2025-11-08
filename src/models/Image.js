import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Image = sequelize.define("Image", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
    },
});

export default Image;