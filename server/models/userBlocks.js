module.exports = function(sequelize, DataTypes) {
    var UserBlocks = sequelize.define("UserBlocks", {
      block_message: {
        type: DataTypes.STRING,
      },
      //Forign key to user who did the blocking

      //forign key to target of the block
    });
    return UserBlocks;
  };
  