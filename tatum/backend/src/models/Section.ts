import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import Page from "./Page";

const parseJsonContent = (value: unknown) => {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const Section = sequelize.define("Section", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  page_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(80),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(220),
    allowNull: true,
  },
  order: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  },
  content: {
    type: DataTypes.JSON,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("content");
      return parseJsonContent(rawValue);
    },
  },
});

Section.belongsTo(Page, { foreignKey: "page_id", as: "page" });
Page.hasMany(Section, { foreignKey: "page_id", as: "sections" });

export default Section;
