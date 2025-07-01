const { z } = require("zod");

const jobApplicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  message: z.string().min(10),
  jobId: z.string(),
});

module.exports = jobApplicationSchema;