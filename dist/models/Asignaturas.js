"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Asignatura extends sequelize_1.Model {
}
Asignatura.init({
    id_asignaturas: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    Profesor: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Duración: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Familia_carrera: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Numero_unidades: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Cuatrimestre: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Nivel_competencia: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    Objetivo_generales: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Asignatura",
    tableName: "asignaturas",
    timestamps: false,
});
// Definir asociaciones
exports.default = Asignatura;
