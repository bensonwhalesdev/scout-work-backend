const Offer = require("../Model/offerjob.model");
const jobOfferSchema = require("../schema/offerjob.schema");
const Apply = require("../Model/jobapply.model");

const sendJobOffer = async (req, res) => {
  try {
    const validated = jobOfferSchema.parse(req.body);

    const newOffer = new Offer({
      ...validated,
      status: validated.status || "pending",
    });

    await newOffer.save();
    res.status(201).json({ message: "Job offer sent successfully", offer: newOffer });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({ message: error.errors });
    }
    console.error("Job offer error:", error);
    res.status(500).json({ message: "Failed to send job offer" });
  }
};

const getOffersForFreelancer = async (req, res) => {
  try {
    const { freelancerId } = req.params;
    const offers = await Offer.find({ freelancerId }).populate("jobId employerId");
    res.status(200).json(offers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch offers" });
  }
};

const updateOfferStatus = async (req, res) => {
  try {
    const { offerId } = req.params;
    const { status } = req.body;

    const offer = await Offer.findByIdAndUpdate(offerId, { status }, { new: true });
    
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    // Mark application as responded
    await Apply.findOneAndUpdate(
      { jobId: offer.jobId, userId: offer.freelancerId },
      { status: "responded" }
    );
    
     res.status(200).json(offer);
  } catch (err) {
    res.status(500).json({ message: "Failed to update offer" });
  }
};


module.exports = {
  sendJobOffer,
  getOffersForFreelancer,
  updateOfferStatus
};
