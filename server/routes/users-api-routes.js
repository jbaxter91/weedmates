// *********************************************************************************
// api-routes-users.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  //// GET route for getting all of the users
  // app.get("/api/users/", function (req, res) {
  //   db.Users.findAll({}).then(function (dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  

  // Get route for retrieving a single post
  app.get("/api/user-data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.Users.findOne({
        // include: [{
        //   model: UserRatings // will create a left join
        // }],
        where: { id: req.user.id },
      }).then(function (dbUser) {
        let {
          username,
          weed_pref,
          description,
          city,
          state,
          country,
          photo_urls,
        } = dbUser;
        res.json({
          email: req.user.email,
          id: req.user.id,
          username,
          weed_pref,
          description,
          city,
          state,
          country,
          photo_urls,
        });
      });
    }
  });

  // DELETE route for deleting posts
  app.delete("/api/user-data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else if (req.user.id == req.body.id) {
      db.Users.destroy({
        where: {
          id: req.params.id,
        },
      }).then(function (dbDelete) {
        res.json(dbDelete);
      });
    }
  });

  // PUT route for updating posts
  app.put("/api/user-data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else if (req.user.id == req.body.id) {
      db.Users.update(req.body, { where: { id: req.user.id } }).then(function (
        dbUser
      ) {
        res.json(dbUser);
      });
    } else {
      //If they get here... they hacker?
    }
  });
};
