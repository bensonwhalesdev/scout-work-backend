const express = require("express");
const { submitApplication, getApplications } = require("../Controller/jobapply.controller");
const uploadResume = require("../middleware/pdfUpload");


const router = express.Router();

router.post("/:id", uploadResume.single("resume"), submitApplication);
router.get("/", getApplications);

module.exports = router;
