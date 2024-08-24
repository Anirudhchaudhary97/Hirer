const express = require("express");
const { companyRegistration, getAllCompany, getCompanyById, updateComapny } = require("../controllers/company");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

const router= express.Router()

router.post("/company",isAuthenticated, companyRegistration);

router.get("/company",isAuthenticated,getAllCompany);
router.get("/company/:id",isAuthenticated,getCompanyById);
router.put("/company/:id",isAuthenticated,updateComapny);

module.exports = router;