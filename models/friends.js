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
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    tableName: "friends",
    timestamps: false,
  }
);

Friend.belongsTo(User, { as: "FriendUser", foreignKey: "friend_id" });

module.exports = Friend;
