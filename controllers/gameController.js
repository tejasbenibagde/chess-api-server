// gameController.js

const { Op } = require("sequelize");
const Game = require("../models/games");
const User = require("../models/users");

// Create Game
exports.createGame = async (req, res) => {
  try {
    const {
      white_player_id,
      black_player_id,
      result,
      pgn,
      fen,
      white_rating,
      black_rating,
      rating_shift,
    } = req.body;

    // Create a new game record
    const game = await Game.create({
      white_player_id,
      black_player_id,
      result,
      pgn,
      fen,
      white_rating,
      black_rating,
      rating_shift,
    });

    res.status(201).json(game);
  } catch (error) {
    console.error("Error creating game", error);
    res.status(500).json({ error: error.message });
  }
};

// Get All Games
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.error("Error fetching games", error);
    res.status(500).json({ error: error.message });
  }
};

// Get Game by ID
exports.getGameById = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findByPk(id);

    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error("Error fetching game by ID", error);
    res.status(500).json({ error: error.message });
  }
};

// Update Game by ID
exports.updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      white_player_id,
      black_player_id,
      start_time,
      end_time,
      result,
      pgn,
      fen,
      white_rating,
      black_rating,
      rating_shift,
    } = req.body;

    const [updated] = await Game.update(
      {
        white_player_id,
        black_player_id,
        start_time,
        end_time,
        result,
        pgn,
        fen,
        white_rating,
        black_rating,
        rating_shift,
      },
      { where: { id } }
    );

    if (updated) {
      const updatedGame = await Game.findByPk(id);
      res.json(updatedGame);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error("Error updating game", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete Game by ID
exports.deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Game.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: "Game deleted" });
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (error) {
    console.error("Error deleting game", error);
    res.status(500).json({ error: error.message });
  }
};

// Get Games by User ID
exports.getGamesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const games = await Game.findAll({
      where: {
        [Op.or]: [{ white_player_id: userId }, { black_player_id: userId }],
      },
    });

    if (games.length > 0) {
      res.json(games);
    } else {
      res.status(404).json({ error: "No games found for this user" });
    }
  } catch (error) {
    console.error("Error fetching games by user ID", error);
    res.status(500).json({ error: error.message });
  }
};
