const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

require("dotenv").config();
const port = process.env.PORT || 4000;

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// database connection
const dbConnect = require("./src/db/connection");
dbConnect();


const userRoute=require("./src/routes/user")
const companyRoute=require("./src/routes/company")
app.use(userRoute)
app.use(companyRoute)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
