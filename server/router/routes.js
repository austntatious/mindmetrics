"use strict";

// all routes for React-webpack frontend rendering

const express = require("express");
const router = express.Router();

const env = {
  production: process.env.NODE_ENV === "production"
};

// Route containing user profile so that they can share their info with friends
// * Add component to allow people to take their own personality profile
// app.get("/results/:id", function(req, res) {
//   // add handlers to find user's profile
//   console.log("INSIDE GET ROUTE FOR RESULTS");
//   User.findOne({"uuid" : req.params.id}).then(function(userData) {
//     console.log("userdata:", userData);
//     res.json(userData);
//   }, function(err) {
//     res.json(err);
//     console.log("Error finding user data: ", err);
//   });
// });          

router.get("/*", function(req, res) {
  res.render("index", {
    env: env
  });
});

module.exports = router;