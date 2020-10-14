// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

// Routes
// =============================================================
module.exports = function (app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  //if the user is not logged in we want them to log in so we can make sure they are 21
  //if they are logged in we will take them to the user portal
  app.get("/", function (req, res) {
    if (!req.user) {
      //User is not logged in so we need them to log in
      res.render("login");
      return;
    }
    //res.render("My Profile")
    res.render("userportal");
  });

  app.get("/userportal", isAuthenticated, function (req, res) {
    res.render("userportal");
  });

  app.get("/login", function (req, res) {
    if (!req.user) {
      //User is not logged in so we need them to log in
      res.render("login");

      return;
    } else {
      res.render("userportal");
    }
  });

  app.get("/create", function (req, res) {
    res.render("create-account");
  });

  app.get("/WeedMates", function (req, res) {
    res.render("findAmate");
  });

  app.get("/AboutUs", function (req, res) {
    res.render("landingPage");
  });

  app.get("/profile", isAuthenticated, function (req, res) {
    if (req.user.id) {
      res.render("profileEdit", { Authenticated: true, userID: req.user.id });
    } else {
      res.render("profileEdit", { Authenticated: false, userID: req.user.id });
    }
  });

  // blog route loads blog.html
  app.get("/:username", function (req, res) {
    if (!req.user) {
      //User is not logged in so we need them to log in
      res.render("login");
      return;
    } else {
      //We ultimatly want to return the handlebars for the
      //profile display
      db.Users.findOne({
        where: {
          username: req.params.username,
        },
      }).then(function (dbGet) {
        let {
          id,
          username,
          email,
          weed_pref,
          description,
          city,
          state,
          country,
          lat,
          lon,
        } = dbGet;
        res.json({
          id,
          username,
          email,
          weed_pref,
          description,
          city,
          state,
          country,
          lat,
          lon,
        });
      });
    }
  });
};
