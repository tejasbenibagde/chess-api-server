const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const gameRoutes = require("./routes/gameRoutes");
const userRoutes = require("./routes/userRoutes");
const userStatsRoutes = require("./routes/userStatsRoutes");
const moveRoutes = require("./routes/moveRoutes");
const gameInvitationRoutes = require("./routes/gameInvitationRoutes");
const friendRoutes = require("./routes/friendRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { PORT } = require("./config");
require("./services/database");

require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());

const allowedOrigins = [
  "https://king-gambit.netlify.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/user-stats", userStatsRoutes);
app.use("/api/moves", moveRoutes);
app.use("/api/game-invitations", gameInvitationRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/chats", chatRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`API Server listening on port ${PORT}`);
});
