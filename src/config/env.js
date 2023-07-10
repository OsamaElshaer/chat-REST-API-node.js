const dotenv = require("dotenv");
dotenv.config();

const {
    PORT,
    WHITE_LIST,
    EMAIL,
    DB_HOST,
    NODEMAILER_USER,
    NODEMAILER_PASS,
    SECRET_KEY,
} = process.env;
module.exports = {
    port: PORT,
    whiteList: WHITE_LIST,
    email: EMAIL,
    dbHost: DB_HOST,
    nodemailerUser: NODEMAILER_USER,
    nodemailerPass: NODEMAILER_PASS,
    secretKey: SECRET_KEY,
};
