import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Inquiry = sequelize.define("Inquiry", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  form_name: {
    type: DataTypes.STRING(140),
    allowNull: false,
    defaultValue: "contact",
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("New", "Read", "Replied"),
    defaultValue: "New",
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  reply_content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  payment_data: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});

export default Inquiry;
