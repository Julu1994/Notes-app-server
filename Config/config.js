/**
 * Represents the configuration settings for the application.
 * @typedef {Object} AppConfig
 * @property {number} PORT - The port number to use for the application.
 * @property {string} DB_LINK - The database connection string to use for the application.
 * @property {string} JWT_SECRET - The secret key to use for signing and verifying JWT tokens.
 **/
const dotenv = require("dotenv");
dotenv.config();

const config = {
    PORT: process.env.PORT,
    DB_LINK: process.env.DB_LINK,
    JWT_SECRET: process.env.JWT_SECRET,
};
module.exports = config;
