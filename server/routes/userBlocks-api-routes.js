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
  // GET route for getting all of the posts
  app.get("/api/blocks/:userID", function (req, res) {
    db.UserBlocks.findAll({where:{initiator_user_id: req.params.userID}}).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/blocks/search/:username", function (req, res) {
    db.UserBlocks.findOne({
      where: {
        username: req.params.username,
      },
    }).then(function (dbGet) {
      res.json(dbGet);
    });
  });

  // POST route for saving a new user
  app.post("/api/blocks", function (req, res) {
    console.log(req.body);
    const { initiator_user_id,  target_user_id} = req.body;
    db.Users.create({
      initiator_user_id,
      target_user_id
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/blocks/:id", function (req, res) {
    db.Users.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbDelete) {
      res.json(dbDelete);
    });
  });

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
