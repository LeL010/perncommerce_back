"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.product);

      this.belongsToMany(models.product, {
        through: models.rating,
      });
      this.hasMany(models.rating);

      this.hasMany(models.order);

    }
  }
  User.init(
    {
      userRole: DataTypes.STRING,
      userName: DataTypes.STRING,
      userEmail: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return User;
};
