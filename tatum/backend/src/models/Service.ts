import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(180),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  featured_image: {
    type: DataTypes.STRING(320),
    allowNull: true,
  },
  parent_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  order: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
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
  is_featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  sections: {
    type: DataTypes.JSON,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("sections");
      if (typeof rawValue === "string") {
        try {
          return JSON.parse(rawValue);
        } catch (e) {
          return [];
        }
      }
      return rawValue || [];
    },
  },
});

Service.belongsTo(Service, { foreignKey: "parent_id", as: "parent" });
Service.hasMany(Service, { foreignKey: "parent_id", as: "children" });

export default Service;
