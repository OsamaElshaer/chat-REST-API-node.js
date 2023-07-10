const express = require("express");
const audit = require("../utils/audit");

const router = express.Router();
const { signUp } = require("../services/user.service");
const { validationResult, body } = require("express-validator");
const { validateSignup } = require("../utils/validations");

const CustomError = require("../utils/customError");

router.post("/signup", validateSignup, async (req, res, next) => {
    const { userName, email, password } = req.body;
    const errors = validationResult(req);

    try {
        if (!errors.isEmpty()) {
            throw new CustomError("signup", 422, errors.array()[0].msg);
        }

        const result = await signUp(userName, email, password);

        res.status(201).json({
            msg: "User signed up successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }

    audit("User", "Signup", userName, new Date(), req.method, res.statusCode);
});

module.exports.userRouter = router;
