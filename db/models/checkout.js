"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Checkout extends Model {
    static associate(models) {
      this.belongsTo(models.user);
    }
  }
  Checkout.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address1: DataTypes.STRING,
      address2: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      country: DataTypes.STRING,
      cardName: DataTypes.STRING,
      cardNumber: DataTypes.STRING,
      expDate: DataTypes.DATEONLY,
      cvv: DataTypes.INTEGER,
      saveAddress: { type: DataTypes.BOOLEAN, defaultValue: false },
      saveCard: { type: DataTypes.BOOLEAN, defaultValue: false },
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
      modelName: "checkout",
    }
  );
  return Checkout;
};
