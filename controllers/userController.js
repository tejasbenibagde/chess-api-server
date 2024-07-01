const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { body, validationResult } = require("express-validator");

// Create User
exports.createUser = async (req, res) => {
  await body("username")
    .notEmpty()
    .withMessage("Username is required")
    .run(req);
  await body("email").isEmail().withMessage("Email is invalid").run(req);
  await body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain a special character")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;

    // Check if email or username already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user with default values for the new columns
    const user = await User.create({
      username,
      email,
      password_hash,
      total_games: 0,
      highest_rating: 1200,
      friends: 0,
      stats: 0.0,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user", error);
    res.status(500).json({ error: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  await body("email").isEmail().withMessage("Email is invalid").run(req);
  await body("password")
    .notEmpty()
    .withMessage("Password is required")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    console.log("Input password:", password);
    console.log("Stored hash:", user.password_hash);

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      console.error("Password mismatch", {
        inputPassword: password,
        storedHash: user.password_hash,
      });
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users", error);
    res.status(500).json({ error: error.message });
  }
};


exports.getUserById = async (req, res) => {
  // await body('id').isUUID(4).withMessage('ID must be a valid UUIDv4').run(req);

  // const errors = validationResult(req);

  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  try {
    const { id } = req.params;
    // Query logic to find user by ID (assuming id is treated as a UUID)
    const user = await User.findByPk(id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user by ID", error);
    res.status(500).json({ error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  await body("username")
    .optional()
    .notEmpty()
    .withMessage("Username is required")
    .run(req);
  await body("email")
    .optional()
    .isEmail()
    .withMessage("Email is invalid")
    .run(req);
  await body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain a special character")
    .run(req);
  await body("rating")
    .optional()
    .custom((value) => {
      if (!Number.isInteger(value) || value < 1 || value > 3000) {
        throw new Error("Rating must be an integer between 1 and 3000");
      }
      return true;
    })
    .run(req);
  await body("total_games")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Total games must be a non-negative integer")
    .run(req);
  await body("highest_rating")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Highest rating must be a non-negative integer")
    .run(req);
  await body("friends")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Friends must be a non-negative integer")
    .run(req);
  await body("stats")
    .optional()
    .isFloat({ min: -100.0, max: 100.0 })
    .withMessage("Stats must be a float between -100.0 and 100.0")
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const {
      username,
      email,
      password,
      rating,
      total_games,
      highest_rating,
      friends,
      stats,
    } = req.body;

    let password_hash;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password_hash = await bcrypt.hash(password, salt);
    }

    const [updated] = await User.update(
      {
        username,
        email,
        password_hash,
        rating,
        total_games,
        highest_rating,
        friends,
        stats,
      },
      { where: { id } }
    );

    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  await body("id").isInt().withMessage("ID must be a valid integer").run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error deleting user", error);
    res.status(500).json({ error: error.message });
  }
};
