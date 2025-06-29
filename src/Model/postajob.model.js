const mongoose = require("mongoose");

const jobSchemaMongoose = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  region: { type: String },
  jobType: { type: String, enum: ["Full Time", "Part Time", "Internship"], required: true },
  isRemote: { type: Boolean, default: false },
  isOnsite: { type: Boolean, default: false },
  tags: { type: String },
  category: { type: String, required: true },
  description: { type: String, required: true },
  rate: { type: String },
  applyLink: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Scout-user", required: true },
}, { timestamps: true });

const Job = mongoose.model("Scout-Job", jobSchemaMongoose);

module.exports = Job;
