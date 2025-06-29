const express = require("express");
const validate = require("../middleware/validate.middleware");
const { jobSchema } = require("../schema/postajob.schema");
const { postJob, getAllJobs, updateJob, deleteJob, getUserJobs } = require("../Controller/postajob.controller");
const authenticate = require("../middleware/auth.middleware");
const verifyToken = require("../middleware/verify-Token.middleware");
const router = express.Router();

router.post("/", verifyToken, validate(jobSchema), postJob);
router.get('/my-jobs', verifyToken, getUserJobs);
router.get("/", getAllJobs);
router.patch("/:id", authenticate, validate(jobSchema), updateJob);
router.delete("/:id", authenticate, deleteJob);

module.exports = router;