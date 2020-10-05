module.exports = function(sequelize, DataTypes) {
    var WeedStrains = sequelize.define("WeedStrains", {
      like: {
        name: DataTypes.STRING,
        // AllowNull is a flag that restricts a todo from being entered if it doesn't
        // have a text value
        allowNull: false,
        // len is a validation that checks that our todo is between 1 and 50 characters
        validate: {
          len: [1, 50]
        }
      },
      medical_use: {
        type: DataTypes.STRING
      },
      positive_effects: {
        type: DataTypes.STRING
      },
      negitive_effects: {
        type: DataTypes.STRING
      },
      flavor: {
        type: DataTypes.STRING
      }
    });
    return WeedStrains;
  };
  