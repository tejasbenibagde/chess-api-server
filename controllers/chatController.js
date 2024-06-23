const Chat = require("../models/chats");

// Get all chat messages for a game
exports.getChatMessagesForGame = async (req, res) => {
  try {
    const { game_id } = req.params;
    const chatMessages = await Chat.findAll({
      where: { game_id },
      order: [["created_at", "ASC"]],
    });
    res.status(200).json(chatMessages);
  } catch (error) {
    console.error("Error fetching chat messages", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Send a new chat message
exports.sendChatMessage = async (req, res) => {
  try {
    const { game_id, user_id, message } = req.body;
    const newChatMessage = await Chat.create({ game_id, user_id, message });
    res.status(201).json(newChatMessage);
  } catch (error) {
    console.error("Error sending chat message", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
