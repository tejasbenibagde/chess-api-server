// routes/friendRoutes.js

const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");

// Send a friend request
router.post("/", friendController.sendFriendRequest);

// Accept a friend request
router.post("/:id/accept", friendController.acceptFriendRequest);

// Reject a friend request
router.post("/:id/reject", friendController.rejectFriendRequest);

// Get all friends for a user
router.get("/user/:user_id", friendController.getFriendsByUserId);

// Remove a friend
router.delete("/:id", friendController.removeFriend);

module.exports = router;
