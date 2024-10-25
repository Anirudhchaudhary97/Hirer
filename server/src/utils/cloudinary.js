// import { v2 as cloudinary } from 'cloudinary';

// Require the Cloudinary library
const cloudinary = require('cloudinary').v2
require("dotenv").config();


    // Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.CLOUD_API_KEY,
        api_secret:process.env.CLOUD_SECRECT_KEY
    });

    module.exports={cloudinary}