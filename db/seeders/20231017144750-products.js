"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("products", [
      {
        productName: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        productDesc:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        productPrice: 109.95,
        quantity: 1,
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Mens Casual Premium Slim Fit T-Shirts",
        productDesc:
          "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        productPrice: 22.3,
        quantity: 1,
        image:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Mens Cotton Jacket",
        productDesc:
          "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm-hearted love to Father, husband, or son on this Thanksgiving or Christmas Day.",
        productPrice: 55.99,
        quantity: 1,
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName: "Mens Casual Slim Fit",
        productDesc:
          "The color could be slightly different between on the screen and in practice. Please note that body builds vary by person; therefore, detailed size information should be reviewed below in the product description.",
        productPrice: 15.99,
        quantity: 1,
        image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        productName:
          "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        productDesc:
          "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        productPrice: 695,
        quantity: 1,
        image:
          "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
