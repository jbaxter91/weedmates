module.exports = function (sequelize, DataTypes) {
  var UserRatings = sequelize.define("UserRatings", {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  UserRatings.associate = function (models) {
     UserRatings.belongsTo(models.Users, {foreignKey: "initiator_user_id"});
     UserRatings.belongsTo(models.Users, {foreignKey: "target_user_id"});
  };

  return UserRatings;
};
