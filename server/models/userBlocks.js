module.exports = function (sequelize, DataTypes) {
  var UserBlocks = sequelize.define("UserBlocks", {
    block_message: {
      type: DataTypes.STRING,
    },
  });

  UserBlocks.associate = function (models) {
    UserBlocks.belongsTo(models.Users, { foreignKey: "initiator_user_id" });
    UserBlocks.belongsTo(models.Users, { foreignKey: "target_user_id" });
  };
  return UserBlocks;
};
