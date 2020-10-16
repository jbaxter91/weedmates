// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our db models
var db = require("../models");

//Require passport for authentication
var passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function (app) {


  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    console.log("/api/login Called");
    res.json(req.user);
  });

  //All we need from a user to create their profile is email, password, and a username
  app.post("/api/signup", function(req, res) {
    console.log("/api/signup Called");
    db.Users.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,

    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log("Error:", err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    console.log("Logout Called");
    req.logout();
    res.redirect("/login");
  });
};
