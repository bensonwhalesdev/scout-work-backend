const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    email: { type: String, unique: true, index: true, },
    password: String,
    role: String,
  },
  { timestamps: true }
);

const User = mongoose.model("Scout-user", userSchema);

module.exports = User;
