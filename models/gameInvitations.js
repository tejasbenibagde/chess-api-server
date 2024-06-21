// models/gameInvitations.js

const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const User = require("./users");

const GameInvitation = sequelize.define(
  "GameInvitation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    from_user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    to_user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    created_at: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.TIMESTAMP,
      defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    tableName: "gameInvitations",
    timestamps: false,
  }
);

module.exports = GameInvitation;
