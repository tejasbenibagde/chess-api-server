const express = require("express");
const router = express.Router();
const moveController = require("../controllers/moveController");

// Get all moves by game ID
router.get("/game/:game_id", moveController.getMovesByGameId);

// Create a new move
router.post("/", moveController.createMove);

// Update a move by move ID
router.put("/:id", moveController.updateMove);

// Delete a move by move ID
router.delete("/:id", moveController.deleteMove);

module.exports = router;
