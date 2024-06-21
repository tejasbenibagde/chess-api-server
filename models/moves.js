// models/moves.js

const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const Game = require("./games");

const Move = sequelize.define(
  "Move",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    game_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Game,
        key: "id",
      },
    },
    move_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    from_square: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    to_square: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    piece: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "moves",
    timestamps: false,
  }
);

module.exports = Move;
