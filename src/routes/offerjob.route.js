const express = require("express");
const { sendJobOffer, getOffersForFreelancer, updateOfferStatus } = require("../Controller/offerjob.controller");
const router = express.Router();


router.post("/", sendJobOffer);
router.get("/freelancer/:freelancerId", getOffersForFreelancer);
router.patch("/:offerId", updateOfferStatus)

module.exports = router;
