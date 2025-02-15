import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';

interface UsuarioAttributes {
  id: number;
  nombre: string;
  apellidos: string;
  direccion: string;
  localidad: string;
  municipio: string;
  created_at?: Date;
}

class UsuarioModel extends Model<UsuarioAttributes> implements UsuarioAttributes {
  public id!: number;
  public nombre!: string;
  public apellidos!: string;
  public direccion!: string;
  public localidad!: string;
  public municipio!: string;
  public created_at?: Date;
}

UsuarioModel.init(
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
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    localidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    municipio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Usuarios",
    tableName: "usuarios",
    timestamps: false,
  }
);

export default UsuarioModel;
