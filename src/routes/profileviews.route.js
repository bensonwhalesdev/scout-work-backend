const express = require("express");
const { recordProfileView, getFreelancerViews } = require("../Controller/profileview.controller");

const router = express.Router();

router.post("/", recordProfileView);
router.get("/freelancer/:freelancerId", getFreelancerViews);

module.exports = router;