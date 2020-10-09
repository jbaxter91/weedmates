// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
  // GET route for getting all of the posts
  app.get("/api/weedlikes/", function (req, res) {
    db.WeedLikes.findAll({}).then(function (dbGet) {
      res.json(dbGet);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/weedlikes/:id", function(req, res) {
    db.WeedLikes.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbGet) {
        res.json(dbGet);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/weedlikes/user/:UserId", function(req, res) {
    db.WeedLikes.findAll({
      where: {
        UserId: req.params.UserId
      }
    })
      .then(function(dbGet) {
        res.json(dbGet);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/weedlikes/search/:rating", function(req, res) {
    db.WeedLikes.findAll({
      where: {
        rating: req.params.rating
      }
    })
      .then(function(dbGet) {
        res.json(dbGet);
      });
  });

  // POST route for saving a new user
  app.post("/api/weedlikes", function (req, res) {
    console.log(req.body);
    const { rating, UserId, WeedStrainId } = req.body;
    db.WeedLikes.create({
      rating,
      UserId,
      WeedStrainId

    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // // DELETE route for deleting posts
  // app.delete("/api/weed/:id", function(req, res) {
  //   db.WeedLikes.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbDelete) {
  //       res.json(dbDelete);
  //     });
  // });
};
