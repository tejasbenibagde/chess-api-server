const Game = require("../models/games");

exports.createGame = async (req, res) => {
  try {
    const {
      white_player_id,
      black_player_id,
      start_time,
      end_time,
      result,
      pgn,
      fen,
    } = req.body;
    const game = await Game.create({
      white_player_id,
      black_player_id,
      start_time,
      end_time,
      result,
      pgn,
      fen,
    });
    res.status(201).json(game);
  } catch (error) {
    console.error("Error creating game", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.findAll();
    res.json(games);
  } catch (error) {
    console.error("Error fetching games", error);
    res.status(500).json({ error: error.message });
  }
};

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
