import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Asignatura from "./Asignaturas";

interface UnidadAprendizajeAttributes {
  id_unidad: number;
  nombre: string;
  id_asignatura: number;
}

class UnidadAprendizaje extends Model<UnidadAprendizajeAttributes> implements UnidadAprendizajeAttributes {
  public id_unidad!: number;
  public nombre!: string;
  public id_asignatura!: number;
}

UnidadAprendizaje.init(
  {
    id_unidad: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_asignatura: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Asignatura,
        key: "id_asignatura",
      },
    },
  },
  {
    sequelize,
    modelName: "UnidadAprendizaje",
    tableName: "unidades_aprendizaje",
    timestamps: false,
  }
);

// Definir asociaciones
UnidadAprendizaje.belongsTo(Asignatura, { foreignKey: "id_asignatura", as: "asignatura" });

export default UnidadAprendizaje;
