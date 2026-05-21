import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./User";

const BlogPost = sequelize.define("BlogPost", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(240),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true,
  },
  excerpt: {
    type: DataTypes.STRING(320),
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  featured_image: {
    type: DataTypes.STRING(320),
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("Published", "Draft"),
    defaultValue: "Published",
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

BlogPost.belongsTo(User, { foreignKey: "author_id", as: "author" });
User.hasMany(BlogPost, { foreignKey: "author_id", as: "posts" });

export default BlogPost;
