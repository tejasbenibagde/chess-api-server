const { Sequelize } = require("sequelize");

// Replace with your Render external database URL
const DATABASE_URL =
  "postgresql://db_chess_game_user:uk1270E6cFSq0bl70IYC4ibVF1j7hztA@dpg-cq0kiu3v2p9s73cbqkq0-a.singapore-postgres.render.com/db_chess_game";

// Initialize Sequelize with the database URL
const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  ssl: {
    require: true, // Force SSL/TLS
    rejectUnauthorized: false, // Disable validation of SSL certificates
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // Disable logging SQL queries (optional)
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Synchronize models
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");
  } catch (err) {
    console.error("Error synchronizing database:", err);
  }
};

syncDatabase();

module.exports = sequelize;
