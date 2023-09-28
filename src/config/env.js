const dotenv = require("dotenv");
dotenv.config();

const {
    PORT,
    WHITE_LIST,
    EMAIL,
    DB_HOST,
    NODEMAILER_USER,
    NODEMAILER_PASS,
    JWT_SECRET_KEY,
    SENDGRID_API_KEY,
    MAILTRAP_USER,
    MAILTRAP_PASS,
} = process.env;
module.exports = {
    port: PORT,
    whiteList: WHITE_LIST,
    email: EMAIL,
    dbHost: DB_HOST || "mongodb://localhost:27017",
    nodemailerUser: NODEMAILER_USER,
    nodemailerPass: NODEMAILER_PASS,
    jwtSecretKey: JWT_SECRET_KEY,
    sendgridApiKey: SENDGRID_API_KEY,
    mailTrapUser: MAILTRAP_USER,
    mailTrapPass: MAILTRAP_PASS,
};
