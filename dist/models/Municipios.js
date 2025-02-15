"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Localidades_1 = __importDefault(require("./Localidades"));
class Municipio extends sequelize_1.Model {
}
Municipio.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_localidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Localidades_1.default,
            key: "id",
        },
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Municipio",
    tableName: "municipios",
    timestamps: false,
});
// Definir asociaciones
Localidades_1.default.hasMany(Municipio, { foreignKey: "id_localidad", as: "municipios" });
Municipio.belongsTo(Localidades_1.default, { foreignKey: "id_localidad", as: "localidad" });
exports.default = Municipio;
