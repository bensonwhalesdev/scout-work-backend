const express = require("express");
const { register, login } = require("../Controller/auth.controller");
const validate = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../schema/auth.schema");
const router = express.Router();


router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;