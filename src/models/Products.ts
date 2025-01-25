import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface ProductsAttributes {
  id: number;
  name: string;
  price: number;
  image: string;
  discount: number;
  quantity: number;
  description: string;
}

class Products extends Model<ProductsAttributes> implements ProductsAttributes {
  public id!: number;
  public name!: string;
  public price!: number;
  public image!: string;
  public discount!: number;
  public quantity!: number;
  public description!: string;
}

Products.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  image: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  discount: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0, // Valor predeterminado de descuento es 0
  },

  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  
}, {
  sequelize,
  modelName: 'Producto',
  tableName: 'Producto',
  timestamps: true,  // Agrega createdAt y updatedAt
});

export default Products;
