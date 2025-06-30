const express = require("express");
const { updateUser, getLoggedInUser } = require("../Controller/user.controller");
const authenticate = require("../middleware/auth.middleware");


const router = express.Router();

router.use(authenticate)
router.get("/", getLoggedInUser);
router.patch("/:id", updateUser);

module.exports = router;