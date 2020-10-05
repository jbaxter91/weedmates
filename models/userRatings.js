module.exports = function(sequelize, DataTypes) {
    var UserRatings = sequelize.define("UserRatings", {
      rating: {
        type: DataTypes.INTEGER,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false
      },
      //forign key to user who did rating

      //forign key to target of the rating
    });
    return UserRatings;
  };
  