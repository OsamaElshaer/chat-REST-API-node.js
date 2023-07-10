const dotenv = require("dotenv");
dotenv.config();

const { PORT, WHITE_LIST, EMAIL, DB_HOST } = process.env;
module.exports = {
    port: PORT,
    whiteList: WHITE_LIST,
    email: EMAIL,
    dbHost: DB_HOST,
};
