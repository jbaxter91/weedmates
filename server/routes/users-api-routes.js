// *********************************************************************************
// api-routes-users.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

var Sequelize = require("sequelize");

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
  app.get("/api/next-user", function (req, res) {
    console.log("/api/next-user Called");
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.UserRatings.findAll({
        where: { initiator_user_id: req.user.id },
      }).then(function (dbUser) {
        const Op = Sequelize.Op;
        let ratedAlready = [req.user.id];
        for (let i = 0; i < dbUser.length; i++) {
          ratedAlready.push(dbUser[i].target_user_id);
        }
        console.log("RATED", ratedAlready);
        db.Users.findOne({
          where: {
            id: {
              [Op.notIn]: ratedAlready,
            },
          },
          order: [
            ["lat", "DESC"],
            ["lon", "ASC"],
          ],
        }).then((nextMatch) => {
          //console.log("NEXT MATCH:", nextMatch);
          if (nextMatch) res.json(nextMatch);
          else res.json({});
        });
      });
    }
  });

  // Get route for retrieving a single post
  app.get("/api/user-data/:id", function (req, res) {
    console.log(`GET /api/user-data:${req.params.id} Called`);
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      db.Users.findOne({
        include: [db.UserRatings],
        where: { id: req.params.id },
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
    console.log("DELETE /api/user-data Called");
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
    console.log("PUT /api/user-data Called");
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
