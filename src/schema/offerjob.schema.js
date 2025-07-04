const { z } = require("zod");

const jobOfferSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  employerId: z.string().min(1, "Employer ID is required"),
  freelancerId: z.string().min(1, "Freelancer ID is required"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  status: z.enum(["pending", "accepted", "declined"]).optional(),
});

module.exports = jobOfferSchema;
