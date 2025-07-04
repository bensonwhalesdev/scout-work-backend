const express = require("express");
const { sendJobOffer, getOffersForFreelancer } = require("../Controller/offerjob.controller");
const router = express.Router();


router.post("/", sendJobOffer);
router.get("/freelancer/:freelancerId", getOffersForFreelancer);

module.exports = router;
