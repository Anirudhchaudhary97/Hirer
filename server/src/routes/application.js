const express = require("express");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require("../controllers/application");

const router= express.Router()

router.get("/application/apply/:id",isAuthenticated, applyJob);

router.get("/application/applied",isAuthenticated, getAppliedJobs);
router.get("/application/:id/applicant",isAuthenticated, getApplicants);
router.post("/application/:id/status",isAuthenticated, updateStatus);


module.exports = router;