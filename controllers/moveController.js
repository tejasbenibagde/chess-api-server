const Move = require("../models/moves");

// Get all moves by game ID
exports.getMovesByGameId = async (req, res) => {
  try {
    const moves = await Move.findAll({
      where: { game_id: req.params.game_id },
    });
    res.json(moves);
  } catch (error) {
    console.error("Error fetching moves", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new move
exports.createMove = async (req, res) => {
  try {
    const move = await Move.create(req.body);
    res.status(201).json(move);
  } catch (error) {
    console.error("Error creating move", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a move by move ID
exports.updateMove = async (req, res) => {
  try {
    const [updatedRows, [updatedMove]] = await Move.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Move not found" });
    }

    res.json(updatedMove);
  } catch (error) {
    console.error("Error updating move", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a move by move ID
exports.deleteMove = async (req, res) => {
  try {
    const deletedRows = await Move.destroy({ where: { id: req.params.id } });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Move not found" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Error deleting move", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
