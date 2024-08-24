// defining schema
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      
    },
    phoneNumber:{
      type:Number,
      required: true,
     
    },
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["job seeker", "recruiter"],
      default: "job seeker",
    },

    profile: {
      bio: String, // String is shorthand for {type: String}
      skills: Array,
      resume: String,
      resumeOriginalName: String,
      company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
      profileImage: {
        type: String,
        default: "avatar",
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
