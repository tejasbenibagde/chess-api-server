// models/chats.js

const { DataTypes } = require('sequelize');
const sequelize = require('../services/database');
const Game = require('./games');
const User = require('./users');

const Chat = sequelize.define('Chat', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  game_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Game,
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, {
  tableName: 'chats',
  timestamps: false
});

module.exports = Chat;
