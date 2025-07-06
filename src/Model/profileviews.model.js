const mongoose = require("mongoose");

const profileViewSchema = new mongoose.Schema(
  {
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "Scout-user", required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "Scout-user", required: true },
    viewedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const ProfileView = mongoose.model("Scout-ProfileView", profileViewSchema);

module.exports = ProfileView;
