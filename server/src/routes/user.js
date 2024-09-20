const express = require("express");
const { registerUser, loginUser, updateUser, logOut } = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const { upload } = require("../middlewares/multer");




  const router= express.Router()

  router.post("/register",upload, registerUser);
  router.post("/login", loginUser);
  router.get("/logout", logOut);
  router.put("/profile/:id",isAuthenticated, updateUser)
  module.exports = router;