import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';
import Municipio from './Municipios';

interface LocalidadAttributes {
  id: number;
  nombre: string;
  id_municipio: number;
}

class Localidad extends Model<LocalidadAttributes> implements LocalidadAttributes {
  public id!: number;
  public nombre!: string;
  public id_municipio!: number;
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
    },
    id_municipio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Municipio,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Localidad",
    tableName: "Localidades",
    timestamps: false,
  }
);

// Definir asociaciones
Municipio.hasMany(Localidad, { foreignKey: "id_municipio", as: "localidades" });
Localidad.belongsTo(Municipio, { foreignKey: "id_municipio", as: "municipio" });

export default Localidad;