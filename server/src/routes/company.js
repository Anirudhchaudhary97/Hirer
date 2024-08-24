const express = require("express");
const { companyRegistration } = require("../controllers/company");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router= express.Router()

router.post("/company",isAuthenticated, companyRegistration);

module.exports = router;