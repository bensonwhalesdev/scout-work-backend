const express = require("express");
const { updateUser, getLoggedInUser, getAllUsers, getUserById } = require("../Controller/user.controller");
const authenticate = require("../middleware/auth.middleware");


const router = express.Router();

router.get("/all", getAllUsers);
router.get("/:id", getUserById);
router.use(authenticate);
router.get("/", getLoggedInUser);
router.patch("/:id", updateUser);

module.exports = router;