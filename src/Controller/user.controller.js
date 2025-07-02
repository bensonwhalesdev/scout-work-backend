const User = require("../Model/auth.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude sensitive data
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getLoggedInUser = async (req, res) => {
  const userId = req.user.userId;
  const user = await User.findById(userId);
  res.json(user);
};

const updateUser = async (req, res) => {
  try {
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: updatedUser, message: "Profile updated" });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  getLoggedInUser
};
