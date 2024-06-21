// controllers/gameController.js

const Game = require("../models/games");

// Example controller functions
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (err) {
    console.error("Error fetching games", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createGame = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newGame = await Game.create({ name, description });
    res.status(201).json(newGame);
  } catch (err) {
    console.error("Error creating game", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
