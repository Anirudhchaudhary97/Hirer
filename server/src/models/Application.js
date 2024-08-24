// defining schema
const mongoose = require("mongoose");
const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    job: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    applicants: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status:{
        type:String,
        enum:["pending","selected","pending"],
        default:"pending"
    }
 
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application",applicationSchema);
module.exports = Application;
