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

  // index route loads view.html
  app.get("/", function (req, res) {
    if (!req.user) {
      //User is not logged in so we need them to log in
      res.render("login");
      return;
    }
    //res.render("My Profile")
  });

  app.get("/userportal", isAuthenticated, function (req, res) {
    console.log(req.user);
    res.render("userportal");
  });

  app.get("/login", function (req, res) {
    res.render("login");
  });

  app.get("/create", function (req, res) {
    res.render("create-account");
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
        res.json(dbGet);
      });
    }
  });
};
