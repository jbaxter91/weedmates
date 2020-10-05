module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our todo is between 1 and 140 characters
        validate: {
          len: [1, 35]
        },
        unique: {
          args: true,
          msg: 'Username address already in use!'
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,

        },
        unique: {
          args: true,
          msg: 'Email address already in use!'
        }
      },
      password: {
        type: DataTypes.STRING
      }
    });

    Users.associate = (models) => {
      Users.hasMany(models.WeedLikes, {

      });
      Users.hasMany(models.UserRatings, {

      });
    };

    return Users;
  };
  