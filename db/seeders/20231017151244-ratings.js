'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("ratings", [
      {
        userId: 1,
        productId: 1,
        ratings: 3.9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        productId: 2,
        ratings: 4.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        productId: 3,
        ratings: 4.7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        productId: 4,
        ratings: 2.1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        productId: 5,
        ratings: 4.6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ratings", null, {});
  },
};
