const { DataTypes } = require("sequelize");
const sequelize = require("../services/database");
const User = require("./users");

const Game = sequelize.define(
  "Game",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    white_player_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    black_player_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    start_time: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pgn: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    fen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    white_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    black_rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating_shift: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "games",
    timestamps: false,
  }
);

module.exports = Game;
