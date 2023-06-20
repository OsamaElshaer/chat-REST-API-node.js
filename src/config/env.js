const dotenv = require("dotenv");
dotenv.config();

const { PORT, WHITE_LIST } = process.env;
module.exports = {
    port: PORT,
    whiteList: WHITE_LIST,
};
