const { z } = require("zod");

const jobSchema = z.object({
  title: z.string().min(3),
  company: z.string().min(3),
  location: z.string().min(2),
  region: z.string().optional(),
  jobType: z.enum(["Full Time", "Part Time", "Internship"]),
  isRemote: z.boolean().optional(),
  isOnsite: z.boolean().optional(),
  tags: z.string().optional(),
  category: z.string(),
  description: z.string().min(10),
  rate: z.string().optional(),
  applyLink: z.string().optional(),
});

module.exports = { jobSchema };
