import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';

interface UserAttributes {
  user_id: number;
  user_name: string;
  email: string;
  password: string;
  attempts: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public user_id!: number;
  public user_name!: string;
  public email!: string;
  public password!: string;
  public attempts!: number;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attempts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

export default User;