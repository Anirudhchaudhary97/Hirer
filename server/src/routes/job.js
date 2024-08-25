const express = require("express");

const { isAuthenticated } = require("../middlewares/isAuthenticated");
const {
  jobPost,
  getAllJob,
  getJobById,
  getJobByRecruiter,
} = require("../controllers/job");

const router = express.Router();

router.post("/job", isAuthenticated, jobPost);
router.get("/jobs", isAuthenticated, getAllJob);
router.get("/job/:id", isAuthenticated, getJobById);
router.get("/job", isAuthenticated, getJobByRecruiter);

module.exports = router;
