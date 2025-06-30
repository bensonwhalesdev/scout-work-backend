const User = require("../Model/auth.model");

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
  updateUser,
  getLoggedInUser
};
