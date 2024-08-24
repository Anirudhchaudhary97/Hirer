// defining schema
const mongoose = require("mongoose");
const { Schema } = mongoose;

const jobSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    salary: {
      type: Number,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    createdBy: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application"
        
      }],

  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
