module.exports = function(sequelize, DataTypes) {
    var WeedLikes = sequelize.define("WeedLikes", {
      rating: {
        type: DataTypes.INTEGER,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        default: 0,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
          min: -1,
          max: 2
        }
      }
    });

    WeedLikes.associate = function(models){
      WeedLikes.belongsTo(models.Users, {
      });
      WeedLikes.belongsTo(models.WeedStrains, {foreignKey: "weedID"
      })
  }

    return WeedLikes;
  };
  