const express = require("express");
const router = express.Router();
const userStatsController = require("../controllers/userStatsController");

// Get user stats by user ID
router.get("/:user_id", userStatsController.getUserStats);

// Update user stats by user ID
router.put("/:user_id", userStatsController.updateUserStats);

module.exports = router;
