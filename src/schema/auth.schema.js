const { z } = require("zod");

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Password must include one uppercase letter, one number, and one special character"
    ),
  role: z.enum(["employer", "freelancer"]),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
