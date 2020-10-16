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
  app.post("/api/ratings", (req, res) => {
    let { rating, initiator_user_id, target_user_id } = req.body;
    db.UserRatings.create({
      rating,
      initiator_user_id,
      target_user_id,
    })
      .then(function (dbRating) {
        res.json(dbRating);
      })
      .catch(function (err) {
        console.log("Error:", err);
        res.status(401).json(err);
      });
  });

  app.get("/api/matches", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      const Op = Sequelize.Op;
      //Get the initiator users ratings
      db.UserRatings.findAll({
        where: {
          initiator_user_id: req.user.id,
          rating: { [Op.gte]: 1 }, // square brackets are needed for property names that aren't plain string}
        },
      }).then((initiator_data) => {
        //Gets all user ratings where the current user is the target
        db.UserRatings.findAll({
          where: {
            target_user_id: req.user.id,
            rating: { [Op.gte]: 1 }, // square brackets are needed for property names that aren't plain string}
          },
          attributes: ["initiator_user_id", "target_user_id"],
        }).then((target_data) => {
          let init_array = [];
          for (let i = 0; i < initiator_data.length; i++) {
            init_array.push(initiator_data[i].target_user_id);
          }

          let result = target_data.filter((rating) => {
            if (init_array.includes(rating.initiator_user_id)) {
              return rating;
            } else {
              return false;
            }
          });
          res.json(result);
        });
      });
    }
  });
};
