const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1️⃣ Check if username or password is missing
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // 2️⃣ Correctly destructure MySQL response
    const [existingUsers] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3️⃣ Ensure password is properly hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1️⃣ Check if username or password is missing
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // 2️⃣ Correctly destructure MySQL response
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    // 3️⃣ Ensure password is compared correctly
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 4️⃣ Ensure JWT_SECRET is properly set in .env file
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is missing" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};
