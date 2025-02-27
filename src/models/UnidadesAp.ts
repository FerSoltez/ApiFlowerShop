import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';
import Asignatura from './Asignaturas';

interface UnidadAprendizajeAttributes {
  id_unidad: number;
  id_asignaturas: number;
  Competencia?: string;
  Semanas?: number;
  Resultado_aprendizaje?: string;
  Tareas_integradoras?: string;
  Porcentaje_saber?: number;
  Porcentaje_saber_ser?: number;
}

class UnidadAprendizaje extends Model<UnidadAprendizajeAttributes> implements UnidadAprendizajeAttributes {
  public id_unidad!: number;
  public id_asignaturas!: number;
  public Competencia?: string;
  public Semanas?: number;
  public Resultado_aprendizaje?: string;
  public Tareas_integradoras?: string;
  public Porcentaje_saber?: number;
  public Porcentaje_saber_ser?: number;
}

UnidadAprendizaje.init(
  {
    id_unidad: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_asignaturas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Asignaturas', // Referencia al nombre de la tabla
        key: "id_asignaturas",
      },
    },
    Competencia: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Semanas: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Resultado_aprendizaje: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Tareas_integradoras: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Porcentaje_saber: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
    Porcentaje_saber_ser: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UnidadAprendizaje",
    tableName: "unidades_aprendizaje",
    timestamps: false,
  }
);

export default UnidadAprendizaje;

// Definir asociaciones
