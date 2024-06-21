// models/userStats.js

const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const User = require("./users");

const UserStats = sequelize.define(
  "UserStats",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: User,
        key: "id",
      },
    },
    games_played: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    games_won: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    games_lost: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    games_drawn: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    current_streak: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    best_streak: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "userStats",
    timestamps: false,
  }
);

module.exports = UserStats;
