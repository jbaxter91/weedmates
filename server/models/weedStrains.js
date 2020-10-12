module.exports = function (sequelize, DataTypes) {
  var WeedStrains = sequelize.define("WeedStrains", {
    name: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being entered if it doesn't
      // have a text value
      allowNull: false,
      // len is a validation that checks that our todo is between 1 and 50 characters
      validate: {
        len: [1, 100],
      },
    },
    race: {
      type: DataTypes.STRING,
    },
    medical: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("medical"));
      },
      set: function (val) {
        return this.setDataValue("medical", JSON.stringify(val));
      },
    },
    positive: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("positive"));
      },
      set: function (val) {
        return this.setDataValue("positive", JSON.stringify(val));
      },
    },
    negative: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("negative"));
      },
      set: function (val) {
        return this.setDataValue("negative", JSON.stringify(val));
      },
    },
    flavors: {
      type: DataTypes.STRING,
      get: function () {
        return JSON.parse(this.getDataValue("flavors"));
      },
      set: function (val) {
        return this.setDataValue("flavors", JSON.stringify(val));
      },
    },
  });

  WeedStrains.associate = function (models) {
    WeedStrains.hasMany(models.WeedLikes, {});
  };

  return WeedStrains;
};
