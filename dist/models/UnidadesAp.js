"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Asignaturas_1 = __importDefault(require("./Asignaturas"));
class UnidadAprendizaje extends sequelize_1.Model {
}
UnidadAprendizaje.init({
    id_unidad: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    id_asignatura: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Asignaturas_1.default,
            key: "id_asignatura",
        },
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "UnidadAprendizaje",
    tableName: "unidades_aprendizaje",
    timestamps: false,
});
// Definir asociaciones
UnidadAprendizaje.belongsTo(Asignaturas_1.default, { foreignKey: "id_asignatura", as: "asignatura" });
exports.default = UnidadAprendizaje;
