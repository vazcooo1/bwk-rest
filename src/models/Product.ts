import { Sequelize, DataTypes, Model } from 'sequelize';
import { Database } from '../config/sequelize';

const sequelize = new Database().getSequelize();

export class Product extends Model {
  public sku!: string;
  public price_bwk!: number;
  public price_atopems!: number;
  public price_MLA!: number;
  public stock_bwk!: number;
  public stock_atopems!: number;
  public stock_MLA!: number;
}

Product.init(
  {
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    price_bwk: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_atopems: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    price_MLA: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stock_bwk: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_atopems: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock_MLA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // this bit is important
    tableName: 'products',
  }
);
