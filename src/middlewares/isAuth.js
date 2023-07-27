const jwt = require("jsonwebtoken");
const config = require("../config/env");
const CustomError = require("../utils/customError");
const isAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.jwtSecretKey);
        req.user = decoded;

        next();
    } catch (error) {
        throw new CustomError("Failed to get token", 401, error);
    }
};

module.exports.isAuth = isAuth;
