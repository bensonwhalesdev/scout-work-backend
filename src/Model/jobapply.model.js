const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Scout-Job", required: true },
  message: { type: String, required: true },
  resume: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Scout-user", required: true },
  status: { type: String, enum: ["pending", "responded"], default: "pending", }
}, { timestamps: true });

const Apply = mongoose.model("Scout-JobApplication", jobApplicationSchema);

module.exports = Apply;