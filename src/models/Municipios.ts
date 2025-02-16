import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';

interface MunicipioAttributes {
  id: number;
  nombre: string;
}

class Municipio extends Model<MunicipioAttributes> implements MunicipioAttributes {
  public id!: number;
  public nombre!: string;
}

Municipio.init(
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
    modelName: "Municipio",
    tableName: "municipios",
    timestamps: false,
  }
);

export default Municipio;
