const Job = require("../models/Job");

// create job post

const jobPost = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      experience,
      salary,
      jobType,
      location,
      position,
      companyId,
    } = req.body;
    const userId = req.user._id; // Assign the `userId` from the authenticated user

    if (
      !title ||
      !description ||
      !requirements ||
      !experience ||
      !salary ||
      !jobType ||
      !location ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        msg: "All feild are required",
        success: false,
      });
    }

    const job = await Job.create({ 
        title,
        description,
        requirements:requirements.split(","),
        experience,
        jobType,
        position,
        salary:Number(salary),
        location,
        company:companyId,
        createdBy: userId 

     });
     res.status(200).json({
        msg:"job successfully created",
        job,
        success:true
     })
  } catch (error) {
    console.error("Job posting error:", error);
    res.status(401).json({
      msg: "An error occurred while posting the job",
      success: false,
      error: error.message,
    });
  }
};

// get all the jobs

const getAllJob=async(req,res)=>{
    try {
        const keyword=req.query.keyword || "" ;
        const query={
            $or:[
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        }
        
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            msg:"job successfully found",
            jobs,
            success: true
        })

    } catch (error) {
        console.error("all job geting error:", error);
        res.status(401).json({
          msg: "An error occurred while geting all the job",
          success: false,
          error: error.message,
        });
    }
}

// get job by Id
 const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
    return res.status(200).json({ job, success: true });
    } catch (error) {
        console.error("Job finding by Id error:", error);
        res.status(401).json({
          msg: "An error occurred while finding the job by its Id",
          success: false,
          error: error.message,
        });
    }
}

// find job created by one recruiter
const getJobByRecruiter = async (req, res) => {
    try {
        const recruiterId = req.user._id;// Assign the `userId` from the authenticated user
        // console.log(recruiterId)
        const jobs = await Job.find({ createdBy:recruiterId })
        // console.log(jobs)
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.error("Job finding  error:", error);
        res.status(401).json({
          msg: "An error occurred while finding the job created by one recruiter",
          success: false,
          error: error.message,
        });
    }
}

module.exports={jobPost,getAllJob,getJobById,getJobByRecruiter}
