const jobApplicationSchema = require("../schema/jobapply.schema.js")
const Apply = require("../Model/jobapply.model.js")


const submitApplication = async (req, res) => {
  try {
    const parsed = jobApplicationSchema.parse(req.body);
    
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }

    const newApp = new Apply({
      ...parsed,
      resume: req.file.path, // or `req.file.filename` depending on how you store it
    });

    await newApp.save();
    res.status(201).json({ message: "Application submitted successfully!" });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: error.errors });
    }
    res.status(500).json({ message: "Failed to submit application" });
  }
};

const getApplications = async (req, res) => {
  try {
    const apps = await Apply.find().sort({ createdAt: -1 });
    res.json(apps);
  } catch {
    res.status(500).json({ message: "Failed to fetch applications" });
  }
};

module.exports = {
    submitApplication,
    getApplications
}