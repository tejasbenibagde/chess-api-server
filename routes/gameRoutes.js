// routes/gameRoutes.js

const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// Define routes
router.get("/games", gameController.getAllGames);
router.post("/games", gameController.createGame);

module.exports = router;
