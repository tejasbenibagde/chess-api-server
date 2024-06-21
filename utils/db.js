const { Pool } = require("pg");

const pool = new Pool({
  user: "chess_user",
  host: "localhost",
  database: "chess_app",
  password: "tejas",
  port: 5432,
});

module.exports = pool;
