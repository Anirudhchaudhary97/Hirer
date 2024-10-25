const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { getDataUri } = require("../utils/datauri");
const { cloudinary } = require("../utils/cloudinary");

// Register
const registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;

  // Validate required fields
  if (!fullName || !email || !phoneNumber || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // if user upload profile image while registering
  const file = req.file;
  let cloudResponse = null;
  if (file) {
    const fileUri = getDataUri(file);
    cloudResponse = await cloudinary.uploader.upload(fileUri.content);
  }

  try {
    // first check user's phone number or email already exist or not
    const phoneExist = await User.exists({ phoneNumber });
    const emailExist = await User.exists({ email });

    if (phoneExist) {
      return res
        .status(400)
        .json({ msg: "Phone Number is taken", success: false });
    } else if (emailExist) {
      return res.status(400).json({ msg: "Email is taken", success: false });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    // if user doesnot exit then create new user
    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
      profile: {
        profileImage: cloudResponse ? cloudResponse.secure_url :null, // Handle null image case
      },
    });

    res.json({ msg: "user successfully Register", success: true, user });
  } catch (error) {
    console.log(error);
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    // 1.check if user are register by their phoneNumber
    const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
    if (user) {
      // 2. if user exist then comapre the password
      const isPasswordMatched = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isPasswordMatched) {
        // const tokenData={
        //   userId:user._id
        // }

        const token = jwt.sign(
          { phoneNumber: req.body.phoneNumber }, // here we can also pass tokenData
          process.env.SECRECT_KEY,
          { expiresIn: "1d" }
        );

        res
          .status(200)
          .cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpsOnly: true,
            sameSite: "strict",
          })
          .json({ msg: "successfully login", user, success: true });
      } else {
        res.json({ msg: "Invalid Password" });
      }
    } else {
      res.json({ msg: "PhoneNumber doesnot exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

// Logout

const logOut = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      msg: "successfully logout",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// updateuser
const updateUser = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, bio, skills } = req.body;

    const file = req.file;
    // cloudinary comes here
    // Check if file is provided and proceed with the file handling only if it exists
    let cloudResponse = null;
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }
    const userId = req.user._id; // from authentication middleware
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        msg: "User not found.",
        success: false,
      });
    }
    // updating data
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    if (password) {
      // Check if the password is being updated
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      user.password = hashPassword;
    }

    // resume comes later here..
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // save the cloudinary url
      user.profile.resumeOriginalName = file.originalname; // Save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      msg: "Profile updated successfully.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "An error occurred while updating the user",
      error: error.message,
    });
  }
};

module.exports = updateUser;

module.exports = { registerUser, loginUser, logOut, updateUser };
