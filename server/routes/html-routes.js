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

    if(!req.user) 
    {
      //User is not logged in so we need them to log in
      res.render("login");
      return;
    }

    db.Users.findAll({raw: true}).then( (data) => {
      var hbsObject = {
        users: data,
      };
      console.log("Data:",data);
      console.log('hbsObject:',hbsObject);
      res.render("index", hbsObject );
    });
  });

  app.get("/userportal",isAuthenticated, function (req, res) {
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
  app.get("/blog", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });
};
