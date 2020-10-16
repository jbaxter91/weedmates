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
    console.log("/ Called");
    if (!req.user) {
      //User is not logged in so we need them to log in
      res.render("login");
      return;
    }
    //res.render("My Profile")
    res.render("userportal");
  });

  app.get("/userportal", isAuthenticated, function (req, res) {
    console.log("/userportal Called");
    res.render("userportal", { userID: req.user.id });
  });

  app.get("/login", function (req, res) {
    console.log("/login Called");
    if (!req.user) {
      //User is not logged in so we need them to log in
      res.render("login");

      return;
    } else {
      res.render("userportal");
    }
  });

  app.get("/create", function (req, res) {
    console.log("/create-account Called");
    res.render("create-account");
  });

  app.get("/weedmates", isAuthenticated, function (req, res) {
    console.log("/weedmates Called");
    res.render("findAmate", { userID: req.user.id });
  });

  app.get("/AboutUs", function (req, res) {
    console.log("/aboutus Called");
    res.render("landingPage");
  });

  app.get("/profile", isAuthenticated, function (req, res) {
    console.log("/profile Called");
    if (req.user.id) {
      res.render("profileEdit", { Authenticated: true, userID: req.user.id });
    } else {
      res.render("profileEdit", { Authenticated: false, userID: req.user.id });
    }
  });

  // blog route loads blog.html
  app.get("/:username", isAuthenticated, function (req, res) {
    if (req.params.username == "favicon.ico") {
      //Total Bullshit... this is a temp fix because for SOME reason it keeps sending favicon.ico as the username......
      return;
    }
    console.log(`/:username (${req.params.username}) Called`);
    db.Users.findOne({
      where: {
        username: req.params.username,
      },
    }).then(function (dbGet) {
      console.log("dbGet", dbGet);
      res.render("profileEdit", { Authenticated: false, userID: dbGet.id });
    });
  });
};
