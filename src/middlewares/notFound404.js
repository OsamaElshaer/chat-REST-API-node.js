const CustomError = require("../utils/customError");

exports.notFound404 = (req, res, next) => {
    next(new CustomError(404, `Can't find this route: ${req.originalUrl}`));
};
