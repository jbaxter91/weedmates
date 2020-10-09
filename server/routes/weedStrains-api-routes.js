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
  app.get("/api/weed/", function (req, res) {
    db.WeedStrains.findAll({}).then(function (dbGet) {
      res.json(dbGet);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/weed/:id", function(req, res) {
    db.WeedStrains.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbGet) {
        res.json(dbGet);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/weed/search/:name", function(req, res) {
    db.WeedStrains.findOne({
      where: {
        name: req.params.name
      }
    })
      .then(function(dbGet) {
        res.json(dbGet);
      });
  });

  // POST route for saving a new user
  app.post("/api/weed", function (req, res) {
    console.log(req.body);
    const { name, medical_use, positive_effects, negitive_effects, flavor} = req.body;
    db.WeedStrains.create({
      name,
      medical_use,
      positive_effects,
      negitive_effects,
      flavor
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // // DELETE route for deleting posts
  // app.delete("/api/weed/:id", function(req, res) {
  //   db.WeedStrains.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //     .then(function(dbDelete) {
  //       res.json(dbDelete);
  //     });
  // });
};
