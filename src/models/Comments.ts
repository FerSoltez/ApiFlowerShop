import { DataTypes, Model } from "sequelize";
import { sequelize } from '../config/database';
import User from './Userss';

interface CommentAttributes {
  id_comment: number;
  id_user: number;
  comment: string;
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id_comment!: number;
  public id_user!: number;
  public comment!: string;
}

Comment.init(
  {
    id_comment: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_id",
      },
      onDelete: 'CASCADE',
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false,
  }
);

// Definir asociaciones
User.hasMany(Comment, { foreignKey: "id_user", as: "comments" });
Comment.belongsTo(User, { foreignKey: "id_user", as: "user" });

export default Comment;