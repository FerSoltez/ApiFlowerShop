"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Municipios_1 = __importDefault(require("./Municipios"));
class Localidad extends sequelize_1.Model {
}
Localidad.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_municipio: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Municipios_1.default,
            key: "id",
        },
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Localidad",
    tableName: "Localidades",
    timestamps: false,
});
// Definir asociaciones
Municipios_1.default.hasMany(Localidad, { foreignKey: "id_municipio", as: "localidades" });
Localidad.belongsTo(Municipios_1.default, { foreignKey: "id_municipio", as: "municipio" });
exports.default = Localidad;
