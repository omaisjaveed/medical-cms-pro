import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Page = sequelize.define("Page", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  slug: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Published", "Draft"),
    defaultValue: "Published",
  },
  meta_title: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  meta_description: {
    type: DataTypes.STRING(320),
    allowNull: true,
  },
});

export default Page;
