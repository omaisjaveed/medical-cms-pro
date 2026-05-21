import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

const Testimonial = sequelize.define("Testimonial", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  author_name: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  author_title: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  image: {
    type: DataTypes.STRING(320),
    allowNull: true,
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  order: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0,
  },
});

Testimonial.belongsTo(User, { foreignKey: "author_id", as: "author", constraints: false });

export default Testimonial;
