const UserStats = require("../models/userStats");

// Get user stats by user ID
exports.getUserStats = async (req, res) => {
  try {
    const userStats = await UserStats.findOne({
      where: { user_id: req.params.user_id },
    });
    if (!userStats) {
      return res.status(404).json({ error: "User stats not found" });
    }
    res.json(userStats);
  } catch (error) {
    console.error("Error fetching user stats", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update user stats by user ID
exports.updateUserStats = async (req, res) => {
  try {
    const [updatedRows, [updatedStats]] = await UserStats.update(req.body, {
      where: { user_id: req.params.user_id },
      returning: true,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "User stats not found" });
    }

    res.json(updatedStats);
  } catch (error) {
    console.error("Error updating user stats", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
