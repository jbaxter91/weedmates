// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

var passport = require("../config/passport");

// Routes
// =============================================================
module.exports = function (app) {
  // // GET route for getting all of the posts
  // app.get("/api/users/", function (req, res) {
  //   db.Users.findAll({}).then(function (dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    res.json(req.user);
  });

  app.post("/api/signup", function(req, res) {
    console.log("Trying to create user");
    console.log(req.body);
    db.Users.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,

    })
      .then(function() {
        console.log("Redirecting");
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log("Error:", err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // // Get route for retrieving a single post
  // app.get("/api/users/:id", function(req, res) {
  //   db.Users.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbGet) {
  //       res.json(dbGet);
  //     });
  // });

  // // Get route for retrieving a single post
  // app.get("/api/users/search/:username", function(req, res) {
  //   db.Users.findOne({
  //     where: {
  //       username: req.params.username
  //     }
  //   })
  //     .then(function(dbGet) {
  //       res.json(dbGet);
  //     });
  // });

  // // POST route for saving a new user
  // app.post("/api/users", function (req, res) {
  //   console.log(req.body);
  //   const { username, ipaddress, email, password } = req.body;
  //   db.Users.create({
  //     username,
  //     email,
  //     password,
  //     ipaddress
  //   }).then(function (dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  // // DELETE route for deleting posts
  // app.delete("/api/users:id", function(req, res) {
  //   db.Users.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbDelete) {
  //       res.json(dbDelete);
  //     });
  // });

  // // PUT route for updating posts
  // app.put("/api/posts", function(req, res) {
  //   db.Post.update(req.body,
  //     {
  //       where: {
  //         id: req.body.id
  //       }
  //     })
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });
};
