const Friend = require("../models/friends");
const User = require("../models/users");
const GameInvitation = require("../models/gameInvitations");

// Send a friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { from_user_id, to_user_id } = req.body;
    const newRequest = await GameInvitation.create({
      from_user_id,
      to_user_id,
      status: "pending",
    });
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error sending friend request", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Accept a friend request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const invitation = await GameInvitation.findByPk(id);
    if (!invitation) {
      return res.status(404).json({ error: "Invitation not found" });
    }

    await Friend.create({
      user_id: invitation.from_user_id,
      friend_id: invitation.to_user_id,
    });
    await invitation.destroy();
    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.error("Error accepting friend request", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Reject a friend request
exports.rejectFriendRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const invitation = await GameInvitation.findByPk(id);
    if (!invitation) {
      return res.status(404).json({ error: "Invitation not found" });
    }

    await invitation.destroy();
    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    console.error("Error rejecting friend request", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all friends for a user
exports.getFriendsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;
    const friends = await Friend.findAll({
      where: { user_id },
      include: [
        { model: User, as: "FriendUser", attributes: ["id", "username"] },
      ],
    });
    res.status(200).json(friends);
  } catch (error) {
    console.error("Error fetching friends", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Remove a friend
exports.removeFriend = async (req, res) => {
  try {
    const { id } = req.params;
    const friend = await Friend.findByPk(id);
    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }

    await friend.destroy();
    res.status(200).json({ message: "Friend removed" });
  } catch (error) {
    console.error("Error removing friend", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
