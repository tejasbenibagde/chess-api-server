// app.js

const express = require("express");
const bodyParser = require("body-parser");
const gameRoutes = require("./routes/gameRoutes");
const { PORT } = require("./config");
require("./services/database"); // Initialize database connection

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", gameRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`API Server listening on port ${PORT}`);
});
