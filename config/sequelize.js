const { Sequelize } = require("sequelize");

// Create a new Sequelize instance
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: null,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

module.exports = sequelize;