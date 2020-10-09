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
  app.get("/api/users/", function (req, res) {
    db.Users.findAll({}).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/users/:id", function (req, res) {
    db.Users.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (dbUser) {
      console.log("YOLO");
      db.WeedLikes.findAll({
        where: {
          UserId: req.params.id,
        },
      }).then((dbStrain) => {
        console.log("MOLO");
        let userData = dbUser.get({ plain: true });
        userData.strainsLiked = dbStrain;
        res.json(userData);
      });
    });
  });

  // Get route for retrieving a single post
  app.get("/api/users/search/:username", function (req, res) {
    db.Users.findOne({
      where: {
        username: req.params.username,
      },
    }).then(function (dbGet) {
      res.json(dbGet);
    });
  });

  // POST route for saving a new user
  app.post("/api/users", function (req, res) {
    console.log(req.body);
    const { username, ipaddress, email, password } = req.body;
    db.Users.create({
      username,
      email,
      password,
      ipaddress,
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/users:id", function (req, res) {
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
