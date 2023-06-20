// express
const express = require("express");
const app = express();

//npm packges
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");

//require from modules
const { whiteList } = require("../config/env");
const { errorHandlerGlobal } = require("../middlewares/errorHandlerGlobal");
const { notFound404 } = require("../middlewares/notFound404");
const CustomError = require('../utils/customError');

// -----------------------------------------Middleware-----------------------------------------------------------

//parses the incoming JSON request body into a JavaScript object.
app.use(express.json());
// using the querystring library, which supports parsing simple form submissions. If you need to parse nested objects or arrays from the form data, you can set extended: true to use the qs library instead.
app.use(express.urlencoded({ extended: true }));

//cors
const corsOptions = {
    origin: whiteList,
};
app.use(cors(corsOptions));

//protect against HTTP Parameter Pollution attacks
app.use(hpp());

//Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());

//limit requests rate
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP, please try again after an 15 min",
});
app.use(limiter);

//test

app.get("/", (req, res, next) => {
    try {
        throw new CustomError(400, "Name parameter is missing");
    } catch (error) {
        next(error);
    }
});

//handling express errors
app.all("*", notFound404);

app.use(errorHandlerGlobal);

// ---------------------------------------------------------------------------------------------------------------

module.exports.app = app;
