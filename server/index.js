const express = require("express");
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cors());

// database connection
const dbConnect = require("./src/db/connection");
dbConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
