// Requiring bcrypt for password hashing. Using the bcryptjs version as the regular bcrypt module sometimes causes errors on Windows machines
var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being entered if it doesn't
      // have a text value
      allowNull: false,
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [1, 35],
      },
      unique: {
        args: true,
        msg: "Username address already in use!",
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    lon: {
      type: DataTypes.FLOAT,
    },
  });

  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  Users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  Users.addHook("beforeCreate", function (user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });

  Users.associate = (models) => {
    Users.hasMany(models.WeedLikes, {});
    Users.hasMany(models.UserRatings, { foreignKey: "initiator_user_id" });
    Users.hasMany(models.UserRatings, { foreignKey: "target_user_id" });

    Users.hasMany(models.UserBlocks, { foreignKey: "initiator_user_id" });
    Users.hasMany(models.UserBlocks, { foreignKey: "target_user_id" });
  };

  return Users;
};
