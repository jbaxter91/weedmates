// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function (req, res) {
    db.Users.findAll({}).then( (data) => {
      var hbsObject = {
        users: data,
      };
      console.log('data users', data.Users);
      console.log('hbsobj', hbsObject);
      console.log('data', data);
      res.render("index", hbsObject );
    });
  });

  app.get("/cms", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  app.get("/blog", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });
};