// config.js

require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_NAME: process.env.DB_NAME || "chess_app",
};
