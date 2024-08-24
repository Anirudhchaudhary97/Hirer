// register company

const Company = require("../models/Company");

const companyRegistration = async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(401).json({
        msg: "company name is required",
        success: false,
      });
    }

    const companyExist = await Company.findOne({ name: req.body.name });
    if (companyExist) {
      return res.status(401).json({
        msg: "This company name is already exist",
        success: false,
      });
    }

    // Create the new company with `userId` set to the authenticated user's ID
    const company = await Company.create({
      ...req.body,
      userId: req.user._id, // Assign the `userId` from the authenticated user
    });
    res.json({
      msg: "company successfully created",
      success: true,
      company,
    });
  } catch (error) {
    console.error("Company registration error:", error);
    res.status(500).json({
      msg: "An error occurred while creating the company",
      success: false,
      error: error.message,
    });
  }
};

module.exports = { companyRegistration };
