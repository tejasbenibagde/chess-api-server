const express = require("express");
const router = express.Router();
const gameController = require("../controllers/gameController");

// Existing routes
router.post("/", gameController.createGame);
router.get("/", gameController.getAllGames);
router.get("/:id", gameController.getGameById);
router.put("/:id", gameController.updateGame);
router.delete("/:id", gameController.deleteGame);

// New route to get games by user ID
router.get("/user/:userId", gameController.getGamesByUserId);

module.exports = router;
