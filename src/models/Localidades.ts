import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';

interface LocalidadAttributes {
  id: number;
  nombre: string;
}

class Localidad extends Model<LocalidadAttributes> implements LocalidadAttributes {
  public id!: number;
  public nombre!: string;
}

Localidad.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Localidad",
    tableName: "localidades",
    timestamps: false,
  }
);

export default Localidad;
