import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import UnidadAprendizaje from "./UnidadesAp";

interface AsignaturaAttributes {
  id_asignatura: number;
  nombre: string;
}

class Asignatura extends Model<AsignaturaAttributes> implements AsignaturaAttributes {
  public id_asignatura!: number;
  public nombre!: string;
}

Asignatura.init(
  {
    id_asignatura: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
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
Asignatura.hasMany(UnidadAprendizaje, { foreignKey: "id_asignatura", as: "unidades" });

export default Asignatura;
