const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["employer", "freelancer"], required: true },
});

const User = mongoose.model("Scout-user", userSchema);

module.exports = User;
