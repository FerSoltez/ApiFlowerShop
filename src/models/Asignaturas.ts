import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';
import UnidadAprendizaje from './UnidadesAp';

interface AsignaturaAttributes {
  id_asignaturas: number;
  Nombre: string;
  Profesor?: string;
  Duración?: number;
  Familia_carrera?: string;
  Numero_unidades?: number;
  Cuatrimestre?: number;
  Nivel_competencia?: string;
  Objetivo_generales?: string;
}

class Asignatura extends Model<AsignaturaAttributes> implements AsignaturaAttributes {
  public id_asignaturas!: number;
  public Nombre!: string;
  public Profesor?: string;
  public Duración?: number;
  public Familia_carrera?: string;
  public Numero_unidades?: number;
  public Cuatrimestre?: number;
  public Nivel_competencia?: string;
  public Objetivo_generales?: string;
}

Asignatura.init(
  {
    id_asignaturas: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Profesor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Duración: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Familia_carrera: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Numero_unidades: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Cuatrimestre: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Nivel_competencia: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Objetivo_generales: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Asignatura",
    tableName: "asignaturas",
    timestamps: false,
  }
);

// Definir asociaciones
Asignatura.hasMany(UnidadAprendizaje, { foreignKey: "id_asignatura", as: "unidades_aprendizaje" });
UnidadAprendizaje.belongsTo(Asignatura, { foreignKey: "id_asignatura", as: "asignatura" });

export default Asignatura;
