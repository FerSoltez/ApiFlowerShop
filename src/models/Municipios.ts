import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';
import Localidad from './Localidades';

interface MunicipioAttributes {
  id: number;
  nombre: string;
  id_localidad: number;
}

class Municipio extends Model<MunicipioAttributes> implements MunicipioAttributes {
  public id!: number;
  public nombre!: string;
  public id_localidad!: number;
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
    },
    id_localidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Localidad,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Municipio",
    tableName: "municipios",
    timestamps: false,
  }
);

// Definir asociaciones
Localidad.hasMany(Municipio, { foreignKey: "id_localidad", as: "municipios" });
Municipio.belongsTo(Localidad, { foreignKey: "id_localidad", as: "localidad" });

export default Municipio;
