const ProfileView = require("../Model/profileviews.model");

const recordProfileView = async (req, res) => {
  try {
    const { employerId, freelancerId } = req.body;

    if (!employerId || !freelancerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await ProfileView.create({ employerId, freelancerId });
    res.status(201).json({ message: "Profile view recorded" });
  } catch (err) {
    console.error("Profile view error:", err);
    res.status(500).json({ message: "Failed to record profile view" });
  }
};

const getFreelancerViews = async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const views = await ProfileView.find({ freelancerId }).populate("employerId", "name email");
    res.status(200).json(views);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile views" });
  }
};

module.exports = { recordProfileView, getFreelancerViews };
