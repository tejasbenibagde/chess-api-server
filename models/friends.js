// models/friends.js

const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const User = require("./users");

const Friend = sequelize.define(
  "Friend",
  {
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    friend_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    tableName: "friends",
    timestamps: false,
  }
);

module.exports = Friend;
