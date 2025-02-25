"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Userss_1 = __importDefault(require("./Userss"));
class Comment extends sequelize_1.Model {
}
Comment.init({
    id_comment: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_user: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Userss_1.default,
            key: "user_id",
        },
        onDelete: 'CASCADE',
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Comment",
    tableName: "comments",
    timestamps: false,
});
// Definir asociaciones
Userss_1.default.hasMany(Comment, { foreignKey: "id_user", as: "comments" });
Comment.belongsTo(Userss_1.default, { foreignKey: "id_user", as: "user" });
exports.default = Comment;
