const mongoose = require("mongoose");

const jobOfferSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Scout-Job", required: true },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "Scout-user", required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "Scout-user", required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
  },
  { timestamps: true }
);

const Offer = mongoose.model("scout-job-offer", jobOfferSchema);

module.exports = Offer;
