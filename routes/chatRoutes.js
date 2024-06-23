const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");

// Get all chat messages for a game
router.get("/game/:game_id", chatController.getChatMessagesForGame);

// Send a new chat message
router.post("/", chatController.sendChatMessage);

module.exports = router;
