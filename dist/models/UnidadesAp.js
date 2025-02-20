"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class UnidadAprendizaje extends sequelize_1.Model {
}
UnidadAprendizaje.init({
    id_unidad: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_asignatura: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Asignaturas', // Referencia al nombre de la tabla
            key: "id_asignaturas",
        },
    },
    Competencia: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    Semanas: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Resultado_aprendizaje: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    Tareas_integradoras: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    Porcentaje_saber: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
    Porcentaje_saber_ser: {
        type: sequelize_1.DataTypes.DECIMAL(5, 2),
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "UnidadAprendizaje",
    tableName: "unidades_aprendizaje",
    timestamps: false,
});
exports.default = UnidadAprendizaje;
// Definir asociaciones
