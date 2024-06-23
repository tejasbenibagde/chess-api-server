const GameInvitation = require("../models/gameInvitations");
const { Op } = require("sequelize");

// Send a game invitation
exports.sendInvitation = async (req, res) => {
  try {
    const invitation = await GameInvitation.create(req.body);
    res.status(201).json(invitation);
  } catch (error) {
    console.error("Error sending invitation", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Accept a game invitation
exports.acceptInvitation = async (req, res) => {
  try {
    const invitation = await GameInvitation.findByPk(req.params.id);
    if (!invitation) {
      return res.status(404).json({ error: "Invitation not found" });
    }
    invitation.status = "accepted";
    await invitation.save();
    res.json(invitation);
  } catch (error) {
    console.error("Error accepting invitation", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Reject a game invitation
exports.rejectInvitation = async (req, res) => {
  try {
    const invitation = await GameInvitation.findByPk(req.params.id);
    if (!invitation) {
      return res.status(404).json({ error: "Invitation not found" });
    }
    invitation.status = "rejected";
    await invitation.save();
    res.json(invitation);
  } catch (error) {
    console.error("Error rejecting invitation", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all invitations for a user
exports.getInvitationsByUserId = async (req, res) => {
  try {
    const invitations = await GameInvitation.findAll({
      where: {
        [Op.or]: [
          { from_user_id: req.params.user_id },
          { to_user_id: req.params.user_id },
        ],
      },
    });
    res.json(invitations);
  } catch (error) {
    console.error("Error fetching invitations", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
