const Job = require("../Model/postajob.model")

const postJob = async (req, res) => {
  try {
    const userId = req.user.userId;
    const jobData = { ...req.validatedData, user: userId };

    const newJob = await Job.create(jobData);

    res.status(201).json({
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error.message);
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getUserJobs = async (req, res) => {
  try {
    const userId = req.user.userId;

    const jobs = await Job.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSingleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ job });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch job", error: err.message });
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch jobs", error });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user.userId) {
  return res.status(403).json({ message: "Unauthorized to update this job" });
}

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    res.status(500).json({ message: "Failed to update job", error });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized to delete this job" });
    }

    await job.deleteOne();
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete job", error });
  }
};

module.exports = { 
  postJob,
  getUserJobs,
  getSingleJob, 
  getAllJobs, 
  updateJob, 
  deleteJob };