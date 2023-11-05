'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("product_categories", [
      {
        productId: 1,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 2,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 3,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 4,
        categoryId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productId: 5,
        categoryId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("product_categories", null, {});
  },
};
