import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "SuperAdmin" | "Admin" | "Editor" | "Customer";
  status: "Active" | "Inactive";
}

interface UserCreationAttributes extends Omit<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "SuperAdmin" | "Admin" | "Editor" | "Customer";
  public status!: "Active" | "Inactive";

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(160),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("SuperAdmin", "Admin", "Editor", "Customer"),
      defaultValue: "Editor",
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
