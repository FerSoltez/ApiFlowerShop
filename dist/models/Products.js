"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class Products extends sequelize_1.Model {
}
Products.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    image: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    discount: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0, // Valor predeterminado de descuento es 0
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Products',
    tableName: 'Products',
    timestamps: true, // Agrega createdAt y updatedAt
});
exports.default = Products;
