import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

// Register a new user
async function register(req, res) {
  try {
    const {
      name,
      number,
      email,
      password,
      street,
      photo
    } = req.body;

    // Validate required fields
    if (!name || !number || !email || !password) {
      return res.status(400).json({
        error: "Missing required fields.",
        details: {
          name: !name ? "Name is required" : null,
          number: !number ? "Number is required" : null,
          email: !email ? "Email is required" : null,
          password: !password ? "Password is required" : null,
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered." });
    }

    // Create new user
    const user = await User.create({
      name,
      number,
      email,
      password,
      street: street || null,
      photo: photo || null,
    });

    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        street: user.street,
      },
    });
  } catch (err) {
    console.error("Register error:", err);

    // More detailed error response
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: "Validation error.",
        details: err.errors.map(e => ({ field: e.path, message: e.message }))
      });
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: "Email already registered." });
    }

    return res.status(500).json({
      error: "Error registering user.",
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}

// Login with JWT + cookie
async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password." });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
    });

    return res.json({
      message: "Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: token
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
}

// Logout (clear cookie)
async function logout(req, res) {
  res.clearCookie("token");
  return res.json({ message: "Logout successful." });
}

// Protected route - get user profile
async function profile(req, res) {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: [
        "id",
        "name",
        "number",
        "email",
        "photo",
        "street",
        "role",
      ],
    });

    if (!user) return res.status(404).json({ error: "User not found." });

    return res.json({ user });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ error: "Error loading user profile." });
  }
}

export { register, login, logout, profile };