const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    email: { type: String, unique: true, index: true, },
    password: String,
    role: String,
    phone: { type: String, default: "" },
    position: { type: String, default: "" },
    aboutMe: { type: String, default: "" },
    avatar: { type: String, default: "" }
  },
  { timestamps: true }
);

const User = mongoose.model("Scout-user", userSchema);

module.exports = User;
