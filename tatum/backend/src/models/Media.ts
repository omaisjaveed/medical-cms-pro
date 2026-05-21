import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Media = sequelize.define("Media", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  filename: {
    type: DataTypes.STRING(220),
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(320),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(60),
    allowNull: true,
  },
  size: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  folder: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
});

export default Media;
