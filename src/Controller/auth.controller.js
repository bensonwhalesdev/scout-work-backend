const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/auth.model");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const createToken = (userId, role) =>
  jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: "7d" });

// REGISTER
const register = async (req, res) => {
  try {
    const { firstName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      email,
      password: hashedPassword,
      role,
    });

    const token = createToken(user._id, user.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(user._id, user.role);

    res.status(200).json({
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

const logout = (_req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
};
