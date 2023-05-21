// src/models/Token.ts

import { Sequelize, DataTypes, Model } from 'sequelize';
import { Database } from '../config/sequelize';

const sequelize = new Database().getSequelize();

export class Token extends Model {
  public id!: number; // note this is the primary key and auto incremented
  public accessToken!: string;
  public refreshToken!: string;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    accessToken: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize, // this bit is important
    tableName: 'tokens',
  }
);