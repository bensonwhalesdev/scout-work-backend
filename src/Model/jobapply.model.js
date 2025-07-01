const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Scout-Job", required: true },
  resume: { type: String, required: true }, // path or URL to PDF
}, { timestamps: true });

const Apply = mongoose.model("Scout-JobApplication", jobApplicationSchema);

module.exports = Apply;