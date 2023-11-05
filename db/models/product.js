"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.user, { as: "user" });

      this.belongsToMany(models.user, {
        through: models.rating,
      });
      this.hasMany(models.rating);

      this.belongsToMany(models.category, {
        through: "product_categories",
      });
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      productDesc: DataTypes.TEXT,
      productPrice: DataTypes.FLOAT,
      quantity: DataTypes.INTEGER,
      image: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      // Add the tsvector column for full-text search
      product_search_vector: DataTypes.TSVECTOR,
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
      modelName: "product",
    }
  );

  // Define a hook to automatically update product_search_vector
  Product.addHook("beforeSave", (product) => {
    product.product_search_vector = sequelize.literal(
      `to_tsvector('english', coalesce("productName", '') || ' ' || coalesce("productDesc", ''))`
    );
  });

  return Product;
};
