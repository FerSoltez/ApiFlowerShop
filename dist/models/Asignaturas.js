"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const UnidadesAp_1 = __importDefault(require("./UnidadesAp"));
class Asignatura extends sequelize_1.Model {
}
Asignatura.init({
    id_asignatura: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Asignatura",
    tableName: "asignaturas",
    timestamps: false,
});
// Definir asociaciones
Asignatura.hasMany(UnidadesAp_1.default, { foreignKey: "id_asignatura", as: "unidades" });
exports.default = Asignatura;
