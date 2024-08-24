const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// Register
const registerUser = async (req, res) => {
  const { fullName, email, phoneNumber, password, role } = req.body;

  // Validate required fields
  if (!fullName || !email || !phoneNumber || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // first check user's phone number or email already exist or not
    const phoneExist = await User.exists({ phoneNumber });
    const emailExist = await User.exists({ email });

    if (phoneExist) {
      return res.status(400).json({ msg: "Phone Number is taken" });
    } else if (emailExist) {
      return res.status(400).json({ msg: "Email is taken" });
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    // if user doesnot exit then create new user
    const user = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashPassword,
      role,
    });
    console.log(user);
    res.json({ msg: "user successfully Register" });
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
          { phoneNumber: req.body.phoneNumber },  // here we can also pass tokenData
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
          .json({ msg: "successfully login", user });
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

const logOut= async(req,res)=>{
     try {
      return res.status(200).cookie("token",'',{maxAge:0}).json({
        msg:'successfully logout',
        success:true
      })
      
     } catch (error) {
        console.log(error)
     }
}

// updateuser
const updateUser = async (req, res) => {
  try {
    // Check if the password is being updated
    if (req.body.password) {
      // Hash the new password
      const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
      req.body.password = hashPassword;
    }

    // Update the user with the potentially hashed password
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    res.status(200).json({
      msg: "User details updated",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "An error occurred while updating the user",
      error: error.message,
    });
  }
};





module.exports = { registerUser, loginUser,logOut ,updateUser};
