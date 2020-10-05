module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      like: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
          len: [1, 35]
        }
      },
      email: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      }
    });
    return User;
  };
  