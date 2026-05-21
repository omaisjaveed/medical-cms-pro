import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface SettingAttributes {
  id: number;
  key: string;
  value: any;
}

interface SettingCreationAttributes extends Omit<SettingAttributes, "id"> {}

class Setting extends Model<SettingAttributes, SettingCreationAttributes> implements SettingAttributes {
  public id!: number;
  public key!: string;
  public value!: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Setting.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Setting",
  }
);

export default Setting;
