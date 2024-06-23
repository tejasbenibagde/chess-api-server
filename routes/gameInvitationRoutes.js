const express = require("express");
const router = express.Router();
const gameInvitationController = require("../controllers/gameInvitationController");

// Send a game invitation
router.post("/", gameInvitationController.sendInvitation);

// Accept a game invitation
router.post("/:id/accept", gameInvitationController.acceptInvitation);

// Reject a game invitation
router.post("/:id/reject", gameInvitationController.rejectInvitation);

// Get all invitations for a user
router.get("/user/:user_id", gameInvitationController.getInvitationsByUserId);

module.exports = router;
