const Company = require("../models/Company");
// register company
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
    res.status(401).json({
      msg: "An error occurred while creating the company",
      success: false,
      error: error.message,
    });
  }
};

// get all companay register by one user
const getAllCompany = async (req, res) => {
  try {
    const userId = req.user._id; // Assign the `userId` from the authenticated user
    const companies = await Company.find({ userId });
    res.status(200).json({
      msg: "company successfully found",
      companies,
      success: true,
    });
  } catch (error) {
    console.error("Company finding error:", error);
    res.status(401).json({
      msg: "An error occurred while finding the company",
      success: false,
      error: error.message,
    });
  }
};

//get one company by its id
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(401).json({
        msg: "company doesnot found",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "company successfully found",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Company finding by id error:", error);
    res.status(401).json({
      msg: "An error occurred while finding  the company its id",
      success: false,
      error: error.message,
    });
  }
};

//update company

const updateComapny = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json({
      msg: "company successfully updated",
      success: true,
      updatedCompany,
    });
  } catch (error) {
    console.error("Company updating error:", error);
    res.status(401).json({
      msg: "An error occurred while updating the company",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  companyRegistration,
  getAllCompany,
  getCompanyById,
  updateComapny,
};
