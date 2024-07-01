const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 1200,
    },
    total_games: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    highest_rating: {
      type: DataTypes.INTEGER,
      defaultValue: 1200,
    },
    friends: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    stats: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;
